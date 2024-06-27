import Header from '../header/Header'
import CardGridAttending from "./CardGridAttending.jsx"

function App() {

  return (
    <div>

        <Header />
        <div className="h-screen flex items-center justify-center lg:mt-[20rem] sm:mt-[45rem]"><CardGridAttending /></div>
    </div>
  )
}

export default App