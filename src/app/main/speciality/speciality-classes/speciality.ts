import {SpecialityDto} from './speciality-dto';

export class Speciality {
  specialityId: number;
  specialityCode: string;
  specialityName: string;

  constructor(specialityDto: SpecialityDto) {
    this.specialityId = specialityDto.speciality_id;
    this.specialityCode = specialityDto.speciality_code;
    this.specialityName = specialityDto.speciality_name;
  }
}
