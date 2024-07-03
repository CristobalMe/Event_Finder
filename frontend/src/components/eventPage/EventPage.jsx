import React, { useState, useEffect } from "react";
import Header from "../header/Header";
import DisplayEventInfo from "./DisplayEventInfo";
import DisplayEventComments from "./DisplayEventComments";

const EventPage = () => {
    const current_link = window.location.pathname;
    const current_eventId =  current_link.split('/')[2];
    const [event, setEvent] = useState();
    const [comments, setComments] = useState();
    let [ changeInEvent, setchangeInEvent] = useState(true);

    useEffect(() => {
        if (changeInEvent){
            fetchEvent()
            fetchComments()
        };
        setchangeInEvent(false)
      }, [event]);

    const fetchEvent = () => {
        fetch(`http://localhost:3000${current_link}`)
            .then(response => response.json())
            .then(data => setEvent(data))
            .catch(error => console.error('Error fetching:', error))
    }
    
    const fetchComments = () => {
        fetch(`http://localhost:3000/comments/${current_eventId}`)
            .then(response => response.json())
            .then(data => setComments(data))
            .catch(error => console.error('Error fetching:', error))
    }

    

    
    //console.log(event)
    //console.log(comments)

    
    return(
        <div>
            <Header />
            <div className="h-screen flex items-center justify-center"><DisplayEventInfo event={event}/></div>
            <div className="h-screen flex items-center justify-center"><DisplayEventComments comments={comments}/></div>
        </div>
    );
};

export default EventPage;