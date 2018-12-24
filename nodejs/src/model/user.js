//创建数据模型
const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let userSchema=new Schema({
    username:{type:String,required:true},
    password:{type:String,required:true}
})
// 将schema 对象转化为数据模型  model
//var Blog = mongoose.model('Blog', blogSchema);
//var Blog = mongoose.model('数据模型的名字（集合名字）', 要转化schema 对象);
let user=mongoose.model('user',userSchema);

// user.insertMany({username:'jxc',password:123})
// .then((data)=>{
//     console.log(data)
// })
// .catch((err)=>{
//     console.log(err)
// })
//抛出数据模型
module.exports=user;