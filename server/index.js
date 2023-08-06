import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import postRoutes from './routes/posts.js';
import userRouter from './routes/user.js';
import Carriers from './routes/Carriers.js';
import Invoices from './routes/Invoices.js';
import Loads from './routes/Loads.js';
import Drafts from './routes/Drafts.js';

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

app.use('/posts', postRoutes);
app.use('/user', userRouter);
app.use('/carriers', Carriers);
app.use('/invoices', Invoices);
app.use('/loads', Loads);
app.use('/drafts', Drafts);

const CONNECTION_URL = 'mongodb+srv://charlesabryanjr:aXKIGoqPFxF5SZ2g@cluster0.9hpnbkf.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 3001;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on Port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`${error} did not connect`);
  });

mongoose.set('useFindAndModify', false);