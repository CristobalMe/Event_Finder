import React, { useState, useEffect } from "react";
import EventMap from "../EventMap";

// TODO:
// GET LOCATION OF EVENT (LAT & LONG)
const DisplayEventInfo = (event) => {
  let Logged = false;

  if (
    !(
      localStorage.getItem("user").includes(null) ||
      localStorage.getItem("user").includes("null")
    )
  ) {
    Logged = true;
  }

  const eventDisplay = event.event;

  const handleRegister = () => {
    console.log("done");
  };

  return (
    <div className="rounded overflow-hidden shadow-lg bg-white h-[37rem] w-[50rem]">
      {eventDisplay && (
        <div className="flex">
          <img
            className="h-[37rem] w-[25rem]"
            src={eventDisplay.image}
            id="image"
            onError={(e) => {
              e.target.src =
                "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg";
            }}
          />
          <div className="items-center justify-center m-[1rem] mb-[0rem]">
            <div className="inline m-[1rem]">
              <h2 className="font-bebas text-3xl">{eventDisplay.name}</h2>
              {Logged && (
                <div>
                  <button
                    className="bg-blue-700 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded"
                    onClick={handleRegister}
                  >
                    Register
                  </button>
                </div>
              )}
            </div>
            <p className="font-sans font-bold">{eventDisplay.description}</p>

            <div className="inline-flex mb-[1rem]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <p className="ml-[.5rem]">{eventDisplay.duration}</p>
            </div>
            <div className="inline-flex m-[1rem]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
              <p>{eventDisplay.location}</p>
            </div>
            <div className="inline-flex m-[1rem]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                />
              </svg>
              <p>{eventDisplay.category}</p>
            </div>

            <div className="inline-flex m-[1rem]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                />
              </svg>
              <p>{eventDisplay.rating}</p>
            </div>
            {/* <p>{eventDisplay.detailedDescription}</p> */}
            {/* <p>{eventDisplay.detailedLocation}</p> */}
            {/* <p>{eventDisplay.date}</p> */}

            {/* Uncomment for demo */}
            {/* <EventMap latitude={40.7826} longitude={73.9656}/> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayEventInfo;
