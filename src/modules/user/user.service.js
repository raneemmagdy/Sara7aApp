import userModel from "../../DB/models/user.model.js"
import { eventEmitter } from "../../utils/handleEmail/sendEmail.event.js"
import * as modules from "../../utils/index.js"

//------------------------signUp
export const signUp=async(req,res,next)=>{
    const {name,email,password,Cpassword,phone,gender,role}=req.body
    const emailExist= await userModel.findOne({email})
    if(emailExist){
      return next(new Error('Email Already Exist',{cause:409}))
    }
    const hashedPassword=await modules.Hash({password,SALT_NUMBER:process.env.SALT_NUMBER})
    const encryptPhone=await modules.Encrypt({phone,PHONE_SECRET_KEY:process.env.PHONE_SECRET_KEY})
    eventEmitter.emit('sendEmail',{email,name,req})
    const user= await userModel.create({name,email,password:hashedPassword,phone:encryptPhone,gender,role})
    return res.status(201).json({msg:'User Added Successfully',user})
   
}


//------------------------confirmEmail
export const confirmEmail=async(req,res,next)=>{
 
      const {token}=req.params
      if(!token){
         return next(new Error('Token Not Found',{cause:404}))
      }
      const payload= await modules.verifyToken({token,JWT_SECRET:process.env.CONFIRM_SECRET_KEY})
      
      if(!payload?.email){
         return next(new Error('invalid Token payload',{cause:404}))
      }
      const user= await userModel.findOneAndUpdate({email:payload.email},{confirmed:true})
      
      
      if(!user){
         return next(new Error('User Not Found',{cause:404}))
      }
      if(user.confirmed){
         return next(new Error('Account already confirmed ', { cause: 400 }));
      }
      return res.status(200).json({msg:'User Confirmed Successfully'})
   
}
//------------------------signIn
export const signIn=async(req,res,next)=>{
  
     const {email,password}=req.body
     const user=await userModel.findOne({email})
     
     if(!user){
      return next(new Error('invalid email or password',{cause:400}))
     
     }
     const comparePassword=await modules.Compare({password,userPassword:user.password})
     if(!comparePassword){
       return next(new Error('invalid email or password',{cause:400}))
     }
     if(!user.confirmed){
      return next(new Error('Account not confirmed yet', { cause: 400 }));
     }
     const token= await modules.generateToken({payload:{email},JWT_SECRET:user.role==='user'?process.env.JWT_SECRET_USER:process.env.JWT_SECRET_ADMIN,option:{expiresIn:'1h'}})
    
     return res.status(201).json({msg:'User loged in',user,token})
    
}




//------------------------getProfile
 export const getProfile=async(req,res,next)=>{
 
     const user=req.user
     const decryptPhone=await modules.Decrypt({phone:user.phone,PHONE_SECRET_KEY:process.env.PHONE_SECRET_KEY})
     console.log(decryptPhone);
     user.phone=decryptPhone
     if (!decryptPhone) {
      return next(new Error('Invalid phone number decryption.', { cause: 400 })); }
     return res.status(201).json({user})
   
 }






//------------------------updateProfile
export const updateProfile=async(req,res,next)=>{
   if(req.body.phone){
      req.body.phone=await modules.Encrypt({phone:req.body.phone,PHONE_SECRET_KEY:process.env.PHONE_SECRET_KEY})
   }
   const user=await userModel.findByIdAndUpdate(req.user._id,req.body,{new:true})
   return res.status(200).json({message:'User Updated Successfully',user})
 
}



//------------------------updatePassword
export const updatePassword=async(req,res,next)=>{
   const {oldPassword,newPassword}=req.body
   if(!await modules.Compare({password:oldPassword,userPassword:req.user.password})){
      return next(new Error('Invalid Old Password',{cause:400}))
   }
   const hashNewPassword= await modules.Hash({password:newPassword,SALT_NUMBER:process.env.SALT_NUMBER})
   const user=await userModel.findByIdAndUpdate(req.user._id,{password:hashNewPassword,passwordChangedAt:Date.now()},{new:true})
   return res.status(200).json({message:'User Updated Successfully',user})
 
}
//------------------------freezeAccount(softDelete)
export const freezeAccount=async(req,res,next)=>{
   const deletedAccount=await userModel.findByIdAndUpdate(req.user._id,{isDeleted:true,passwordChangedAt:Date.now()},{new:true})
   return res.status(200).json({message:'User Deleted Successfully',deletedAccount})
}



//------------------------shareProfile
export const shareProfile=async(req,res,next)=>{
   const user=await userModel.findById(req.params.id).select('name email phone gender')
   if(!user){
      return next(new Error('User Not Found',{cause:404}))
   }
   if(user.phone){
      user.phone=await modules.Decrypt({phone:user.phone,PHONE_SECRET_KEY:process.env.PHONE_SECRET_KEY})
   }
   return res.status(200).json({message:'Done',user})
}
















































