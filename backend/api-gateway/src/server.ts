import app from './app';

const port = 3000;

const startServer = async () => {
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
};

startServer();
