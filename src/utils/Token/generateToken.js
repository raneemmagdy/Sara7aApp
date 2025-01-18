import jwt from 'jsonwebtoken'
export const generateToken=async({payload={},JWT_SECRET,option})=>{
    return jwt.sign(payload,JWT_SECRET,option)

}