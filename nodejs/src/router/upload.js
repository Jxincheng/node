const path = require('path');
const express = require('express');
let Router = express.Router();

const multer = require('multer');

// 定义上传临时路径
// 如果无文件夹，则会自动创建

// 定义磁盘存储
var storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        // console.log('file:',file)
        let ext = path.extname(file.originalname);//.jpg,.png,.xx
      cb(null, file.fieldname + '-' + Date.now()+ext);
    }
})

let upload = multer({ dest: 'temp/',storage });

// api路径：/upload/goods
// upload的方法：
//  * single(name)
//  * array(name,qty)
Router.post('/img',upload.single('goodspic'), (req,res)=>{ //upload.single('前端上传表单的名字')
    // 通过req.file获取到上传文件的内容
    // console.log(req.file);
    // console.log(req.body);
    // 存储到数据库

    res.send({
        err:0,
        msg:'文件上传成功',
        data:req.file
    })
});

module.exports = Router;