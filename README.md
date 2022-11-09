# Car Shop

This is a project developed at Trybe's Back-End Module.

Car SHop is a web system developed to receive and response HTTP requests to manage a car shop using mongoDB through mongoose and a node server.

# Summary
- [Car Shop](#car-shop)
- [Summary](#summary)
- [Context](#context)
- [Technologies and Tools](#technologies-and-tools)
- [Notes](#notes)
- [Git and Commits](#git-github-and-commit-history)
- [Lint](#lint)
- [Installing and running the app](#installing-and-running-the-app)
- [Documentation](#api-documentation)

# Context
This API allows doing via HTTP requests:
 - Create, delete, update and find cars
 - Create, delete, update and find motorcycles

# Technologies and Tools
This project used the following technologies and tools:
  * __Node__ | [Javascript Runtime Environment](https://reactjs.org/docs/thinking-in-react.html)
  * __Express__ | [Web Framework for NodeJS](https://redux-toolkit.js.org/introduction/getting-started)
  * __Zod__ | [Data Validation](https://zod.dev/) 
  * __Mongoose__ | [Object–document Mapping](https://mongoosejs.com/docs/guide.html) 

# Notes
### Git, GitHub and Commit History
- This project used the [Conventional Commits specification](https://www.conventionalcommits.org/en/v1.0.0/) with some types from [Angular convention](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines).

### Lint
- The project was developed following the Clean Code standards specified by [Trybe's Lint](https://github.com/betrybe/eslint-config-trybe).

### Files
 - The Dorckerfile, docker-compose.yml and other config files were made available by Trybe.


# Installing and running the app

## Running without docker
\* __To run this app without docker you need a running MongoDB server.__

### Enter into project directory
```
cd car-shop
```
### Set environment variables

Set your environment variables in .env.example file according to your development environment and then change its name to .env
```
#### SERVER VARS
PORT=

#### DATABASE VARS
MONGO_URI=
```

### Install project dependencies
```
npm install
```

### Run node server.
```
npm start
```

## Running with docker

### Build docker containers and their network.
```
cd car-shop
docker-compose up -d
```
### Entering into bash terminal from Node container.
```
docker exec -it car_shop bash
```

### Install project dependencies
```
npm install
```

### Run node server.
```
npm run dev
```

# API Documentation
