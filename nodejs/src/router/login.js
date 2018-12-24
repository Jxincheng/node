const express=require('express');
const Router=express.Router();
//数据模型引入
const User=require('../model/user.js');

Router.post('/getUserInfo',(req,res)=>{
    User.find()
    .then((data)=>{
        let {username,password} = req.body;
        for(let i=0;i<data.length;i++){
            var obj = data[i];
            if(obj.username == username){
                if(obj.password == password){
                    res.send({
                        err:0,
                        msg:"ok",
                        data:null
                    });
                }else{
                    res.send({
                        err:-1,
                        msg:"nook",
                        data:null
                    });
                }
            }else{
                res.send({
                    err:-1,
                    msg:"nook",
                    data:null
                });
            }
        }
    })
    .catch((err)=>{
        console.log(err);
        res.send({
            err:-1,
            msg:"登录失败",
            data:err
        });
    })
})
module.exports=Router;