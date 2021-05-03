const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const { log } = require("console");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const getTime = require("date-fns/getTime");

const messages = [];
let vote = {};
let users = [];
let usersDB = [
  {
    id: 1,
    username: "Juanda 🐵",
    password: "$2a$10$OhW7fBzBzsWELepU9lPZHu2tjgrazumGoewqKghehvyIJTEIU/r7K",
    role: "admin",
    color: "#710E63",
    bgColor: "#F6E2F3",
  },
  {
    id: 2,
    username: "anthony",
    password: "$2a$10$.JH92abd/UpJLL6vJ3wX5eIMpI96BqOMQo5KqhkJsroGRYC5emhiK",
    role: "admin",
    color: "#9B5E13",
    bgColor: "#FEF2E3",
  },
  {
    id: 3,
    username: "test user",
    password: "$2a$10$.JH92abd/UpJLL6vJ3wX5eIMpI96BqOMQo5KqhkJsroGRYC5emhiK",
    role: "member",
    color: "#36495A",
    bgColor: "#EAEEF1",
  },
  {
    id: 4,
    username: "admin",
    password: "$2a$10$.JH92abd/UpJLL6vJ3wX5eIMpI96BqOMQo5KqhkJsroGRYC5emhiK",
    role: "admin",
    color: "#36495A",
    bgColor: "#EAEEF1",
  },
];

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
    const isAdmin = usersDB.find((user) => data.username === user.username);

    if (isAdmin.role === "admin") {
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
          votants: [],
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
    } else {
      socket.broadcast.emit("message", {
        username: "❌ Flamewars bot ❌",
        color: "#721c24",
        bgColor: "#f8d7da",
        message: `${isAdmin.username} doesn't have permission to create a voting event!`,
        date: new Date(),
      });
    }
  });

  socket.on("vote", (data) => {
    let userVote = data.vote;
    const { username } = data;

    if (vote.votants?.find((item) => username === item) === undefined) {
      if (userVote.includes(`${vote.optionA}`)) {
        console.log(
          `🔥 Flamewars bot 🔥 => ${username} voted for ${vote.optionA}`
        );

        vote.votants.push(username);
        vote.votesA++;
      } else {
        console.log(
          `🔥 Flamewars bot 🔥 => ${username} voted for ${vote.optionB}`
        );

        vote.votants.push(username);
        vote.votesB++;
      }

      socket.broadcast.emit("vote", vote);
      console.log(
        `🔥 Flamewars bot 🔥 => ${vote.optionA}: ${vote.votesA} vs ${vote.optionB}: ${vote.votesB}`
      );
      console.log(
        `🔥 Flamewars bot 🔥 => Users that already voted: ${vote.votants}`
      );
    } else {
      socket.broadcast.emit("message", {
        username: "⚠ Flamewars bot ⚠",
        color: "#856404",
        bgColor: "#fff3cd",
        message: `${username} has already voted!`,
        date: new Date(),
      });
    }
  });

  socket.on("close", (data) => {
    const isAdmin = usersDB.find((user) => data.username === user.username);

    if (isAdmin.role === "admin") {
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
        console.log(
          `🔥 Flamewars bot 🔥 => The winner of the votation is 🎊 ${
            results.votesA > results.votesB ? results.optionA : results.optionB
          }!!!`
        );
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
    } else {
      socket.broadcast.emit("message", {
        username: "❌ Flamewars bot ❌",
        color: "#721c24",
        bgColor: "#f8d7da",
        message: `${isAdmin.username} doesn't have permission to close a event voting!`,
        date: new Date(),
      });
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
  app.use(bodyParser.json());

  app.post("/login", (req, res) => {
    const user = req.body;
    const userExists = usersDB.find((item) => user.username === item.username);

    if (userExists) {
      const isPasswdordCorrect = bcrypt.compareSync(
        user.password,
        userExists.password
      );

      if (isPasswdordCorrect) {
        res.status(201).send({
          message: "User authenticated",
          user: {
            username: userExists.username,
            color: userExists.color,
            bgColor: userExists.bgColor,
          },
        });
      } else {
        res.status(400).send("The password is incorrect");
      }
    } else {
      res.status(400).send("The user does not exist.");
    }
  });

  app.post("/register", (req, res) => {
    const user = req.body;
    const userExists = usersDB.find((item) => user.username === item.username);

    if (userExists) {
      res.status(400).send("This user has been registered");
    } else {
      const generateId = getTime(new Date());
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(user.password, salt);
      const data = {
        id: generateId,
        username: user.username,
        password: hash,
        role: "member",
        color: user.color,
        bgColor: user.bgColor,
      };

      usersDB.push(data);
      res.status(201).send(data);
    }
  });

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
