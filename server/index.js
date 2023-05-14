import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// import dotenv from 'dotenv';
// dotenv.config();

import mongoose from 'mongoose';

import postRoutes from './routes/posts.js';
import userRouter from "./routes/user.js";

const app = express();

const corsOptions = {
  origin: 'http://localhost:3001',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

app.use('/posts', postRoutes);
app.use("/user", userRouter);

app.get('/', (req, res) => {
  res.send('APP IS RUNNING');
});

const CONNECTION_URL = 'mongodb+srv://charlesabryanjr:aXKIGoqPFxF5SZ2g@cluster0.9hpnbkf.mongodb.net/?retryWrites=true&w=majority';

const PORT = process.env.PORT || 3001;

// mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
//   .catch((error) => console.log(`${error} did not connect`));

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(process.env.PORT, () => console.log(`Server Running on Port: ${process.env.PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));


mongoose.set('useFindAndModify', false);