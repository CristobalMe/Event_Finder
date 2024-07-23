const DisplayUserRidesharings = ({ user, userRideshares }) => {
    const renderRidesharings = () => {
        return userRideshares.map((rideshare) => (
            <div
                className="mx-[1rem] my-[1rem] border-2 border-black rounded h-fit p-[.5rem]"
                key={rideshare.id}
            >
                <h3 className="text-white font-sans font-bold bg-blue-950 rounded overflow-hidden w-fit h-fit p-[.4rem] mb-[.5rem]">
                    {rideshare.id}
                </h3>
                <p className="bg-white h-fit p-[.2rem] break-all">
                    ⊛ {rideshare.seatsAvailable} seats available
                </p>
                <p className="bg-white h-fit p-[.2rem] break-all">
                    ⊛ {rideshare.departingTime.substring(0, 10)}
                </p>
                <p className="bg-white h-fit p-[.2rem] break-all">
                    ⊛ {rideshare.departingTime.substring(11, 16)}
                </p>
            </div>
        ))
    }

    return (
        <div className="rounded overflow-hidden shadow-lg bg-white h-fit md:w-[50rem] pb-[3rem] xs:w-[22rem]">
            {true && (
                <div>
                    <div className="flex items-center justify-center m-[1rem] ">
                        <div className="inline m-[1rem]">
                            <h2 className="font-bebas text-3xl">
                                {user.username} Rideshares
                            </h2>
                        </div>
                    </div>

                    <section className="ridesharings-grid">
                        {renderRidesharings()}
                    </section>
                </div>
            )}
        </div>
    )
}

export default DisplayUserRidesharings
