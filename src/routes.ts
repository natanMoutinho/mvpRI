import { Router } from "express";
import path from "path"
import { RegisterRepository } from "./repositories/RegisterRepository";
const routes = Router();
import multer from 'multer'
import { FileConfig } from "./services/fileConfig";

import * as fs from "fs";

const upload = multer({ storage: multer.memoryStorage() });

routes.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/../public/index.html'));
});
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
      await repository.createRegister({title, authors, publishedAt, document: req.file.originalname });
      await fileUploader.closeConnection();
      res.status(200).redirect('/');
      // res.redirect('/');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to upload file to FTP server.");
  } finally {
    fileUploader.closeConnection();
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
    await fileDownloader.downloadFileFromFTP(remoteFileName);
    // console.log(localFilePath)
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

routes.get('/registers', async (req, res) => {
  // const {authors,publishedAt,document} = req.body;
  const repository = new RegisterRepository();
  try {
    const registers = await repository.listRegister();
    // res.status(200).send(register);
    await repository
    console.log(registers);
    
    res.status(200).json(registers);
  } catch (e) {
    res.status(400).send(e);
  }
})

routes.get('/clear', async (req, res) => {
  const repository = new RegisterRepository();
  const fileDelete = new FileConfig();
  try {
    await fileDelete.connectToFTP();
    await repository.deleteAllRegister();
    await fileDelete.deleteAll();
    res.status(200).json('tudo foi eliminado');
  } catch (e) {
    res.status(400).send(e);
  }finally{
   await fileDelete.closeConnection();
  }
})

//=============================================
routes.get('/tccForm', (req, res) => {
  res.sendFile(path.join(__dirname, '/../public/form.html'));
});

routes.get('/indexStyle', (req, res) => {
  res.sendFile(path.join(__dirname, '/../public/form.html'));
});

routes.get('/img/mural', (req, res) => {
  res.sendFile(path.join(__dirname, '/../public/img/mural1.jpg'));
});

export default routes;
