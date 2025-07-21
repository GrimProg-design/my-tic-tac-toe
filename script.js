function disabledButtons() {
  const div = document.querySelector("div");
  const buttons = div.querySelectorAll("button");

  for (let btn of buttons) {
    btn.setAttribute("disabled", "true");
  }
}

function winOrLose(moves, winer) {
  const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < win.length; i++) {
    if (win[i].every((index) => moves.includes(index))) {
      const par = document.createElement("p");
      par.textContent = `${winer} win`;
      par.className = "winer";
      document.body.appendChild(par);
      disabledButtons();
      return true;
    }
  }
  return false;
}

function field() {
  const div = document.createElement("div");
  const restart = document.createElement("button");

  document.body.appendChild(div);

  restart.textContent = "Restart";
  restart.className = "restart";
  document.body.appendChild(restart);

  let circleOrCross = true;
  let winer;

  let cross = [];

  let circle = [];

  for (let i = 0; i < 9; i++) {
    const button = document.createElement("button");
    button.className = "button";
    button.textContent = "";
    button.setAttribute("id", i + 1 - 1);

    button.addEventListener("click", () => {
      if (circleOrCross) {
        button.textContent = "X";
        circleOrCross = false;
        cross.push(i);
        winer = "cross";
        winOrLose(cross, winer);
      } else {
        button.textContent = "O";
        circleOrCross = true;
        circle.push(i);
        winer = "circle";
        winOrLose(circle, winer);
      }

      button.setAttribute("disabled", "true");
    });

    restart.addEventListener("click", () => {
      button.textContent = "";
      button.removeAttribute("disabled");
      cross = [];
      circle = [];
      document.querySelector(".winer")?.remove();
    });

    div.appendChild(button);
  }
}

field();