"use strict";
const express = require('express');
const multer = require('multer');
const ftp = require('basic-ftp');
const app = express();
// Configuração do multer para fazer upload de arquivos
const storage = multer.memoryStorage();
const upload = multer({ storage });
// Configuração do servidor FTP
const ftpConfig = {
    host: 'ftp.example.com',
    user: 'ftp_username',
    password: 'ftp_password',
};
// Rota para receber o formulário com o arquivo
app.post('/upload', upload.single('file'), async (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).send('Nenhum arquivo enviado');
    }
    // Conexão com o servidor FTP
    const client = new ftp.Client();
    try {
        await client.access(ftpConfig);
        await client.uploadFromBuffer(file.buffer, file.originalname);
        res.send('Arquivo enviado com sucesso');
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Erro ao enviar arquivo');
    }
    finally {
        client.close();
    }
});
// Inicialização do servidor
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
