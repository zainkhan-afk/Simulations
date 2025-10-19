// --- Toggle active button for animals ---
document.addEventListener("DOMContentLoaded", () => {
  const animalButtons = document.querySelectorAll(".animal-btn");

  animalButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active from all
      animalButtons.forEach((b) => b.classList.remove("active"));

      // Add active to the one clicked
      btn.classList.add("active");

      // Optional: you can now trigger something in your sketch
      // Example: set a global variable for selected animal
      window.selectedAnimal = btn.id.toLowerCase(); // e.g., "rabbit"
      console.log("Selected animal:", window.selectedAnimal);
    });
  });
});


// ---- Simulation state ----
let simulationRunning = false;

// ---- DOM references ----
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggleSim");
  const resetBtn = document.getElementById("resetSim");

  // Toggle start/pause
  toggleBtn.addEventListener("click", () => {
    simulationRunning = !simulationRunning;

    if (simulationRunning) {
      toggleBtn.textContent = "Pause Simulation";
      toggleBtn.classList.add("running");
      console.log("Simulation started");
    } else {
      toggleBtn.textContent = "Start Simulation";
      toggleBtn.classList.remove("running");
      console.log("Simulation paused");
    }
  });

  // Reset
  resetBtn.addEventListener("click", () => {
    simulationRunning = false;
    toggleBtn.textContent = "Start Simulation";
    toggleBtn.classList.remove("running");
    console.log("Simulation reset");
    if (typeof resetSimulation === "function") resetSimulation();
  });
});
