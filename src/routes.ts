import { Router } from "express";
import path from "path"
import { RegisterRepository } from "./repositories/RegisterRepository";
const routes = Router();
import multer from 'multer'
import { FileConfig } from "./services/fileConfig";
import { Readable } from 'stream';

import { Client, Client as FTPClient } from "basic-ftp";
import * as fs from "fs";

const upload = multer({ storage: multer.memoryStorage() });

routes.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/../public/index.html'));
})



routes.post("/upload", upload.single("file"), async (req, res) => {
  const fileUploader = new FileConfig();
  const { title, authors, publishedAt } = req.body;
  const repository = new RegisterRepository();
  console.log(req.body)
  console.log(req.file)
  try {
    await fileUploader.connectToFTP();
    if (req.file) {
      await fileUploader.uploadFileToFTP(req.file);
      const newRegister = await repository.createRegister({title, authors, publishedAt, document: req.file.originalname });
      await fileUploader.closeConnection();
      res.status(200).json(newRegister);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to upload file to FTP server.");
  } finally {
    fileUploader.closeConnection();
  }
});

routes.get("/download/:filename", async (req, res) => {
  const fileDownloader = new FileConfig();
  try {

  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to donwload file to FTP server.");
  } finally {
    fileDownloader.closeConnection();
  }
});

// Defina a rota para download do arquivo
routes.get("/down/:filename", async (req, res) => {
  // Defina o nome do arquivo que deseja baixar
  const remoteFileName = req.params.filename;;
  // Defina o caminho local para onde o arquivo será baixado
  // const localFilePath = path.join(__dirname, './../tmp/downloads/', remoteFileName);
  const localFilePath = path.join(__dirname,'/../tmp/downloads',remoteFileName);
  const fileDownloader = new FileConfig();
  try {
    await fileDownloader.connectToFTP();
    console.log('============================================')
    await fileDownloader.downloadFileFromFTP(remoteFileName);
    console.log('============================================')
    console.log(localFilePath)
    res.sendFile(localFilePath,(err) => {
      if (err) {
        console.error(`Erro ao enviar o arquivo ${remoteFileName} como resposta HTTP:`, err);
        res.status(500).send("Ocorreu um erro ao baixar o arquivo.");
        return;
      }
      // Exclui o arquivo
      fs.unlink(localFilePath, (err) => {
        if (err) {
          console.error(`Erro ao excluir arquivo em -> /usr/src/mvp_repositorio/tmp/downloads:`, err);
        } else {
          console.log(`Arquivo ${localFilePath} excluído com sucesso.`);
        }
      });
    })
  } catch (err) {
    console.error(err);
    res.status(500).send("Ocorreu um erro ao baixar o arquivo.");
  } finally {
    // Desconecte-se do servidor FTP
    fileDownloader.closeConnection();
  }
});

// Defina a rota para download do arquivo
routes.get("/teste/:filename", async (req, res) => {
  const ftpClient = new Client(30000);
  const [host,user,password] = [ 
    process.env.FTP_HOST,
    process.env.FTP_USER_NAME,
    process.env.FTP_USER_PASS
]
await ftpClient.access({
  host,
  user,
  password,
});
  // Defina o nome do arquivo que deseja baixar
  const remoteFileName = req.params.filename;;
  // Defina o caminho local para onde o arquivo será baixado
  // const localFilePath = path.join(__dirname, './../tmp/downloads/', remoteFileName);
  const localFilePath = path.join(__dirname,'../../tmp/downloads',remoteFileName);

  try {
     // Baixe o arquivo
     console.log(await ftpClient.downloadTo(fs.createWriteStream(localFilePath), remoteFileName));
    res.sendFile(localFilePath,(err) => {
      if (err) {
        console.error(`Erro ao enviar o arquivo ${remoteFileName} como resposta HTTP:`, err);
        res.status(500).send("Ocorreu um erro ao baixar o arquivo.");
        return;
      }
      // Exclui o arquivo
      fs.unlink(localFilePath, (err) => {
        if (err) {
          console.error(`Erro ao excluir arquivo em -> ${localFilePath}:`, err);
        } else {
          console.log(`Arquivo ${localFilePath} excluído com sucesso.`);
        }
      });
    })
  } catch (err) {
    console.error(err);
    res.status(500).send("Ocorreu um erro ao baixar o arquivo.");
  } finally {
    // Desconecte-se do servidor FTP
  }
});

routes.get('/registers', async (req, res) => {
  // const {authors,publishedAt,document} = req.body;
  const repository = new RegisterRepository();
  try {
    const registers = await repository.listRegister();
    // res.status(200).send(register);
    console.log(registers);
    res.status(200).json(registers);
  } catch (e) {
    res.status(400).send(e);
  }

})

routes.get('/removeAll', async (req, res) => {

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
