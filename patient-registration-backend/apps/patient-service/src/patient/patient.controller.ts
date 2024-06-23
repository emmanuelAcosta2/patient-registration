import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Get,
  Put,
  Param,
  Delete,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('documentPhoto', {
      storage: diskStorage({
        destination: join(__dirname, '..', 'uploads'),
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => (Math.round(Math.random() * 16)).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async create(
    @Body() createPatientDto: CreatePatientDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: /(jpg|jpeg)$/ }),
          new MaxFileSizeValidator({ maxSize: MAX_FILE_SIZE }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    try {
      return await this.patientService.create({
        ...createPatientDto,
        documentPhoto: file.filename,
      });
    } catch (error) {
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.patientService.findAll();
    } catch (error) {
      throw new InternalServerErrorException('An unexpected error occurred while fetching patients');
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePatientDto: CreatePatientDto,
  ) {
    try {
      return await this.patientService.update(parseInt(id, 10), updatePatientDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Patient with ID ${id} not found`);
      }
      throw new BadRequestException('An error occurred while updating the patient');
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.patientService.delete(parseInt(id, 10));
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Patient with ID ${id} not found`);
      }
      throw new InternalServerErrorException('An error occurred while deleting the patient');
    }
  }
}
