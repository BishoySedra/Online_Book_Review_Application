import Express from "express";

const app = Express();

app.route('/').get((req, res) => {
    res.send('hello from IBM Course');
})

const port = 3000;
app.listen(port, console.log(`server running on ${port}`));

