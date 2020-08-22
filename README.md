# BRI - Battle Royale IRL

This app intends to provide an airsoft management system for emulating [battle royale games](https://en.wikipedia.org/wiki/Battle_royale_game) in real life.

## Overview

So you have an airsoft field, and you want to play one against all just like <INSERT_BATTLE_ROLAYLE_VIDEOGAME_NAME_HERE>. You can set up map boundaries, but there lies a problem, especially for large fields. The less people there are, the less chance they will meet and fight.

This app solves the above problem by providing each player with a live map and a zone narrowing with time which kills players staying outside for too long.

| | | |
|:-------------------------:|:-------------------------:|:-------------------------:|
|<img width="1604" src="./docs/wireframes/battlemap.png"> |  <img width="1604" alt="screen shot 2017-08-07 at 12 18 15 pm" src="./docs/wireframes/notready.png">|<img width="1604" alt="screen shot 2017-08-07 at 12 18 15 pm" src="./docs/wireframes/ready.png">|
|<img width="1604" alt="screen shot 2017-08-07 at 12 18 15 pm" src="./docs/wireframes/playerslist.png">  |  <img width="1604" alt="screen shot 2017-08-07 at 12 18 15 pm" src="./docs/wireframes/scoreboard.png">|<img width="1604" alt="screen shot 2017-08-07 at 12 18 15 pm" src="./docs/wireframes/spectatormode.png">|

### Running the app

#### Satisfy dependencies
```
npm install
```

You are required to set up in a .env :
- a firebase API key
- a google map API key
- the admin authorization password

#### Start the game server

```
npm run start
```

#### Visit the the app

Visit the app in your phone's web browser on port 5000.

http://localhost:5000

## Feedback
If you have used and enjoy this code base, I'd love to hear from you!

![image](./docs/players.jpg)