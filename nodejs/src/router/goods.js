const express=require('express');
const Router=express.Router();
//数据模型引入
const Goods=require('../model/goods.js');

//增加商品
//添加商品信息
/**
 * @api {post} /goods/addGoods/ addGoods
 * @apiName addGoods
 * @apiGroup goods
 *
 * @apiParam {String} id  商品的主键id
 * @apiParam {String} name  商品名称
 * @apiParam {String} brand 商品品牌
 * @apiParam {String} country 商品产地
 * @apiParam {String} title 商品描述
 * @apiParam {Number} oldprice 商品原价格
 * @apiParam {Number} newprice 商品新价格
 * @apiParam {Number} stock 商品库存
 * @apiParam {String} grounding 商品上线情况
 *
 * @apiSuccess {Number} err 错误码 0：ok -1:失败
 * @apiSuccess {String} msg  结果信息
 * @apiSuccess {String} data  返回数据
 */
Router.post('/addGoods',(req,res)=>{
// 1.接受数据
    let {name,brand,genre,country,title,oldprice,newprice,stock,grounding,date,imgpath}=req.body;
    Goods.insertMany({name,brand,genre,country,title,oldprice,newprice,stock,grounding,date,imgpath})
    .then((data)=>{
        res.send({err:0,msg:'插入成功',data:null});
    })
    .catch((err)=>{
        console.log(err);
        res.send({err:-1,msg:'插入失败',data:null});
    })
})

//查询商品
/**
 * @api {post} /goods/getGoods/ getGoods
 * @apiName getGoods
 * @apiGroup goods
 *
 * @apiParam {Number} pagesize  每页数量
 * @apiParam {Number} page 当前页数
 *
 * @apiSuccess {Number} err 错误码 0：ok -1:失败
 * @apiSuccess {String} msg  结果信息
 * @apiSuccess {String} data  返回数据
 */
// Router.post('/getGoods',(req,res)=>{
//     let  {pagesize,page}=req.body;
//     let obj={};     
//     Goods.find()
//     .then((data)=>{     
//         obj.total=data.length; // 获取总条数
//         return Goods.find().limit(Number(pagesize)).skip((Number(page)-1)*Number(pagesize))
//     })     
//     .then((data)=>{     
//         obj.goodslist=data;//处理的是第几页的几条数据
//         res.send({err:0,msg:'查询成功',data:obj});
//     })
//     .catch((err)=>{
//         console.log(err);
//         res.send({err:-1,msg:'查询错误',data:null});
//     })    
// })
Router.post('/getGoods',(req,res)=>{
//     //返回总条数
//   // Goods.find()查询所有
//   // Goods.find({tyle:‘音乐’})//分类查询
//   // Goods.find().limit(5).skip(5)//分页查询
//   // 1页2条
//   // 2   0
//   // 2   2
//   // 2   4
//   // let pagesize=2//每页的条数
//   // let page=1//页数o
//   // attr 要排序的属性   sort 降序或升序
    let  {attr,sort,pagesize,page}=req.body;
    let obj={};
    sortAllGoods(attr,sort);   
    function sortAllGoods(attr,sort){   
        Goods.find()
        .then((data)=>{     
            obj.total=data.length; // 获取总条数
            if(sort==0){
                return Goods.find().limit(Number(pagesize)).skip((Number(page)-1)*Number(pagesize))
            }else{
                if(attr=="newprice"){    
                    return Goods.find().sort({newprice:sort}).limit(Number(pagesize)).skip((Number(page)-1)*Number(pagesize))
                }
                if(attr=="oldprice"){    
                    return Goods.find().sort({oldprice:sort}).limit(Number(pagesize)).skip((Number(page)-1)*Number(pagesize))
                }
                if(attr=="stock"){    
                    return Goods.find().sort({stock:sort}).limit(Number(pagesize)).skip((Number(page)-1)*Number(pagesize))
                }
            }
        })     
        .then((data)=>{     
            obj.goodslist=data;  //处理的是第几页的几条数据
            res.send({err:0,msg:'查询成功',data:obj});
        })
        .catch((err)=>{
            console.log(err);
            res.send({err:-1,msg:'查询错误',data:null});
        })
    }
})

