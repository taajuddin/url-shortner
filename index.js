const express= require('express')
const app=express()
const router=require('./config/routes')
const configureDB=require('./config/database')


configureDB()
app.use(express.json())
app.use(router)
const port=3033



app.listen(port,()=>{
    console.log('server running on port',port)
})