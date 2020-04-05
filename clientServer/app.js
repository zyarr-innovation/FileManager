const exp = require("express");
const cors = require('cors');
const fs = require ("fs");
const bodyParser = require ("body-parser");
var app = exp ();

const publicFolderPath = __dirname + "/client";
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(exp.static(publicFolderPath));

app.listen(8090, () => {
    console.log ("listening on port 8090");
})