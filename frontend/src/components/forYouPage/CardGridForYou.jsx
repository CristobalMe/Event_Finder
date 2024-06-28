import Card from "../Card";
import data from "../../data"


const CardGridForYou = () => {
  
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
  
  export default CardGridForYou;