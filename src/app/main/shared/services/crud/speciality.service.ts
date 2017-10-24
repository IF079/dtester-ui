import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Speciality} from '../../entities/speciality';
import {Observable} from 'rxjs/Observable';
import {SpecialityDto} from './dto/speciality-dto';
import {RecordsCount} from '../../entities/recordsCount';

@Injectable()
export class SpecialityService {
  URL = '/Speciality';

  constructor(private http: HttpClient) {
  }

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

  getSpeciality(limit: number, offset: number): Observable<Speciality[]> {
    return this.http.get<SpecialityDto[]>(`${this.URL}/getRecordsRange/${limit}/${offset}`)
      .map(specialityDtoArr => specialityDtoArr.map(SpecialityService.toSpeciality));
  }
  countSpeciality(): Observable<RecordsCount> {
    return this.http.get(`${this.URL}/countRecords`);
  }
}
