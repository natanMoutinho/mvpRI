
import multer from 'multer';
// import FTPStorage from 'multer-ftp';
import path from 'path'
export class MulterConfig{
    
    static upload(){
        // console.log('==================================================')
        // console.log(path.resolve(__dirname,'..','..','tmp','uploads'));
        // console.log('==================================================')
        return multer({
            dest: path.resolve(__dirname,'..','..','tmp','uploads'),
            storage: multer.diskStorage({
                destination: (req,file,cb)=>{
                    cb(null,path.resolve(__dirname,'..','..','tmp','uploads'));
                },
                filename: (req,file,cb)=>{
                    const fileName = file.originalname
                    cb(null,fileName);
                }
            })
        })
    }

    // static newUpload(){
    //     return multer({
    //         storage: new FTPStorage({
                
    //         })
    //     })
    // }


    
}
