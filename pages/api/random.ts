import { NextApiRequest,NextApiResponse } from "next";
import prismadb from '@component/lib/prismadb'
import serverAuth from "@component/lib/serverAuth";


export default async function handler(req :NextApiRequest , res : NextApiResponse) {
  if(req.method != 'GET'){
    return res.status(405).end();
  }
  try{
    await serverAuth(req);

    const movieCount = await prismadb.movie.count();
    const randomIndex = Math.floor(movieCount*Math.random())

    const randomMovie = await prismadb.movie.findMany({
        take:1,
        skip:randomIndex,
    });

    return res.status(200).json(randomMovie[0]);
  }catch(error){
    console.log(error);
    return res.status(500).end();

  }
}
