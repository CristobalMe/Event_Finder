import Header from '../header/Header'
import CardGridFavorites from "./CardGridFavorites.jsx"

function App() {

  return (
    <div>

        <Header />
        <div className="h-screen flex items-center justify-center lg:mt-[20rem] sm:mt-[45rem]"><CardGridFavorites /></div>
    </div>
  )
}

export default App