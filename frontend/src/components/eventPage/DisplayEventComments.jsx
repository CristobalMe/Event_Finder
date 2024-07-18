import { useState } from 'react'
import axios from 'axios'

const DisplayEventComments = ({ comments, user }) => {
    const [form, setForm] = useState(false)
    const [userComment, setUserComment] = useState('')
    let Logged = false
    const url = import.meta.env.VITE_URL
    const current_link = window.location.pathname
    const current_eventId = current_link.split('/')[2]

    if (!(user == null || user == 'null')) {
        Logged = true
    }

    const toggleForm = () => {
        setForm(!form)
    }

    const handleNewComment = async () => {
        try {
            if (!userComment) {
                alert('Fill out the comment')
                return
            }

            await axios.post(`${url}/comments/${current_eventId}`, {
                userPosting: user.username,
                comment: userComment,
            })

            setUserComment('')

            toggleForm()
            location.reload()
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const renderComments = () => {
        return comments.map((comment) => (
            <div
                className="mx-[1rem] my-[1rem] border-2 border-black rounded h-fit p-[.5rem]"
                key={comment.id}
            >
                <h3 className="text-white font-sans font-bold bg-blue-950 rounded overflow-hidden w-fit h-fit p-[.4rem] mb-[.5rem]">
                    {comment.userPosting}:
                </h3>
                <p className="bg-white h-fit p-[.2rem] break-all">
                    ⊛ {comment.comment}
                </p>
            </div>
        ))
    }

    return (
        <div className="rounded overflow-hidden shadow-lg bg-white h-fit md:w-[50rem] pb-[3rem] xs:w-[22rem]">
            {comments && (
                <div>
                    <div className="flex items-center justify-center m-[1rem] ">
                        <div className="inline m-[1rem]">
                            <h2 className="font-bebas text-3xl">Comments</h2>
                            {Logged && (
                                <div>
                                    <button
                                        className="bg-blue-700 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded"
                                        onClick={toggleForm}
                                    >
                                        Post
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    {form && (
                        <div>
                            <input
                                className="border-2 border-black rounded lg:w-[30rem] md:w-[20rem] h-fit mx-[1rem]"
                                type="text"
                                id="comment"
                                placeholder="Write here"
                                onChange={(e) => setUserComment(e.target.value)}
                            />
                            <button
                                type="button"
                                className="bg-blue-700 hover:bg-blue-950 text-white font-bold py-1 px-2 rounded"
                                onClick={handleNewComment}
                            >
                                Submit
                            </button>
                        </div>
                    )}

                    <section className="comments-grid">
                        {renderComments()}
                    </section>
                </div>
            )}
        </div>
    )
}

export default DisplayEventComments
