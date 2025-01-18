export const asyncHandler=(fn)=>{
    return (req,res,next)=>{
       fn(req,res,next).catch((err)=>{
        return next(err)
       })
    }
}



export const globalErrorHandeling=(err,req,res,next)=>{
    return res.status(err['cause']||500).json({msg:'error',error:err.message,stack:err.stack})
}