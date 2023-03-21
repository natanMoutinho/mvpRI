"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const RegisterRepository_1 = require("./repositories/RegisterRepository");
const routes = (0, express_1.Router)();
const multer_1 = __importDefault(require("multer"));
const fileConfig_1 = require("./services/fileConfig");
const basic_ftp_1 = require("basic-ftp");
const fs = __importStar(require("fs"));
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
routes.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '/../public/index.html'));
});
routes.post("/upload", upload.single("file"), async (req, res) => {
    const fileUploader = new fileConfig_1.FileConfig();
    const { authors, publishedAt } = req.body;
    const repository = new RegisterRepository_1.RegisterRepository();
    console.log(req.body);
    console.log(req.file);
    try {
        await fileUploader.connectToFTP();
        if (req.file) {
            await fileUploader.uploadFileToFTP(req.file);
            const newRegister = await repository.createRegister({ authors, publishedAt, document: req.file.originalname });
            await fileUploader.closeConnection();
            res.status(200).json(newRegister);
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Failed to upload file to FTP server.");
    }
});
routes.get("/download/:filename", async (req, res) => {
    const fileUploader = new fileConfig_1.FileConfig();
    console.log(req.body);
    try {
        await fileUploader.connectToFTP();
        if (fileUploader) {
            const filename = req.params.filename;
            //   console.log(filename);
            const readStream = await fileUploader.downloadFileFromFTP(filename);
            //   console.log(readStream)
            res.setHeader("Content-Type", "application/octet-stream");
            res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
            readStream.pipe(res);
            console.log('teste foi até o final');
            await fileUploader.closeConnection();
        }
    }
    catch (err) {
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
    const remoteFilePath = req.params.filename;
    ;
    // Defina o caminho local para onde o arquivo será baixado
    const localFilePath = path_1.default.join(__dirname, '/../tmp/downloads');
    // res.sendFile(path.join(__dirname, '/../public/index.html'));
    // Crie uma instância do cliente FTP
    const client = new basic_ftp_1.Client();
    try {
        // Conecte-se ao servidor FTP
        await client.access(config);
        // Baixe o arquivo
        await client.downloadTo(fs.createWriteStream(remoteFilePath), remoteFilePath);
        // Envie o arquivo como resposta HTTP
        res.download(localFilePath, remoteFilePath);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Ocorreu um erro ao baixar o arquivo.");
    }
    finally {
        // Desconecte-se do servidor FTP
        await client.close();
    }
});
routes.post('/register/new', async (req, res) => {
    const { authors, publishedAt, document } = req.body;
    const repository = new RegisterRepository_1.RegisterRepository();
    try {
        const newRegister = await repository.createRegister({ authors, publishedAt, document });
        // res.status(200).send(register);
        console.log(typeof newRegister);
        res.status(200).json(newRegister);
    }
    catch (e) {
        res.status(400).send(e);
    }
});
routes.get('/registers', async (req, res) => {
    // const {authors,publishedAt,document} = req.body;
    const repository = new RegisterRepository_1.RegisterRepository();
    try {
        const registers = await repository.listRegister();
        // res.status(200).send(register);
        console.log(registers);
        res.status(200).json(registers);
    }
    catch (e) {
        res.status(400).send(e);
    }
});
//=============================================
routes.get('/tccForm', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '/../public/form.html'));
});
routes.get('/img/mural', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '/../public/img/mural1.jpg'));
});
// express.static(__dirname + '/../public/css')
// routes.get('/css/',(req,res)=>{
//     res.sendFile(path.join(__dirname, '/../public/css'));
// })
exports.default = routes;
