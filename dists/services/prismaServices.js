"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaService = void 0;
// src/prisma.service.ts
const client_1 = require("@prisma/client");
class PrismaService extends client_1.PrismaClient {
    async onModuleInit() {
        await this.$connect();
    }
}
exports.PrismaService = PrismaService;
// async enableShutdownHooks() { 
//     this.$on("beforeExit", async () => { 
//       await app.close(); 
//     }); 
//   } 
// }
