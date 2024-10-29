import express from 'express';
import authRoutes from './routes/auth';

import { PORT } from './config/secrets';

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
