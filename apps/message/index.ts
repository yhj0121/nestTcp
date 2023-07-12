import coolsm from 'coolsms-node-sdk';

export const sendMessage = async (userPhoneINfo: string) => {
  const messageService = new coolsm('1', '2'); //api key

  messageService
    .sendOne({
      to: userPhoneINfo,
      from: '01099906554',
      text: '한글로',
    })
    .then((res) => console.log(res));
};
