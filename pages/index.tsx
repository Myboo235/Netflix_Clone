import Billboard from "@component/components/Billboard";
import MovieList from "@component/components/MovieList";
import Navbar from "@component/components/Navbar";
import useMovieList from "@component/hooks/useMovieList";
import { NextPageContext } from "next"
import { getSession } from "next-auth/react"


export async function getServerSideProps(context :NextPageContext) {
  const session = await getSession(context);
  if(!session){
    return{
      redirect:{
        destination : '/auth',
        permanent : false,
      }
      
    }
  }


  return{
    props : {}
  }
}

export default function Home() {
  const {data:movie = []} = useMovieList();
  return (
    <>
      <Navbar />
      <Billboard />
      <div>
        <MovieList title="Trending Now" data={movie} />
      </div>
    </>
  )
}
