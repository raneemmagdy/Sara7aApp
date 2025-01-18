import mongoose from "mongoose";
const messageSchema=new mongoose.Schema(
    {
        content:{
            type:String,
            required:[true,'Content is Required'],
            minLength:[2,'min length for content is 2'],
            trim:true

        },
       userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,'userId is Required']
       }
    },{
        timestamps:true,

    }
)

const messageModel=mongoose.models.Message||mongoose.model('Message',messageSchema)
export default messageModel