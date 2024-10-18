const express = require('express');
const app = express();
const port = 3000;

app.use(express.json())

app.post('/user' , (req , res) => {
    console.log(req.body);
    res.send("Post request");
})


app.listen(port, () => {
    console.log("Server is up")
})

