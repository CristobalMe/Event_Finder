const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


const events = [
    {
      rating: 4.5,
      location: "New York, NY",
      name: "Concert in Central Park",
      duration: "2 hours",
      description: "Enjoy live music from your favorite artists in the heart of New York City.",
      image: "https://picsum.photos/200/306",
      category: "Music",
      userId: 1,
      date: "09/14/2024",
      time: "1pm",
      lat: 19.432608,
      long: -99.133209
    },
    {
      rating: 4.2,
      location: "San Francisco, CA",
      name: "Golden Gate Bridge Tour",
      duration: "1 hour",
      description: "Take a guided tour of one of the world's most iconic landmarks.",
      image: "https://picsum.photos/200/307",
      category: "Sightseeing",
      userId: 1,
      date: "09/14/2024",
      time: "1pm",
      lat: 19.432608,
      long: -99.133209
    },
    {
      rating: 4.8,
      location: "Chicago, IL",
      name: "Chicago Food Tour",
      duration: "3 hours",
      description: "Sample the best of Chicago's culinary scene on this guided food tour.",
      image: "https://picsum.photos/200/308",
      category: "Food & Drink",
      userId: 1,
      date: "09/14/2024",
      time: "1pm",
      lat: 19.432608,
      long: -99.133209
    },
    {
      rating: 4.7,
      location: "Los Angeles, CA",
      name: "Hollywood Walk of Fame Tour",
      duration: "2 hours",
      description: "Explore the famous Hollywood Walk of Fame and learn about its history.",
      image: "https://picsum.photos/200/309",
      category: "Sightseeing",
      userId: 1,
      date: "09/14/2024",
      time: "1pm",
      lat: 19.432608,
      long: -99.133209
    },
    {
      rating: 4.6,
      location: "Las Vegas, NV",
      name: "Cirque du Soleil Show",
      duration: "2 hours",
      description: "Experience the magic and wonder of Cirque du Soleil's latest production.",
      image: "https://picsum.photos/200/310",
      category: "Entertainment",
      userId: 1,
      date: "09/14/2024",
      time: "1pm",
      lat: 19.432608,
      long: -99.133209
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