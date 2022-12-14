const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.resolve(__dirname, './dist')));


app.listen(3000, (req, res) => {
    console.log("Serving app on port: 3000");
})