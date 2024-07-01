const CarouselCard = ({data}) => {
    return(
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white h-[20rem] w-[15rem] hover:bg-neutral-300">
        <img className="h-[10rem] w-[15rem]" src={data.imageUrl} onerror="this.src='https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg';" />
        <div className="px-3 py-4 flex flex-col justify-center items-center">
          <div className="font-bold text-base mb-2 mx-[1.3rem]">{data.name}</div>
          <p className="text-gray-700 text-sm mx-[1.1rem]">
            📍{data.location}
          </p>


          <div className="flex items-center mt-[2.5rem]">
                {/* checkbox from: https://flowbite.com/docs/forms/checkbox/ */}
                <input id="bordered-checkbox-1" type="checkbox" value="" name="bordered-checkbox" className=" mx-[1.5rem] w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />

                {/* stars from: https://flowbite.com/docs/components/rating/ */}
                <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <p className="ms-2 text-sm font-bold text-gray-900 dark:text-white">{data.score}</p>
                <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                <a className="text-sm font-medium text-gray-900  hover:no-underline dark:text-white">{data.numReviews} reviews</a>
          </div>
        </div>


        
        
      </div>
    );
};

export default CarouselCard;
