const fs = require('fs');
fileToJSON = (className,cb) =>{
    const path = `./classes/${className}.json`
    console.log(path);
    
    fs.readFile(path,(err,data)=>{
        if(err){
            cb(err,null)
            return;
        }
        
        const bufferedString = data.toString();
        const json = JSON.parse(bufferedString);
        cb(err,json);
    })
}

module.exports = {
    fileToJSON,
}