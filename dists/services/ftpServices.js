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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FtpService = void 0;
// import {ftpClient} from 'ftp-client
const ftp = __importStar(require("basic-ftp"));
// new ftpClient
class FtpService {
    constructor() {
        this.client = new ftp.Client();
        // async t4este ()  {
        //     // const client = new ftp.Client();
        //     this.client.ftp.verbose = true
        //     try {
        //         await this.client.access({
        //             host: process.env.FTP_HOST,
        //             user: process.env.FTP_USER_NAME,
        //             password: process.env.FTP_USER_PASS,
        //             port: Number(process.env.FTP_PORT),
        //             // port: process.env.FTP_PORT,
        //             // secureOptions : secureOptions,
        //         })
        //         console.log(await client.list())
        //         console.log('teste');
        //         const localfile = path.resolve(__dirname,'README.md');
        //         // await client.ensureDir("my/remote/directory")
        //         await client.uploadFrom(localfile, "README_FTP.md");
        //         // await client.upload(fs.createReadStream("test/to_upload.txt"), "uploaded.txt");
        //         // console.log(upResult)
        //         await client.downloadTo(path.resolve(__dirname,"README_COPY.md"), "README_FTP.md");
        //         res.status(200).json("deu bom");
        //     }
        //     catch(err) {
        //         console.log(err)
        //     }
        //     client.close()
        // }
    }
    async upload(localFile, remoteFile) {
        this.client.ftp.verbose = true;
        try {
            await this.client.access({
                host: process.env.FTP_HOST,
                user: process.env.FTP_USER_NAME,
                password: process.env.FTP_USER_PASS,
                port: Number(process.env.FTP_PORT),
                // port: process.env.FTP_PORT,
                // secureOptions : secureOptions,
            });
            await this.client.uploadFrom(localFile, remoteFile);
            return 0;
        }
        catch (err) {
            console.log(err);
            this.client.close();
            return err;
        }
        this.client.close();
    }
    async download(localFile, remoteFile) {
        //          await client.downloadTo(path.resolve(__dirname,"README_COPY.md"), "README_FTP.md");
    }
}
exports.FtpService = FtpService;
