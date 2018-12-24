//创建数据模型
const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let customerSchema=new Schema({
    name:{type:String,required:true},
    nickname:{type:String,required:true},//昵称
    password:{type:String,required:true},
    tel:{type:Number,required:true},//手机号
    sex:{type:String,required:true},//性别
    birthday:{type:String,required:true},
    city:{type:String,required:true},
    jobs:{type:String,required:true},//职业
    email:{type:String,default:true},//邮箱
    date:{type:String,default:true},
    notes:{type:String,required:true},//备注
    grade:{type:Number,required:true}//评分
});
// 将schema 对象转化为数据模型  model
//var Blog = mongoose.model('Blog', blogSchema);
//var Blog = mongoose.model('数据模型的名字（集合名字）', 要转化schema 对象);
let customer=mongoose.model('customer',customerSchema);
//抛出数据模型
module.exports=customer;