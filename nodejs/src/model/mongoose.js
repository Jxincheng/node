//数据库的连接
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/kaolas',{ useNewUrlParser: true });
let db = mongoose.connection;
//实例化连接对象
db.on("error",function (error){
    console.log("Database connection failure：" + error);
});
db.on("open",function(){
    console.log("数据库连接成功");
})
db.on("disconnected",function(){
    console.log("数据库连接断开");
})