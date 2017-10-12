import {Component, OnInit} from '@angular/core';
import {SubjectsDataService} from '../shared/services/subjects-data.service';
import {Subject} from '../shared/entities/subject';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {
  subjectData: Subject[];

  constructor(private subjectDataService: SubjectsDataService) {

  }

  ngOnInit() {
    this.subjectDataService.getData().subscribe((data) => {
        this.subjectData = data;
        console.log(data);
      });
  }

}
