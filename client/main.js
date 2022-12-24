import './style.css';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

socket.on('connect', () => {
	document.querySelector('.messages').innerHTML = ``;
	displaymessage(`Socket ID: ${socket.id}`);
});

socket.on('receiveMessage', (message,room) => {
	if(room!==undefined) {
	displaymessage(`(${room}) ${message}`);
	} else {
		displaymessage(message)
	}
});
const displaymessage = (message) => {
	const messages = [];
	messages.push(message);
	messages.forEach((message) => {
		const li = document
			.querySelector('.messages')
			.appendChild(document.createElement('li'));
		li.classList.add('message');
		li.textContent = `${message}`;
	});
};

const sendmessage = () => {
	const message = document.querySelector('#message');
	const room = document.querySelector('#room').value;
	if (message.value !== '') {
		console.log(message.value);
		socket.emit('receiveMessage', `${socket.id} : ${message.value}`, room);
		displaymessage(message.value);
		message.value = '';
	}
};

const joinRoom = () => {
	const room = document.querySelector('#room').value;
	socket.emit('joinRoom', room, (message) => {
		displaymessage(message);
	});
};

document.querySelector('#send').addEventListener('click', sendmessage);
document.querySelector('#join').addEventListener('click', joinRoom);
