const Controller = {};
const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
    destination:path.join(__dirname,'../public/uploads'),
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})
const upload = multer({
    storage:storage,
    dest:path.join(__dirname,'../public/uploads')
}).single('myFile')

Controller.upload = upload

module.exports = Controller;