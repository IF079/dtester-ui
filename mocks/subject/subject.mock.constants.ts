
export const mockedResponse = {
  afterInsert: [{
    subject_id: 6,
    subject_name: 'subject name 6',
    subject_description: 'subject description 6'
  }],
  allSubjects: [{
    subject_id: 1,
    subject_name: 'subject name 1',
    subject_description: 'subject description 1',
  }, {
    subject_id: 2,
    subject_name: 'subject name 2',
    subject_description: 'subject description 2',
  }, {
    subject_id: 3,
    subject_name: 'subject name 3',
    subject_description: 'subject description 3',
  }, {
    subject_id: 4,
    subject_name: 'subject name 4',
    subject_description: 'subject description 4',
  }, {
    subject_id: 5,
    subject_name: 'subject name 5',
    subject_description: 'subject description 5',
  }]
};

export const mockedNumberOfRecordsWithLimit = {
  numberOfRecords: '3'
};

export const mockedForInsert = {
  subject_name: 'subject name 6',
  subject_description: 'subject description 6'
};

export const mockedForPagination = {
  limit: 3,
  offset: 0
};
