//创建数据模型
const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let categorySchema=new Schema({
    genre:{type:String,required:true},//类别
    notes:{type:String,required:true},//备注
    date:{type:String,default:true}
});
// 将schema 对象转化为数据模型  model
//var Blog = mongoose.model('Blog', blogSchema);
//var Blog = mongoose.model('数据模型的名字（集合名字）', 要转化schema 对象);
let category=mongoose.model('category',categorySchema);
//抛出数据模型
module.exports=category;