const mongoose=require("mongoose")
const Schema=mongoose.Schema

const Center=new Schema({
  // UID is for determinig the student and the teachers from this center
UID:{type:String,required:true},
// Name is the official name of center
name:{type:String,required:true},
// contact part should include these data:
// {phone_num:int,
// email:str,
// addres:str
// wwebsite:string but  optional}
contact:{type:Object,required:true},
// about part shoudl include the data:
// teachers_data:[{teachers}]
// student_n
//  
about:{type:Object,required:false},
// courses shuld include the folowing data
// [{subject:name,teachers:names/name,payment:num,duration:str}]
courses:{type:Object,required:false},
// the main scope of trhe events is like this:
// [{title:str,img:embedded Img link,description:str,date:date set by Date()}]
events:{type:Object,required:false},
// the pay should work like this:
// {plan:str, status:fulfilled/waiting,date:str, History:Object[{month:str,status:str,date:str}]}
// 
pay:{type:Object,required:false},
// achievements:[{title:str,description:str,date:str,img:embedded link}]
achievements:{type:Object,required:false},
// crucial data about the center:
// {
// CEO:UID,
// admin:UID,
// sub_admin:UID
// }
data:{type:Object,required:false}
  
  }
  )
  module.exports=mongoose.model('Center',Center)