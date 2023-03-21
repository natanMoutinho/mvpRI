import { Router } from "express";
import path from "path"
import { RegisterRepository } from "./repositories/RegisterRepository";
const routes = Router();
import multer from 'multer'
import { FileConfig } from "./services/fileConfig";


import { Client as FTPClient } from "basic-ftp";
import * as fs from "fs";

const upload = multer({ storage: multer.memoryStorage() });

routes.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/../public/index.html'));
})



routes.post("/upload", upload.single("file"), async (req, res) => {
    const fileUploader = new FileConfig();
    const { authors, publishedAt } = req.body;
    const repository = new RegisterRepository();
    console.log(req.body)
    console.log(req.file)
    try {
        await fileUploader.connectToFTP();
        if (req.file) {
            await fileUploader.uploadFileToFTP(req.file);
            const newRegister = await repository.createRegister({ authors, publishedAt, document: req.file.originalname });
            await fileUploader.closeConnection();
            res.status(200).json(newRegister);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to upload file to FTP server.");
    }
});

routes.get("/download/:filename", async (req, res) => {
    const fileUploader = new FileConfig();
    console.log(req.body)
    try {
      await fileUploader.connectToFTP();
      if(fileUploader){
        const filename = req.params.filename;
        //   console.log(filename);
        const readStream = await fileUploader.downloadFileFromFTP(filename);
        //   console.log(readStream)
        res.setHeader("Content-Type", "application/octet-stream");
        res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
        readStream.pipe(res);
        console.log('teste foi até o final')
        await fileUploader.closeConnection();
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Failed to download file from FTP server.");
    }
  });

  // Defina a rota para download do arquivo
routes.get("/down/:filename", async (req, res) => {
    const config = {
        host: process.env.FTP_HOST,
        user: process.env.FTP_USER_NAME,
        password: process.env.FTP_USER_PASS
      };
      
    // Defina o nome do arquivo que deseja baixar
    const remoteFilePath = req.params.filename;;

    // Defina o caminho local para onde o arquivo será baixado
    const localFilePath = path.join(__dirname, '/../tmp/downloads');
    // res.sendFile(path.join(__dirname, '/../public/index.html'));

    // Crie uma instância do cliente FTP
    const client = new FTPClient();
    try {
      // Conecte-se ao servidor FTP
      await client.access(config);
  
      // Baixe o arquivo
      await client.downloadTo(fs.createWriteStream(remoteFilePath), remoteFilePath);
  
      // Envie o arquivo como resposta HTTP
      res.download(localFilePath,remoteFilePath);
    } catch (err) {
      console.error(err);
      res.status(500).send("Ocorreu um erro ao baixar o arquivo.");
    } finally {
      // Desconecte-se do servidor FTP
      await client.close();
    }
  });


routes.post('/register/new', async (req, res) => {
    const { authors, publishedAt, document } = req.body;
    const repository = new RegisterRepository();
    try {
        const newRegister = await repository.createRegister({ authors, publishedAt, document });
        // res.status(200).send(register);
        console.log(typeof newRegister);
        res.status(200).json(newRegister);
    } catch (e) {
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

//=============================================
routes.get('/tccForm', (req, res) => {
    res.sendFile(path.join(__dirname, '/../public/form.html'));
})

routes.get('/img/mural', (req, res) => {
    res.sendFile(path.join(__dirname, '/../public/img/mural1.jpg'));
})

// express.static(__dirname + '/../public/css')

// routes.get('/css/',(req,res)=>{
//     res.sendFile(path.join(__dirname, '/../public/css'));
// })



export default routes;
