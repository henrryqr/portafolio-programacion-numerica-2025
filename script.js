// Hace que las tarjetas brillen al azar para dar dinamismo
setInterval(() => {
  const cards = document.querySelectorAll(".card");
  const random = Math.floor(Math.random() * cards.length);
  cards[random].classList.add("highlight");

  setTimeout(() => {
    cards[random].classList.remove("highlight");
  }, 1000);
}, 3000);
