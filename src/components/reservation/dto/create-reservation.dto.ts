export class CreateReservationDto {
  readonly start_date: Date;
  readonly end_date: Date;
  readonly name: string;
  readonly description: string;
}
