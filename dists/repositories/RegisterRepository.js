"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRepository = void 0;
const client_1 = require("@prisma/client");
class RegisterRepository {
    constructor() {
        this.prismaCli = new client_1.PrismaClient();
    }
    async createRegister(data) {
        const newRegister = this.prismaCli.register.create({
            data: {
                authors: data.authors,
                // createdAt: data.createdAt,
                publishedAt: data.publishedAt,
                document: data.document
            }
        });
        return newRegister;
    }
    async listRegister() {
        const listRegister = await this.prismaCli.register.findMany({});
        return listRegister;
    }
}
exports.RegisterRepository = RegisterRepository;
