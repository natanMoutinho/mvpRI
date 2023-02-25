"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const routes_1 = __importDefault(require("./routes"));
const express_1 = __importDefault(require("express"));
const PORT = process.env.PORT || 3333;
// app.get('/',(req,res) =>{
// 	// res.sendFile(__dirname+'/../public/index.html')
// 	res.sendFile(path.join(__dirname, '/../public/index.html'));
// })
// restesdfasdfas
app_1.default.use(routes_1.default);
app_1.default.use('/css', express_1.default.static(__dirname + '/../public/css'));
app_1.default.listen(PORT, () => {
    console.log(`Server running at port ${PORT}, http://localhost:${PORT}`);
});
// res.sendFile(path.join(__dirname, '/../public/index.html'));
