
import {EventEmitter} from 'events'
import sendEmailByNodemailer from '../../services/sendEmail.js'
import emailStructure from './emailStructure.js'
import { generateToken } from '../Token/generateToken.js'

export const eventEmitter=new EventEmitter()


eventEmitter.on('sendEmail',async(data)=>{
    const {email,name,req}=data
    const token=await generateToken({payload:{email},JWT_SECRET:process.env.CONFIRM_SECRET_KEY,option:{expiresIn:'10m'}})
    const link=`${req.protocol}://${req.get('host')}/users/confirmed/${token}`
    const emailSent=await sendEmailByNodemailer(email,'Confirm Email',emailStructure(name,link))
    if(!emailSent){
     return next(new Error('Fail To Send Email!',{cause:500}))
   }
})