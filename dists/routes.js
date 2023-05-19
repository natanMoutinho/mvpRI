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
const fs = __importStar(require("fs"));
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
routes.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '/../public/index.html'));
});
routes.post("/upload", upload.single("file"), async (req, res) => {
    const fileUploader = new fileConfig_1.FileConfig();
    const { title, authors, publishedAt } = req.body;
    const repository = new RegisterRepository_1.RegisterRepository();
    console.log(req.body);
    console.log(req.file);
    try {
        await fileUploader.connectToFTP();
        if (req.file) {
            await fileUploader.uploadFileToFTP(req.file);
            await repository.createRegister({ title, authors, publishedAt, document: req.file.originalname });
            await fileUploader.closeConnection();
            res.status(200).redirect('/');
            // res.redirect('/');
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Failed to upload file to FTP server.");
    }
    finally {
        fileUploader.closeConnection();
    }
});
// Defina a rota para download do arquivo
routes.get("/down/:filename", async (req, res) => {
    // Defina o nome do arquivo que deseja baixar
    const remoteFileName = req.params.filename;
    ;
    // Defina o caminho local para onde o arquivo será baixado
    // const localFilePath = path.join(__dirname, './../tmp/downloads/', remoteFileName);
    const localFilePath = path_1.default.join(__dirname, '/../tmp/downloads', remoteFileName);
    const fileDownloader = new fileConfig_1.FileConfig();
    try {
        await fileDownloader.connectToFTP();
        await fileDownloader.downloadFileFromFTP(remoteFileName);
        // console.log(localFilePath)
        res.sendFile(localFilePath, (err) => {
            if (err) {
                console.error(`Erro ao enviar o arquivo ${remoteFileName} como resposta HTTP:`, err);
                res.status(500).send("Ocorreu um erro ao baixar o arquivo.");
                return;
            }
            // Exclui o arquivo
            fs.unlink(localFilePath, (err) => {
                if (err) {
                    console.error(`Erro ao excluir arquivo em -> /usr/src/mvp_repositorio/tmp/downloads:`, err);
                }
                else {
                    console.log(`Arquivo ${localFilePath} excluído com sucesso.`);
                }
            });
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Ocorreu um erro ao baixar o arquivo.");
    }
    finally {
        // Desconecte-se do servidor FTP
        fileDownloader.closeConnection();
    }
});
routes.get('/registers', async (req, res) => {
    // const {authors,publishedAt,document} = req.body;
    const repository = new RegisterRepository_1.RegisterRepository();
    try {
        const registers = await repository.listRegister();
        // res.status(200).send(register);
        await repository;
        console.log(registers);
        res.status(200).json(registers);
    }
    catch (e) {
        res.status(400).send(e);
    }
});
routes.get('/clear', async (req, res) => {
    const repository = new RegisterRepository_1.RegisterRepository();
    const fileDelete = new fileConfig_1.FileConfig();
    try {
        await fileDelete.connectToFTP();
        await repository.deleteAllRegister();
        await fileDelete.deleteAll();
        res.status(200).json('tudo foi eliminado');
    }
    catch (e) {
        res.status(400).send(e);
    }
    finally {
        await fileDelete.closeConnection();
    }
});
//=============================================
routes.get('/tccForm', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '/../public/form.html'));
});
routes.get('/indexStyle', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '/../public/form.html'));
});
routes.get('/img/mural', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '/../public/img/mural1.jpg'));
});
exports.default = routes;
