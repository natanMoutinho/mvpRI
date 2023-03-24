"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FtpHandler = void 0;
const basic_ftp_1 = require("basic-ftp");
class FtpHandler {
    constructor(host, port, username, password) {
        this.host = host;
        this.port = port;
        this.username = username;
        this.password = password;
        this.client = new basic_ftp_1.Client();
    }
    async connect() {
        await this.client.access({
            host: this.host,
            port: this.port,
            user: this.username,
            password: this.password,
            secure: false,
        });
    }
    async uploadFile(file, path) {
        await this.client.uploadFrom(file.path, path);
    }
    //   public async downloadFile(path: string): Promise<FileInfo> {
    //     const fileInfo = await this.client.downloadToBuffer(path);
    //     return fileInfo;
    //   }
    async disconnect() {
        await this.client.close();
    }
}
exports.FtpHandler = FtpHandler;
