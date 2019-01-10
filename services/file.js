const fs = require('fs');
classList = (className,cb) =>{
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

updateClass = (className,name,age,city,grade) =>{
    classList(className,(err,data)=>{
        if(err) {
            const studentData = { 
                students:[{name,age,city,grade}]
            }

            const studentObjString = JSON.stringify(studentData)
            fs.writeFile(`./classes/${className}.json`,studentObjString)
        }
        else {
            const dataObj = data
            dataObj.students.push({name,age,city,grade})
            
            const updatedString = JSON.stringify(dataObj)
            fs.writeFile(`./classes/${className}.json`,updatedString)
        }
    })
    
}

module.exports = {
    classList,
    updateClass
}