import app from './server/server';
import * as dotenv from 'dotenv';

dotenv.config();

app.listen(3000, () => {
  console.log('ssd has started...')
});