import Carousel from '../carousel/Carousel'
import Header from '../header/Header'
import SpinningBanner from '../spinningBanner/SpinningBaner'

function App() {

  return (
    <div>
        <Header />


        <div className='mt-[10rem]'>
            <SpinningBanner />
        </div>

        <div className='ml-[7rem] mr-[7rem]  mt-[10rem] content-center'>
            <h2 className='font-bebas text-white text-xl'>For You</h2>
            <Carousel />
        </div>

        
    

    </div>
  )
}

export default App