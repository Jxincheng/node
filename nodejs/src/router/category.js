const express=require('express');
const Router=express.Router();

const Category=require('../model/category.js');//数据模型引入

// 增加商品分类
Router.post('/addCategory',(req,res)=>{
// 1.接受数据
    let {genre,notes,date}=req.body;
    Category.insertMany({genre,notes,date})
    .then((data)=>{
        res.send({err:0,msg:'插入成功',data:null});
    })
    .catch((err)=>{
        console.log(err);
        res.send({err:-1,msg:'插入失败',data:null});
    })
})
// 得到商品分类
Router.post('/getCategory',(req,res)=>{
    let  {pagesize,page}=req.body;
    let obj={};     
    Category.find()
    .then((data)=>{     
        obj.total=data.length; // 获取总条数
        return Category.find().limit(Number(pagesize)).skip((Number(page)-1)*Number(pagesize))
    })     
    .then((data)=>{     
        obj.categorylist=data;//处理的是第几页的几条数据
        res.send({err:0,msg:'查询成功',data:obj});
    })
    .catch((err)=>{
        console.log(err);
        res.send({err:-1,msg:'查询错误',data:null});
    }) 
})
// 修改商品分类
Router.post('/updateCategory',(req,res)=>{
  //获取商品分类的唯一索引 主键（_id） 获取修改的值 执行修改
  let {id,genre,notes,date}=req.body;
  Category.updateOne({_id:id},{genre,notes,date})
  .then((data)=>{
    res.send({err:0,msg:'修改成功',data:null});
  })
  .catch((err)=>{
    console.log(err);
    res.send({err:-1,msg:'修改no成功',data:null});
  })
})
// 删除商品分类
Router.post('/delCategory',(req,res)=>{
  //获取商品的唯一索引 主键（_id） 获取删除的值 执行删除
  let id=req.body.id;
  id=id.split(",");
  // Category.remove({_id:id})//正常的删除
  //Category.remove({_id:{$in:array}})//批量删除
  Category.deleteMany({_id:{$in:id}})
  .then((data)=>{
    res.send({err:0,msg:'删除成功',data:null});
  })
  .catch((err)=>{
    console.log(err);
    res.send({err:-1,msg:'删除no成功',data:null});
  })
})
// 编辑商品分类,根据id得到某一商品的信息
Router.post('/getOneCategory',(req,res)=>{
  let id=req.body.id;
  let obj = {};
  Category.find({_id:id})
  .then((data)=>{
    obj=data;
    res.send({err:0,msg:'查找成功',data:obj});
  })
  .catch((err)=>{
    console.log(err);
    res.send({err:-1,msg:'查找no成功',data:null});
  })
})

module.exports = Router;