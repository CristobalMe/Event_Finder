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
      date: new Date("09/14/2024"),
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
      date: new Date("09/14/2024"),
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
      date: new Date("09/14/2024"),
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
      date: new Date("09/14/2024"),
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
      date: new Date("09/14/2024"),
      time: "1pm",
      lat: 19.432608,
      long: -99.133209
    },
    {
      rating: 4.5,
      location: "San Francisco, CA",
      name: "Golden Gate Park Festival",
      duration: "2 days",
      description: "A music and food festival in Golden Gate Park featuring local and international artists.",
      image: "https://picsum.photos/200/310",
      category: "Music",
      userId: 1,
      date: "2025-06-17T00:00:00Z",
      time: "12:00 PM - 10:00 PM",
      lat: 37.7749,
      long: -122.4194
    },
    {
      rating: 4.2,
      location: "Oakland, CA",
      name: "Lake Merritt Art Fair",
      duration: "1 day",
      description: "An art fair featuring local artists and artisans selling handmade goods.",
      image: "https://picsum.photos/200/312",
      category: "Art",
      userId: 1,
      date: "2025-07-15T00:00:00Z",
      time: "11:00 AM - 6:00 PM",
      lat: 37.7994,
      long: -122.2717
    },
    {
      rating: 4.8,
      location: "San Jose, CA",
      name: "Silicon Valley Comic Con",
      duration: "3 days",
      description: "A comic book and pop culture convention featuring panels, signings, and vendors.",
      image: "https://picsum.photos/200/313",
      category: "Comics",
      userId: 1,
      date: "2025-08-25T00:00:00Z",
      time: "10:00 AM - 6:00 PM",
      lat: 37.3382,
      long: -121.8863
    },
    {
      rating: 4.9,
      location: "Berkeley, CA",
      name: "Berkeley Jazz Festival",
      duration: "4 days",
      description: "A jazz festival featuring world-renowned musicians and up-and-coming talent.",
      image: "https://picsum.photos/200/316",
      category: "Music",
      userId: 1,
      date: "2025-09-14T00:00:00Z",
      time: "12:00 PM - 10:00 PM",
      lat: 37.8648,
      long: -122.2705
    },
    {
      rating: 4.1,
      location: "Santa Cruz, CA",
      name: "Santa Cruz Beach Boardwalk Festival",
      duration: "2 days",
      description: "A festival celebrating the Santa Cruz Beach Boardwalk's 100th anniversary with live music, food, and games.",
      image: "https://picsum.photos/200/317",
      category: "Festival",
      userId: 1,
      date: "2025-10-07T00:00:00Z",
      time: "11:00 AM - 9:00 PM",
      lat: 36.9653,
      long: -122.0317
    },
    {
      rating: 4.6,
      location: "Palo Alto, CA",
      name: "Palo Alto Film Festival",
      duration: "5 days",
      description: "A film festival showcasing new releases and classic films with Q&A sessions with filmmakers.",
      image: "https://picsum.photos/200/319",
      category: "Film",
      userId: 1,
      date: "2025-11-02T00:00:00Z",
      time: "12:00 PM - 10:00 PM",
      lat: 37.4293,
      long: -122.1381
    }
    
];

async function main(){
    await prisma.user.create({
      data: {
        username: "1",
        email: "1@1.com",
        password: "123",
        lat: 0.0,
        long: 0.0
      }
    })

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