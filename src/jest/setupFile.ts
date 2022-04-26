import { connect, disconnect } from 'mongoose';

afterAll(async () => {
  await disconnect();
});
