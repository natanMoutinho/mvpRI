import { Client as FTPClient } from "basic-ftp";
import { PassThrough } from "stream";

export class FileConfig{
    private readonly ftpClient: FTPClient;

    constructor (){
        this.ftpClient = new FTPClient();
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
    }

    async uploadFileToFTP(file: Express.Multer.File) {
        const readStream = new PassThrough();
        readStream.end(file.buffer);
        await this.ftpClient.uploadFrom(readStream, file.originalname);
    }
    
    async downloadFileFromFTP(filename: string) {
        const readStream = new PassThrough();
        await this.ftpClient.downloadTo(readStream, filename);
        return readStream;
    }
    
    async closeConnection() {
        await this.ftpClient.close();
    }
    
}