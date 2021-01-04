// useEffect(() => {
//   // socket.connect();
//   // console.log(socket.active)

//   socket.on('server.broadcast', (data) => {
//     setroomstate(data);
//   });

//   socket.on('server.whois', () => {
//     socket.emit(
//       'client.whois',
//       {userId: 'evanclient', username: 'evanclient'},
//       (response: any) => {
//         console.log(response);
//       },
//     );
//   });
// }, []);
