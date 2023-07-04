const dropzones = document.getElementsByClassName("dropzone");
const undo = document.getElementsByClassName("undo")[0];
const message = document.getElementsByClassName("message")[0];
const draggables = document.getElementsByClassName("draggable");
const body = document.getElementsByTagName("body")[0];

let source = "";
let lastStateDropped = "",
  lastStateReplaced = "";

function swap(source, destination) {
  let sourcePar = source.parentElement;
  let destPar = destination.parentElement;

  source.classList.add("moving");
  destination.classList.add("moving");

  destPar.removeChild(destination);
  sourcePar.removeChild(source);
  sourcePar.append(destination);
  destPar.append(source);

  setTimeout(function() {
    source.classList.remove("moving");
    destination.classList.remove("moving");
  }, 700);
}

for (let i = 0; i < draggables.length; i++) {
  draggables[i].addEventListener("drag", (e) => {
    e.target.classList.add("dragged");
  });

  draggables[i].addEventListener("dragstart", (e) => {
    source = e.target;
    lastStateDropped = "";
    lastStateReplaced = "";
  });

  draggables[i].addEventListener("dragover", (e) => {
    e.target.classList.add("dragover");
  });

  draggables[i].addEventListener("dragend", (e) => {
    e.target.classList.remove("dragged");
  });
}

let current;

for (let i = 0; i < dropzones.length; i++) {
  dropzones[i].addEventListener("dragenter", (e) => {
    e.target.classList.add("dragenter");

    current = e.target;

    if (current.classList.contains("dropzone") === false) {
      return;
    }

    if (current === source) {
      return;
    }

    swap(source, current);
    lastStateDropped = source;
    lastStateReplaced = current;
  });

  dropzones[i].addEventListener("dragover", (e) => {
    e.preventDefault();
    e.target.classList.add("dragover");
  });

  dropzones[i].addEventListener("dragleave", (e) => {
    e.target.classList.remove("dragover", "dragenter");
    if (
      lastStateDropped === "" ||
      lastStateReplaced === "" ||
      lastStateDropped === lastStateReplaced
    )
      return;
    let val_1 = lastStateDropped.innerText;
    let val_2 = lastStateReplaced.innerText;
    message.innerText = `[${val_1}]  <--->   [${val_2}]`;
    message.style.opacity = 1;
    setTimeout(() => {
      message.style.opacity = 0;
    }, 700);
  });

  dropzones[i].addEventListener("drop", (e) => {
    e.target.classList.remove("dragover", "dragenter");
  });
}

undo.addEventListener("click", (e) => {
  if (lastStateDropped === "" || lastStateReplaced === "") {
    message.innerText = "no box displaced yet....";
    message.style.opacity = 1;

    setTimeout(() => {
      message.innerText = "";
      message.style.opacity = 0;
    }, 700);

    return;
  }

  swap(lastStateDropped, lastStateReplaced);

  let val_1 = lastStateDropped.innerText;
  let val_2 = lastStateReplaced.innerText;
  message.innerText = `[${val_1}] <--->  [${val_2}]`;
  message.style.opacity = 1;

  setTimeout(() => {
    message.style.opacity = 0;
  }, 700);


  let temp = lastStateDropped;
  lastStateDropped = lastStateReplaced;
  lastStateReplaced = temp;
});