//修改商品
/**
 * @api {post} /goods/updateGoods/ updateGoods
 * @apiName updateGoods
 * @apiGroup goods
 *
 * @apiParam {String} id  商品的主键id
 * @apiParam {String} name  商品名称
 * @apiParam {String} genre 商品分类
 * @apiParam {String} country 商品产地
 * @apiParam {String} brand 商品品牌
 * @apiParam {String} newprice 商品最新价格
 * @apiParam {String} oldprice 商品最初的价格
 * @apiParam {String} title 商品介绍
 * @apiParam {String} imgpath 图片地址
 * @apiParam {Number} stock 商品库存
 *
 * @apiSuccess {Number} err 错误码 0：ok -1 失败
 * @apiSuccess {String} msg  结果信息
 * @apiSuccess {String} data  返回数据
 */
Router.post('/updateGoods',(req,res)=>{
  //获取商品的唯一索引 主键（_id）
  // 获取修改的值
  // 执行修改
  // let id=req.body.id;
  let {id,name,brand,genre,country,title,oldprice,newprice,stock,grounding,date,imgpath}=req.body;
  Goods.updateOne({_id:id},{name,brand,genre,country,title,oldprice,newprice,stock,grounding,date,imgpath})
  .then((data)=>{
    res.send({err:0,msg:'修改成功',data:null});
  })
  .catch((err)=>{
    console.log(err);
    res.send({err:-1,msg:'修改no成功',data:null});
  })
})

//删除商品
/**
 * @api {post} /goods/delGood/ delGood
 * @apiName delGood
 * @apiGroup goods
 *
 * @apiParam {String} id  要删除的商品的主键id
 *
 * @apiSuccess {Number} err 错误码 0：ok -1 失败
 * @apiSuccess {String} msg  结果信息
 * @apiSuccess {String} data  返回数据
 */
Router.post('/delGoods',(req,res)=>{
  //获取商品的唯一索引 主键（_id）
  // 获取删除的值
  // 执行删除
  let id=req.body.id;
  id=id.split(",");
  // Goods.remove({_id:id})//正常的删除
  //let array=['5bdfe8b6b907c6a31b5aac37','5bdfe10748ecfa1380d368f0']
  //Goods.remove({_id:{$in:array}})//批量删除
  Goods.deleteMany({_id:{$in:id}})
  .then((data)=>{
    res.send({err:0,msg:'删除成功',data:null});
  })
  .catch((err)=>{
    console.log(err);
    res.send({err:-1,msg:'删除no成功',data:null});
  })
})
//编辑商品,根据id得到某一商品的信息
Router.post('/getOneGoods',(req,res)=>{
  let id=req.body.id;
  let obj = {};
  Goods.find({_id:id})
  .then((data)=>{
    obj=data;
    res.send({err:0,msg:'查找成功',data:obj});
  })
  .catch((err)=>{
    console.log(err);
    res.send({err:-1,msg:'查找no成功',data:null});
  })
})
//根据输入的产品名称搜索相关的商品信息
Router.post('/findGoods',(req,res)=>{
  let {attr,sort,reload,pagesize,page} = req.body;
  let obj={};
  findSortGoods(reload,attr,sort);
  function findSortGoods(reload,attr,sort){
      Goods.find({name:{$regex:reload}})
      .then((data)=>{     
        obj.total=data.length;// 获取总条数
        if(sort==0){
            return Goods.find({name:{$regex:reload}}).limit(Number(pagesize)).skip((Number(page)-1)*Number(pagesize))
        }else{
            if(attr=="newprice"){    
                return Goods.find({name:{$regex:reload}}).sort({newprice:sort}).limit(Number(pagesize)).skip((Number(page)-1)*Number(pagesize))
            }
            if(attr=="oldprice"){    
                return Goods.find({name:{$regex:reload}}).sort({oldprice:sort}).limit(Number(pagesize)).skip((Number(page)-1)*Number(pagesize))
            }
            if(attr=="stock"){    
                return Goods.find({name:{$regex:reload}}).sort({stock:sort}).limit(Number(pagesize)).skip((Number(page)-1)*Number(pagesize))
            }
        }
      })
      .then((data)=>{
        obj.goodslist=data;
        res.send({err:0,msg:'搜索成功',data:obj});
      })
      .catch((err)=>{
        console.log(err);
        res.send({err:-1,msg:'搜索no成功',data:null});
      })
  }
})
module.exports = Router;