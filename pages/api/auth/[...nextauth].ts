import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import {compare} from 'bcrypt';

import prismadb from "@component/lib/prismadb";

export default NextAuth({
    providers:[
        Credentials({
            id:'credentials',
            name:'Credentials',
            credentials:{
                email:{
                    label: 'Email',
                    type: 'text',
                },
               pass:{
                    label:'Password',
                    type : 'password',
               } 
            },
            async authorize(credentials) {
                if(!credentials?.email && !credentials?.pass){
                    console.log(credentials?.email + " " + credentials?.pass)
                    throw new Error('Email and password required');
                }
                console.log(credentials?.email + " " + credentials?.pass)


                const user = await prismadb.user.findUnique({
                    where:{
                        email: credentials.email
                    }
                });

                if(!user || !user.hashedPassword){
                    throw new Error('Email does not exist')
                }

                const isCorrectPassword = await compare(credentials.pass,user.hashedPassword);

                if(!isCorrectPassword){
                    throw new Error('Incorrect password');
                }
                

                return user;
            },
        })
    ],
    pages:{
        signIn:'/auth',
    },
    debug: process.env.NODE_ENV == 'development',
    session: {
        strategy:'jwt'
    },
    jwt:{
        secret: process.env.NEXTAUTH_JWT_SECRET
    },
    secret: process.env.NEXTAUTH_SECRET
})