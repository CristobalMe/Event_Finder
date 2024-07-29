const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// events was generated using metamate (except image)
const events = [
    {
      rating: 4.5,
      location: "San Francisco, CA",
      name: "Golden Gate Park Festival",
      duration: "2 days",
      description: "A music and food festival in Golden Gate Park featuring local and international artists.",
      image: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Golden_Gate_Bridge_as_seen_from_Battery_East.jpg",
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
      image: "https://www.eastbaytimes.com/wp-content/uploads/2023/10/EBT-L-AUTUMN-10XX-1-1.jpg?w=1024",
      category: "Art",
      userId: 1,
      date: "2024-07-30T00:00:00Z",
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
      image: "https://www.mercurynews.com/wp-content/uploads/2022/04/SJM-L-PIZARRO-COL-0421_96937108.jpg?w=978",
      category: "Party",
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
      image: "https://recordmecca.com/wp-content/uploads/mqc/603_large_1.jpg",
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
      image: "https://beachboardwalk.com/wp-content/uploads/2021/09/Typhoon-Ride-20170707-114.jpg",
      category: "Art",
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
      image: "https://cdn.instartupland.com/wp-content/uploads/2012/10/30204422/paiff.CF007787.web_.jpg",
      category: "Film",
      userId: 1,
      date: "2025-11-02T00:00:00Z",
      time: "12:00 PM - 10:00 PM",
      lat: 37.4293,
      long: -122.1381
    },
    // new data
    {
    rating: 4.8,
    location: "San Francisco, CA",
    name: "Outside Lands Music Festival",
    duration: "3 days",
    description: "A music festival featuring a diverse lineup of artists and bands, along with food, art, and comedy.",
    image: "https://imageio.forbes.com/specials-images/imageserve/64ba1a6ba6c6446bad9a6bb9/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds",
    category: "Music",
    userId: 1,
    date: "2025-08-28T00:00:00Z",
    time: "12:00 PM - 10:00 PM",
    lat: 37.7749,
    long: -122.4194
    },
    {
    rating: 4.7,
    location: "Oakland, CA",
    name: "Art + Soul Oakland",
    duration: "2 days",
    description: "A celebration of art, music, and culture featuring live performances, art exhibitions, and food vendors.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRleD2i73B3fV23UTwMi5IkLWc2e23JODeWqQ&s",
    category: "Art",
    userId: 1,
    date: "2025-07-17T00:00:00Z",
    time: "12:00 PM - 6:00 PM",
    lat: 37.8043,
    long: -122.2715
    },
    {
    rating: 4.6,
    location: "Palo Alto, CA",
    name: "Palo Alto Art Fair",
    duration: "2 days",
    description: "An outdoor art fair featuring works by local and national artists, along with live music and food vendors.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI34IxgVBM3pypn9iLniyNVnxUTgJeDxFDeg&s",
    category: "Art",
    userId: 1,
    date: "2025-05-16T00:00:00Z",
    time: "10:00 AM - 6:00 PM",
    lat: 37.4294,
    long: -122.1381
    },
    {
    rating: 4.5,
    location: "Berkeley, CA",
    name: "Berkeley Kite Festival",
    duration: "1 day",
    description: "A family-friendly event featuring kite flying, live music, and food vendors.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2VUl-t53R28r7Xv1zYvFl7MFO9K05SLszaA&s",
    category: "Party",
    userId: 1,
    date: "2025-07-26T00:00:00Z",
    time: "11:00 AM - 5:00 PM",
    lat: 37.8688,
    long: -122.2669
    },
    {
    rating: 4.4,
    location: "San Jose, CA",
    name: "San Jose Jazz Summer Fest",
    duration: "3 days",
    description: "A jazz music festival featuring performances by local and international musicians.",
    image: "https://summerfest.sanjosejazz.org/wp-content/uploads/2024/03/SJZ-summer-fest-logo-tagline.png",
    category: "Music",
    userId: 1,
    date: "2025-08-14T00:00:00Z",
    time: "12:00 PM - 10:00 PM",
    lat: 37.3382,
    long: -121.8863
    },

    {
    rating: 4.9,
    location: "San Francisco, CA",
    name: "San Francisco Ballet's Nutcracker",
    duration: "2 hours",
    description: "A classic ballet performance of The Nutcracker, featuring the San Francisco Ballet company.",
    image: "https://cdn.sfballet.org/20221018112900/NUT2021DRE_ET30169_CE-1-scaled.jpg",
    category: "Dance",
    userId: 1,
    date: "2025-12-15T00:00:00Z",
    time: "7:30 PM - 9:30 PM",
    lat: 37.7749,
    long: -122.4194
    },
    {
    rating: 4.8,
    location: "Oakland, CA",
    name: "Oakland Comedy Festival",
    duration: "3 days",
    description: "A comedy festival featuring stand-up performances by local and national comedians.",
    image: "https://static1.squarespace.com/static/5c98025094d71a36a92f2c88/t/6622f6271356b204523b67be/1713567271096/2024OCF2500x2500logo%282%29.png?format=1500w",
    category: "Comedy",
    userId: 1,
    date: "2025-04-15T00:00:00Z",
    time: "8:00 PM - 10:00 PM",
    lat: 37.8043,
    long: -122.2715
    },
    {
    rating: 4.6,
    location: "Berkeley, CA",
    name: "Berkeley Food Festival",
    duration: "2 days",
    description: "A food festival featuring local restaurants, food trucks, and artisanal vendors.",
    image: "https://ww2.kqed.org/app/uploads/sites/2/2022/07/IMG_0166-800x534.jpg",
    category: "Food",
    userId: 1,
    date: "2025-02-20T00:00:00Z",
    time: "11:00 AM - 5:00 PM",
    lat: 37.8688,
    long: -122.2669
    },
    {
    rating: 4.5,
    location: "San Jose, CA",
    name: "San Jose Earthquakes Soccer Match",
    duration: "2 hours",
    description: "A professional soccer match featuring the San Jose Earthquakes team.",
    image: "https://www.mercurynews.com/wp-content/uploads/2024/06/BNG-L-QUAKES-0623_42db53.jpg?w=525",
    category: "Sports",
    userId: 1,
    date: "2025-06-15T00:00:00Z",
    time: "7:30 PM - 9:30 PM",
    lat: 37.3382,
    long: -121.8863
    },

    {
    rating: 4.9,
    location: "San Francisco, CA",
    name: "Symphony's Beethoven's Ninth",
    duration: "2 hours",
    description: "A classical music performance of Beethoven's Ninth Symphony by the San Francisco Symphony.",
    image: "https://www.wfmt.com/cdn-cgi/image/width=1600,height=900,quality=80,format=auto,onerror=redirect,metadata=none/wp-content/uploads/2020/04/SFS_onstage_Credit_StefanCohen.jpg",
    category: "Music",
    userId: 1,
    date: "2025-05-15T00:00:00Z",
    time: "8:00 PM - 10:00 PM",
    lat: 37.7749,
    long: -122.4194
    },
    {
    rating: 4.8,
    location: "Oakland, CA",
    name: "Oakland Art Murmur",
    duration: "6 hours",
    description: "An art festival featuring local artists, live music, and food vendors.",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Oakland_Art_Murmur_Warehouse_416_2012-06.jpg",
    category: "Art",
    userId: 1,
    date: "2025-04-20T00:00:00Z",
    time: "12:00 PM - 6:00 PM",
    lat: 37.8043,
    long: -122.2715
    },
    {
    rating: 4.7,
    location: "Palo Alto, CA",
    name: "Palo Alto Fitness Festival",
    duration: "2 days",
    description: "A fitness festival featuring workout classes, healthy food vendors, and wellness workshops.",
    image: "https://resources.chatterblock.com/media/files/activities_images/fitness-festival-None-e764b6.png",
    category: "Fitness",
    userId: 1,
    date: "2025-03-15T00:00:00Z",
    time: "9:00 AM - 5:00 PM",
    lat: 37.4294,
    long: -122.1381
    },
    {
    rating: 4.6,
    location: "Berkeley, CA",
    name: "Berkeley Music Festival",
    duration: "2 days",
    description: "A music festival featuring local and national musicians, with food and drink vendors.",
    image: "https://sites.northwestern.edu/bfmf/files/2021/05/Mississippi-John-Hurt-Hearst-Greek-Amphitheater-1964-Berkeley-Folk-Music-Festival-Jubilee-Concert_1964_BFMF_864c18a2721a.jpeg",
    category: "Music",
    userId: 1,
    date: "2025-02-25T00:00:00Z",
    time: "12:00 PM - 10:00 PM",
    lat: 37.8688,
    long: -122.2669
    },
    {
    rating: 4.5,
    location: "San Jose, CA",
    name: "San Jose Sharks Hockey Game",
    duration: "2 hours",
    description: "A professional hockey game featuring the San Jose Sharks team.",
    image: "https://seatgeek.com/_next/image?url=https%3A%2F%2Fseatgeek.com%2Fimages%2Fperformers-landscape%2Fsan-jose-sharks-cb0065%2F2147%2F1100x1900.jpg&w=3840&q=75",
    category: "Sports",
    userId: 1,
    date: "2025-06-20T00:00:00Z",
    time: "7:30 PM - 9:30 PM",
    lat: 37.3382,
    long: -121.8863
    },

    {
    rating: 4.9,
    location: "San Francisco, CA",
    name: "San Francisco Pride Parade",
    duration: "2 days",
    description: "A celebration of LGBTQ+ pride, featuring a parade, live music, and food vendors.",
    image: "https://www.sftravel.com/sites/default/files/styles/hero/public/2022-12/san-francisco-pride-parade-rainbow-flags.jpg.webp?itok=axruC3xr",
    category: "Party",
    userId: 1,
    date: "2025-06-25T00:00:00Z",
    time: "12:00 PM - 6:00 PM",
    lat: 37.7749,
    long: -122.4194
    },
    {
    rating: 4.8,
    location: "Oakland, CA",
    name: "Oakland Jazz Festival",
    duration: "3 days",
    description: "A jazz festival featuring local and national musicians, with food and drink vendors.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbpWb5UWsdnukUEXgoy9IhLCZnW9MXTfKZxg&s",
    category: "Music",
    userId: 1,
    date: "2025-05-20T00:00:00Z",
    time: "12:00 PM - 10:00 PM",
    lat: 37.8043,
    long: -122.2715
    },
    {
    rating: 4.7,
    location: "Palo Alto, CA",
    name: "Palo Alto Art Center's Art in the Park",
    duration: "1 day",
    description: "An art festival featuring local artists, live music, and food vendors.",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/32/Palo_Alto_Art_Center_-_February_2019.jpg",
    category: "Art",
    userId: 1,
    date: "2025-03-20T00:00:00Z",
    time: "10:00 AM - 5:00 PM",
    lat: 37.4294,
    long: -122.1381
    },
    {
    rating: 4.6,
    location: "Berkeley, CA",
    name: "Berkeley Food Truck Festival",
    duration: "1 day",
    description: "A food truck festival featuring local food trucks, live music, and beer gardens.",
    image: "https://cdn2.allevents.in/thumbs/thumb66833b35af310.jpg",
    category: "Food",
    userId: 1,
    date: "2025-02-20T00:00:00Z",
    time: "12:00 PM - 5:00 PM",
    lat: 37.8688,
    long: -122.2669
    },

    {
    rating: 4.9,
    location: "San Francisco, CA",
    name: "International Film Festival",
    duration: "2 weeks",
    description: "A film festival showcasing new releases and classic films, with Q&A sessions and workshops.",
    image: "https://drupal8-prod.visitcalifornia.com/sites/drupal8-prod.visitcalifornia.com/files/SFFilm_CourtesySanFranciscoFilmSociety_1280x642_0.jpg",
    category: "Film",
    userId: 1,
    date: "2025-04-15T00:00:00Z",
    time: "12:00 PM - 10:00 PM",
    lat: 37.7749,
    long: -122.4194
    },
    {
    rating: 4.8,
    location: "Oakland, CA",
    name: "Oakland White Elephant Sale",
    duration: "1 day",
    description: "A sale featuring art, antiques, and collectibles, with proceeds benefiting the Oakland Museum of California.",
    image: "https://www.eastbaytimes.com/wp-content/uploads/2020/01/MOP-L-ELEPHSALE-0117-1.jpg?w=978",
    category: "Art",
    userId: 1,
    date: "2025-03-20T00:00:00Z",
    time: "10:00 AM - 5:00 PM",
    lat: 37.8043,
    long: -122.2715
    },
    {
    rating: 4.7,
    location: "Palo Alto, CA",
    name: "Palo Alto Farmers' Market",
    duration: "1 day",
    description: "A weekly farmers' market featuring local produce, artisanal goods, and live music.",
    image: "https://www.freshapproach.org/wp-content/uploads/2023/09/Website-Page-Bodies-600x6001-1.jpg",
    category: "Food",
    userId: 1,
    date: "2025-02-20T00:00:00Z",
    time: "9:00 AM - 1:00 PM",
    lat: 37.4294,
    long: -122.1381
    },
    {
    rating: 4.6,
    location: "Berkeley, CA",
    name: "Berkeley Outdoor Cinema",
    duration: "1 night",
    description: "An outdoor cinema screening featuring a classic film, with live music and food vendors.",
    image: "https://bamlive.s3.amazonaws.com/exhibition/Building_Outdoor-Screen_001_o2_1200.jpg",
    category: "Film",
    userId: 1,
    date: "2025-06-15T00:00:00Z",
    time: "8:00 PM - 10:00 PM",
    lat: 37.8688,
    long: -122.2669
    },
    {
    rating: 4.5,
    location: "San Jose, CA",
    name: "San Jose Improv Comedy Club",
    duration: "1 night",
    description: "A comedy club featuring stand-up performances by local and national comedians.",
    image: "https://i3.ypcdn.com/blob/f2935a88bc71a31ad1df4e0c6364e0b4121fb2f0",
    category: "Comedy",
    userId: 1,
    date: "2025-05-20T00:00:00Z",
    time: "8:00 PM - 10:00 PM",
    lat: 37.3382,
    long: -121.8863
    },
    {
      rating: 4.8,
      location: "San Francisco, CA",
      name: "Contemporary Dance Showcase",
      duration: "3 hours",
      description: "Experience an evening of innovative contemporary dance performances by top Bay Area choreographers and dance companies.",
      image: "https://static01.nyt.com/images/2013/01/16/arts/showcase/showcase-articleLarge.jpg?quality=75&auto=webp&disable=upscale",
      category: "Dance",
      userId: 1,
      date: "2025-10-05T00:00:00Z",
      time: "7:00 PM - 10:00 PM",
      lat: 37.7749,
      long: -122.4194
      },
      {
      rating: 4.7,
      location: "Oakland, CA",
      name: "Oakland Fitness Expo",
      duration: "1 day",
      description: "Join fitness enthusiasts at the Oakland Fitness Expo where you can participate in fitness classes, health and wellness seminars, and meet fitness experts.",
      image: "https://i.ytimg.com/vi/RrMGNhAiW2g/maxresdefault.jpg",
      category: "Fitness",
      userId: 1,
      date: "2025-08-20T00:00:00Z",
      time: "9:00 AM - 6:00 PM",
      lat: 37.8043,
      long: -122.2715
      }
]

