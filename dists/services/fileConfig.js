"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileConfig = void 0;
const basic_ftp_1 = require("basic-ftp");
const stream_1 = require("stream");
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
        // console.log('======================================')
        // console.log(filename)
        const readStream = new stream_1.PassThrough();
        // console.log(readStream)
        await this.ftpClient.downloadTo(readStream, filename);
        // console.log(readStream)
        return readStream;
    }
    async closeConnection() {
        await this.ftpClient.close();
    }
}
exports.FileConfig = FileConfig;
