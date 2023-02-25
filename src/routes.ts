import { Router } from "express";
import path from "path"
const routes = Router();


routes.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, '/../public/index.html'));
})

routes.get('/tccForm',(req,res)=>{
    res.sendFile(path.join(__dirname, '/../public/form.html'));
})

routes.get('/img/mural',(req,res)=>{
    res.sendFile(path.join(__dirname, '/../public/img/mural1.jpg'));
})

// express.static(__dirname + '/../public/css')

// routes.get('/css/',(req,res)=>{
//     res.sendFile(path.join(__dirname, '/../public/css'));
// })



export default routes;
