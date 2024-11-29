function displayAllPlayers() {
  const playersContainer = document.getElementById("allPlayers");
  playersContainer.innerHTML = "";
  const playersList = JSON.parse(localStorage.getItem("players"));
  playersList.forEach((player) => {
    const playerElement = document.createElement("div");
    playerElement.classList.add(
      "border",
      "p-4",
      "m-2",
      "bg-white",
      "rounded-md",
      "cursor-pointer",
      "ParentFunc"
    );
    playerElement.innerHTML = `
    <div class='flex justify-between'>
    <i class="fa-regular fa-pen-to-square Edit"></i>
    <i class="fa-solid fa-xmark Remove"></i></div>
    <img src="${player.photo}" alt="${player.name}" width="100" class='mt-1'/>
    
     <h1 class="mt-1">${player.name}</h1>
    <div class="flex gap-2">
    <img src="${player.flag}" alt="${player.nationality}" width="30" class="h-4 my-1"/>
    </div>

    <div>Rating : ${player.rating}</div>
   
    <div>Position : ${player.position}</div>
    <div>Club : ${player.club}</div>
    `;
    playersContainer.appendChild(playerElement);
  });
  Removing();
  Editing();
}
function addPlayer(event) {
  event.preventDefault();

  const playerPosition = document.getElementById("playerPosition").value;

  if (playerPosition === "GK") {
    // Ensure goalkeeper stats are visible
    const goalkeeperStatsVisible = !document
      .getElementById("goalkeeperStats")
      .classList.contains("hidden");
    if (!goalkeeperStatsVisible) {
      alert("Please fill in all required fields for Goalkeeper.");
      return;
    }
  } else {
    const playerStatsVisible = !document
      .getElementById("playerStats")
      .classList.contains("hidden");
    if (!playerStatsVisible) {
      alert("Please fill in all required fields for Outfield Players.");
      return;
    }
  }

  const playerName = document.getElementById("playerName").value;
  const playerNationality = document.getElementById("playerNationality").value;
  const playerClub = document.getElementById("playerClub").value;
  const playerRating = document.getElementById("playerRating").value;

  let playerStats;

  if (playerPosition === "GK") {
    playerStats = {
      diving: document.getElementById("playerDiving").value,
      handling: document.getElementById("playerHandling").value,
      kicking: document.getElementById("playerKicking").value,
      reflexes: document.getElementById("playerReflexes").value,
      speed: document.getElementById("playerSpeed").value,
      positioning: document.getElementById("playerPositioning").value,
    };
  } else {
    playerStats = {
      pace: document.getElementById("playerPace").value,
      shooting: document.getElementById("playerShooting").value,
      passing: document.getElementById("playerPassing").value,
      dribbling: document.getElementById("playerDribbling").value,
      defending: document.getElementById("playerDefending").value,
      physical: document.getElementById("playerPhysical").value,
    };
  }

  if (
    playerName &&
    playerPosition &&
    playerNationality &&
    playerClub &&
    !isNaN(playerRating)
  ) {
    let players = JSON.parse(localStorage.getItem("players")) || [];

    const player = {
      name: playerName,
      position: playerPosition,
      nationality: playerNationality,
      club: playerClub,
      rating: parseInt(playerRating),
      stats: playerStats,
      photo: "https://cdn.sofifa.net/players/placeholder.png",
      flag: `https://cdn.sofifa.net/flags/${playerNationality
        .toLowerCase()
        .slice(0, 2)}.png`,
    };

    players.push(player);
    localStorage.setItem("players", JSON.stringify(players));
    displayAllPlayers();
    document.getElementById("addPlayerForm").reset();
    document.getElementById("AddingBox").classList.add("hidden");
  } else {
    alert("Please fill in all fields and enter a valid rating.");
  }
}

document
  .getElementById("playerPosition")
  .addEventListener("change", function () {
    const position = this.value;
    const goalkeeperStats = document.getElementById("goalkeeperStats");
    const playerStats = document.getElementById("playerStats");

    if (position === "GK") {
      goalkeeperStats.classList.remove("hidden");
      playerStats.classList.add("hidden");
    } else {
      goalkeeperStats.classList.add("hidden");
      playerStats.classList.remove("hidden");
    }
  });

