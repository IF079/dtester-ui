
export const mockedResponse = {
  afterInsert: {
    email: 'username6@gmail.com',
    id: 6,
    username: 'username6',
  },
  allAdmins: [{
    email: 'username1@gmail.com',
    id: 1,
    last_login: '1412807722',
    logins: '0',
    password: '42d877ebc4a7381e5a3398ad16fa9c3eeb6f16598cea1ab569f0b00aaa3dad11',
    username: 'username1'
  }, {
    email: 'username2@gmail.com',
    id: 2,
    last_login: '1513807723',
    logins: '1',
    password: '46d877ebc4a7381e5a3398ad16fa9c3eeb6f16598cea1ab569f0b00aaa3dad12',
    username: 'username2'
  }, {
    email: 'username3@gmail.com',
    id: 3,
    last_login: '1617807724',
    logins: '2',
    password: '55d877ebc4a7381e5a3398ad16fa9c3eeb6f16598cea1ab569f0b00aaa3dad13',
    username: 'username3',
  }, {
    email: 'username4@gmail.com',
    id: 4,
    last_login: '1712807725',
    logins: '3',
    password: '22d877ebc4a7381e5a3398ad16fa9c3eeb6f16598cea1ab569f0b00aaa3dad18',
    username: 'username4'
  }, {
    email: 'username5@gmail.com',
    id: 5,
    last_login: '1812807726',
    logins: '4',
    password: '33d877ebc4a7381e5a3398ad16fa9c3eeb6f16598cea1ab569f0b00aaa3dad19',
    username: 'username5'
  }],
  checkUsername: {
    response: true
  },
  checkEmail: {
    response: false
  }
};

export const mockedNumberOfRecordsWithLimit = {
  numberOfRecords: '3'
};
export const mockedForInsert = {
  email: 'username6@gmail.com',
  username: 'username6',
  password: 'ab123456',
  password_confirm: 'ab123456'
};
export const mockedForCheckFunctionality = {
  username: 'username1',
  email: 'username1@gmail.com'
};

export const mockedForPagination = {
  limit: 3,
  offset: 0
};
