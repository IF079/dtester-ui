import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Speciality} from '../entities/speciality';

@Injectable()
export class SpecialityService {
  URL = '/Speciality';

  constructor(private http: HttpClient) {
  }

  getSpeciality() {
    return this.http.get<Speciality>(`${this.URL}/getRecords`);
  }

}
