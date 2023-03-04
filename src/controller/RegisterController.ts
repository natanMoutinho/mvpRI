import { RegisterRepository, infoDTO } from "../repositories/RegisterRepository";

export class RegsiterController{
    private repository: RegisterRepository;
    private constructor(){
        this.repository = new RegisterRepository();
    }


    // async create(body:infoDTO){
    //     try{
    //         const register = this.repository.createRegister(body);
    //         return register;
    //     }catch(e){
    //         throw new Error();
    //     }
    }

// }