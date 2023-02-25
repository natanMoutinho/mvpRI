"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const routes = (0, express_1.Router)();
routes.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '/../public/index.html'));
});
routes.get('/tccForm', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '/../public/form.html'));
});
routes.get('/img/mural', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '/../public/img/mural1.jpg'));
});
// express.static(__dirname + '/../public/css')
// routes.get('/css/',(req,res)=>{
//     res.sendFile(path.join(__dirname, '/../public/css'));
// })
exports.default = routes;
