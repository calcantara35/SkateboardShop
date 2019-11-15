// init xmlhttpreq
let request = new XMLHttpRequest();

let userResData = null;

let selectedUser = null;

// setting properties

function displayUserReservation() {
  selectedWord = document.querySelector("#wordBox").value;
  if (selectedWord == null || selectedWord == "") {
    document.querySelector("#userReservation").innerHTML = "Please enter a username!";
  } else {
    request.open("GET", `http://localhost:4500/reservation/user${selectedUser}`, true);

    // specific whats gonna happen once we get data back | This is a callback function, excutes once we have data
    request.onload = function() {
      // use this to refer the api
      userResData = JSON.parse(this.response); // contains data from current object | Payload is this.response | parse turns it into a js object
      console.log(userResData);

      if (request.status == 200) {
        // displays reservations
        let output = "";

        // looping through response data
        resData.forEach(reservation => {
          const reslist = document.getElementById("reservation-data");
          // Create tr element
          const row = document.createElement("tr");
          // insert cols
          row.innerHTML = `
          <td>${reservation.name}</td>
          <td>${reservation.date}</td>
          <td>${reservation.time}</td>
          <td>${reservation.hours}</td>
          <td><a href='#' class='delete'>X</a></td>`;
          reslist.appendChild(row);
        });
        // document.querySelector("#username").innerHTML = output;
        console.log("Success!");
      } else {
        console.log("An error occured");
      }
    };

    // last step
    request.send();
  }
}
