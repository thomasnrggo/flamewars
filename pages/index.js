import React, { useEffect, useState, Fragment } from "react";
import { Form, Button, Jumbotron, Toast, Modal, Badge } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import { BlockPicker } from "react-color";
import { formatDistance } from "date-fns";
import io from "socket.io-client";
const ENDPOINT = "http://localhost:3000";
// const ENDPOINT = 'https://flamewars-master.herokuapp.com';

export default function Homepage() {
  const socket = io(ENDPOINT);
  const [showModal, setShowModal] = useState(true);
  const [field, setField] = useState("");
  const [localMessages, setLocalMessages] = useState([]);
  const [login, setLogin] = useState({
    username: "",
    color: "#007bff",
    bgColor: "hsla(211, 100%, 95%, 0.85)",
  });
  const [admin, setAdmin] = useState({
    email: "",
    username: "",
    password: "",
    color: "#007bff",
    bgColor: "hsla(211, 100%, 95%, 0.85)",
  });
  const [votes, setVotes] = useState({
    title: "",
    optionA: "",
    optionB: "",
    votesA: 0,
    votesB: 0,
    votants: [],
  });
  const [users, setUsers] = useState([]);
  const colorset = [
    "#007bff",
    "#6f42c1",
    "#e83e8c",
    "#dc3545",
    "#28a745",
    "#17a2b8",
  ];

  useEffect(() => {
    socket
      .on("message", handleMessage)
      .on("vote", handleVotes)
      .on("register", handleRegister)
      .on("user-left", handleDisconnect);

    getMessages()
      .then((res) => {
        setLocalMessages(res);
      })
      .catch((err) => {
        console.error(err);
      });

    getUsers()
      .then((response) => {
        setUsers(response);
      })
      .catch((error) => console.error(error));

    getVotes()
      .then((res) => {
        setVotes(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const getUsers = async () => {
    const response = await fetch(`${ENDPOINT}/users`);
    const users = await response.json();
    return users;
  };

  const getMessages = async () => {
    let res = await fetch(`${ENDPOINT}/messages`);
    let messages = await res.json();
    return messages;
  };

  const getVotes = async () => {
    let res = await fetch(`${ENDPOINT}/vote`);
    let votes = await res.json();
    return votes;
  };

  let handleVotes = (vote) => {
    setVotes(vote);
    setField("");
  };

  let handleMessage = (data) => {
    const container = document.querySelector(".chat__messages");

    setLocalMessages((state) => [...state, data]);

    container.scrollTo(0, container.scrollHeight);
  };

  function handleRegister(data) {
    setUsers((state) => [...state, data]);
  }

  function handleDisconnect(username) {
    setUsers((state) => state.filter((item) => username !== item.username));
  }

  function handleChange(event, form) {
    const { name, value } = event.target;

    switch (form) {
      case "user":
        setLogin({
          ...login,
          [name]: value,
        });
        break;

      case "admin":
        setAdmin({
          ...login,
          [name]: value,
        });
        break;

      case "message":
        setField(value);
        break;

      default:
        break;
    }
  }

  function handleChatSubmit(event) {
    event.preventDefault();
    const { username, color, bgColor } = login;
    const data = {
      username,
      color,
      bgColor,
      message: field,
      date: new Date(),
    };

    if (field.includes("/create")) {
      socket.emit("create", { command: field });
      setField("");
    } else if (field.includes("/close")) {
      socket.emit("close", {});
      setField("");
    } else if (field.includes("#")) {
      if (votes && votes.title) {
        if (field.includes(votes.optionA) || field.includes(votes.optionB)) {
          socket.emit("vote", { vote: field, username: username });
          setField("");
        } else {
          socket.emit("message", data);
          setField("");
        }
      } else {
        socket.emit("message", data);
        setField("");
      }
    } else if (field) {
      socket.emit("message", data);
      setField("");
    }
  }

  function handleLoginSubmit() {
    const { username, color, bgColor } = login;

    if (username && color) {
      setShowModal(false);
      socket
        .emit("message", {
          username: "🔥 Flamewars bot 🔥",
          color: "#0c5460",
          bgColor: "#d1ecf1",
          message: `${username} has entered the chat`,
          date: new Date(),
        })
        .emit("register", {
          username,
          color,
          bgColor,
        });
    }
  }

  function handleColor(color, event) {
    const { hsl } = color;

    setLogin({
      ...login,
      color: color.hex,
      bgColor: `hsla(${hsl.h}, ${hsl.s}%, 90%, 0.9)`,
    });
  }

  function getDateDistance(date) {
    return formatDistance(new Date(date), new Date());
  }

  return (
    <Fragment>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Log In</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>

            <Form.Control
              name="username"
              type="text"
              placeholder="Enter your username"
              value={login.username}
              onChange={() => handleChange(event, "user")}
            />
          </Form.Group>

          <Form.Group controlId="color">
            <Form.Label>Color</Form.Label>

            <BlockPicker
              color={login.color}
              colors={colorset}
              onChangeComplete={handleColor}
            />

            <Form.Text className="text-muted">
              This will be the color of your message bubbles.
            </Form.Text>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={handleLoginSubmit}>
            Enter
          </Button>
        </Modal.Footer>
      </Modal>

      <section className="chat">
        <div className="chat__users">
          <p className="chat__label">
            Users: <strong>{users.length}</strong>
          </p>

          <div className="chat__list">
            {users
              ? users.map((user, index) => (
                  <Badge
                    key={`user-badge-${index}`}
                    pill
                    style={{ color: user.color, backgroundColor: user.bgColor }}
                  >
                    {user.username}
                  </Badge>
                ))
              : ""}
          </div>
        </div>

        <Jumbotron>
          <div className="chat__wrapper">
            <div
              className={`chat__chart ${votes && votes.title ? "show" : ""}`}
            >
              {votes && votes.title ? (
                <Bar
                  data={{
                    labels: [votes.optionA, votes.optionB],
                    datasets: [
                      {
                        label: "# of votes",
                        data: [votes.votesA, votes.votesB],
                        backgroundColor: [
                          "rgba(153, 102, 255, 0.2)",
                          "rgba(255, 159, 64, 0.2)",
                        ],
                        borderColor: [
                          "rgba(153, 102, 255, 1)",
                          "rgba(255, 159, 64, 1)",
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={{
                    scales: {
                      yAxes: [
                        {
                          ticks: {
                            beginAtZero: true,
                          },
                        },
                      ],
                    },
                  }}
                />
              ) : (
                ""
              )}
            </div>

            <div className="chat__messages">
              {localMessages.map((msg, index) => (
                <Toast
                  key={`message-${index}`}
                  className={`chat__bubbles ${
                    msg.username === login.username ? "owner" : ""
                  }`}
                >
                  <Toast.Header
                    style={{ color: msg.color, backgroundColor: msg.bgColor }}
                  >
                    <strong className="mr-auto">{msg.username}</strong>

                    <small>{getDateDistance(msg.date)} ago</small>
                  </Toast.Header>

                  <Toast.Body
                    style={{ color: msg.color, backgroundColor: msg.bgColor }}
                  >
                    {msg.message}
                  </Toast.Body>
                </Toast>
              ))}
            </div>
          </div>

          <Form onSubmit={handleChatSubmit}>
            <div className="form-row">
              <Form.Group controlId="message">
                <Form.Control
                  type="text"
                  placeholder="Start typing here..."
                  autoComplete="off"
                  value={field}
                  onChange={() => handleChange(event, "message")}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Send
              </Button>
            </div>
          </Form>

          <Form.Text className="text-muted">
            To start a voting event, type the command{" "}
            <code>/create option1 option2</code>. To vote between any option,
            type <code>#option1</code> or <code>#option2</code>
          </Form.Text>
        </Jumbotron>
      </section>
    </Fragment>
  );
}
