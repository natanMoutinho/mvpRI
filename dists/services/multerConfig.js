"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MulterConfig = void 0;
const multer_1 = __importDefault(require("multer"));
// import FTPStorage from 'multer-ftp';
const path_1 = __importDefault(require("path"));
class MulterConfig {
    static upload() {
        // console.log('==================================================')
        // console.log(path.resolve(__dirname,'..','..','tmp','uploads'));
        // console.log('==================================================')
        return (0, multer_1.default)({
            dest: path_1.default.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
            storage: multer_1.default.diskStorage({
                destination: (req, file, cb) => {
                    cb(null, path_1.default.resolve(__dirname, '..', '..', 'tmp', 'uploads'));
                },
                filename: (req, file, cb) => {
                    const fileName = file.originalname;
                    cb(null, fileName);
                }
            })
        });
    }
}
exports.MulterConfig = MulterConfig;
