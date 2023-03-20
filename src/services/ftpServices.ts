// import {ftpClient} from 'ftp-client
import * as ftp from "basic-ftp"
// import * as multerFtp from 'multer-ftp'
import path from 'path'
// new ftpClient
export class FtpService{
    private client = new ftp.Client();

    async upload(localFile:string, remoteFile: string ){
        this.client.ftp.verbose = true
        try {
            await this.client.access({
                host: process.env.FTP_HOST,
                user: process.env.FTP_USER_NAME,
                password: process.env.FTP_USER_PASS,
                port: Number(process.env.FTP_PORT),
                // port: process.env.FTP_PORT,
                // secureOptions : secureOptions,
            })
            await this.client.uploadFrom(localFile, remoteFile);
            return 0;
        }catch(err) {
            console.log(err)
            this.client.close();
            return err;
        }
        this.client.close()
    }

    async download(localFile:string, remoteFile:string){
            
//          await client.downloadTo(path.resolve(__dirname,"README_COPY.md"), "README_FTP.md");

    }

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