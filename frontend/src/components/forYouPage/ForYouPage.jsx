import Header from "../header/Header";
import CardGridForYou from "./CardGridForYou.jsx";

function App() {
  return (
    <div>
      <Header />
      <div className="h-screen flex items-center justify-center lg:mt-[20rem] sm:mt-[45rem]">
        <CardGridForYou />
      </div>
    </div>
  );
}

export default App;
