import CoverFlow from '../swiper/CoverFlow'
import Carousel from '../carousel/Carousel'
import Header from '../header/Header'

function App() {

  return (
    <div>
        <Header />


        <div className='ml-[7rem] mr-[7rem]  mt-[10rem]'>
            <h2 className='font-bebas text-white text-xl'>For You</h2>
            <Carousel />
        </div>

        <div className='ml-[7rem] mr-[7rem]  mt-[10rem] content-center'>
            <CoverFlow />
        </div>
    

    </div>
  )
}

export default App