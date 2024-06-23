import { IsImageFile } from '@app/common/validations/validations.service';
import { IsString, IsEmail, Matches } from 'class-validator';
import { Unique } from 'typeorm';
export class CreatePatientDto {
  @IsString()
  @Matches(/^[A-Za-z\s]+$/, { message: 'Only letters are allowed' })
  name: string;

  @IsEmail()
  @Matches(/@gmail\.com$/, { message: 'Only Gmail addresses are allowed' })
  email: string;

  @IsString()
  phoneCountryCode: string;

  @IsString()
  phoneNumber: string;

  @IsImageFile()
  documentPhoto: string;
}
