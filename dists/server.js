"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const path_1 = __importDefault(require("path"));
const PORT = process.env.PORT || 3000;
app_1.default.get('/', (req, res) => {
    // res.sendFile(__dirname+'/../public/index.html')
    res.sendFile(path_1.default.join(__dirname, '/../public/index.html'));
});
// restesdfasdfas
app_1.default.listen(PORT, () => {
    console.log(`Server running at port ${PORT}, http://localhost:${PORT}`);
});
// res.sendFile(path.join(__dirname, '/../public/index.html'));
