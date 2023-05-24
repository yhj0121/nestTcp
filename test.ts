import { MsgInVehicleData } from '/Users/it_dev/Downloads/live_server_cache/apps/gateway/proto/MSG_VehicleMonitoring';
import * as net from 'net';

//서버랑 연결
const socket = net.connect({ port: 3001 });
socket.on('connect', function () {
  console.log('connected to server!');

  //1초마다 proto 파일 생성한거 보내기
  setInterval(function () {
    socket.write(makeProtoFile());
    console.log('데이터 전송');
  }, 1000);
});

socket.on('end', function () {
  console.log('disconnected.');
});
// 에러가 발생할때 에러메시지 화면에 출력
socket.on('error', function (err) {
  console.log(err);
});
// connection에서 timeout이 발생하면 메시지 출력
socket.on('timeout', function () {
  console.log('connection timeout.');
});

function makeProtoFile() {
  const protoData = {
    operationMode: 0,
    vehicleType: Math.floor(Math.random() * 2),
    control: Math.floor(Math.random() * 2),
    u8Brake: Math.floor(Math.random() * 2),
    u8Gear: Math.floor(Math.random() * 4),
    u8TurnSignal: Math.floor(Math.random() * 3),
    f64SpeedKph: Math.floor(Math.random() * 200),
    f64SteeringAngleDeg: Math.floor(Math.random() * 361) - 180,
  };
  return MsgInVehicleData.encode(protoData).finish(); //buffer 형식으로
}
