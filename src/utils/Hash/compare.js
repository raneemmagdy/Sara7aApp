import bcrypt from 'bcrypt'

export const Compare=async({password,userPassword})=>{
    return bcrypt.compareSync(password,userPassword)
}