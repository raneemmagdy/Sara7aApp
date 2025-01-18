import bcrypt from 'bcrypt'

export const Hash=async({password,SALT_NUMBER=process.env.SALT_NUMBER})=>{
    return bcrypt.hashSync(password,Number(SALT_NUMBER))
}