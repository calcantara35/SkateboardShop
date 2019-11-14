// init xmlhttpreq
let request = new XMLHttpRequest();

//global var for data
let resData = null;

// setting properties
request.open("GET", "http://localhost:4500/reservations/all", true);

// specific whats gonna happen once we get data back | This is a callback function, excutes once we have data
request.onload = function() {
  // use this to refer the api
  resData = JSON.parse(this.response); // contains data from current object | Payload is this.response | parse turns it into a js object

  if (request.status == 200) {
    // displays reservations
    let output = "";

    // looping through response data
    resData.forEach(reservation => {
      // appending to output variable
      output += `<tr><td>${reservation.name}</td><td>${reservation.date}</td><td>${reservation.time}</td><td>${reservation.hours}</td></tr>`;

      // placing content of output var into the selected id
      document.querySelector("#allResData").innerHTML = output;
    });
    console.log("Success!");
  } else {
    console.log("An error occured");
  }
};

// last step
request.send();
