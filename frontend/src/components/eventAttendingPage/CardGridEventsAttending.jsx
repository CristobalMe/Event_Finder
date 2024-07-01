import CardEvent from "../CardEvent.jsx";
import data from "../../data.js"


const CardGridEventsAttending = () => {
  
    return (
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 ">
        {data.map((d) => (
            <div className="m-[3rem]">
              <CardEvent data={d} />
            </div>
        ))}
      </div>
    );
  };
  
  export default CardGridEventsAttending;