const ball = document.getElementById("ball");

//Move Right Button
const btnRight = document.getElementById("btnRight");

//Move Left Button
const btnLeft = document.getElementById("btnLeft");

//Move Down Button
const btnDown = document.getElementById("btnDown");

//Move Up Button
const btnUp = document.getElementById("btnUp");

//Stop Button
const btnStop = document.getElementById("btnStop");

//Reset Button
const btnReset = document.getElementById("btnReset");

const buttonArea = document.querySelector(".buttonArea");

let speed = 10;

let intervalHandle,
  distance = 0;

//Main Function
function Movement(direction, value) {
  clearInterval(intervalHandle);
  let initialValStr = ball.style[direction];
  if (initialValStr === "") {
    initialValStr = "0px";
  }

  distance = parseInt(initialValStr.split("px")[0]);

  const viewWidth = window.innerWidth;
  const viewHeight = window.innerHeight;

  intervalHandle = setInterval(function () {
    distance += value;
    ball.style[direction] = distance + "px";

    if (direction === "marginLeft") {
      if (ball.offsetWidth - distance >= viewWidth) {
        // ekranın solundan dışa çıkmasını engelliyor
        clearInterval(intervalHandle);
        return;
      }

      if (viewWidth - distance <= ball.offsetWidth) {
        // ekranın sağından dışa çıkmasını engelliyor
        clearInterval(intervalHandle);
        return;
      }
    }

    if (direction === "marginTop") {
      if (distance <= 0) {
        // ekranın üstünden dışa çıkmasını engelliyor
        clearInterval(intervalHandle);
        return;
      }

      if (
        viewHeight - buttonArea.offsetHeight - ball.offsetHeight <=
        distance
      ) {
        // ekranın altından dışa çıkmasını engelliyor
        ball.style[direction] = distance - value + "px";
        clearInterval(intervalHandle);
        return;
      }
    }
  }, 16.66);
}

btnRight.addEventListener("click", function () {
  Movement("marginLeft", speed * 2);
});
btnLeft.addEventListener("click", function () {
  Movement("marginLeft", -speed * 2);
});
btnDown.addEventListener("click", function () {
  Movement("marginTop", speed);
});
btnUp.addEventListener("click", function () {
  Movement("marginTop", -speed);
});

btnStop.addEventListener("click", function () {
  clearInterval(intervalHandle);
});

btnReset.addEventListener("click", function () {
  clearInterval(intervalHandle);
  distance = 0;
  ball.style.marginLeft = "0px";
  ball.style.marginTop = "0px";
});

document.addEventListener("keydown", function (evnt) {
  console.log(evnt.code);
  switch (evnt.code) {
    case "ArrowDown":
      Movement("marginTop", 5);
      break;
    case "ArrowUp":
      Movement("marginTop", -5);
      break;
    case "ArrowLeft":
      Movement("marginLeft", -5);
      break;
    case "ArrowRight":
      Movement("marginLeft", 5);
      break;
    case "Space":
      clearInterval(intervalHandle);
      break;
    default:
      return;
  }
});
