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


    async createRegister(data:infoDTO ){
        const newRegister = this.prismaCli.register.create({
            data:{
                authors: data.authors,
                // createdAt: data.createdAt,
                publishedAt:  data.publishedAt,
                document:  data.document

            }
        })
        return newRegister;
    }

    async listRegister(){
        const listRegister =  await this.prismaCli.register.findMany({}); 
        return listRegister;
    }
}
