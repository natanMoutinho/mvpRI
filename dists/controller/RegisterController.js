"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegsiterController = void 0;
const RegisterRepository_1 = require("../repositories/RegisterRepository");
class RegsiterController {
    constructor() {
        this.repository = new RegisterRepository_1.RegisterRepository();
    }
}
exports.RegsiterController = RegsiterController;
// }
