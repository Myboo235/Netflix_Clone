import Billboard from "@component/components/Billboard";
import InfoModal from "@component/components/InfoModal";
import MovieList from "@component/components/MovieList";
import Navbar from "@component/components/Navbar";
import useFavorites from "@component/components/useFavorites";
import useInfoModal from "@component/hooks/useInfoModal";
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
  const {data:favorites = []} = useFavorites();
  const {isOpen , closeModal} = useInfoModal();

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal}/>
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movie} />
        <MovieList title="My List" data={favorites} />

      </div>
    </>
  )
}
