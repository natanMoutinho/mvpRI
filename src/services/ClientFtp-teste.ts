import { Client, FileInfo } from 'basic-ftp';

export class FtpHandler {
  private client: Client;

  constructor(private readonly host: string, private readonly port: number, private readonly username: string, private readonly password: string) {
    this.client = new Client();
  }

  public async connect(): Promise<void> {
    await this.client.access({
      host: this.host,
      port: this.port,
      user: this.username,
      password: this.password,
      secure: false,
    });
  }

  public async uploadFile(file: Express.Multer.File, path: string): Promise<void> {
    await this.client.uploadFrom(file.path, path);
  }

//   public async downloadFile(path: string): Promise<FileInfo> {
//     const fileInfo = await this.client.downloadToBuffer(path);
//     return fileInfo;
//   }

  public async disconnect(): Promise<void> {
    await this.client.close();
  }
}