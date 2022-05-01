import * as React from "react"
import io from "socket.io-client"
import "./App.css"
import Chat from "./Chat";

const socket = io.connect("http://localhost:4000");

function App() {
	const [username, setUsername] = React.useState("");
	const [room, setRoom] = React.useState("");
	const [showChat, setShowChat] = React.useState(false);
	// const [message, setMessage] = React.useState("")
	// const [messageReceived, setMessageReceived] = React.useState("")

	const joinRoom = () => {
		if(username !== "" && room !== "") {
		socket.emit("join_room", room);
		setShowChat(true);
		}
	};

	return (
		<div className="App">
			{!showChat? (
				<div className="joinChatContainer">
					<h1>Chat App</h1>
					<input
						type="text"
						placeholder="Username"
						onChange={(e) => setUsername(e.target.value)}
					/>
					<input
						type="text"
						placeholder="Room"
						onChange={(e) => setRoom(e.target.value)}
					/>
					<button onClick={joinRoom}>Join</button>
				</div>
					) : (<Chat socket={socket} username={username} room={room} />)}
		</div>
	);
}

export default App;