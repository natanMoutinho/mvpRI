import { Client } from "basic-ftp";
import { PassThrough } from "stream";
import fs from 'fs'
export class FileConfig{
    private readonly ftpClient: Client;

    constructor (){
        this.ftpClient = new Client(30000);
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
        // Baixe o arquivo
        await this.ftpClient.downloadTo(fs.createWriteStream(`/usr/src/mvp_repositorio/tmp/downloads/${filename}`), filename);
    }

    async clear(){
        console.log(await this.ftpClient.list());
    }

    async deleteAll(){
        // console.log('começou')
        console.log(await this.ftpClient.list());
        const list = await this.ftpClient.list()
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