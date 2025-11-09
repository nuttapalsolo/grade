import mongoose from 'mongoose';
const StudentSchema = new mongoose.Schema({
  name:{type:String,required:true},
  age:{type:Number,required:true},
  grade:{type:String,required:true},
  classroom:{type:String},
  email:{type:String},
  score:{type:Number,default:0}
},{timestamps:true});
export const Student = mongoose.models.Student || mongoose.model('Student',StudentSchema);
