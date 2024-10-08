import { auth } from "@/server/auth";
import { prisma } from "@/server/prisma";
import stripe from "@/server/stripe";
import { zValidator } from "@hono/zod-validator";
import { subscriptionPlan } from "@prisma/client";
import { Hono } from "hono";
import { z } from "zod";

const router = new Hono();

const Plans = {
  BASIC: 'price_1Q5sevDcZesg5A6LHZkcfI0V',
  PREMIUM: 'price_1Q65wIDcZesg5A6LGhweIVBX',
}

router.post('/create-checkout-session', zValidator('json', z.object({
  plan: z.enum(['BASIC', 'PREMIUM']),
})), async (c) => {
  const loggedInUser = await auth();

  if (!loggedInUser?.user?.id) {
    return c.json({
      message: 'Unauthorized'
    }, 401);
  }

  const session = await stripe.checkout.sessions.create({
    // ui_mode: 'embedded',
    line_items: [
      {
        price: Plans[c.req.valid('json').plan],
        quantity: 1,
      }
    ],
    client_reference_id: loggedInUser.user.id,
    mode: 'subscription',
    success_url: `${c.req.header('origin')}/?success=true`,
    cancel_url: `${c.req.header('origin')}/?canceled=true`,
  });

  return c.json({
    redirectURL: session.url,
  }, 200);
});

router.post('/webhook', async (c) => {
  try {
    const signature = c.req.header('stripe-signature');

    if (!signature) {
      return c.json({
        message: 'No signature'
      }, 400);
    }

    const body = await c.req.text();
    const event = await stripe.webhooks.constructEventAsync(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const userId = session.client_reference_id;

      if (!userId) {
        throw new Error("User not found");
      }

      const items = await stripe.checkout.sessions.listLineItems(session.id);
      const purchasedPlan = Object.entries(Plans).find(([, planId]) => items.data[0].price?.id === planId)?.[0] as subscriptionPlan;

      if (!purchasedPlan) {
        throw new Error("Plan not found");
      }

      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          subscriptionPlan: purchasedPlan,
        }
      });
    } else {
      return c.json({
        message: 'Unknown event type'
      });
    }
  } catch (e) {
    console.log(e);

    return c.json({
      message: 'Error processing event'
    }, 200);
  }
});

export default router;