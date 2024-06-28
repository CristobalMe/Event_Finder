import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CarouselCard from "./CarouselCard.jsx";
import data from "../../data.js"


const Carousel = () => {


      var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1025,
            settings: {
              slidesToShow: 2,
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
            }
          }
        ]
      };

    
    return (
        <section>
            <div>
                <Slider {...settings}>
                    {data.map((d) => (
                        <CarouselCard data={d} />
                    ))}
                </Slider>
            </div>
        </section>
    );
  };
  
  export default Carousel;