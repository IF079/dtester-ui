import {Component, Inject, OnInit, OnChanges} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';
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
  btnCancel = 'Закрити';

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
      groupName: [groupName],
      facultyName: [facultyName],
      specialityName: [specialityName]
    });
  }

  editGroup() {
    const group_name = this.editGroupForm.get('groupName').value;
    const facultyName = this.editGroupForm.get('facultyName').value;
    const specialityName = this.editGroupForm.get('specialityName').value;
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
    console.log(faculty_id);
    console.log(speciality_id);
    this.delUpdateService.updateEntity(groupId, entityName, {group_name, faculty_id, speciality_id}).subscribe(
      (response) => {
        console.log(this.facultyDictionary);
        this.delUpdateService.passUpdatedGroup(response);
        this.dialogRef.close();
      },
      (err) => console.log(err)
    );

  }
}
