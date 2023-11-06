import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

class PostService{
    constructor(){}

    async createPost(post: Prisma.PostCreateInput){
        try{
            const newpost = prisma.post.create({
                data: post
            })
            return newpost;
        }
        catch(error){
            console.log(error);
            return null;
        }
    }

    async findPost(id: number | undefined){
        try{
            if(id){
                const post = await prisma.post.findUnique({
                    where: {
                        id
                    }
                })
                return post
            }else{
                const posts = await prisma.post.findMany();
                return posts;
            }
        }
        catch(error){
            console.log(error);
            return null;       
        }
    }
}
