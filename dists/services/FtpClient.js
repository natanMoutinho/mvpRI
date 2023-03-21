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
const express_1 = __importDefault(require("express"));
const basic_ftp_1 = require("basic-ftp");
const fs = __importStar(require("fs"));
// Defina as informações de conexão FTP
const config = {
    host: "ftp.example.com",
    user: "seu-usuario",
    password: "sua-senha"
};
// Defina o nome do arquivo que deseja baixar
const remoteFilePath = "/caminho/para/o/arquivo.pdf";
// Defina o caminho local para onde o arquivo será baixado
const localFilePath = "./downloads/arquivo.pdf";
// Crie uma instância do cliente FTP
const client = new basic_ftp_1.Client();
// Crie uma instância do aplicativo Express
const app = (0, express_1.default)();
// Defina a rota para download do arquivo
app.get("/down", async (req, res) => {
    try {
        // Conecte-se ao servidor FTP
        await client.access(config);
        // Baixe o arquivo
        await client.download(fs.createWriteStream(localFilePath), remoteFilePath);
        // Envie o arquivo como resposta HTTP
        res.download(localFilePath);
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
// Inicie o servidor
app.listen(3000, () => {
    console.log("Servidor iniciado na porta 3000.");
});
