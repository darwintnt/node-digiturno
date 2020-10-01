const { io } = require('../server');

const { TicketControl } = require('../classes/TicketControl');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('next', (data, cb) => {
        let next = ticketControl.next();
        console.log(next);
        cb(next);
    });

    client.emit('actualState', {
        actual: ticketControl.getLastest(),
        last: ticketControl.getlastFourTickets()
    });

    client.on('attendTicket', (data, cb) => {

        if(!data.desktop) {
            return cb({
                status: true,
                message: 'El escritorio es necesario'
            });
        }

        let attendTicket = ticketControl.attendTicket(data.desktop);

        cb(attendTicket);

        client.broadcast.emit('getlastFourTickets', {
            last: ticketControl.getlastFourTickets()
        });

    });


});