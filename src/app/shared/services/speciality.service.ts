import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Speciality} from '../entities/speciality';
import {Observable} from 'rxjs/Observable';
import {SpecialityDto} from './dto/speciality-dto';

@Injectable()
export class SpecialityService {
  URL = '/Speciality';
  static toSpecialityDto(speciality: Speciality): SpecialityDto {
    const dto = new SpecialityDto();
    dto.speciality_id = speciality.specialityId;
    dto.speciality_code = speciality.specialityCode;
    dto.speciality_name = speciality.specialityName;
    return dto;
  }
  static toSpeciality(specialityDto: SpecialityDto): Speciality {
    const entity = new Speciality();
    entity.specialityId = specialityDto.speciality_id;
    entity.specialityCode = specialityDto.speciality_code;
    entity.specialityName = specialityDto.speciality_name;
    return entity;
  }
  constructor(private http: HttpClient) { }
  getSpeciality(): Observable<Speciality[]> {
    return this.http.get<SpecialityDto[]>(`${this.URL}/getRecords`)
      .map(specialityDtoArr => specialityDtoArr.map(SpecialityService.toSpeciality));
  }
}
