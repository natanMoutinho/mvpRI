
// id          Int      @id @default(autoincrement())
// authors     String
// createdAt   DateTime @default(now())
// publishedAt String
// document    String
// title       String


export interface registerDTO {
    
}

export class Register{
    constructor(
        private authors: String,
        private  publishedAt: String,
        private document: String,
        private title: String
    ){}
}