import { Prisma, PrismaClient } from "@prisma/client";

export interface infoDTO{
    title:string,
    authors:string,
    publishedAt: string
    document: string,
}

export class RegisterRepository{
    private prismaCli: PrismaClient

    constructor(){
        this.prismaCli = new PrismaClient();
    }
    async createRegister(info:infoDTO ){
        console.log(info)
        const newRegister = await this.prismaCli.register.create({
            data:{
                title: info.title,
                authors: info.authors,
                // createdAt: data.createdAt,
                publishedAt:  info.publishedAt,
                document: info.document
                // document:  data.document

            }
        })
        console.log(newRegister)
        return newRegister;
    }
    async listRegister(){
        const listRegister =  await this.prismaCli.register.findMany({}); 
        return listRegister;
    }

    async deleteRegister(){
        
    }
}
