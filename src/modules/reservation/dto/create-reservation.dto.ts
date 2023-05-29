import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateReservationDto {
  @IsNotEmpty()
  readonly start_date: Date;
  @IsString()
  @IsOptional()
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  readonly companyId: string;
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
  @IsPhoneNumber('RO')
  @IsNotEmpty()
  readonly phone: string;
  @IsString()
  @IsNotEmpty()
  readonly title: string;
}
