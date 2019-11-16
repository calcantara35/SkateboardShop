//submit
const updateReservation = e => {
  e.preventDefault();
  let userTexboxVal = document.querySelector("#usernameVal").value;
  let dateTexboxVal = document.querySelector("#dateVal").value;
  let timeTexboxVal = document.querySelector("#timeVal").value;
  let hoursTexboxVal = document.querySelector("#hoursVal").value;

  // init xmlhttpreq
  let request = new XMLHttpRequest();

  let resData = null;

  // setting properties
  request.open(
    "POST",
    `http://localhost:4500/reservation/new/user/${userTexboxVal}/date/${dateTexboxVal}/time/${timeTexboxVal}/hours/${hoursTexboxVal}`,
    true
  );

  // specific whats gonna happen once we get data back | This is a callback function, excutes once we have data
  request.onload = function() {
    // use this to refer the api
    resData = this.response; // contains data from current object | Payload is this.response | parse turns it into a js object
    console.log(resData);

    if (request.status == 200) {
      let alertContainer = document.querySelector("#alertContainer");
      let alert = document.createElement("h2");
      let alertContent = document.createTextNode(
        "Thank you for updating your reservation with us!"
      );

      alert.appendChild(alertContent);

      alertContainer.appendChild(alert);
    } else {
      let alertContainer = document.querySelector("#alertContainer");
      let alert = document.createElement("h2");
      let alertContent = document.createTextNode(
        "Opps! Sorry! Our system is currently down. Please com back later!"
      );

      alert.appendChild(alertContent);

      alertContainer.appendChild(alert);

      console.log("An error occured");
    }
  };

  // last step
  request.send();
};

document
  .querySelector("#submitBtn")
  .addEventListener("click", updateReservation);
