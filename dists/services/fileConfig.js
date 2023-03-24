"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileConfig = void 0;
const basic_ftp_1 = require("basic-ftp");
const path_1 = __importDefault(require("path"));
const stream_1 = require("stream");
const fs_1 = __importDefault(require("fs"));
class FileConfig {
    constructor() {
        this.ftpClient = new basic_ftp_1.Client(30000);
        // definindo o timeout como 10 minutos (em milissegundos)
        // this.ftpClient
        // this.ftpClient.setTimeout(10 * 60 * 1000);
        // this.ftpClient.ftp.connTimeout = 300000; // tempo limite de conexão em milissegundos
        // this.ftpClient.ftp.connTimeout = 300000; // tempo limite de conexão em milissegundos
    }
    async connectToFTP() {
        const [host, user, password] = [
            process.env.FTP_HOST,
            process.env.FTP_USER_NAME,
            process.env.FTP_USER_PASS
        ];
        await this.ftpClient.access({
            host,
            user,
            password,
        });
        // await this.ftpClient.send("SITE TIMEOUT 50000"); 
        // console.log('Connectado e tudo mais')
    }
    async uploadFileToFTP(file) {
        const readStream = new stream_1.PassThrough();
        readStream.end(file.buffer);
        await this.ftpClient.uploadFrom(readStream, file.originalname);
    }
    async downloadFileFromFTP(filename) {
        // Defina o caminho local para onde o arquivo será baixado
        const localFilePath = path_1.default.join(__dirname, './../tmp/downloads', filename);
        // console.log(`${localFilePath}               ${filename}`);
        //  `/usr/src/mvp_repositorio/tmp/downloads/${filename}`
        // Baixe o arquivo
        await this.ftpClient.downloadTo(fs_1.default.createWriteStream(`/usr/src/mvp_repositorio/tmp/downloads/${filename}`), filename);
        // const list = await this.ftpClient.list();
        // console.log(list);
    }
    async clear() {
        console.log(await this.ftpClient.list());
    }
    async deleteAll() {
        // console.log('começou')
        console.log(await this.ftpClient.list());
        const list = await this.ftpClient.list();
        console.log(list);
        const filenames = list.map((file) => {
            return file.name;
        });
        // console.log('ANTES DE TESTAR OUTROS AKI')
        for (const name of filenames) {
            await this.ftpClient.remove(name);
        }
        // console.log(await this.ftpClient.list());
    }
    async closeConnection() {
        await this.ftpClient.close();
    }
}
exports.FileConfig = FileConfig;
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
