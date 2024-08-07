const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const SequelizeStoreInit = require('connect-session-sequelize');
const session = require('express-session');
const Sequelize = require('sequelize');
const app = express()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json())
app.use(morgan())

const newSequelize = new Sequelize('event_finder', 'postgres', '1025323', {
    host: 'localhost',
    dialect: 'postgres'
});

const SequelizeStore = SequelizeStoreInit(session.Store);
const sessionStore = new SequelizeStore({
  db: newSequelize
});

app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      sameSite: false,
      secure: false,
      expires: new Date(Date.now() + (365 * 24 * 60 * 60 * 1000)) // 1 year in milliseconds
    }
  })
);
sessionStore.sync();

const eventRoutes = require("./routes/eventRoutes")
const userRoutes = require("./routes/userRoutes")
const commentRoutes = require("./routes/commentRoutes")
const attendanceRoutes = require("./routes/attendanceRoutes")
const ridesharingRoutes = require("./routes/ridesharingRoutes")

app.use('/event', eventRoutes)
app.use('/users', userRoutes)
app.use('/comments', commentRoutes)
app.use('/attendance', attendanceRoutes)
app.use('/ridesharing', ridesharingRoutes)

newSequelize.sync({ alter: true })
  .then(() => {
    const port = 3000;
    app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
  });