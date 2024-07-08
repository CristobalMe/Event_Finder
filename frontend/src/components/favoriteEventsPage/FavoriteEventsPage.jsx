import Header from "../header/Header.jsx";
import CardGridFavoriteEvents from "./CardGridFavoriteEvents.jsx";

function App() {
  return (
    <div>
      <Header />
      <div className="h-screen flex items-center justify-center lg:mt-[20rem] sm:mt-[45rem]">
        <CardGridFavoriteEvents />
      </div>
    </div>
  );
}

export default App;
