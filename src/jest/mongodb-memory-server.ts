import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { disconnect } from 'mongoose';
import { config } from './config';

let mongo: MongoMemoryServer;
jest.setTimeout(60000);

export const rootMongooseTestModule = (options: MongooseModuleOptions = {}) =>
  MongooseModule.forRootAsync({
    useFactory: async () => {
      const instance = (global as any).__MONGOINSTANCE;
      mongo =
        instance ||
        (await MongoMemoryServer.create({
          instance: { ip: config.ip, dbName: config.db, port: config.port },
        }));
      const uri = mongo.getUri();
      return {
        uri: uri,
        ...options,
      };
    },
  });

export const closeMongoConnection = async () => {
  await disconnect();
  if (mongo) await mongo.stop();
};
