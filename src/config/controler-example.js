const express = require('express')
const db = require('./firebase') //firebase service key file
const admin = require('firebase-admin')
const app=express()
const cors = require('cors')

let port = process.env.PORT || 8000 //port need to assign recommended

app.use(express.json()) //using express.js we can connect api's from node.js to firetsore becomes easy
app.use(cors()) 


app.post('/signup',function(req,res) //signup post request where need to pass the emailid and password of the user
{ 
    email=req.body['email'], 
    password=req.body['password']

    admin.auth().createUser({
        email:email,
        password:password
    }).then(resHandler=>{
        console.log(resHandler.uid) // getting the unique id by using uid to identify the user
        res.send('done')
    })
    .catch(err=>{
        console.log(err)
        res.send(err.message)
    })
})

app.get('/api/get/:object',async function(req,res){ //GET request to get the all user data
    allentries=[]
    const entries=await db.collection(req.params.object).get()
    entries.forEach((entry)=>(
        allentries.push(entry.data())
    ))
    res.status(200).json(allentries)
})

app.get('/api/get/:object/:id',async function(req,res){ //GET request to get the particular "id" data
    allentries=[]
    const entries=await db.collection(req.params.object).doc(req.params.id).get()
    res.status(200).json(entries.data())
})


app.post('/api/post/:object/:id',function(req,res){ //PUT request to update the particlar "id" data 
    db.collection(req.params.object).doc(req.params.id).set(req.body)
    .then(result=>{
        console.log(result)
        res.send(result)
    })
    .catch(err=>{
        console.log(err)
        res.send(err)
    })
})

app.post('/api/post/:object',function(req,res){ // POST request helps to store data in firestore
    db.collection(req.params.object).doc().set(req.body)
    .then(result=>{
        console.log(result)
        res.send(result)
    })
    .catch(err=>{
        console.log(err)
        res.send(err)
    })
})


app.delete('/api/delete/:object/:id',function(req,res){ //DELETE request to dlete the particular id data
    db.collection(req.params.object).doc(req.params.id).delete()
    .then(result=>{
        console.log(result)
        res.send('successfully deleted')
    })
    .catch(err=>{
        console.log(err.response)
        res.send(err)
    })
})


app.listen(port,function(req,res){ // Important endline
    console.log('started')
})
