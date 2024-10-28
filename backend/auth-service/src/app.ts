import dotenv from 'dotenv';
import express from 'express';
import authRoutes from './routes/authRoutes';

dotenv.config();
const PORT = process.env.PORT || 3005;

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
