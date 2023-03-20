"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileConfig = void 0;
const basic_ftp_1 = require("basic-ftp");
const stream_1 = require("stream");
class FileConfig {
    constructor() {
        this.ftpClient = new basic_ftp_1.Client();
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
    }
    async uploadFileToFTP(file) {
        const readStream = new stream_1.PassThrough();
        readStream.end(file.buffer);
        await this.ftpClient.uploadFrom(readStream, file.originalname);
    }
    async downloadFileFromFTP(filename) {
        const readStream = new stream_1.PassThrough();
        await this.ftpClient.downloadTo(readStream, filename);
        return readStream;
    }
    async closeConnection() {
        await this.ftpClient.close();
    }
}
exports.FileConfig = FileConfig;
