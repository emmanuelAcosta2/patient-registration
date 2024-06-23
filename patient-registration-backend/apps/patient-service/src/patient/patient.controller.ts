import { Controller, Post, Body, UseInterceptors, UploadedFile, Get, ParseFilePipe, FileTypeValidator, Put, Param, Delete, MaxFileSizeValidator, BadRequestException } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) { }

  @Post()
  @UseInterceptors(FileInterceptor('documentPhoto', {

    storage: diskStorage({
      destination: join(__dirname, '..', 'uploads'),
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        return cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  }))
  async create(@Body() createPatientDto: CreatePatientDto, @UploadedFile(
    new ParseFilePipe({
      validators: [
        new FileTypeValidator({ fileType: /(jpg|jpeg)$/ }),
        new MaxFileSizeValidator({ maxSize: MAX_FILE_SIZE }),
      ],
    }),
  ) file: Express.Multer.File) {
    try {
      return this.patientService.create({
        ...createPatientDto,
        documentPhoto: file.filename,
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }

  }

  @Get()
  async findAll() {
    return this.patientService.findAll();
  }
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePatientDto: CreatePatientDto,
  ) {
    try{
      return this.patientService.update(parseInt(id, 10), updatePatientDto);
    }catch(e){
      throw new BadRequestException(e.message);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try{
      return this.patientService.delete(parseInt(id, 10));
    }catch(e){
      throw new BadRequestException(e.message);
    }
  }
}
