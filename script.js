
document.addEventListener("DOMContentLoaded", () => {
  const secciones = document.querySelectorAll("section, .card");

  secciones.forEach((el, i) => {
    setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, i * 200);
  });
});

// --- Efecto al pasar sobre las tarjetas ---
const tarjetas = document.querySelectorAll(".card");

tarjetas.forEach(card => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "scale(1.05)";
    card.style.transition = "transform 0.3s ease";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "scale(1)";
  });
});
