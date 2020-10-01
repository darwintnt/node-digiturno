const fs = require('fs');

class Ticket {

  constructor(ticket, desktop) {
    this.ticket = ticket;
    this.desktop = desktop;
  }

}

class TicketControl {


  constructor() {

    this.latest = 0;
    this.today = new Date().getDate();
    this.tickets = [];
    this.lastFourTickets = [];

    let data = require('../data/data.json');

    if (data.today === this.today) {
      this.latest = data.latest;
      this.tickets = data.tickets;
      this.lastFourTickets = data.last_four_tickets;
    } else {
      this.restartCount(this.lastFourTickets);
    }

  }

  next() {

    this.latest += 1;

    let _ticket = new Ticket(this.latest, null);

    this.tickets.push(_ticket);

    this.saveFile();

    return `Ticket ${this.latest}`;

  }

  saveFile() {
    let jsonData = {
      "latest": this.latest,
      "today": this.today,
      "tickets": this.tickets,
      "last_four_tickets": this.lastFourTickets
    };

    let jsonDataStr = JSON.stringify(jsonData);

    fs.writeFileSync('./src/data/data.json', jsonDataStr);

  }

  restartCount() {
    this.latest = 0;
    this.tickets = [];
    this.lastFourTickets = [];
    this.saveFile();
  }

  getLastest() {
    return  `Ticket ${this.latest}`;
  }

  getlastFourTickets() {
    return this.lastFourTickets;
  }


  attendTicket(desktop) {

    if(this.tickets.length === 0) {
      return {
        status: false,
        message: 'No hay tickets'
      };
    }

    let ticketNumber = this.tickets[0].ticket;

    // Elimina la primera posición del array
    this.tickets.shift();

    let attendTicket = new Ticket(ticketNumber, desktop);

    // Agrega ticket al inicio del array
    this.lastFourTickets.unshift(attendTicket);

    if(this.lastFourTickets.length > 4) {
      this.lastFourTickets.splice(-1,1);
    }

    console.log('Ultimos 4: '+ this.lastFourTickets);

    this.saveFile();

    return {
      status: true,
      data: attendTicket
    };
  }

}


module.exports = {
  TicketControl
};