import express from "express";
import { Client as FTPClient } from "basic-ftp";
import * as fs from "fs";

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
const client = new FTPClient();

// Crie uma instância do aplicativo Express
const app = express();

// Defina a rota para download do arquivo
app.get("/down", async (req, res) => {
  try {
    // Conecte-se ao servidor FTP
    await client.access(config);

    // Baixe o arquivo
    await client.download(fs.createWriteStream(localFilePath), remoteFilePath);

    // Envie o arquivo como resposta HTTP
    res.download(localFilePath);
  } catch (err) {
    console.error(err);
    res.status(500).send("Ocorreu um erro ao baixar o arquivo.");
  } finally {
    // Desconecte-se do servidor FTP
    await client.close();
  }
});

// Inicie o servidor
app.listen(3000, () => {
  console.log("Servidor iniciado na porta 3000.");
});