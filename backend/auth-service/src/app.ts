import express from 'express';
import swaggerSetup from './swagger';
import authRoutes from './routes/auth';

import { PORT } from './config/secrets';

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);

swaggerSetup(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
