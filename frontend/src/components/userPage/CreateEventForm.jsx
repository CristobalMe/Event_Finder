import React, { useState } from "react";
import axios from "axios";

const CreateEventForm = () => {
  const url = import.meta.env.VITE_URL;
  const [form, setForm] = useState(false);
  const [name, setEventName] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [category, setCategory] = useState("");

  const handleCreateEvent = async () => {
    try {
      await axios.post(`${url}/event`, {
        rating: 0,
        location: eventLocation,
        name: name,
        duration: duration, 
        description: description,
        image: image,
        category: category,
        date: date,
        userId: JSON.parse(localStorage.getItem("user")).id,
        lat: lat,
        long: long,
        time: time,
      });
      location.reload();
      
    } catch (error) {
      console.error("Error:", error);
    }
};

  return (
    // To Do:
    // Add specific categories, to allow filtering
    <div className="m-[1rem] mt-[1.5rem]">
        <button
                type="button"
                className="bg-blue-700 hover:bg-blue-950 text-white font-bold py-1 px-2 rounded mr-[1rem] mb-[.5rem]"
                onClick={() => setForm(!form)}
              >
                Create event
            </button>
        
        {form && <div>
                    <div className="mb-4">
                        <label
                        className="block text-gray-800 text-sm font-bold mb-2"
                        >
                        Name:
                        </label>
                        <input
                        type="text"
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                        value={name}
                        onChange={(e) => setEventName(e.target.value)}
                        required
                        />
                    </div>

                    <div className="mb-4">
                        <label
                        className="block text-gray-800 text-sm font-bold mb-2"
                        >
                        Category:
                        </label>
                        <input
                        type="text"
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        />
                    </div>

                    <div className="mb-4">
                        <label
                        className="block text-gray-800 text-sm font-bold mb-2"
                        >
                        Location:
                        </label>
                        <input
                        type="text"
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                        value={eventLocation}
                        onChange={(e) => setEventLocation(e.target.value)}
                        required
                        />
                    </div>

                    <div className="mb-4">
                        <label
                        className="block text-gray-800 text-sm font-bold mb-2"
                        >
                        Latitude:
                        </label>
                        <input
                        type="text"
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                        value={lat}
                        onChange={(e) => setLat(e.target.value)}
                        required
                        />
                    </div>

                    <div className="mb-4">
                        <label
                        className="block text-gray-800 text-sm font-bold mb-2"
                        >
                        Longitude:
                        </label>
                        <input
                        type="text"
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                        value={long}
                        onChange={(e) => setLong(e.target.value)}
                        required
                        />
                    </div>

                    <div className="mb-4">
                        <label
                        className="block text-gray-800 text-sm font-bold mb-2"
                        >
                        Duration:
                        </label>
                        <input
                        type="text"
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        required
                        />
                    </div>

                    <div className="mb-4">
                        <label
                        className="block text-gray-800 text-sm font-bold mb-2"
                        >
                        Description:
                        </label>
                        <input
                        type="text"
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        />
                    </div>

                    <div className="mb-4">
                        <label
                        className="block text-gray-800 text-sm font-bold mb-2"
                        >
                        Image:
                        </label>
                        <input
                        type="text"
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        required
                        />
                    </div>

                    <div className="mb-4">
                        <label
                        className="block text-gray-800 text-sm font-bold mb-2"
                        >
                        Date:
                        </label>
                        <input
                        type="text"
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        />
                    </div>

                    <div className="mb-4">
                        <label
                        className="block text-gray-800 text-sm font-bold mb-2"
                        >
                        Time:
                        </label>
                        <input
                        type="text"
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                        />
                    </div>
                    
                    <button
                        className="bg-blue-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        type="button"
                        onClick={handleCreateEvent}
                    >
                        Submit
                    </button>
            </div>}
    </div>
  );
};

export default CreateEventForm;