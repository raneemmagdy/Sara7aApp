import express from 'express'
import env from 'dotenv'
import bootstrap from './src/app.controller.js'
env.config()
const app=express()

bootstrap(app,express)
app.listen(process.env.PORT,()=>{
    console.log(`Server is Running on Port ${process.env.PORT} `);
    
})