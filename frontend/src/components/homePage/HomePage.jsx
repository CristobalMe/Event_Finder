<<<<<<< HEAD
import Carousel from '../eventCarousel/EventCarousel'
=======
import CoverFlow from '../swiper/CoverFlow'
import Carousel from '../carousel/Carousel'
>>>>>>> 1f599bb (Added a swiper and a coverflow)
import Header from '../header/Header'
import SpinningBanner from '../spinningBanner/SpinningBaner'

function App() {

  return (
    <div>
        <Header />
<<<<<<< HEAD
        <div className='mt-[10rem]'>
            <SpinningBanner />
        </div>
        <div className='mx-[5rem]  mt-[10rem] content-center sm:mx-[7rem]'>
            <h2 className='font-bebas text-white text-xl'>For You</h2>
            <Carousel />
        </div>
        <div className='mx-[5rem]  mt-[10rem] content-center sm:mx-[7rem]'>
            <h2 className='font-bebas text-white text-xl'>San Francisco</h2>
            <Carousel />
        </div>
=======


        <div className='ml-[7rem] mr-[7rem]  mt-[10rem]'>
            <h2 className='font-bebas text-white text-xl'>For You</h2>
            <Carousel />
        </div>

        <div className='ml-[7rem] mr-[7rem]  mt-[10rem] content-center'>
            <CoverFlow />
        </div>
    
>>>>>>> 1f599bb (Added a swiper and a coverflow)

        <div className='mx-[5rem]  mt-[10rem] content-center sm:mx-[7rem]'>
            <h2 className='font-bebas text-white text-xl'>This week</h2>
            <Carousel />
        </div>
    </div>
  )
}

export default App