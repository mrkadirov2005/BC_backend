const Super_admin=require("../Schemas/super_admin")
export const verify_super_admin=async(username,password)=>{
    
const foundUser=await Super_admin.findOne({username,password}).exec();

if(!foundUser){
    return 400
}
else{
    return 200
}
}