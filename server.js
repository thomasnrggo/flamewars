const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const { log } = require("console");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();
const port = process.env.PORT || 3000;

const messages = [];
let vote = {};
let users = [];

let getVotingOption = (str) => {
  let rmCreate = str.replace("/create ", "");
  let rmVs = rmCreate.replace(" vs", "");
  let wordsArray = rmVs.split(/(\s+)/);
  let options = wordsArray.filter((word) => word !== " ");
  return options;
};

io.on("connection", (socket) => {
  // console.log("a user connected", socket.id);

  socket.on("message", (data) => {
    const { username, message } = data;

    console.log(`${username} => ${message}`);

    messages.push(data);
    socket.broadcast.emit("message", data);
  });

  socket.on("register", (data) => {
    users.push(data);
    socket.username = data.username;
    socket.broadcast.emit("register", data);

    console.log(
      `🔥 Flamewars bot 🔥 => Connected users:`,
      users.map((user) => user.username)
    );
  });

  socket.on("create", (data) => {
    console.log(" create =>", data);
    if (!vote.title) {
      let command = data.command.toLowerCase();
      let options = getVotingOption(command);

      let title = command.replace("/create ", "");
      let optionA = options[0];
      let optionB = options[1];

      let votingCreate = {
        username: "🔥 Flamewars bot 🔥",
        color: "#0c5460",
        bgColor: "#d1ecf1",
        message: `New voting started: ${optionA} vs ${optionB}`,
        date: new Date(),
      };
      let votingUsing = {
        username: "🔥 Flamewars bot 🔥",
        color: "#0c5460",
        bgColor: "#d1ecf1",
        message: `Vote now for your favorite, writing #${optionA} or #${optionB}`,
        date: new Date(),
      };

      messages.push(votingCreate);
      messages.push(votingUsing);
      vote = {
        title: title,
        optionA: optionA,
        optionB: optionB,
        votesA: 0,
        votesB: 0,
      };

      socket.broadcast.emit("message", votingCreate);
      socket.broadcast.emit("message", votingUsing);
      socket.broadcast.emit("vote", vote);
    } else {
      const message = {
        username: "⚠ Flamewars bot ⚠",
        color: "#856404",
        bgColor: "#fff3cd",
        message: `There's a open vote, close the current one to create a new one`,
        date: new Date(),
      };
      socket.broadcast.emit("message", message);
    }
  });

  socket.on("vote", (data) => {
    let userVote = data.vote;
    if (userVote.includes(`${vote.optionA}`)) {
      vote.votesA++;
    } else {
      vote.votesB++;
    }
    let voteMessage = {
      username: "🔥 Flamewars bot 🔥",
      color: "#0c5460",
      bgColor: "#d1ecf1",
      message: `Vote dome! ${vote.votesA} / ${vote.votesB}`,
      date: new Date(),
    };

    messages.push(voteMessage);
    socket.broadcast.emit("message", voteMessage);
    socket.broadcast.emit("vote", vote);
  });

  socket.on("close", (data) => {
    let results = vote;
    if (results.title) {
      let voteMessage = {
        username: "🎊 Flamewars bot 🎊",
        color: "#155724",
        bgColor: "#d4edda",
        message: `Vote closed, the winner is ${
          results.votesA > results.votesB ? results.optionA : results.optionB
        }!`,
        date: new Date(),
      };

      vote = {};
      messages.push(voteMessage);
      socket.broadcast.emit("message", voteMessage);
      socket.broadcast.emit("vote", vote);
    } else {
      let voteMessage = {
        username: "⚠ Flamewars bot ⚠",
        color: "#856404",
        bgColor: "#fff3cd",
        message: `There's no voting event now! create a new one with command /create option1 vs option2`,
        date: new Date(),
      };
      socket.broadcast.emit("message", voteMessage);
    }
  });

  socket.on("disconnect", () => {
    console.log(`🔥 Flamewars bot 🔥 => ${socket.username} has left the chat`);

    socket.broadcast.emit("user-left", socket.username);
    users = users.filter((item) => socket.username !== item.username);

    // const leftMessage = {
    //   username: "🔥 Flamewars bot 🔥",
    //   color: "#0c5460",
    //   bgColor: "#d1ecf1",
    //   message: `${socket.username} has left the chat`,
    //   date: new Date(),
    // };

    // messages.push(leftMessage);
    // socket.broadcast.emit("message", leftMessage);
  });
});

nextApp.prepare().then(() => {
  app.get("/users", (req, res) => {
    res.json(users);
  });

  app.get("/messages", (req, res) => {
    res.json(messages);
  });

  app.get("/vote", (req, res) => {
    res.json(vote);
  });

  app.get("*", (req, res) => {
    return nextHandler(req, res);
  });

  server.listen(port, (err) => {
    if (err) process.exit(0);
    console.log(`> Ready on http://localhost:${port}`);
  });
});
