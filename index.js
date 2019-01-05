const express = require('express');
const app = express();
const port = 3003;
const fileServices = require('./services/file.js')


app.get('/',(req,res)=>{
    res.send('hello');
})

app.get('/class/list',(req,res)=>{
    const className = req.query.class
    fileServices.fileToJSON(className,(err,data)=>{
        if(err){
            res.json({error:`Class ${className} doesn\'t exist.`})
            return
        }
        res.json(data)
    })
})

app.get('/class/listfailing',(req,res)=>{
    const className = req.query.class
    fileServices.fileToJSON(className,(err,data)=>{
        if(err){
            res.json({error:`Class ${className} doesn\'t exist.`})
            return
        }
        const obj = {}
        const hold = data.students.reduce((acc,element)=>{
            if(element.grade < 50) acc.push(element)
            return acc
        },[])
        
        obj.students = hold
        res.send(obj)
    })
})

app.listen(port,()=>{
    console.log(`User system running on ${port}`);
    
})