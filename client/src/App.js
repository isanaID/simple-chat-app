import * as React from "react"
import io from "socket.io-client"
import NavBar from "./components/Nav";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import Chat from "./components/Chat";

const socket = io.connect("http://localhost:4000");

function App() {
	const [username, setUsername] = React.useState((localStorage.getItem("username")));
	const [room, setRoom] = React.useState("");
	const [showChat, setShowChat] = React.useState(false);
	const [showRoom, setShowRoom] = React.useState(false);
	// const [message, setMessage] = React.useState("")
	// const [messageReceived, setMessageReceived] = React.useState("")

	let fillUsername = () => {
		if(username !== "") {
			localStorage.setItem("username", username);
			setShowRoom(true);
		}
	};

	const joinRoom = () => {
		if(username !== "" && room !== "") {
		socket.emit("join_room", room);
		setShowChat(true);
		}
	};

	let changeUsername = () => {
		localStorage.removeItem("username");
		setUsername("");
		setShowRoom(false);
	}

	React.useEffect(() => {
		fillUsername();
	}, [showChat]);

	return (
		<div className="App">
			<NavBar />
			{!showRoom? (
				<div className="d-flex align-items-center joinChatContainer">
				<h1>set username</h1>
				<input
					type="text"
					autoComplete="off"
					id="username"
					placeholder="Username"
					onChange={(e) => setUsername(e.target.value)}
				/>
				<button onClick={fillUsername}>Next</button>
				</div>
			) : !showChat? (
				<div className="d-flex align-items-center joinChatContainer">
					<h1>Hello {username}</h1> <a href="#" onClick={changeUsername}>Change Username</a>
					<h1>Choose Room</h1>
					{/* <input
						type="text"
						placeholder="Username"
						onChange={(e) => setUsername(e.target.value)}
					/> */}
					<input
						type="text"
						autoComplete="off"
						id="room"
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