"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRepository = void 0;
const client_1 = require("@prisma/client");
class RegisterRepository {
    constructor() {
        this.prismaCli = new client_1.PrismaClient();
    }
    async createRegister(info) {
        console.log(info);
        const newRegister = await this.prismaCli.register.create({
            data: {
                title: info.title,
                authors: info.authors,
                // createdAt: data.createdAt,
                publishedAt: info.publishedAt,
                document: info.document
                // document:  data.document
            }
        });
        console.log(newRegister);
        return newRegister;
    }
    async listRegister() {
        const listRegister = await this.prismaCli.register.findMany({});
        return listRegister;
    }
    async deleteAllRegister() {
        await this.prismaCli.register.deleteMany();
    }
}
exports.RegisterRepository = RegisterRepository;
