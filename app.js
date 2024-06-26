require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();




// authenticateUser
const { authenticateUser } = require('./middleware/authentication');

// connect to DB
const connectDB = require('./db/connect');

//routes
const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
// extra packages

// routes

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();


















// For deleting Documents
// const codes = require('http-status-codes');
// const User = require('./models/User');
// app.delete('/api/v1/delete', async (req, res) => {
//   const user = await User.deleteMany({})
//   console.log(user);
//   res.status(codes.StatusCodes.OK).json(user)
// })