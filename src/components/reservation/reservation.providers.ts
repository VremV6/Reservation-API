import { Connection } from 'mongoose';
import { ReservationSchema } from './schemas/reservation.schema';
import { Constants } from '../../common/constants';

export const reservationProviders = [
  {
    provide: Constants.RESERVATION_MODEL,
    useFactory: (connection: Connection) =>
      connection.model(Constants.RESERVATION, ReservationSchema),
    inject: [Constants.DATABASE_CONNECTION],
  },
];
