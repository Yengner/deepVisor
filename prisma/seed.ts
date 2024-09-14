import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.upsert({
        where: { email: 'test@test.com'},
        update: {
            fbId: 'act_782974607026594',
            businessName: "Ada's Secret Salon",
        },
        create: {
            email: 'test@test.com',
            name: 'Test User',
            password: 'password',
            fbId: 'act_782974607026594',
            businessName: "Ada's Secret Salon",
        }
    })
    console.log({user})
}

main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })