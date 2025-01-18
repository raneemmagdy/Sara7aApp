import cors from 'cors'
import checkDBConnection from "./DB/connectionDB.js"
import messageRounter from "./modules/message/message.controller.js"
import userRouter from "./modules/user/user.controller.js"

import { globalErrorHandeling } from "./utils/index.js"
const bootstrap=async(app,express)=>{
 app.use(cors())
 checkDBConnection()
 app.use(express.json())
 app.use('/users',userRouter)
 app.use('/messages',messageRounter)

 app.get('/',(req,res,next)=>{
    return res.status(200).json({message:'Welcome To Sara7a App'})
 })

 app.use('*',(req,res,next)=>{
    return next(new Error(`Page not Found 404 -> ${req.originalUrl}`,{cause:404}))
    
 })
 app.use(globalErrorHandeling)
}

export default bootstrap