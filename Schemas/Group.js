const mongoose=require("mongoose")
const Schema=mongoose.Schema

const Group=new Schema({
    name:{type:String,required:true},
    center_id:{type:String,required:true},
    teacher_id:{type:String,required:true},
    members:{type:Number,required:false},
    start_date:{type:String,required:true},
    end_date:{type:String,required:true},
    description:{type:String,required:true},
    history:{type:Object,required:false}
  }
  )
  module.exports=mongoose.model('Group',Group) 