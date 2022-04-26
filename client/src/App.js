import * as React from "react"
import io from "socket.io-client"
import "./App.css"

const socket = io.connect("http://localhost:4000");

function App() {
	const [room, setRoom] = React.useState("")
	const [message, setMessage] = React.useState("")
	const [messageReceived, setMessageReceived] = React.useState("")

	const joinRoom = () => {
		socket.emit("join_room", room)
	};

	const sendMessage = () => {
		socket.emit("send_message", { message, room });
	};

	React.useEffect(() => {
		socket.on("receive_message", (data) => {
			setMessageReceived(data.message);
		});
	}, []);

	return (
		<div className="App">
			<h1>Chat App</h1>
			<input
				type="text"
				placeholder="Room"
				value={room}
				onChange={(e) => setRoom(e.target.value)}
			/>
			<button onClick={joinRoom}>Join</button>
			<input
				type="text"
				placeholder="Message"
				value={message}
				onChange={(e) => setMessage(e.target.value)}
			/>
			<button onClick={sendMessage}>Send</button>
			<p>{messageReceived}</p>
		</div>
	);
}

export default App;