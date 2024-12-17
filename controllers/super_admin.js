const Sub_admin=require("../Schemas/super_admin")
const bcrypt=require("bcrypt")

const create_sub=async (req,res)=>{
const {...data} =req.body 
const hashed_password=await bcrypt.hash(data.password,10)
const Super_admin=new Sub_admin({
    name:data.name,
    password:hashed_password,
    signed_in:false,
    username:data.username
})

try {
    Super_admin.save()
	return res.sendStatus(200)
} catch (error) {
    throw error
    
}

}
module.exports=create_sub