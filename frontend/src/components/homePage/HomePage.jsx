import EventsCarousel from "../carousel/EventsCarousel";
import Header from "../header/Header";
import SpinningBanner from "../spinningBanner/SpinningBaner";
import { useState, useEffect } from "react";

function App() {
  const MapsApiKey = import.meta.env.VITE_MAPS_API_KEY;
  const url = import.meta.env.VITE_URL;
  let [events, setEvents] = useState();
  let [changeInEvents, setchangeInEvents] = useState(true);

  useEffect(() => {
    if (changeInEvents) fetchEvents();
    setchangeInEvents(false);
  }, [events]);

  const fetchEvents = () => {
    fetch(`${url}/event`)
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
      })
      .catch((error) => console.error("Error fetching:", error));
  };

  return (
    <div>
      <Header />

      <div className="mt-[10rem]">
        <SpinningBanner />
      </div>

      <div className="mx-[5rem]  mt-[10rem] content-center sm:mx-[7rem]">
        <h2 className="font-bebas text-white text-xl">For You</h2>
        <EventsCarousel events={events} />
      </div>

      <div className="mx-[5rem]  mt-[10rem] content-center sm:mx-[7rem]">
        <h2 className="font-bebas text-white text-xl">San Francisco</h2>
        <EventsCarousel events={events} />
      </div>

      <div className="mx-[5rem]  mt-[10rem] content-center sm:mx-[7rem]">
        <h2 className="font-bebas text-white text-xl">This week</h2>
        <EventsCarousel events={events} />
      </div>
    </div>
  );
}

export default App;
