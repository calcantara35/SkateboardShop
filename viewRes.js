// global vars
let userResData = null;

let selectedUser = null;
//displayuser Reservation

const displayUserReservation = () => {
  // init xmlhttpreq
  let request = new XMLHttpRequest();

  //clear data in table
  clearItems();

  selectedUser = document.querySelector("#wordBox").value;
  if (selectedUser == null || selectedUser == "") {
    document.querySelector("#userReservation").innerHTML =
      "Please enter a username!";
  } else {
    request.open(
      "GET",
      `http://localhost:4500/reservation/user/${selectedUser}`,
      true
    );
    // specific whats gonna happen once we get data back | This is a callback function, excutes once we have data
    request.onload = function() {
      // use this to refer the api
      userResData = JSON.parse(this.response); // contains data from current object | Payload is this.response | parse turns it into a js object
      console.log(userResData);

      let userExists = false;

      if (request.status == 200) {
        // looping through response data
        userResData.forEach(reservation => {
          if (reservation.name == selectedUser) {
            const reslist = document.getElementById("userReservation");
            userExists = true;

            // Create tr element
            const row = document.createElement("tr");
            // insert cols
            row.innerHTML = `
          <td>${reservation.name}</td>
          <td>${reservation.date}</td>
          <td>${reservation.time}</td>
          <td>${reservation.hours}</td>
          <td><a id='deleteIcon' href='#' class='delete'>X</a></td>`;
            reslist.appendChild(row);
            console.log(reslist);
          }
        });

        if (userExists === false) {
          document.querySelector("#userReservation").innerHTML =
            "User does not exist!";
        }

        console.log(userResData);

        console.log("Success!");
      } else {
        console.log("An error occured");
      }
    };

    // last step
    request.send();
  }
};

const removeRes = () => {
  let deleteRequest = new XMLHttpRequest();

  deleteRequest.open(
    "DELETE",
    `http://localhost:4500/reservation/user/${selectedUser}`,
    true
  );

  deleteRequest.onload = function() {};
};

function clearItems() {
  document.querySelector("#userReservation").innerHTML = " ";
}

// event listeners
document
  .querySelector("#wordButton")
  .addEventListener("click", displayUserReservation);

document.querySelector("#deleteIcon").addEventListener("click", removeRes);
