import { Router } from "express";
import path from "path"
import { RegisterRepository } from "./repositories/RegisterRepository";
const routes = Router();
import * as ftp from "basic-ftp"
import multer from 'multer'
import { MulterConfig } from "./services/multerConfig";
import { FtpService } from "./services/ftpServices";
import { FileConfig } from "./services/fileConfig";
routes.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, '/../public/index.html'));
})


const upload = multer({ storage: multer.memoryStorage() });
const fileUploader = new FileConfig();

routes.post("/upload", upload.single("file"), async (req,res) => {
    try {
        const {authors,publishedAt} = req.body;
        console.log(req.file)
        console.log(req.body) 
      await fileUploader.connectToFTP();
        if(req.file){
            await fileUploader.uploadFileToFTP(req.file);
        }
      await fileUploader.closeConnection();
      res.status(200).send("File uploaded successfully!");
    } catch (err) {
      console.error(err);
      res.status(500).send("Failed to upload file to FTP server.");
    }
});



routes.post('/register/new', async(req,res)=>{
    const {authors,publishedAt,document} = req.body;
    const repository = new RegisterRepository();
    try{
        const newRegister = await repository.createRegister({authors,publishedAt,document});

        // res.status(200).send(register);
        console.log(typeof newRegister);
        res.status(200).json(newRegister);
    }catch(e){
        res.status(400).send(e);
    }

})

routes.get('/registers', async(req,res)=>{
    // const {authors,publishedAt,document} = req.body;
    const repository = new RegisterRepository();
    try{
        const registers = await repository.listRegister();
        // res.status(200).send(register);
        console.log(registers);
        res.status(200).json(registers);
    }catch(e){
        res.status(400).send(e);
    }

})



routes.post('/newRegister',MulterConfig.upload().single('file'),async (req,res)=>{
    const {authors,publishedAt} = req.body;
    console.log(req.file)
    console.log(req.body)

    const remoteFile = `remote-${req.file?.filename}`;
    const localFile = path.resolve(__dirname,'..',`tmp/uploads/`,`${req.file?.filename}`);
    // console.log(req.body)
    const repository = new RegisterRepository();
    const ftp = new FtpService();
    try {
        await ftp.upload(localFile,remoteFile);
        const newRegister = await repository.createRegister({authors,publishedAt,document:remoteFile});
        res.status(200).json(newRegister);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
})

routes.get('/registers/:filename',async ()=>{
    
})

routes.post('/doc', async(req,res)=>{
    const client = new ftp.Client();
    client.ftp.verbose = true
    try {
        await client.access({
            host: process.env.FTP_HOST,
            user: process.env.FTP_USER_NAME,
            password: process.env.FTP_USER_PASS,
            port: Number(process.env.FTP_PORT),
            // port: process.env.FTP_PORT,
            // secureOptions : secureOptions,
        })
        console.log(await client.list())
        console.log('teste');
        const localfile = path.resolve(__dirname,'README.md');
        // await client.ensureDir("my/remote/directory")
        await client.uploadFrom(localfile, "README_FTP.md");
        // await client.upload(fs.createReadStream("test/to_upload.txt"), "uploaded.txt");
        
        // console.log(upResult)
        await client.downloadTo(path.resolve(__dirname,"README_COPY.md"), "README_FTP.md");

        res.status(200).json("deu bom");
    }
    catch(err) {
        console.log(err)
    }
    client.close()
})



// routes.post('/feedbacks', async (req, res)=>{
//     // console.log(req.body);
//     const {type,comment,screenshot} = req.body;

//     const prismaFeedbacksRepository = new PrismaFeedbacksRepositories();
//     const nodemailerMailAdapter = new NodemailerMailAdapter();

//     const submitFeedbackUseCase = new SubmitFeedbackUseCase(
//         prismaFeedbacksRepository,
//         nodemailerMailAdapter
//     );

//     await submitFeedbackUseCase.execute({
//         type,
//         comment,
//         screenshot
//     })

    

//     //return res.status(201).json({data: feedback});
//     return res.status(201).send();
// })



//=============================================
routes.get('/tccForm',(req,res)=>{
    res.sendFile(path.join(__dirname, '/../public/form.html'));
})

routes.get('/img/mural',(req,res)=>{
    res.sendFile(path.join(__dirname, '/../public/img/mural1.jpg'));
})

// express.static(__dirname + '/../public/css')

// routes.get('/css/',(req,res)=>{
//     res.sendFile(path.join(__dirname, '/../public/css'));
// })



export default routes;
