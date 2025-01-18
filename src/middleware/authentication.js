
import userModel from '../DB/models/user.model.js'
import { verifyToken } from '../utils/Token/verifyToken.js'
import { asyncHandler } from '../utils/index.js'
export const rolesOptions={
    user:'user',
    admin:'admin'
}
export const authentication=asyncHandler(
    async(req,res,next)=>{

        const{authorization}=req.headers
        
        
        if(!authorization){
            return next(new Error('Token Not Found',{cause:404}))
        }
        
        const [prefix,token]=authorization.split(" ")
     
        if(!prefix||!token){
            return next(new Error('Token Not Found',{cause:404}))
        }
        let JWT_SECRET=undefined
        if(prefix=='Bearer'){
            JWT_SECRET=  process.env.JWT_SECRET_USER
        }else if(prefix=='Admin'){
            JWT_SECRET=  process.env.JWT_SECRET_ADMIN
        }else{
            return next(new Error('invalid Token prefix',{cause:401}))
           
        }
        
        const payload=await verifyToken({token,JWT_SECRET})
        if(!payload?.email){
            return next(new Error('invalid Token payload',{cause:404}))
        }
        const user= await userModel.findOne({email:payload.email})
        if(!user){
            return next(new Error('User Not Found',{cause:404}))
        }
        if (user?.isDeleted) {
            return next(new Error('User Is Deleted(Soft Delete)', { cause: 400 }));
        }
        //second
        if (payload.iat < parseInt(user?.passwordChangedAt?.getTime() / 1000)) {
            return next(new Error('Token has expired. Please log in again.', { cause: 400 }));
        }
       
        req.user=user
        next()
    
    
    }
    
)
export const authorization=(accessRoles=[])=>{
    return asyncHandler(
        async(req,res,next)=>{
     
            if(!accessRoles.includes(req.user.role)){
              return next(new Error('Access denied: You do not have the required permissions.',{cause:403}))
            }
            next()
         
  }
    )
}  