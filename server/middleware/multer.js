import multer from 'multer'


const storage = multer.diskStorage({
    destination: (req, file, cb) => {  //callback(cb)
        cb(null, 'upload/');
    },
    filename: (req, file, cb) => {
     const safeName = file.originalname.replace(/\s+/g, '_');
        cb(null, file.fieldname+"_"+Date.now() + '_' + safeName);
    }
})


const upload = multer({storage});


export default upload;