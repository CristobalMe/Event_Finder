import CardEvent from "../CardEvent.jsx";
import React, { useState, useEffect } from "react";
import axios from "axios";

const CardGridEventsAttending = () => {
  let [events, setEvents] = useState([]);
  let [fetched, setFetched] = useState(false);
  let [eventsAttending, setEventsAttending] = useState([]);
  let idEventsAttending = [];
  let userData = {username: null}
  const url = import.meta.env.VITE_URL;

  if (
    !(
      localStorage.getItem("user").includes(null) ||
      localStorage.getItem("user").includes("null")
    )
  ) {
    userData = JSON.parse(localStorage.getItem("user"));
  }

  useEffect(() => {
    if (!fetched) {
      fetchUserAttendance()
      fetchEventsAttending()
    }
    setFetched(true)
  }, [events,idEventsAttending]);

  const fetchUserAttendance = () => {
    fetch(`${url}/attendance/user/${userData.username}`)
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching:", error));
  };

  // Set the current events ids
  events.map((d) => 
    idEventsAttending.push(d.id)
  )
  // ---------------------------
  
  //console.log(idEventsAttending)

  const fetchEventsAttending = async () => {
    await axios.get(`${url}/event/${idEventsAttending.map((n, index) => `storeIds[${index}]=${n}`).join('&')}`)
    .then(function (response) {
      setEventsAttending(response.data);
      console.log(response.data)
    });
  }

  return (
    <div>
      {events && (<div className="grid lg:grid-cols-4 sm:grid-cols-2 ">
        {eventsAttending.map((d) => ( 
          <div className="m-[3rem]">
            <CardEvent data={d} />
          </div>
        ))}
      </div>)}
    </div>
  );
};

export default CardGridEventsAttending;
