const socket = io();

socket.on('connect', (client) => {
  console.log('connect');
});

socket.on('disconnect', () => {
  console.log('disconnect');
});

socket.on('actualState', (res) => {
  this.render(res);
});

socket.on('getlastFourTickets', (res) => {
  let audio = new Audio('audio/new-ticket.mp3');
  audio.play();
  this.render(res);
});


function render(res) {
  res.last.forEach((ticket, idx) => {
    let lbticket = document.getElementById(`lblTicket${idx + 1}`);
    let lbdesktop = document.getElementById(`lblEscritorio${idx + 1}`);
    lbticket.innerHTML = `Ticket ${ticket.ticket}`;
    lbdesktop.innerHTML = `Escritorio ${ticket.desktop}`;
  });
}
