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

- [Socket.io 4.0](https://socket.io/) • Websockets for the real time messages in chat
- [Node.js 15](https://nodejs.org/) • Needed for mounting the server for sockets
- [Express.js 4.17](https://expressjs.com/) • Needed for mounting the server for sockets
- [Next.js 10.1](https://nextjs.org/) • For learning purposes
- [React.js 17.0](https://reactjs.org/) • Building the UI
- [Heroku](https://www.heroku.com/) • Deployment

With the supervision of [Erik Ochoa](https://twitter.com/Elyager), Academic Coach at [Platzi Master](https://platzi.com/master/)

## You may also like...

- [When2Meet Clone](https://github.com/juandadev/when2meet-clone) - An event planner for crowds

## Contributors

This app was created with 💚 by:

> Anthony Gonzalez &nbsp;&middot;&nbsp;
> [thomasnrggo.com](https://thomasnrggo.com) &nbsp;&middot;&nbsp;
> Web Designer &nbsp;&middot;&nbsp;
> Frontend Developer &nbsp;&middot;&nbsp;
> GitHub [@thomasnrggo](https://github.com/thomasnrggo) &nbsp;&middot;&nbsp;
> Twitter [@thomasnrggo](https://twitter.com/thomasnrggo)

> Juan Daniel Martínez &nbsp;&middot;&nbsp;
> [juanda.dev](https://juanda.dev) &nbsp;&middot;&nbsp;
> Frontend Developer &nbsp;&middot;&nbsp;
> GitHub [@juandadev](https://github.com/juandadev) &nbsp;&middot;&nbsp;
> Twitter [@juanda_dev_](https://twitter.com/juanda_dev_)