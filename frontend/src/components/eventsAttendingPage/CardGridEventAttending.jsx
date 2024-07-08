import EventCard from "../EventCard.jsx";
import data from "../../data.js";

const CardGridEventAttending = () => {
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 ">
      {data.map((d) => (
        <div className="m-[3rem]">
          <EventCard
            name={d.name}
            location={d.location}
            imageUrl={d.imageUrl}
            score={d.score}
            numReviews={d.numReviews}
          />
        </div>
      ))}
    </div>
  );
};

export default CardGridEventAttending;
