"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const basic_ftp_1 = __importDefault(require("basic-ftp"));
class FileUploader {
    constructor() {
        this.ftpClient = new basic_ftp_1.default();
        this.ftpClient.connect({
            host: "ftp.example.com",
            user: "ftpuser",
            password: "ftppassword",
        });
    }
    async uploadFileToFTP(file) {
        return new Promise((resolve, reject) => {
            this.ftpClient.put(file.buffer, file.originalname, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
}