const users = [
  {
    username: "1",
    email: "1@1.com",
    password: "123",
    lat: 0.0,
    long: 0.0
  },
  {
    username: "4",
    email: "4@4.com",
    password: "456",
    lat: 3.0,
    long: 3.0
  },
  {
    username: "5",
    email: "5@5.com",
    password: "567",
    lat: 4.0,
    long: 4.0
  },
  {
    username: "6",
    email: "6@6.com",
    password: "678",
    lat: 5.0,
    long: 5.0
  },
  {
    username: "7",
    email: "7@7.com",
    password: "789",
    lat: 6.0,
    long: 6.0
  },
  {
    username: "8",
    email: "8@8.com",
    password: "890",
    lat: 7.0,
    long: 7.0
  }
]

const attendances = [
  {
    eventId: 1,
    userAttending: "4"
  },
  {
    eventId: 1,
    userAttending: "5"
  },
  {
    eventId: 2,
    userAttending: "6"
  },
  {
    eventId: 2,
    userAttending: "7"
  },
  {
    eventId: 3,
    userAttending: "8"
  },
  {
    eventId: 3,
    userAttending: "4"
  },
  {
    eventId: 4,
    userAttending: "5"
  },
  {
    eventId: 4,
    userAttending: "6"
  },
  {
    eventId: 5,
    userAttending: "7"
  },
  {
    eventId: 5,
    userAttending: "8"
  },
  {
    eventId: 6,
    userAttending: "4"
  },
  {
    eventId: 6,
    userAttending: "5"
  },
  {
    eventId: 7,
    userAttending: "6"
  },
  {
    eventId: 7,
    userAttending: "7"
  },
  {
    eventId: 8,
    userAttending: "8"
  },
  {
    eventId: 8,
    userAttending: "4"
  },
  {
    eventId: 9,
    userAttending: "5"
  },
  {
    eventId: 9,
    userAttending: "6"
  },
  {
    eventId: 10,
    userAttending: "7"
  },
  {
    eventId: 10,
    userAttending: "8"
  }
]

