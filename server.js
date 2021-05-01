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
  // console.log(socket.id);

  socket.on("message", (data) => {
    const { username, message } = data;

    console.log(`${username} => ${message}`);

    messages.push(data);
    socket.broadcast.emit("message", data);
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
        id: new Date().getTime(),
        value: `New voting ${optionA} vs ${optionB}.`,
      };
      let votingUsing = {
        id: new Date().getTime() + 2,
        value: `vote now your favorite writing #${optionA} or #${optionB} .`,
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
      let message = {
        id: new Date().getTime(),
        value: `There's a open vote, close the current one to create a new one.`,
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
      id: new Date().getTime(),
      value: `vote dome! ${vote.votesA} / ${vote.votesB}`,
    };
    messages.push(voteMessage);
    socket.broadcast.emit("message", voteMessage);
    socket.broadcast.emit("vote", vote);
  });

  socket.on("close", (data) => {
    let results = vote;
    if (results.title) {
      let voteMessage = {
        id: new Date().getTime(),
        value: `vote close! the winner is ${
          results.votesA > results.votesB ? results.optionA : results.optionB
        }`,
      };
      vote = {};
      messages.push(voteMessage);
      socket.broadcast.emit("message", voteMessage);
      socket.broadcast.emit("vote", vote);
    } else {
      let voteMessage = {
        id: new Date().getTime(),
        value: `there's no vote now, create a new one with command /create`,
      };
      socket.broadcast.emit("message", voteMessage);
    }
  });

  socket.on("disconnect", () => {
    // console.log("disconneted", socket.id);
  });
});

nextApp.prepare().then(() => {
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
