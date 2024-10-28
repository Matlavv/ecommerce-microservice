import express from 'express';

const app = express();
const PORT = process.env.PORT || 3005;

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});