const rideshares = [
  {
    seatsAvailable: 6,
    departingTime: "2024-07-30T00:00:00Z",
    departingLat: 37.4846632,
    departingLong: -122.1478333,
    arrivalTime: "2024-07-30T00:00:00Z",
    attendanceId: 1,
    eventName: "Golden Gate Park Festival"
  },
  {
    seatsAvailable: 6,
    departingTime: "2024-07-30T00:00:00Z",
    departingLat: 37.4846632,
    departingLong: -122.1478333,
    arrivalTime: "2024-07-30T00:00:00Z",
    attendanceId: 2,
    eventName: "Golden Gate Park Festival"
  },
  {
    seatsAvailable: 6,
    departingTime: "2024-07-30T00:00:00Z",
    departingLat: 37.4846632,
    departingLong: -122.1478333,
    arrivalTime: "2024-07-30T00:00:00Z",
    attendanceId: 3,
    eventName: "Lake Merritt Art Fair"
  },
  {
    seatsAvailable: 6,
    departingTime: "2024-07-30T00:00:00Z",
    departingLat: 37.4846632,
    departingLong: -122.1478333,
    arrivalTime: "2024-07-30T00:00:00Z",
    attendanceId: 4,
    eventName: "Lake Merritt Art Fair"
  },
  {
    seatsAvailable: 6,
    departingTime: "2024-07-30T00:00:00Z",
    departingLat: 37.4846632,
    departingLong: -122.1478333,
    arrivalTime: "2024-07-30T00:00:00Z",
    attendanceId: 5,
    eventName: "Silicon Valley Comic Con"
  },
  {
    seatsAvailable: 6,
    departingTime: "2024-07-30T00:00:00Z",
    departingLat: 37.4846632,
    departingLong: -122.1478333,
    arrivalTime: "2024-07-30T00:00:00Z",
    attendanceId: 6,
    eventName: "Silicon Valley Comic Con"
  },
  {
    seatsAvailable: 6,
    departingTime: "2024-07-30T00:00:00Z",
    departingLat: 37.4846632,
    departingLong: -122.1478333,
    arrivalTime: "2024-07-30T00:00:00Z",
    attendanceId: 7,
    eventName: "Berkeley Jazz Festival"
  },
  {
    seatsAvailable: 6,
    departingTime: "2024-07-30T00:00:00Z",
    departingLat: 37.4846632,
    departingLong: -122.1478333,
    arrivalTime: "2024-07-30T00:00:00Z",
    attendanceId: 8,
    eventName: "Berkeley Jazz Festival"
  },
  {
    seatsAvailable: 6,
    departingTime: "2024-07-30T00:00:00Z",
    departingLat: 37.4846632,
    departingLong: -122.1478333,
    arrivalTime: "2024-07-30T00:00:00Z",
    attendanceId: 9,
    eventName: "Santa Cruz Beach Boardwalk Festival"
  },
  {
    seatsAvailable: 6,
    departingTime: "2024-07-30T00:00:00Z",
    departingLat: 37.4846632,
    departingLong: -122.1478333,
    arrivalTime: "2024-07-30T00:00:00Z",
    attendanceId: 10,
    eventName: "Santa Cruz Beach Boardwalk Festival"
  },
]



async function main(){
    for (let user of users) {
      await prisma.user.create({
          data: user
      })
    }

    for (let event of events) {
        await prisma.event.create({
            data: event
        })
    }
    
    for (let attendance of attendances) {
      await prisma.attendance.create({
          data: attendance
      })
    }

    for (let rideshare of rideshares) {
      await prisma.ridesharing.create({
        data: rideshare
      })
    }
}

main().catch(e => {
    console.log(e);
    process.exit(1)
}).finally(() => {
    prisma.$disconnect
})