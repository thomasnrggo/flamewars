<h1 align="center">
  <br>
  🔥
  <br>
  Flamewars
  <br>
</h1>

<h4 align="center">A real time chat for voting events.</h4>

<p align="center">
    <a href="https://img.shields.io/github/issues-pr/thomasnrggo/flamewars">
        <img src="https://img.shields.io/github/issues-pr/thomasnrggo/flamewars">
    </a>
    <a href="https://img.shields.io/github/languages/top/thomasnrggo/flamewars">
        <img src="https://img.shields.io/github/languages/top/thomasnrggo/flamewars">
    </a>
    <a href="https://heroku-badge.herokuapp.com/?app=flamewars-master">
        <img src="https://heroku-badge.herokuapp.com/?app=flamewars-master">
    </a>
</p>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#demo">Demo</a> •
  <a href="#credits">Credits</a> •
  <a href="#contributors">Contributors</a>
</p>

![screenshot](https://imgur.com/Ttdf1oM.png)

## Key Features

- Register for free to the chat
- Can choose your username (with emojis 🐵) and chat bubble color
- Create voting events with the command `/create option1 vs option2`
- Closing the current voting event with the command `/close`
  - Only admins can create and close a voting event with the proper commands
- All member logged in to the chat included admins can vote with the command `#voteOption`
  - If you are a default member you only can vote but not create and close an event
- See the results chart of the votes in real-time

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/thomasnrggo/flamewars.git

# Go into the repository
$ cd flamewars

# Install dependencies
$ npm install

#Set your environment variables renaming the env.local.example template to env.local
BASE_URL=http://your-project-path
JWT_SECRET=a-secret-key-for-jwt-tokens

# Run the app
$ npm run dev
```

At this point there's no need to create a database for the users, there are registered on the server.js file in the root project. Soon we're gonna implement some database service to store all the data.

If you want to test the admin commands to create voting events you can manually add a user with `role: "admin"` in the `server.js` file located in the project's root or use the test user: **username: admin, password: 123**.

## Demo

You can view the latest build for the app [here](https://flamewars-master.herokuapp.com/).

## Credits

This software uses the following open source packages:

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Next.js](https://nextjs.org/)
- [React.js](https://reactjs.org/)
- [Socket.io](https://socket.io/)
- [Heroku](https://www.heroku.com/) (Deployment)

## You may also like...

- [When2Meet Clone](https://github.com/juandadev/when2meet-clone) - An event planner for crowds

## Contributors

This app was created with 💚 by:

- [Anthony Gonzalez](https://github.com/thomasnrggo) 🇲🇽
- [Juan Daniel Martínez](https://juanda.dev) 🇲🇽
