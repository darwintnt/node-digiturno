const socket = io();

let searchParams = new URLSearchParams(window.location.search);
let title = document.getElementById('desktop');
let ticketLabel = document.getElementById('ticket');


if (!searchParams.has('escritorio')) {
  window.location = 'index.html';
  throw new Error('El escritorio es requerido.');
}

let desktop = searchParams.get('escritorio');

title.innerHTML = desktop;

socket.on('connect', (client) => {
  console.log('connect');
});

socket.on('disconnect', () => {
  console.log('disconnect');
});

socket.on('actualState', (res) => {
  console.log(res);
});

$('button').on('click', () => {

  socket.emit('attendTicket', { desktop: desktop }, (res) => {

    if(!res.status) {
      ticketLabel.innerHTML = res.message;
      Swal.fire('Atención', res.message, 'warning');
    } else {
      ticketLabel.innerHTML = `Ticket ${res.data.ticket}`;
    }
  });

});