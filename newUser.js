//submit
const submitUsername = () => {
  let texboxVal = document.querySelector("#usernameVal").value;

  // init xmlhttpreq
  let request = new XMLHttpRequest();

  let resData = null;

  // setting properties
  request.open("POST", `http://localhost:4500/register/new/${texboxVal}`, true);

  // specific whats gonna happen once we get data back | This is a callback function, excutes once we have data
  request.onload = function() {
    // use this to refer the api
    resData = this.response; // contains data from current object | Payload is this.response | parse turns it into a js object
    console.log(resData);

    if (request.status == 200) {
      let alertContainer = document.querySelector("#alertContainer");
      let alert = document.createElement("h2");
      let alertContent = document.createTextNode(
        "Congrats! You are now register to our system!"
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

document.querySelector("#submitBtn").addEventListener("click", submitUsername);
