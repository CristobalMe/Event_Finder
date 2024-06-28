import Card from "../Card.jsx";
import data from "../../data.js"


const CardGridFavoriteEvents = () => {
    return (
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 ">
        {data.map((d) => (
            <div className="m-[3rem]">
              <Card data={d} />
            </div>
        ))}
      </div>
    );
  };
  
  export default CardGridFavoriteEvents;