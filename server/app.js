var cluster = require('cluster');

if (cluster.isMaster) {
   var i = 0;
   for (i; i< 1; i++){
     cluster.fork();
   }

   //if the worker dies, restart it.
   cluster.on('exit', function(worker){
      console.log('Worker ' + worker.id + ' died..');
      cluster.fork();
   });
}
else{

    const cookieName = "currentDir";

    const exp = require("express");
    const cors = require('cors');
    const fs = require ("fs");
    const bodyParser = require ("body-parser");
    const appConfig = require ("./app.config.json");

    var app = exp ();

    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(exp.static(appConfig.baseFolder));

    app.get ("/", (req, res) => {
        let queryString = "";
        if (req.query.dir) {
            queryString = req.query.dir;
        }

        let dirName = (appConfig.baseFolder + queryString);
        if ("" == queryString || queryString.endsWith('/')) {
            getDirInfo(dirName, res);
        } 
    });

    

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

    app.listen(8082, () => {
        console.log ("listening on port 8082");
    })

    process.on('uncaughtException', function(){
          console.log(err);
          //Send some notification about the error  
          process.exit(1);
    });

} //end of cluster
