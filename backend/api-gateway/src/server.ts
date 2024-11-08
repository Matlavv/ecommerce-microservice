import app from './app';
// import { connectDB } from './database';

const port = 3000;

const startServer = async () => {
    // await connectDB();

    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
};

startServer();