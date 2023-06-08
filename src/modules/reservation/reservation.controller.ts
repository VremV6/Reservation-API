import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ReservationService } from './reservation.service';
import { Reservation } from './interfaces/reservation.interface';
import { CustomException } from '../../common/exceptions/custom-exception';
import { AuthGuard } from '@nestjs/passport';
import { GetUser, User } from '../../common/auth-helper';
import { UsersService } from '../user/user.service';
import { Mail } from '../../common/mailer/interfaces/mail.interface';
import { MailService } from '../../common/mailer/mailer.service';

@Controller('reservations')
export class ReservationsController {
  private logger = new Logger(ReservationsController.name);

  constructor(
    private readonly reservationsService: ReservationService,
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
  ) {}

  @Post()
  async create(@Body() createReservationDto: CreateReservationDto) {
    try {
      this.logger.verbose('Creating a new reservation!');
      const reservation = await this.reservationsService.create(
        createReservationDto,
      );

      const company = await this.usersService.findOneById(
        reservation.companyId,
      );
      const emailObject: Mail = {
        start_date: reservation.start_date,
        title: reservation.title,
        company: company.name,
        clientEmail: reservation.email,
      };
      this.logger.verbose(`Email service was used!`);
      await this.mailService.sendEmail(emailObject);

      return reservation;
    } catch (error) {
      throw new CustomException(
        'Rezervarea nu a putut fi facuta!',
        error.status,
      );
    }
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAllForCompany(@GetUser() user: User): Promise<Reservation[]> {
    try {
      this.logger.verbose('Getting all reservations for company!');
      return this.reservationsService.findAllForCompanies(user.userId);
    } catch (error) {
      throw new CustomException(
        'Nu s-au putut gasi rezervarile!',
        error.status,
      );
    }
  }
  @Get('/clients/:id')
  async findAllForClients(@Param('id') id: string): Promise<Reservation[]> {
    try {
      this.logger.verbose('Getting all reservations for clients!');
      return this.reservationsService.findAllForClients(id);
    } catch (error) {
      throw new CustomException(
        'Nu s-au putut gasi rezervarile!',
        error.status,
      );
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Reservation> {
    try {
      this.logger.verbose('Getting reservation by id!');
      const userId: string = user.userId;
      const reservation = await this.reservationsService.findById(id, userId);
      const companyId = reservation.companyId;
      if (userId !== companyId.toString()) {
        return;
      }
      return reservation;
    } catch (error) {
      throw new CustomException('Nu s-a putut gasi rezervarea!', error.status);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Reservation> {
    try {
      this.logger.verbose('Deleting reservation by id!');
      return await this.reservationsService.delete(id);
    } catch (error) {
      throw new CustomException(
        'Nu s-a putut sterge rezervarea!',
        error.status,
      );
    }
  }
}
