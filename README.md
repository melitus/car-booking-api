# Car Booking API 🛡️

# Tools

- NodeJS
- Express
- Sequelize
- PostgreSQL

## Getting Started

The easiest way to get started is to clone the repository:

# clone the repository

```
git clone https://github.com/melitus/car-booking-api.git
```

# Change directory

```
cd car-booking-api
```

# Install NPM dependencies

```
yarn install
```

# start the server

```
yarn run dev
```

Note: It is recommended to install nodemon for livereloading - It watches for any changes in your node.js app and automatically restarts the server

# Deployment
### Deployment to Heroku

<img src="https://upload.wikimedia.org/wikipedia/en/a/a9/Heroku_logo.png" width="200">

- Download and install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#download-and-install)
- In a terminal, run `heroku login` and enter your Heroku credentials
- From *your app* directory run `heroku create`
- Use the command `heroku config:set KEY=val` to set the different environment variables (KEY=val) for your application (i.e.  `heroku config:set BASE_URL=[heroku App Name].herokuapp.com` etc.)

- Do `git add .`
- Do `git commit -m" reason for commit"`
- Lastly, do `git push heroku master`.

Please note that you may also use the [Herko Dashboard](https://dashboard.heroku.com) to set or modify the configurations for your application.

# View live demo and test with any api
I used postman to test the api.
To use postman, go to the project doc folder and import the docs file into your postman client to ease the testing


### <a href="https://car-booking-backend.herokuapp.com/v1/api">LIVE DEMO</a>