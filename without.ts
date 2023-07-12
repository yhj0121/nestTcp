let signupInput = {
  password: 'asdfzxcv12',
  user: 'boys1541s',
  address: '원주시',
};
const { password, ...rest } = signupInput;

const userObject = { ...rest };

console.log(password); // 'asdfzxcv12'
console.log(userObject); // { user: 'boys1541s', address: '원주시' }
