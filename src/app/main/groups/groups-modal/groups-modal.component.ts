import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {GroupsService} from '../groups.service';
import {UpdateDeleteEntityService} from '../../entity-table/update-delete-entity.service';
import {Group} from '../group';

@Component({
  selector: 'dtest-groups-modal',
  templateUrl: './groups-modal.component.html',
  styleUrls: ['./groups-modal.component.scss']
})

export class GroupsModalComponent implements OnInit {
  groupForm: FormGroup;
  facultyValues = [];
  specialityValues = [];
  isGroupAdded = false;
  placeholders = {
    groupName: 'Назва групи',
    facultyName: 'Назва факультету',
    specialityName: 'Назва спеціальності'
  };
  successMsg = 'Групу додано успішно. Оновіть сторінку, щоб побачити зміни.';
  errorRequired = 'Заповніть поле!';
  btnClose = 'Відмінити';
  btnOk = 'Ок';
  btnAdd = 'Додати групу';
  errRequestMsg: string;

  constructor(public dialogRef: MatDialogRef<GroupsModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private groupsService: GroupsService,
              private formBuilder: FormBuilder, private delUpdateService: UpdateDeleteEntityService) {
    this.createForm();
  }

  createForm(): void {
    this.facultyValues = Object.values(this.data.facultyDictionary);
    this.specialityValues = Object.values(this.data.specialityDictionary);
    this.groupForm = this.formBuilder.group({
      groupName: ['', Validators.required],
      facultyName: ['', Validators.required, ],
      specialityName: ['', Validators.required, ]
    });
  }

  get groupName() {
    return this.groupForm.get('groupName');
  }

  get facultyName() {
    return this.groupForm.get('facultyName');
  }

  get specialityName() {
    return this.groupForm.get('specialityName');
  }

  isFormValid(): boolean {
    return this.groupForm.valid;
  }

  ngOnInit() {
  }

  addGroup() {
    const group_name = this.groupName.value;
    const facultyName = this.facultyName.value;
    const specialityName = this.specialityName.value;
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
    this.groupsService.addGroup({group_name, faculty_id, speciality_id}).subscribe(
      (groupData) => {
        this.delUpdateService.passInsertedItem<Group[]>(groupData[0]);
        this.isGroupAdded = true;
      },
      (err) => {
        this.errRequestMsg = `Проблеми зі з'єднанням на сервері або якась інша помилка`;
      }
    );


  }
}
