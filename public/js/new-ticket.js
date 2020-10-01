const socket = io();

let title = document.getElementById('lblNuevoTicket');

socket.on('connect', (client) => {
  console.log('connect');

});

socket.on('disconnect', () => {
  console.log('disconnect');
});

socket.on('actualState', (res) => {
  title.innerHTML = res.actual;
});

$('button').on('click', () => {

  socket.emit('next', null, (res) => {
    title.innerHTML = res;
  });

});

