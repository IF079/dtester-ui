import { Component, OnInit } from '@angular/core';
import {Faculties} from '../shared/entities/faculties';
import {HttpClientService} from '../shared/services/http-client.service';

@Component({
  selector: 'app-faculties',
  templateUrl: './faculties.component.html',
  styleUrls: ['./faculties.component.scss']
})
export class FacultiesComponent implements OnInit {

  facultiesData: Faculties;
  URL = '/Faculties/getRecords';

  constructor(private http: HttpClientService){
  }
  ngOnInit() {
    this.http.getData(`${this.URL}`).subscribe(data => {
      this.facultiesData = data;
      console.log(data);
    });
  }
}
