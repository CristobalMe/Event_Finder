import Card from "../Card";



const CardGridFavorites = () => {
    const data = [
        {
          "imageUrl": "https://picsum.photos/200/300",
          "name": "Concert in the Park",
          "location": "Central Park, New York City",
          "score": 4.5,
          "numReviews": 100
        },
        {
          "imageUrl": "https://picsum.photos/200/301",
          "name": "Food Festival",
          "location": "Golden Gate Park, San Francisco",
          "score": 4.2,
          "numReviews": 50
        },
        {
          "imageUrl": "https://picsum.photos/200/302",
          "name": "Art Exhibition",
          "location": "The Metropolitan Museum of Art, New York City",
          "score": 4.8,
          "numReviews": 200
        },
        {
          "imageUrl": "https://picsum.photos/200/303",
          "name": "Marathon",
          "location": "Chicago, Illinois",
          "score": 4.6,
          "numReviews": 150
        },
        {
          "imageUrl": "https://picsum.photos/200/304",
          "name": "Comedy Show",
          "location": "The Comedy Store, Los Angeles",
          "score": 4.9,
          "numReviews": 300
        },
        {
          "imageUrl": "https://picsum.photos/200/305",
          "name": "Fashion Show",
          "location": "New York Fashion Week, New York City",
          "score": 4.7,
          "numReviews": 250
        },
        {
          "imageUrl": "https://picsum.photos/200/306",
          "name": "Music Festival",
          "location": "Coachella Valley Music and Arts Festival, Indio",
          "score": 4.4,
          "numReviews": 400
        },
        {
          "imageUrl": "https://picsum.photos/200/307",
          "name": "Sports Game",
          "location": "Madison Square Garden, New York City",
          "score": 4.3,
          "numReviews": 350
        },
        {
          "imageUrl": "https://picsum.photos/200/308",
          "name": "Wine Tasting",
          "location": "Napa Valley, California",
          "score": 4.1,
          "numReviews": 200
        },
        {
          "imageUrl": "https://picsum.photos/200/309",
          "name": "Book Signing",
          "location": "Barnes & Noble, New York City",
          "score": 4.0,
          "numReviews": 100
        }
      ]
    
    return (
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 ">
        {data.map((d) => (
            <div className="m-[3rem]">
              <Card data={d} />
            </div>
        ))}
      </div>
    );
  };
  
  export default CardGridFavorites;