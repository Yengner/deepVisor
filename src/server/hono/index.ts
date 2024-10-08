import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { authRoutes, stripeRoutes, userRoutes } from './routes';
import { authMiddleware } from './middlewares';

export const runtime = 'edge'

const app = new Hono().basePath('/api')

app.route('/', authRoutes);

app.use(authMiddleware);
app.route('/stripe', stripeRoutes);
app.route('/user', userRoutes)

const honoApp = handle(app);
export default honoApp;