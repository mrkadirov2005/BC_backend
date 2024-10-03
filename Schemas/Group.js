const mongoose=require("mongoose")
const Schema=mongoose.Schema

const Group=new Schema({
    uid:{type:String,required:true},
    group_data:{type:Object,required:true},
    //group_data_object_sample_object:{
    // group_id,name,surname,phone_number,telegram username}
    students_data:{type:Object,required:true}
    //student_data_object_sample_object:{
    // 1:{name:someone,surname:someona,phone_number:someone:optional}}
    // 20 like this
  }
  )
  module.exports=mongoose.model('Group',Group)