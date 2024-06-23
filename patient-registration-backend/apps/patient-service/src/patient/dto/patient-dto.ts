import { Patient } from "@app/database/entities/patient.entity";

export class PatientDto {
  id: number;
  name: string;
  email: string;
  phoneCountryCode: string;
  phoneNumber: string;
  documentPhoto: string;
  constructor(patient: Patient) {
    this.name = patient.name;
    this.email = patient.email;
    this.phoneCountryCode = patient.phoneCountryCode;
    this.phoneNumber = patient.phoneNumber;
    this.documentPhoto = patient.documentPhoto;
    this.id = patient.id;
  }
}