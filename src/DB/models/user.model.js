import mongoose from "mongoose";
import { rolesOptions } from "../../middleware/authentication.js";
export const genderOptions={
    female:'female',
    male:'male'
}
const userSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,'name is required'],
            lowercase:true,
            minLength:[3,'min length for name is 3']

        },
        email:{
            type:String,
            required:[true,'email is required'],
            unique:[true,'email must be unique'],
            lowercase:true,
            match:[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,'invalid Email']
            
        },
        password:{
            type:String,
            required:[true,'password is required'],
            minLength:[8,'min length for password is 8']
           
        },
        phone:{
            type:String,
            required:[true,'phone is required'],
            
        },
        gender:{
            type:String,
            required:[true,'gender is required'],
            enum:Object.values(genderOptions),
            default:genderOptions.male
            
        },
        confirmed:{
           type:Boolean,
           default:false
        },
        role:{
            type:String,
            enum:Object.values(rolesOptions),
            default:rolesOptions.user
        },
        passwordChangedAt:Date,
        isDeleted:{
            type:Boolean,
            default:false
        }
    },{
        timestamps:true,
    }
)

const userModel=mongoose.models.User||mongoose.model('User',userSchema)
export default userModel