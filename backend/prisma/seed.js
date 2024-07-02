//const {events} = require('./eventData')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


const events = [
    {
      rating: 4.5,
      location: "New York, NY",
      name: "Concert in Central Park",
      duration: "2 hours",
      description: "Enjoy live music from your favorite artists in the heart of New York City.",
      image: "https://example.com/concert-image.jpg",
      category: "Music"
    },
    {
      rating: 4.2,
      location: "San Francisco, CA",
      name: "Golden Gate Bridge Tour",
      duration: "1 hour",
      description: "Take a guided tour of one of the world's most iconic landmarks.",
      image: "https://example.com/bridge-image.jpg",
      category: "Sightseeing"
    },
    {
      rating: 4.8,
      location: "Chicago, IL",
      name: "Chicago Food Tour",
      duration: "3 hours",
      description: "Sample the best of Chicago's culinary scene on this guided food tour.",
      image: "https://example.com/food-image.jpg",
      category: "Food & Drink"
    },
    {
      rating: 4.7,
      location: "Los Angeles, CA",
      name: "Hollywood Walk of Fame Tour",
      duration: "2 hours",
      description: "Explore the famous Hollywood Walk of Fame and learn about its history.",
      image: "https://example.com/hollywood-image.jpg",
      category: "Sightseeing"
    },
    {
      rating: 4.6,
      location: "Las Vegas, NV",
      name: "Cirque du Soleil Show",
      duration: "2 hours",
      description: "Experience the magic and wonder of Cirque du Soleil's latest production.",
      image: "https://example.com/cirque-image.jpg",
      category: "Entertainment"
    },
    
];

async function main(){
    for (let event of events) {
        await prisma.event.create({
            data: event
        })
    }
}

main().catch(e => {
    console.log(e);
    process.exit(1)
}).finally(() => {
    prisma.$disconnect
})