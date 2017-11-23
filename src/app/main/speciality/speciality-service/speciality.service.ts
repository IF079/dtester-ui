import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';

import {Speciality} from '../speciality';
import {SpecialityDto} from '../speciality-dto';
import {RecordsCount} from '../../shared/entities/recordsCount';
import {url} from '../../shared/constants/url-constants';

@Injectable()

export class SpecialityService {
  constructor(private http: HttpClient) {
  }

  getSpeciality(limit: number, offset: number): Observable<[Speciality[], RecordsCount]> {
    return Observable.forkJoin(
      this.http.get<SpecialityDto[]>(`${url.specialityUrl}${url.getRecordsRange}/${limit}/${offset}`)
        .map(specialityDtoArr => specialityDtoArr.map(specialityDto => new Speciality(specialityDto))),
      this.http.get<RecordsCount>(`${url.specialityUrl}${url.getCount}`)
    );
  }

  addSpeciality(speciality): Observable<SpecialityDto> {
    return this.http.post<SpecialityDto>(`${url.specialityUrl}${url.insertData}`, new SpecialityDto(speciality));
  }
}
