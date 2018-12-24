const express=require('express');
const Router=express.Router();
//数据模型引入
const Customer=require('../model/customer.js');

//增加用户
Router.post('/addCustomer',(req,res)=>{
// 1.接受数据
    let {name,nickname,password,tel,sex,birthday,city,jobs,email,date,notes}=req.body;
    let grade=0;
    Customer.insertMany({name,nickname,password,tel,sex,birthday,city,jobs,email,date,notes,grade})
    .then((data)=>{
        res.send({err:0,msg:'插入成功',data:null});
    })
    .catch((err)=>{
        console.log(err);
        res.send({err:-1,msg:'插入失败',data:null});
    })
})
//查询用户
Router.post('/getCustomer',(req,res)=>{
    let  {attr,sort,pagesize,page}=req.body;
    let obj={};
    sortAllGoods(attr,sort);   
    function sortAllGoods(attr,sort){   
        Customer.find()
        .then((data)=>{     
            obj.total=data.length; // 获取总条数
            if(sort==0){
                return Customer.find().limit(Number(pagesize)).skip((Number(page)-1)*Number(pagesize))
            }else{
                if(attr=="newprice"){    
                    return Customer.find().sort({newprice:sort}).limit(Number(pagesize)).skip((Number(page)-1)*Number(pagesize))
                }
                if(attr=="oldprice"){    
                    return Customer.find().sort({oldprice:sort}).limit(Number(pagesize)).skip((Number(page)-1)*Number(pagesize))
                }
                if(attr=="stock"){    
                    return Customer.find().sort({stock:sort}).limit(Number(pagesize)).skip((Number(page)-1)*Number(pagesize))
                }
            }
        })     
        .then((data)=>{     
            obj.customerlist=data;  //处理的是第几页的几条数据
            res.send({err:0,msg:'查询成功',data:obj});
        })
        .catch((err)=>{
            console.log(err);
            res.send({err:-1,msg:'查询错误',data:null});
        })
    }    
})
//修改用户
Router.post('/updateCustomer',(req,res)=>{
  //获取用户的唯一索引 主键（_id） 获取修改的值  执行修改
  let {id,name,nickname,password,tel,sex,birthday,city,jobs,email,date,notes,grade}=req.body;
  Customer.updateOne({_id:id},{name,nickname,password,tel,sex,birthday,city,jobs,email,date,notes,grade})
  .then((data)=>{
    res.send({err:0,msg:'修改成功',data:null});
  })
  .catch((err)=>{
    console.log(err);
    res.send({err:-1,msg:'修改no成功',data:null});
  })
})
//删除用户
Router.post('/delCustomer',(req,res)=>{
  //获取用户的唯一索引 主键（_id） 获取删除的值  执行删除
  let id=req.body.id;
  id=id.split(",");
  // Customer.remove({_id:id})//正常的删除
  //let array=['5bdfe8b6b907c6a31b5aac37','5bdfe10748ecfa1380d368f0']
  //Customer.remove({_id:{$in:array}})//批量删除
  Customer.deleteMany({_id:{$in:id}})
  .then((data)=>{
    res.send({err:0,msg:'删除成功',data:null});
  })
  .catch((err)=>{
    console.log(err);
    res.send({err:-1,msg:'删除no成功',data:null});
  })
})
//编辑用户,根据id得到某一用户的信息
Router.post('/getOneCustomer',(req,res)=>{
  let id=req.body.id;
  let obj = {};
  Customer.find({_id:id})
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