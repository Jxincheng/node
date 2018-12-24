//创建数据模型
const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let orderSchema=new Schema({
    goodsname:{type:String,required:true},
    price:{type:String,required:true},
    num:{type:Number,required:true},
    freight:{type:String,required:true},
    goodstotal:{type:String,required:true},//商品总额
    ordertotal:{type:String,required:true},//订单总额
    date:{type:String,default:true}
});
// 将schema 对象转化为数据模型  model
//var Blog = mongoose.model('Blog', blogSchema);
//var Blog = mongoose.model('数据模型的名字（集合名字）', 要转化schema 对象);
let order=mongoose.model('order',orderSchema);
// order.insertMany({goodsname:'950克',price:'520',num:3,freight:'12',goodstotal:'1560',ordertotal:'1572',date:'2018-12-15'})
// .then((data)=>{
//     console.log(data)
// })
// .catch((err)=>{
//     console.log(err)
// })
//抛出数据模型
module.exports=order;