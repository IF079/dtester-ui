import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import {Speciality} from './speciality';
import {SpecialityDto} from './speciality-dto';
import {RecordsCount} from '../shared/entities/recordsCount';
import {url} from '../shared/constants/url-constants';

@Injectable()

export class SpecialityService {
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

  getSpeciality(limit: number, offset: number): Observable<[Speciality[], RecordsCount]> {
    return Observable.forkJoin(
      this.http.get<SpecialityDto[]>(`${url.specialityUrl}${url.getRecordsRange}/${limit}/${offset}`)
        .map(specialityDtoArr => specialityDtoArr.map(SpecialityService.toSpeciality)),
      this.http.get<RecordsCount>(`${url.specialityUrl}${url.getCount}`)
    );
  }
}
