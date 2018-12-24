//创建数据模型
const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let goodsSchema=new Schema({
    name:{type:String,required:true},
    brand:{type:String,required:true},//品牌
    genre:{type:String,required:true},//类别
    country:{type:String,required:true},//产地
    title:{type:String,required:true},
    oldprice:{type:String,required:true},
    newprice:{type:String,required:true},
    stock:{type:Number,required:true},//库存
    grounding:{type:String,default:true},//是否上线
    date:{type:String,default:true},
    imgpath:{type:String,required:true},
    // grounding:{type:Boolean,default:false}
});
// 将schema 对象转化为数据模型  model
//var Blog = mongoose.model('Blog', blogSchema);
//var Blog = mongoose.model('数据模型的名字（集合名字）', 要转化schema 对象);
let goods=mongoose.model('goods',goodsSchema);
//抛出数据模型
module.exports=goods;