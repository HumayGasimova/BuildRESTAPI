const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello world!!');
});

app.get('/api/courses', (req, res) => {
    res.send([1,2,3]);
});

app.get('/api/courses/:id', (req, res) => {
    res.send(req.params);
});

app.get('/api/posts', (req, res) => {
    res.send(
        [
            {
                year: 2018,
                month: 1,
                key: 1
            },
            {
                year: 2018,
                month: 1,
                key: 2
            },
            {
                year: 2018,
                month: 3,
                key: 3
            },
            {
                year: 2018,
                month: 4,
                key: 4
            },
        ]
        

    );
});

// app.get('/api/posts/:year/:month', (req, res) => {
//     res.send(req.params);
// });

app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.query);
    // http://localhost:3000/api/posts/2018/4?sortBy=name
});

//PORT
const port = process.env.PORT || 3000;

app.listen(3000, () => console.log(`Listening on port ${port}...`));
