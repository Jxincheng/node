const express=require('express');
const Router=express.Router();
//数据模型引入
const Order=require('../model/order.js');

//查询订单
Router.post('/getOrder',(req,res)=>{
    let  {attr,sort,pagesize,page}=req.body;
    let obj={};
    sortAllGoods(attr,sort);   
    function sortAllGoods(attr,sort){   
        Order.find()
        .then((data)=>{     
            obj.total=data.length; // 获取总条数
            if(sort==0){
                return Order.find().limit(Number(pagesize)).skip((Number(page)-1)*Number(pagesize))
            }else{
                if(attr=="newprice"){    
                    return Order.find().sort({newprice:sort}).limit(Number(pagesize)).skip((Number(page)-1)*Number(pagesize))
                }
                if(attr=="oldprice"){    
                    return Order.find().sort({oldprice:sort}).limit(Number(pagesize)).skip((Number(page)-1)*Number(pagesize))
                }
                if(attr=="stock"){    
                    return Order.find().sort({stock:sort}).limit(Number(pagesize)).skip((Number(page)-1)*Number(pagesize))
                }
            }
        })     
        .then((data)=>{     
            obj.orderlist=data;  //处理的是第几页的几条数据
            res.send({err:0,msg:'查询成功',data:obj});
        })
        .catch((err)=>{
            console.log(err);
            res.send({err:-1,msg:'查询错误',data:null});
        })
    }    
})
//删除订单
Router.post('/delOrder',(req,res)=>{
  //获取订单的唯一索引 主键（_id） 获取删除的值  执行删除
  let id=req.body.id;
  id=id.split(",");
  // Order.remove({_id:id})//正常的删除
  //let array=['5bdfe8b6b907c6a31b5aac37','5bdfe10748ecfa1380d368f0']
  //Order.remove({_id:{$in:array}})//批量删除
  Order.deleteMany({_id:{$in:id}})
  .then((data)=>{
    res.send({err:0,msg:'删除成功',data:null});
  })
  .catch((err)=>{
    console.log(err);
    res.send({err:-1,msg:'删除no成功',data:null});
  })
})

module.exports = Router;