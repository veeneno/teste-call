// preload.js
const { io } = require('socket.io-client');
const socket = io('https://SEU_BACKEND_URL');

window.api = {
    joinCall: (username) => socket.emit('join', username),
    sendAudio: (audioData) => socket.emit('audio-stream', audioData),
    onUserList: (callback) => socket.on('user-list', callback),
    onAudioStream: (callback) => socket.on('audio-stream', callback)
};
