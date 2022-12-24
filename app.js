const { instrument } = require('@socket.io/admin-ui');
const io = require('socket.io')(3000, {
	cors: {
		origin: ['http://localhost:5173', 'https://admin.socket.io'],
		credentials: true,
	},
});

io.on('connection', (socket) => {
	console.log(socket.id);
	socket.on('receiveMessage', (message, room) => {
		console.log(room);
		if (room === '') {
			socket.broadcast.emit('receiveMessage', message);
		} else {
			socket.to(room).emit('receiveMessage', message,room);
		}
		console.log(message);
	});
	socket.on('joinRoom', (room, cb) => {
		socket.join(room);
		cb(`Joined ${room}`);
	});
});

instrument(io, { auth: false });
