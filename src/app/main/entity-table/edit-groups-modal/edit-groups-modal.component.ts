import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {UpdateDeleteEntityService} from '../update-delete-entity.service';
import {GroupsService} from '../../groups/groups.service';

@Component({
  selector: 'app-edit-groups-modal',
  templateUrl: './edit-groups-modal.component.html',
  styleUrls: ['./edit-groups-modal.component.scss']
})

export class EditGroupsModalComponent {
  editGroupForm: FormGroup;
  placeholders = {
    groupName: 'Назва групи',
    facultyName: 'Назва факультету',
    specialityName: 'Назва спеціальності'
  };
  facultyDictionary = {};
  specialityDictionary = {};
  facultyValues = [];
  specialityValues = [];
  btnEdit = 'Редагувати групу';
  btnClose = 'Відмінити';
  errRequestMsg: string;

  constructor(public dialogRef: MatDialogRef<EditGroupsModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private delUpdateService: UpdateDeleteEntityService,
              private formBuilder: FormBuilder, private groupsService: GroupsService) {
    this.loadFacultiesAndSpecialities();
    this.createForm();
  }

  loadFacultiesAndSpecialities() {
    this.groupsService.getFacultiesAndSpecialities().subscribe(data => {
      data[0].forEach(item => this.facultyDictionary[item.faculty_id] = item.faculty_name);
      this.facultyValues = Object.values(this.facultyDictionary);
      data[1].forEach(item => this.specialityDictionary[item.specialityId] = item.specialityName);
      this.specialityValues = Object.values(this.specialityDictionary);
    });
  }

  createForm(): void {
    const groupName = this.data[1];
    const specialityName = this.data[2];
    const facultyName = this.data[3];
    this.editGroupForm = this.formBuilder.group({
      groupName: [groupName, Validators.required],
      facultyName: [facultyName, Validators.required],
      specialityName: [specialityName, Validators.required]
    });
  }
  get groupName() {
    return this.editGroupForm.get('groupName');
  }

  get facultyName() {
    return this.editGroupForm.get('facultyName');
  }

  get specialityName() {
    return this.editGroupForm.get('specialityName');
  }

  isFormValid(): boolean {
    return this.editGroupForm.valid;
  }
  editGroup() {
    const group_name = this.groupName.value;
    const facultyName = this.facultyName.value;
    const specialityName = this.specialityName.value;
    const keysOfFacultyDictionary = Object.keys(this.facultyDictionary);
    const keysOfSpecialityDictionary = Object.keys(this.specialityDictionary);
    const entityName = 'Group';
    const groupId = this.data[0];
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
    this.delUpdateService.updateEntity(groupId, entityName, {group_name, faculty_id, speciality_id}).subscribe(
      (updatedGroupResponse) => {
        const updatedGroup = updatedGroupResponse[0];
        updatedGroup.faculty_id = this.facultyDictionary[updatedGroup.faculty_id];
        updatedGroup.speciality_id = this.specialityDictionary[updatedGroup.speciality_id];
        this.delUpdateService.passUpdatedGroup(updatedGroup);
        this.dialogRef.close();
      },
      (err) => {
        this.errRequestMsg = `Дана група вже існує, або проблеми зі з'єднанням на сервері або якась інша помилка`;
      }
    );

  }
}
