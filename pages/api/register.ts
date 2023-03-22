import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@component/lib/prismadb'

export default async function handle(req:NextApiRequest,res:NextApiResponse) {
    console.log("Hello")

    if(req.method !=='POST'){
        return res.status(405).end();
    }
    


    try{
        const {email, name ,pass} = req.body;
        console.log(req.body);
        const existingUser = await prismadb.user.findUnique({
            where:{
                email,
            }
        });

        if(existingUser){
            return res.status(422).json({error: 'Email taken'});
        }

        const hashedPassword = await bcrypt.hash(pass, 12);
        console.log(email+"  "+name+"  "+hashedPassword)

        const user = await prismadb.user.create({
            data:{
                email,
                name,
                hashedPassword,
                image:'',
                emailVerified: new Date(),
            }
        });

        return res.status(200).json(user);
    }catch(error){
        console.log(error);
        return res.status(400).end();
    }
}