function searchPlayers(input) {
  const playersContainer = document.getElementById("allPlayers");
  playersContainer.innerHTML = "";
  const playersList = JSON.parse(localStorage.getItem("players"));
  const position = input.getAttribute("data-position");
  const result = playersList.filter((player) => {
    return (
      player.name.toLowerCase().includes(input.value.toLowerCase()) &&
      player.position === position
    );
  });
  result.forEach((player) => {
    const playerElement = document.createElement("div");
    playerElement.classList.add(
      "border",
      "p-4",
      "m-2",
      "bg-white",
      "rounded-md",
      "cursor-pointer",
      "ParentFunc"
    );
    playerElement.innerHTML = `
    <div class='flex justify-between'>
    <i class="fa-regular fa-pen-to-square Edit"></i>
    <i class="fa-solid fa-xmark Remove"></i></div>
    <img src="${player.photo}" alt="${player.name}" width="100"/>
    
     <h1 class="">${player.name}</h1>
    <div class="flex gap-2">
    <img src="${player.flag}" alt="${player.nationality}" width="30" class="h-4 my-1"/>
    </div>

    <div>Rating : ${player.rating}</div>
   
    <div>Position : ${player.position}</div>
    <div>Club : ${player.club}</div>
    `;
    playersContainer.appendChild(playerElement);
  });
  Removing();
  Editing();
}

document.getElementById("addAPlayer").addEventListener("click", function () {
  document.getElementById("AddingBox").classList.remove("hidden");

  document
    .getElementById("playerPosition")
    .removeEventListener("change", handlePositionChange);
  document
    .getElementById("playerPosition")
    .addEventListener("change", handlePositionChange);
});

document.getElementById("Cancling").addEventListener("click", function () {
  document.getElementById("addPlayerForm").reset();
  document.getElementById("AddingBox").classList.add("hidden");
});

document.getElementById("addPlayerForm").addEventListener("submit", addPlayer);

document.querySelectorAll(".searchInput").forEach((input) => {
  input.addEventListener("keyup", function () {
    if (input.value.length) {
      searchPlayers(input);
    } else {
      displayAllPlayers();
    }
  });
});

displayAllPlayers();

const selectedFormation = document.getElementById("formations");
const LeftMiddle = document.getElementById("LeftMiddle");
const RightMiddle = document.getElementById("RightMiddle");
const LeftCenter = document.getElementById("CenterPlayerLeft");
const RightCenter = document.getElementById("CenterPlayerRight");
const LeftTopStriker = document.getElementById("LeftStriker");
const RightTopStriker = document.getElementById("RightStriker");

