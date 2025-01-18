
export const validation=(schema)=>{
    return  (req,res,next)=>{
        const validationErrors=[]
        for (const key of Object.keys(schema)) {
          const validationError=schema[key].validate(req[key],{abortEarly:false})
          if(validationError?.error){
           validationErrors.push(validationError.error.details)
          }
        }
        if(validationErrors.length>0){
          return res.status(500).json({message:'Validation Error',errors:validationErrors})
          
         }
        next()
      }
    
}