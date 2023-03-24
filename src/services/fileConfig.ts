import { Client } from "basic-ftp";
import path from "path";
import { PassThrough } from "stream";
import fs from 'fs'
export class FileConfig{
    private readonly ftpClient: Client;

    constructor (){
        this.ftpClient = new Client(30000);
        // definindo o timeout como 10 minutos (em milissegundos)
        // this.ftpClient
        // this.ftpClient.setTimeout(10 * 60 * 1000);
        // this.ftpClient.ftp.connTimeout = 300000; // tempo limite de conexão em milissegundos
        // this.ftpClient.ftp.connTimeout = 300000; // tempo limite de conexão em milissegundos
    }

    async connectToFTP() {
        const [host,user,password] = [ 
            process.env.FTP_HOST,
            process.env.FTP_USER_NAME,
            process.env.FTP_USER_PASS
        ]
        await this.ftpClient.access({
          host,
          user,
          password,
        });
        // await this.ftpClient.send("SITE TIMEOUT 50000"); 
        // console.log('Connectado e tudo mais')
    }

    async uploadFileToFTP(file: Express.Multer.File) {
        const readStream = new PassThrough();
        readStream.end(file.buffer);
        await this.ftpClient.uploadFrom(readStream, file.originalname);
    }
    
    async downloadFileFromFTP(filename: string) {
        // Defina o caminho local para onde o arquivo será baixado
        const localFilePath = path.join(__dirname, './../tmp/downloads',filename);
        // console.log(`${localFilePath}               ${filename}`);
        //  `/usr/src/mvp_repositorio/tmp/downloads/${filename}`
        // Baixe o arquivo
        await this.ftpClient.downloadTo(fs.createWriteStream(`/usr/src/mvp_repositorio/tmp/downloads/${filename}`), filename);
        console.log('teste --------------------------------------------------------------------');
    
    }


    async closeConnection() {
        await this.ftpClient.close();
    }
    
}

/*
async downloadFileFromFTP(filename: string) {
        // Defina o caminho local para onde o arquivo será baixado
        const localFilePath = path.join(__dirname, './../tmp/downloads/.');
        // console.log(`${localFilePath}               ${filename}`);

        // Defina a permissão que você deseja dar ao diretório (em notação octal)
        const permissao = 0o777;

        // Dê permissão ao diretório
        fs.chmod('/usr/src/mvp_repositorio/tmp/downloads', permissao, (err) => {
        if (err) {
        console.error(err);
        } else {
        console.log(`Permissão concedida para ${localFilePath}`);
        }
        });

        // Baixe o arquivo
        await this.ftpClient.downloadTo(fs.createWriteStream('/usr/src/mvp_repositorio/tmp/downloads'), filename);
        // console.log('ateste');
    }


*/