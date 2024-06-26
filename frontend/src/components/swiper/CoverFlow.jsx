import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import CoverFlowCard from './CoverFlowCard';



// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';


const CoverFlow = () => {

  const data = [
    {
      "imageUrl": "https://picsum.photos/800/300",
      "name": "Concert in the Park",
      "location": "Central Park, New York City",
      "score": 4.5,
      "numReviews": 100,
      "id": 1
    },
    {
      "imageUrl": "https://picsum.photos/800/301",
      "name": "Food Festival",
      "location": "Golden Gate Park, San Francisco",
      "score": 4.2,
      "numReviews": 50,
      "id": 2
    },
    {
      "imageUrl": "https://picsum.photos/800/302",
      "name": "Art Exhibition",
      "location": "The Metropolitan Museum of Art, New York City",
      "score": 4.8,
      "numReviews": 200,
      "id": 3
    },
    {
      "imageUrl": "https://picsum.photos/800/303",
      "name": "Marathon",
      "location": "Chicago, Illinois",
      "score": 4.6,
      "numReviews": 150,
      "id": 4
    },
    {
      "imageUrl": "https://picsum.photos/800/304",
      "name": "Comedy Show",
      "location": "The Comedy Store, Los Angeles",
      "score": 4.9,
      "numReviews": 300,
      "id": 5
    },
    {
      "imageUrl": "https://picsum.photos/800/305",
      "name": "Fashion Show",
      "location": "New York Fashion Week, New York City",
      "score": 4.7,
      "numReviews": 250,
      "id": 6
    },
    {
      "imageUrl": "https://picsum.photos/800/306",
      "name": "Music Festival",
      "location": "Coachella Valley Music and Arts Festival, Indio",
      "score": 4.4,
      "numReviews": 400,
      "id": 7
    },
    {
      "imageUrl": "https://picsum.photos/800/307",
      "name": "Sports Game",
      "location": "Madison Square Garden, New York City",
      "score": 4.3,
      "numReviews": 350,
      "id": 8
    },
    {
      "imageUrl": "https://picsum.photos/800/308",
      "name": "Wine Tasting",
      "location": "Napa Valley, California",
      "score": 4.1,
      "numReviews": 200,
      "id": 9
    },
    {
      "imageUrl": "https://picsum.photos/800/309",
      "name": "Book Signing",
      "location": "Barnes & Noble, New York City",
      "score": 4.0,
      "numReviews": 100,
      "id": 10
    }
  ]



  return (
    <div className='w-[30rem] h-[20rem]'>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 10,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        showsPagination={false}
        loop={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >

        {data.map((d) => (
                <SwiperSlide>
                  <CoverFlowCard data={d} />
                </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
}

export default CoverFlow;