selectedFormation.addEventListener("change", function () {
  const selectedFormationValue =
    selectedFormation.options[selectedFormation.selectedIndex].value;
  if (selectedFormationValue === "4-4-2") {
    const midlleLiftPlayer = document.getElementById("CM3");
    const midlleRightPlayer = document.getElementById("RW");
    const LeftCenterPlayer = document.getElementById("CM1");
    const RightCenterPlayer = document.getElementById("CM2");
    const LeftTop = document.getElementById("LW");
    const RightTop = document.getElementById("ST");

    midlleLiftPlayer.classList.add(
      "-translate-x-16",
      "-translate-y-12",
      "transition-all",
      "duration-500",
      "ease-out"
    );
    LeftMiddle.classList.add(
      "-translate-x-16",
      "-translate-y-12",
      "transition-all",
      "duration-500",
      "ease-out"
    );
    LeftMiddle.innerHTML = "LM";

    LeftCenterPlayer.classList.add(
      "-translate-x-16",
      "translate-y-8",
      "transition-all",
      "duration-500",
      "ease-out"
    );
    LeftCenter.classList.add(
      "-translate-x-16",
      "translate-y-8",
      "transition-all",
      "duration-500",
      "ease-out"
    );

    RightCenterPlayer.classList.add(
      "-translate-x-20",
      "-translate-y-2",
      "transition-all",
      "duration-500",
      "ease-out"
    );
    RightCenter.classList.add(
      "-translate-x-20",
      "-translate-y-2",
      "transition-all",
      "duration-500",
      "ease-out"
    );

    midlleRightPlayer.classList.add(
      "translate-x-10",
      "translate-y-56",
      "transition-all",
      "duration-500",
      "ease-out"
    );
    RightMiddle.classList.add(
      "translate-x-10",
      "translate-y-56",
      "transition-all",
      "duration-500",
      "ease-out"
    );
    RightMiddle.innerHTML = "RM";

    LeftTopStriker.classList.add(
      "translate-x-20",
      "-translate-y-2",
      "transition-all",
      "duration-500",
      "ease-out"
    );
    LeftTop.classList.add(
      "translate-x-20",
      "-translate-y-2",
      "transition-all",
      "duration-500",
      "ease-out"
    );
    LeftTopStriker.innerHTML = "ST";

    RightTopStriker.classList.add(
      "translate-x-24",
      "translate-y-8",
      "transition-all",
      "duration-500",
      "ease-out"
    );
    RightTop.classList.add(
      "translate-x-24",
      "translate-y-8",
      "transition-all",
      "duration-500",
      "ease-out"
    );
  } else {
    const midlleLiftPlayer = document.getElementById("CM3");
    const midlleRightPlayer = document.getElementById("RW");
    const LeftCenterPlayer = document.getElementById("CM1");
    const RightCenterPlayer = document.getElementById("CM2");
    const LeftTop = document.getElementById("LW");
    const RightTop = document.getElementById("ST");

    midlleLiftPlayer.classList.remove("-translate-x-16", "-translate-y-12");
    LeftMiddle.classList.remove("-translate-x-16", "-translate-y-12");
    LeftMiddle.innerHTML = "CM";

    LeftCenterPlayer.classList.remove("-translate-x-16", "translate-y-8");
    LeftCenter.classList.remove("-translate-x-16", "translate-y-8");

    RightCenterPlayer.classList.remove("-translate-x-20", "-translate-y-2");
    RightCenter.classList.remove("-translate-x-20", "-translate-y-2");

    midlleRightPlayer.classList.remove("translate-x-10", "translate-y-56");
    RightMiddle.classList.remove("translate-x-10", "translate-y-56");
    RightMiddle.innerHTML = "RW";

    LeftTopStriker.classList.remove("translate-x-20", "-translate-y-2");
    LeftTop.classList.remove("translate-x-20", "-translate-y-2");
    LeftTopStriker.innerHTML = "LW";

    RightTopStriker.classList.remove("translate-x-24", "translate-y-8");
    RightTop.classList.remove("translate-x-24", "translate-y-8");
  }
});
function Removing() {
  const removeButtons = document.querySelectorAll(".Remove");
  removeButtons.forEach((removeButton) => {
    removeButton.addEventListener("click", (e) => {
      const playerElement = e.target.closest(".ParentFunc");
      const playerName = playerElement.querySelector("h1").textContent;

      const players = JSON.parse(localStorage.getItem("players"));
      const updatedPlayers = players.filter(
        (player) => player.name !== playerName
      );

      localStorage.setItem("players", JSON.stringify(updatedPlayers));

      playerElement.remove();
    });
  });
}

function initializePlayers() {
  let players = JSON.parse(localStorage.getItem("players")) || [];
  players = players.map((player) => ({
    ...player,
    stats: player.stats || {}, // Add an empty stats object if missing
  }));
  localStorage.setItem("players", JSON.stringify(players));
  displayAllPlayers();
}

displayAllPlayers();

function Editing() {
  const editingBox = document.getElementById("EditingBox");
  const Form = document.getElementById("editPlayerForm");
  const editButtons = document.querySelectorAll(".Edit");

  editButtons.forEach((editButton) => {
    editButton.addEventListener("click", (e) => {
      const playerElement = e.target.closest(".ParentFunc");
      const playerName = playerElement.querySelector("h1").textContent;
      const players = JSON.parse(localStorage.getItem("players")) || [];
      const playerToEdit = players.find((player) => player.name === playerName);

      if (playerToEdit) {
        // Reset the form
        Form.reset();

        // Populate the main player info
        document.getElementById("playerName").value = playerToEdit.name;
        document.getElementById("playerPosition").value = playerToEdit.position;
        document.getElementById("playerNationality").value =
          playerToEdit.nationality;
        document.getElementById("playerClub").value = playerToEdit.club;
        document.getElementById("playerRating").value = playerToEdit.rating;

        // Populate stats and toggle the correct section
        toggleStatsSection(playerToEdit.position, playerToEdit.stats || {});

        // Show the editing box
        editingBox.classList.remove("hidden");
        Form.classList.remove("hidden")
      } else {
        console.error("Player not found:", playerName);
      }
    });
  });
}

