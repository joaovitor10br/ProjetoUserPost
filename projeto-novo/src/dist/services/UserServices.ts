import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class UserService {
    constructor(){}

    async createUser(user: Prisma.UserCreateInput){
        try{
            const newuser = await prisma.user.create({
                data: user
            });
            return newuser;
        }
        catch(error){
            console.log(error);
            return null;
        }
    }

    async findUsers(id?: number | undefined){
        try{
            if(id){
                const user = await prisma.user.findUnique({
                    where: {
                        id
                    }
                })
                return user;
            }else{
                const users = prisma.user.findMany();
                return users;
            }
        }catch(error){
            console.log(error);
            return null;
        }
    }

    async updateUser(id: number, newData: Prisma.UserCreateInput){
        try{
            const userUpdated = await prisma.user.update({
                where: {
                    id
                }, data: {
                    email: newData.email,
                    name: newData.name,
                }
            });
            return userUpdated;
        }catch(error){
            console.log(error);
            return null;
        }
    }

    async deleteUser(id: number){
        try{
            if(!id){
                return console.log("Um id é necessário para deletar um usuário")
            }
            await prisma.user.delete({where: {id}});
            return "ok";
        }
        catch(error){
            console.log(error);
            return null;
        }
    }
}

export default new UserService;