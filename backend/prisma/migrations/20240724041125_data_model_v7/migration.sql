-- CreateTable
CREATE TABLE "event" (
    "id" SERIAL NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "location" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "long" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "long" DOUBLE PRECISION NOT NULL,
    "cellphoneNumber" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment" (
    "id" SERIAL NOT NULL,
    "userPosting" TEXT NOT NULL,
    "eventId" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attendance" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "userAttending" TEXT NOT NULL,
    "ridesharingId" INTEGER,

    CONSTRAINT "attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ridesharingUserPreferencesForEvent" (
    "id" SERIAL NOT NULL,
    "preferedLocationLat" DOUBLE PRECISION,
    "preferedLocationLong" DOUBLE PRECISION,
    "preferedArrivalTime" TIMESTAMP(3) NOT NULL,
    "numberOfSeatsNeeded" INTEGER NOT NULL,
    "attendanceId" INTEGER NOT NULL,
    "ridesharingId" INTEGER,

    CONSTRAINT "ridesharingUserPreferencesForEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ridesharing" (
    "id" SERIAL NOT NULL,
    "seatsAvailable" INTEGER NOT NULL,
    "departingTime" TIMESTAMP(3) NOT NULL,
    "departingLat" DOUBLE PRECISION NOT NULL,
    "departingLong" DOUBLE PRECISION NOT NULL,
    "arrivalTime" TIMESTAMP(3) NOT NULL,
    "attendanceId" INTEGER NOT NULL,
    "eventName" TEXT NOT NULL,

    CONSTRAINT "ridesharing_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_cellphoneNumber_key" ON "user"("cellphoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "ridesharingUserPreferencesForEvent_attendanceId_key" ON "ridesharingUserPreferencesForEvent"("attendanceId");

-- CreateIndex
CREATE UNIQUE INDEX "ridesharing_attendanceId_key" ON "ridesharing"("attendanceId");

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_userAttending_fkey" FOREIGN KEY ("userAttending") REFERENCES "user"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ridesharingUserPreferencesForEvent" ADD CONSTRAINT "ridesharingUserPreferencesForEvent_attendanceId_fkey" FOREIGN KEY ("attendanceId") REFERENCES "attendance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ridesharingUserPreferencesForEvent" ADD CONSTRAINT "ridesharingUserPreferencesForEvent_ridesharingId_fkey" FOREIGN KEY ("ridesharingId") REFERENCES "ridesharing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ridesharing" ADD CONSTRAINT "ridesharing_attendanceId_fkey" FOREIGN KEY ("attendanceId") REFERENCES "attendance"("id") ON DELETE CASCADE ON UPDATE CASCADE;
