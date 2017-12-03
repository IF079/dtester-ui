

export const mockedResponse = {
  updatedItem: [{
    group_id: 3,
    group_name: 'Kim-17-8',
    speciality_id: 10,
    faculty_id: 11
  }],
  insetedItem: [{
    group_id: 11,
    group_name: 'Kim-17-8',
    speciality_id: 11,
    faculty_id: 12
  }],
  deletedItem: [{
    group_id: 9,
    group_name: 'Kim-17-7',
    speciality_id: 8,
    faculty_id: 7
  }],
  afterDelete: {
    response: 'ok'
  },
  afterUpdate:[{
    group_id: 3,
    group_name: 'Kim-17-8',
    speciality_id: 10,
    faculty_id: 11
  }]
};
export const mockedForRequest = {
  id: 3,
  entityName: 'Group',
  updateData: [{
    group_name: 'Kim-17-8',
    speciality_id: 10,
    faculty_id: 11
  }]
};

