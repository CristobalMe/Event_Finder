import React, { useState, useEffect } from "react";
import axios from "axios";

const DisplayEventComments = (comments) => {
    const [form, setForm] = useState(false);
    const [userComment, setUserComment] = useState("");

    let displayComments = comments.comments
    let Logged = false;
    const current_link = window.location.pathname;
    const current_eventId =  current_link.split('/')[2];
    let user = localStorage.getItem('user');

    if ( !(user.includes(null) || user.includes("null")) ){
      Logged = true;
    }

    const toggleForm = () => {
        setForm(!form);
    };

    // const handleNewComment = () => {
    //     console.log("a")
    //     toggleForm();
    // }

    const handleNewComment = async () => {
        try {
          if (!userComment) {
            alert("Fill out the comment");
            return; 
          }
    
          var path2 = path.slice(1);
          var cardId = path2.substring(path2.indexOf('/') + 1);
          console.log(cardId)
    
    
          await axios.post(`http://localhost:3000/comments/${current_eventId}`, {
            userPosting: user,
            comment: userComment 
          });
    
          onSuccess();
    
          setNewCardMessage("");
          setNewCardAuthor("");
    
          onClose();
        } catch (error) {
          console.error("Error:", error);
        }
      };


    const renderComments = () => {
        return displayComments.map((comment) => (
            <div className="mx-[1rem] my-[1rem] border-2 border-black rounded h-fit p-[.5rem]">
                <h3 className="text-white font-sans font-bold bg-blue-950 rounded overflow-hidden w-fit h-fit p-[.4rem] mb-[.5rem]">{comment.userPosting}:</h3>
                <p className="bg-white h-fit p-[.2rem]">⊛ {comment.comment}</p>
            </div>
        ))
    }
    
    return(
        <div className="rounded overflow-hidden shadow-lg bg-white h-fit w-[50rem] pb-[3rem]">
            {displayComments && <div>
                <div className="flex items-center justify-center m-[1rem] ">
                    <div className="inline m-[1rem]">
                        <h2 className="font-bebas text-3xl">Comments</h2>
                        {Logged && <div>
                            <button className='bg-blue-700 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded' onClick={toggleForm}>Post</button>
                        </div>}
                        
                    </div>
                    
                </div>
                
                <section className="comments-grid">{renderComments()}</section>
                
            </div>}
            {form && <div>
                    <input className="border-2 border-black rounded w-[30rem] h-fit mx-[1rem]" type="text" id="comment" placeholder="Write here" onChange={(e) => setUserComment(e.target.value)}/>
                    <button className="submit" onClick={console.log("aaa")}>Submit</button>
                </div>}
        </div>
    );
};

export default DisplayEventComments;