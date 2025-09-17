// --- Animación suave de entrada ---
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

// --- Texto dinámico en el header ---
const frases = [
  "Bienvenido a mi portafolio",
  "Programación Numérica 2025",
  "Estudiante: Henrry Higinio Quispe Ramos",
  "Docente: [Nombre del Docente]"
];

let index = 0;
function cambiarTexto() {
  const header = document.querySelector("header h1");
  header.textContent = frases[index];
  index = (index + 1) % frases.length;
}
setInterval(cambiarTexto, 4000); // cambia cada 4 segundos
