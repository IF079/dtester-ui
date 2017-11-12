import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';

import {GroupsService} from '../groups.service';

@Component({
  selector: 'app-groups-modal',
  templateUrl: './groups-modal.component.html',
  styleUrls: ['./groups-modal.component.scss']
})

export class GroupsModalComponent implements OnInit {
  groupForm: FormGroup;
  facultyValues = [];
  specialityValues = [];
  placeholders = {
    groupName: 'Назва групи',
    facultyName: 'Назва факультету',
    specialityName: 'Назва спеціальності'
  };
  btnAdd = 'Додати групу';

  constructor(public dialogRef: MatDialogRef<GroupsModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private groupsService: GroupsService, private formBuilder: FormBuilder) {
    this.createForm();
  }

  createForm(): void {
    this.facultyValues = Object.values(this.data.facultyDictionary);
    this.specialityValues = Object.values(this.data.specialityDictionary);
    this.groupForm = this.formBuilder.group({
      groupName: [''],
      facultyName: [''],
      specialityName: ['']
    });
  }

  ngOnInit() {
  }

  addGroup() {
    const group_name = this.groupForm.get('groupName').value;
    const facultyName = this.groupForm.get('facultyName').value;
    const specialityName = this.groupForm.get('specialityName').value;
    const keysOfFacultyDictionary = Object.keys(this.data.facultyDictionary);
    const keysOfSpecialityDictionary = Object.keys(this.data.specialityDictionary);
    let speciality_id = 0;
    let faculty_id = 0;
    for (let i = 0; i < keysOfFacultyDictionary.length; i++) {
      if (this.facultyValues[i] === facultyName) {
        faculty_id = +keysOfFacultyDictionary[i];
        break;
      }
    }
    for (let i = 0; i < keysOfSpecialityDictionary.length; i++) {
      if (this.specialityValues[i] === specialityName) {
        speciality_id = +keysOfSpecialityDictionary[i];
        break;
      }
    }
    console.log(faculty_id);
    console.log(speciality_id);
    this.groupsService.addGroup({group_name, faculty_id, speciality_id}).subscribe(
      (resp) => {
        this.groupsService.passAdded(resp[0]);
        this.dialogRef.close();
      },
      (err) => console.log(err)
    );


  }
}
