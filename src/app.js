import  express  from 'express';
import userRoutes from './routes/users.routes.js';


const app = express();
app.use(express.json());

app.use(userRoutes);

export default app;