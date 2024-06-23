import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from 'libs/database/src/entities/patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { PatientDto } from './dto/patient-dto';
import { join } from 'path';
import { readFile } from 'fs/promises';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
    @InjectQueue('notification')
    private readonly notificationQueue: Queue,
  ) { }

  /**
   * Create a new patient
   * @param createPatientDto 
   * @returns 
   */
  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    const patient = this.patientRepository.create(createPatientDto);
    await this.patientRepository.save(patient);
    await this.notificationQueue.add('send-email', {
      email: createPatientDto.email,
      subject: 'Patient Registration Confirmation',
      text: 'You have been successfully registered.',
    });
    return patient;
  }

  /**
   * Find all patients
   * @returns 
   */
  async findAll(): Promise<PatientDto[]> {
    const patients = await this.patientRepository.find();
    return patients.map(patient => new PatientDto(patient));
  }
  /**
   * Find a patient by ID
   * @param id 
   * @param updatePatientDto 
   * @returns 
   */
  async update(id: number, updatePatientDto: CreatePatientDto): Promise<Patient> {
    const patient = await this.patientRepository.findOneBy({
      id,
    })
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
    Object.assign(patient, updatePatientDto);
    await this.patientRepository.save(patient);

    return patient;
  }

  /**
   * Delete a patient by ID
   * @param id 
   */
  async delete(id: number): Promise<void> {
    const patient = await this.patientRepository.findOneBy({ id })
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }

    try {
      await this.patientRepository.delete(id);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
