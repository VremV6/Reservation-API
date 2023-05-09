import { Connection } from 'mongoose';
import { UserSchema } from './schema/user.schema';
import { Constants } from '../../common/constants';

export const userProviders = [
  {
    provide: Constants.USER_MODEL,
    useFactory: (connection: Connection) =>
      connection.model(Constants.USER, UserSchema),
    inject: [Constants.DATABASE_CONNECTION],
  },
];
