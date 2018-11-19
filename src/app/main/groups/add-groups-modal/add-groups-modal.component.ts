import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {GroupsService} from '../groups-service/groups.service';
import {UpdateDeleteEntityService} from '../../shared/services/update-delete-entity-service/update-delete-entity.service';
import {Group} from '../groups-classes/group';
import {InfoModalService} from '../../info-modal/info-modal.service';
import {generalConst} from '../../shared/constants/general-constants';

@Component({
  selector: 'dtest-add-groups-modal',
  templateUrl: './add-groups-modal.component.html',
  styleUrls: ['./add-groups-modal.component.scss']
})

export class AddGroupsModalComponent {
  groupForm: FormGroup;
  facultyValues = [];
  specialityValues = [];
  facultyDictionary = {};
  specialityDictionary = {};
  placeholders = {
    groupName: 'Назва групи',
    facultyName: 'Назва факультету',
    specialityName: 'Назва спеціальності'
  };
  errorRequired = 'Заповніть поле!';
  btnClose = 'Відмінити';
  btnAdd = 'Додати групу';

  constructor(public dialogRef: MatDialogRef<AddGroupsModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private groupsService: GroupsService,
              private formBuilder: FormBuilder, private delUpdateService: UpdateDeleteEntityService,
              private modalService: InfoModalService) {
    this.createForm();
    this.loadFacultiesAndSpecialities();
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
  loadFacultiesAndSpecialities() {
    this.groupsService.getFacultiesAndSpecialities().subscribe(data => {
      data[0].forEach(facultyItem => this.facultyDictionary[facultyItem.faculty_id] = facultyItem.faculty_name);
      this.facultyValues = Object.values(this.facultyDictionary);
      data[1].forEach(specialityItem => this.specialityDictionary[specialityItem.specialityId] = specialityItem.specialityName);
      this.specialityValues = Object.values(this.specialityDictionary);
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
    this.dialogRef.close();
    this.groupsService.addGroup({group_name, faculty_id, speciality_id}).subscribe(
      (groupData: Group[]) => {
        groupData.forEach((group) => {
          group.faculty_id = this.facultyDictionary[group.faculty_id];
          group.speciality_id =  this.specialityDictionary[group.speciality_id];
        });
        this.delUpdateService.passInsertedItem<Group[]>(groupData);
        this.modalService.openSuccessDialog(generalConst.addMsg);
     },
      (err) => {
        this.modalService.openErrorDialog(generalConst.errMsgForGroups);
      }
    );
  }
}
