const express = require('express');
let Router = express.Router();

const bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({ extended: false })

const db = require('../model/mongodb.js');

Router.post('/getGoods',urlencodedParser,async (req,res)=>{
    //获取所有商品
    let data
    try{
        data = await db.find('goodslist',{});
    }catch(err){
        data = err;
    }
    res.send(data);
});
Router.post('/addGoods',urlencodedParser,async(req,res)=>{//console.log(req.body)
    let data
    try{
        data = await db.insert('goodslist',{...req.body});
    }catch(err){
        data = err;
    }
    res.send(data);
});
Router.post('/delGoods',urlencodedParser,async(req,res)=>{console.log(req.body)
    let data
    try{
        data = await db.delete('goodslist',{...req.body});
    }catch(err){
        data = err;
    }
    res.send(data);
})

module.exports = Router;