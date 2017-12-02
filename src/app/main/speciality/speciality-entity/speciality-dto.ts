import {Speciality} from './speciality';

export class SpecialityDto {
  speciality_id: number;
  speciality_code: string;
  speciality_name: string;

  constructor(speciality: Speciality) {
    this.speciality_id = speciality.specialityId;
    this.speciality_code = speciality.specialityCode;
    this.speciality_name = speciality.specialityName;
  }
}