document
  .getElementById("editPlayerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page refresh

    const updatedPlayer = getPlayerDataFromForm(); // Get updated player data from the form

    // Validate input
    if (
      !updatedPlayer.name ||
      !updatedPlayer.nationality ||
      !updatedPlayer.club
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    // Update the player in localStorage
    const players = JSON.parse(localStorage.getItem("players")) || [];
    const playerIndex = players.findIndex(
      (player) => player.name === updatedPlayer.name
    );

    if (playerIndex !== -1) {
      players[playerIndex] = updatedPlayer; // Update the existing player
      localStorage.setItem("players", JSON.stringify(players)); // Save updated players
      displayAllPlayers(); // Refresh the player display
      document.getElementById("EditingBox").classList.add("hidden"); // Hide the editing box
    } else {
      console.error("Player not found in localStorage:", updatedPlayer.name);
    }
  });

document.getElementById("Cancle").addEventListener("click", () => {
  const editingBox = document.getElementById("EditingBox");
  editingBox.classList.add("hidden");
});

// Function to toggle the visibility of stats sections based on position
function toggleStatsSection(position, stats = {}) {
  const goalkeeperStats = document.getElementById("goalkeeperStats");
  const playerStats = document.getElementById("playerStats");

  if (position === "GK") {
    goalkeeperStats.classList.remove("hidden");
    playerStats.classList.add("hidden");
    document.getElementById("playerDiving").value = stats.diving || "";
    document.getElementById("playerHandling").value = stats.handling || "";
    document.getElementById("playerKicking").value = stats.kicking || "";
    document.getElementById("playerReflexes").value = stats.reflexes || "";
    document.getElementById("playerSpeed").value = stats.speed || "";
    document.getElementById("playerPositioning").value =
      stats.positioning || "";
  } else {
    goalkeeperStats.classList.add("hidden");
    playerStats.classList.remove("hidden");
    document.getElementById("playerPace").value = stats.pace || "";
    document.getElementById("playerShooting").value = stats.shooting || "";
    document.getElementById("playerPassing").value = stats.passing || "";
    document.getElementById("playerDribbling").value = stats.dribbling || "";
    document.getElementById("playerDefending").value = stats.defending || "";
    document.getElementById("playerPhysical").value = stats.physical || "";
  }
}

// Function to get player data from the form
function getPlayerDataFromForm() {
  return {
    name: document.getElementById("playerName").value,
    position: document.getElementById("playerPosition").value,
    nationality: document.getElementById("playerNationality").value,
    club: document.getElementById("playerClub").value,
    rating: parseInt(document.getElementById("playerRating").value, 10),
    stats: getStatsFromForm(),
  };
}

// Function to get stats from the form based on player position
function getStatsFromForm() {
  const position = document.getElementById("playerPosition").value;
  const stats = {};

  if (position === "GK") {
    stats.diving = document.getElementById("playerDiving").value || "";
    stats.handling = document.getElementById("playerHandling").value || "";
    stats.kicking = document.getElementById("playerKicking").value || "";
    stats.reflexes = document.getElementById("playerReflexes").value || "";
    stats.speed = document.getElementById("playerSpeed").value || "";
    stats.positioning =
      document.getElementById("playerPositioning").value || "";
  } else {
    stats.pace = document.getElementById("playerPace").value || "";
    stats.shooting = document.getElementById("playerShooting").value || "";
    stats.passing = document.getElementById("playerPassing").value || "";
    stats.dribbling = document.getElementById("playerDribbling").value || "";
    stats.defending = document.getElementById("playerDefending").value || "";
    stats.physical = document.getElementById("playerPhysical").value || "";
  }

  return stats;
}

function handlePositionChange() {
  const position = this.value;
  const goalkeeperStats = document.getElementById("goalkeeperStats");
  const playerStats = document.getElementById("playerStats");

  if (position === "GK") {
    goalkeeperStats.classList.remove("hidden");
    playerStats.classList.add("hidden");
  } else {
    goalkeeperStats.classList.add("hidden");
    playerStats.classList.remove("hidden");
  }
}
