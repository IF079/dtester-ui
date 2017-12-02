export const mockedResponse = {
  afterInsert: [{
    timetable_id: 6,
    group_id: 4,
    subject_id: 2,
    start_date: '2017-12-09',
    start_time: '09:15',
    end_date: '2018-01-11',
    end_time: '11:35'
  }],
  allTimeTables: [{
    timetable_id: 1,
    group_id: 1,
    subject_id: 1,
    start_date: '2017-09-11',
    start_time: '09:11',
    end_date: '2017-10-11',
    end_time: '09:35'
  }, {
    timetable_id: 2,
    group_id: 3,
    subject_id: 4,
    start_date: '2017-08-11',
    start_time: '19:11',
    end_date: '2017-10-12',
    end_time: '10:35'
  }, {
    timetable_id: 3,
    group_id: 2,
    subject_id: 5,
    start_date: '2017-09-29',
    start_time: '09:21',
    end_date: '2017-10-13',
    end_time: '12:45'
  }, {
    timetable_id: 4,
    group_id: 5,
    subject_id: 2,
    start_date: '2017-09-11',
    start_time: '09:11',
    end_date: '2017-10-11',
    end_time: '13:35'
  }, {
    timetable_id: 5,
    group_id: 3,
    subject_id: 1,
    start_date: '2017-09-11',
    start_time: '09:11',
    end_date: '2017-10-11',
    end_time: '09:35'
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
  }],
  allGroups: [{
    group_id: 1,
    group_name: 'KIm-17-1',
    speciality_id: 3,
    faculty_id: 5
  }, {
    group_id: 2,
    group_name: 'KIm-17-2',
    speciality_id: 1,
    faculty_id: 2
  }, {
    group_id: 3,
    group_name: 'KIm-17-3',
    speciality_id: 4,
    faculty_id: 3
  }, {
    group_id: 4,
    group_name: 'KIm-17-4',
    speciality_id: 2,
    faculty_id: 4
  }, {
    group_id: 5,
    group_name: 'KIm-17-5',
    speciality_id: 5,
    faculty_id: 1
  }]
};


export const mockedNumberOfRecordsAll = {
  numberOfRecords: '5'
};

export const mockedNumberOfRecordsWithLimit = {
  numberOfRecords: '3'
};

export const mockedForInsert = {
  group_id: 4,
  subject_id: 2,
  start_date: '2017-12-09',
  start_time: '09:15',
  end_date: '2018-01-11',
  end_time: '11:35'
};

export const mockedForPagination = {
  limit: 3,
  offset: 0
};
