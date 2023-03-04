import { Router } from "express";
import path from "path"
import { RegisterRepository } from "./repositories/RegisterRepository";
const routes = Router();


routes.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, '/../public/index.html'));
})

routes.post('/register/new', async(req,res)=>{
    const {authors,publishedAt,document} = req.body;
    const repository = new RegisterRepository();
    try{
        const newRegister = await repository.createRegister({authors,publishedAt,document});
        // res.status(200).send(register);
        console.log(newRegister.authors);
        res.status(200).json(newRegister);
    }catch(e){
        res.status(400).send(e);
    }

})

routes.get('/registers', async(req,res)=>{
    const {authors,publishedAt,document} = req.body;
    const repository = new RegisterRepository();
    try{
        const registers = await repository.listRegister();
        // res.status(200).send(register);
        console.log(registers);
        res.status(200).json(registers);
    }catch(e){
        res.status(400).send(e);
    }

})


// routes.post('/feedbacks', async (req, res)=>{
//     // console.log(req.body);
//     const {type,comment,screenshot} = req.body;

//     const prismaFeedbacksRepository = new PrismaFeedbacksRepositories();
//     const nodemailerMailAdapter = new NodemailerMailAdapter();

//     const submitFeedbackUseCase = new SubmitFeedbackUseCase(
//         prismaFeedbacksRepository,
//         nodemailerMailAdapter
//     );

//     await submitFeedbackUseCase.execute({
//         type,
//         comment,
//         screenshot
//     })

    

//     //return res.status(201).json({data: feedback});
//     return res.status(201).send();
// })



//=============================================
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
