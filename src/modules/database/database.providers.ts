import * as mongoose from 'mongoose';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs-extra');
const config = fs.readJsonSync('./src/config/config.json');

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(`${config.mongodb.uri}`),
  },
];
