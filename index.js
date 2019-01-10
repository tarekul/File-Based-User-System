const express = require('express');
const app = express();
const port = 3000;
const fileServices = require('./services/file.js')


app.get('/',(req,res)=>{
    res.send('hello');
})

app.get('/class/list',(req,res)=>{
    const className = req.query.class
    fileServices.classList(className,(err,data)=>{
        if(err){
            res.json({error:`Class ${className} doesn\'t exist.`})
            return
        }
        res.json(data)
    })
})

app.get('/class/listfromcity',(req,res)=>{
    const className = req.query.class
    const {city} = req.query
    fileServices.classList(className,(err,data)=>{
        if(err){
            res.json({error:`Class ${className} doesn\'t exist.`})
            return
        }
        const obj = {}
        const filterStud = data.students.reduce((acc,studentObj)=>{
            if(studentObj.city === city) acc.push(studentObj)
            return acc
        },[])

        obj.students = filterStud
        res.json(obj)
    })
})

app.get('/class/listfailing',(req,res)=>{
    const className = req.query.class
    fileServices.classList(className,(err,data)=>{
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
        res.json(obj)
    })
})

app.get('/class/add',(req,res)=>{
    const className = req.query.class;
    const {name,city} = req.query;
    const age = parseInt(req.query.age);
    const grade = parseInt(req.query.grade);
    
    if(!className || !name || !age || !grade) {
        res.json({ 
            error: 'Please fill out all the information for the student'
        })
        return
    }
    fileServices.updateClass(className,name,age,city,grade)
    res.json({ 
        added: { name, age, city, grade},
        class: className
      })
   
})

app.listen(port,()=>{
    console.log(`User system running on ${port}`);
})