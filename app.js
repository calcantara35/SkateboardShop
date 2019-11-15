// import express
const express = require("express");
const cors = require("cors");
const fs = require("fs");

// access express module
const server = express();

//middle-ware
server.use(cors()); // still dont know if we can use this

// port
const port = 4500;

// username object
const usersList = [];

// reseervation object
const resList = [];

// user file variable
let usersFile = "Users.json";

// res file variable
let resFile = "Reservation.json";

// home page
server.get("/", (req, res) => {
  res.send(
    "<h1>Welcome to the skateboard shop. Make some reservations today!</h1"
  );
});

// add new username
server.put("/register/new/:username", (req, res) => {
  let userName = req.params.username;

  // checking to see if the file exists | if its not there...
  if (!fs.existsSync(usersFile)) {
    // adding new user to empty object
    usersList.push({
      name: userName
    });

    // creating the Users.json file
    fs.writeFile(usersFile, JSON.stringify(usersList), err => {
      if (err) throw err;
      console.log("Success");
    });
    res.send(
      `The File ${usersFile} has been created and the user ${userName} has been added!`
    );
  } else {
    // if it exists, read Users.json file
    fs.readFile(usersFile, (err, data) => {
      if (err) throw err;

      // parsing through existing data and putting it in a variable and converting JSON object to JS object
      let appendUserList = JSON.parse(data);

      // appending new user to existing file
      appendUserList.push({
        name: userName
      });

      // converting js object back to JSON object
      let appendUserListInfo = JSON.stringify(appendUserList);

      // must be writefile or it will constantly create new objects
      fs.writeFile(usersFile, appendUserListInfo, err => {
        if (err) throw err;
        console.log("Success!");
      });
    });
    res.send(`User ${userName} has been added to system.`);
  }
});

// Create reservation
server.post(
  "/reservation/new/user/:username/date/:startDate/time/:startTime/hours/:resHours",
  (req, res) => {
    let userName = req.params.username;
    let startDate = req.params.startDate;
    let startTime = req.params.startTime;
    let hours = req.params.resHours;

    //boolean var for validation
    // let userExists = false;

    // fs.readFile(usersFile, (err, data) => {
    //   if (err) throw err;
    //   let existingUser = JSON.parse(data);
    //   existingUser.forEach(user => {
    //     if (user.name.toString() === userName) {
    //       userExists = true;
    //     } else {
    //       res.end(
    //         "User does not exist, please create new user or make sure the username is correct!"
    //       );
    //     }
    //   });
    // });

    // if (userExists === true) {

    // checking to see if the file exists
    if (!fs.existsSync(resFile)) {
      // adding new user to empty object
      resList.push({
        name: userName,
        date: startDate,
        time: startTime,
        hours
      });

      // creating the Reservation.json file
      fs.writeFile(resFile, JSON.stringify(resList), err => {
        if (err) throw err;
        console.log("Success");
      });
      res.send(
        `The File ${resFile} has been created and the reservation for ${userName} has been added!`
      );
    } else {
      // if it exists, read Reservation.json file
      fs.readFile(resFile, (err, data) => {
        if (err) throw err;

        // parsing through existing data and putting it in a variable and converting JSON object to JS object
        let appendResList = JSON.parse(data);

        // appending new user to existing file
        appendResList.push({
          name: userName,
          date: startDate,
          time: startTime,
          hours
        });

        // converting js object back to JSON object
        let appendResListInfo = JSON.stringify(appendResList);

        // must be writefile or it will constantly create new objects
        fs.writeFile(resFile, appendResListInfo, err => {
          if (err) throw err;
          console.log("Success!");
        });
      });
      res.send(`Reservation for ${userName} has been added to system.`);
    }
    // }
  }
);

// get reservation for all users
server.get("/reservations/all", (req, res) => {
  fs.readFile(resFile, (err, data) => {
    if (err) throw err;
    let completeResFile = JSON.parse(data);

    // ***IMPORTANT*** //
    // TODO: sort the list here because it makes the most sense
    // asked professor about it.

    // when we make the client side code, we need to make a restriction on how the user is going to put in the date of the reservation because
    // it can mess with the sorting.

    // also i think that we need to JSON.stringify this completeResFile because it wont send the data back right

    // ***END OF IMPORTANT*** //

    completeResFile.sort((res1, res2) => {
      if (res1.date > res2.date) return 1;
      if (res1.date < res2.date) return -1;

      if (res1.time > res2.time) return 1;
      if (res1.time > res2.time) return -1;
    });

    console.log(completeResFile);

    let sortedResFile = JSON.stringify(completeResFile);

    res.end(sortedResFile);

    // debating if we should do fs.write and make the actual json file sorted chronologically. It is not a requirement, just the data has to be chronological.

    console.log("success!");
  });
});

// Retrieve the reservation info for a given user (if they have one)
server.get("/reservation/user/:username", (req, res) => {
  let userName = req.params.username;
  let userExists = false;

  if (!fs.existsSync(resFile)) {
    res.end(
      "User does not exist and there are no reservations at this time..."
    );
  } else {
    fs.readFile(resFile, (err, data) => {
      if (err) throw err;

      let resFullList = JSON.parse(data);
      resFullList.forEach((reservation, index) => {
        if (reservation.name.toString() === userName) {
          res.send(
            `Username: (${resFullList[index].name}\nReservation Date: ${resFullList[index].date}\nReservation Time: ${resFullList[index].time}\nReservation Duration: ${resFullList[index].hours}\n`
          );
          userExists === true;
        }
      });
      if (userExists === false) {
        res.end("User Does Not Exists");
      }
    });
  }
});

// update reservation for a given user
server.put(
  "/reservation/update/user/:username/date/:startDate/time/:startTime/hours/:resHours",
  (req, res) => {
    let userName = req.params.username;
    let startDate = req.params.startDate;
    let startTime = req.params.startTime;
    let hours = req.params.resHours;

    let userExists = false;

    if (!fs.existsSync(resFile)) {
      res.end("There is no data for reservations.");
    } else {
      fs.readFile(resFile, (err, data) => {
        if (err) throw err;
        let fullResList = JSON.parse(data);

        fullResList.forEach((reservation, index) => {
          if (reservation.name.toString() === userName) {
            fullResList[index].date = startDate;
            fullResList[index].time = startTime;
            fullResList[index].hours = hours;

            let convertResList = JSON.stringify(fullResList);
            res.send(`Reservation: ${convertResList}`);

            userExists = true;

            fs.writeFile(resFile, convertResList, err => {
              if (err) throw err;
              console.log("Updated File");
            });
          }
        });
        if (userExists === false) {
          res.end("User does not exist.");
        }
      });
    }
  }
);

// delete res file
server.delete("/reservation/delete/user/:username", (req, res) => {
  let userName = req.params.username;

  let userExists = false;

  if (!fs.existsSync(resFile)) {
    res.end("There is no data for reservations.");
  } else {
    fs.readFile(resFile, (err, data) => {
      if (err) throw err;
      let fullResList = JSON.parse(data);

      fullResList.forEach((reservation, index) => {
        if (reservation.name.toString() === userName) {
          fullResList.splice(index, 1);

          let convertResList = JSON.stringify(fullResList);

          userExists = true;

          fs.writeFile(resFile, convertResList, err => {
            if (err) throw err;
            console.log("Updated File");
          });

          res.send(`${userName}'s reservation was deleted.`);
        }
      });
      if (userExists === false) {
        res.end("User does not exist.");
      }
    });
  }
});

server.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
