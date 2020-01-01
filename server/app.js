const cookieName = "currentDir";

const exp = require("express");
const cors = require('cors');
const fs = require ("fs");
const bodyParser = require ("body-parser");
var app = exp ();

const publicFolderPath = "E:/OnDisk";
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(exp.static(publicFolderPath));

app.get ("/", (req, res) => {
    let queryString = "";
    if (req.query.dir) {
        queryString = req.query.dir;
    }

    let dirName = (publicFolderPath + queryString);
    if ("" == queryString || queryString.endsWith('/')) {
        getDirInfo(dirName, res);
    } 
});

app.listen(8080, () => {
    console.log ("listening on port 8080");
})

function getDirInfo(dirName, res) {
    let dirList = [];
    fs.readdirSync(dirName, { withFileTypes: true })
        .forEach(item => {
            let name = item.name;
            name += (item.isDirectory() ? "/" : "");
            dirList.push(name);
        });
    res.send(dirList);
    res.end();
}

