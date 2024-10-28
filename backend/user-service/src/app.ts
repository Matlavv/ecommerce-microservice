import express from 'express';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Server is running BONJOUddddegiruytgughdfkugdhfikuR');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('coucoudfff');
});
