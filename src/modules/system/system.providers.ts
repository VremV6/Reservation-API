import { Connection } from 'mongoose';
import { SystemSchema } from './schemas/system.schema';
import { Constants } from '../../common/constants';

export const systemProviders = [
  {
    provide: Constants.SYSTEM_MODEL,
    useFactory: (connection: Connection) =>
      connection.model(Constants.SYSTEM, SystemSchema),
    inject: [Constants.DATABASE_CONNECTION],
  },
];
