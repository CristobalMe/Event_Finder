import Carousel from '../eventCarousel/EventCarousel'
import Header from '../header/Header'
import SpinningBanner from '../spinningBanner/SpinningBaner'

function App() {

  return (
    <div>
        <Header />
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

        <div className='mx-[5rem]  mt-[10rem] content-center sm:mx-[7rem]'>
            <h2 className='font-bebas text-white text-xl'>This week</h2>
            <Carousel />
        </div>
    </div>
  )
}

export default App