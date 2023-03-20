import { Prisma, PrismaClient } from "@prisma/client";
// import { prismaCli } from "../services/prismaClient";

export interface infoDTO{
    authors:string,
    // createdAt: Date
    publishedAt: Date
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
}
