let Interval;

document.querySelector("#loginModal").addEventListener("shown.bs.modal", () => {
  Interval = setInterval(() => {
    console.log("sending");
  }, 1000);
});

document
  .querySelector("#loginModal")
  .addEventListener("hidden.bs.modal", () => {
    clearInterval(Interval);
  });
