const UIState = { selectedAnimal: null, simulationRunning : false}

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
      UIState.selectedAnimal = btn.id.toLowerCase(); // e.g., "rabbit"
      console.log("Selected animal:", UIState.selectedAnimal);
    });
  });
});


// ---- DOM references ----
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggleSim");
  const resetBtn = document.getElementById("resetSim");

  // Toggle start/pause
  toggleBtn.addEventListener("click", () => {
    UIState.simulationRunning = !UIState.simulationRunning;

    if (UIState.simulationRunning) {
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
    UIState.simulationRunning = false;
    toggleBtn.textContent = "Start Simulation";
    toggleBtn.classList.remove("running");
    console.log("Simulation reset");
    if (typeof resetSimulation === "function") resetSimulation();
  });
});
