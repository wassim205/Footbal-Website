function displayAllPlayers() {
  const playersContainer = document.getElementById("allPlayers");
  playersContainer.innerHTML = "";
  const playersList = JSON.parse(localStorage.getItem("players"));
  playersList.forEach((player) => {
    const playerElement = document.createElement("div");
    playerElement.draggable = true;
    playerElement.classList.add(
      "border",
      "p-4",
      "m-2",
      "bg-white",
      "rounded-md",
      "cursor-pointer",
      "ParentFunc",
      "player-card"
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
const RightSTStats = document.getElementById("RightST");
const LeftLW = document.getElementById("LeftLW");
const RightRW = document.getElementById("RigthRW");
const LeftCM = document.getElementById("LeftCM");
const RightCM = document.getElementById("RightCM");
const CenterCM = document.getElementById("CenterCM");

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

    LeftCM.classList.add(
      "-translate-x-16",
      "-translate-y-12",
      "transition-all",
      "duration-500",
      "ease-out"
    );

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
    CenterCM.classList.add(
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
    RightCM.classList.add(
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
    RightRW.classList.add(
      "translate-x-10",
      "translate-y-56",
      "transition-all",
      "duration-500",
      "ease-out"
    );

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
    LeftLW.classList.add(
      "translate-x-20",
      "-translate-y-2",
      "transition-all",
      "duration-500",
      "ease-out"
    );

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
    RightSTStats.classList.add(
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
    LeftCM.classList.remove("-translate-x-16", "-translate-y-12");
    LeftMiddle.innerHTML = "CM";

    LeftCenterPlayer.classList.remove("-translate-x-16", "translate-y-8");
    LeftCenter.classList.remove("-translate-x-16", "translate-y-8");
    CenterCM.classList.remove("-translate-x-16", "translate-y-8");

    RightCenterPlayer.classList.remove("-translate-x-20", "-translate-y-2");
    RightCenter.classList.remove("-translate-x-20", "-translate-y-2");
    RightCM.classList.remove("-translate-x-20", "-translate-y-2");

    midlleRightPlayer.classList.remove("translate-x-10", "translate-y-56");
    RightMiddle.classList.remove("translate-x-10", "translate-y-56");
    RightRW.classList.remove("translate-x-10", "translate-y-56");
    RightMiddle.innerHTML = "RW";

    LeftTopStriker.classList.remove("translate-x-20", "-translate-y-2");
    LeftTop.classList.remove("translate-x-20", "-translate-y-2");
    LeftLW.classList.remove("translate-x-20", "-translate-y-2");
    LeftTopStriker.innerHTML = "LW";

    RightTopStriker.classList.remove("translate-x-24", "translate-y-8");
    RightTop.classList.remove("translate-x-24", "translate-y-8");
    RightSTStats.classList.remove("translate-x-24", "translate-y-8");
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
  players = players.map((player) => {
    // If stats are not in a nested object, restructure the player object
    if (!player.stats) {
      const stats =
        player.position === "GK"
          ? {
              diving: player.diving || "",
              handling: player.handling || "",
              kicking: player.kicking || "",
              reflexes: player.reflexes || "",
              speed: player.speed || "",
              positioning: player.positioning || "",
            }
          : {
              pace: player.pace || "",
              shooting: player.shooting || "",
              passing: player.passing || "",
              dribbling: player.dribbling || "",
              defending: player.defending || "",
              physical: player.physical || "",
            };

      // Remove individual stat properties
      const cleanedPlayer = { ...player, stats };
      delete cleanedPlayer.pace;
      delete cleanedPlayer.shooting;
      delete cleanedPlayer.passing;
      delete cleanedPlayer.dribbling;
      delete cleanedPlayer.defending;
      delete cleanedPlayer.physical;
      delete cleanedPlayer.diving;
      delete cleanedPlayer.handling;
      delete cleanedPlayer.kicking;
      delete cleanedPlayer.reflexes;
      delete cleanedPlayer.speed;
      delete cleanedPlayer.positioning;

      return cleanedPlayer;
    }
    return player;
  });

  localStorage.setItem("players", JSON.stringify(players));
  displayAllPlayers();
}

function Editing() {
  const editingBox = document.getElementById("EditingBox");
  const Form = document.getElementById("editPlayerForm");
  const editButtons = document.querySelectorAll(".Edit");
  const playerPosition = document.getElementById("editPlayerPosition");
  const GoalKeeperStats = document.getElementById("editGoalkeeperStats");
  const outfieldStats = document.getElementById("editOutfieldStats");

  editButtons.forEach((editButton) => {
    editButton.addEventListener("click", (e) => {
      const playerElement = e.target.closest(".ParentFunc");
      const playerName = playerElement.querySelector("h1").textContent;
      const players = JSON.parse(localStorage.getItem("players")) || [];
      const playerToEdit = players.find((player) => player.name === playerName);

      if (playerToEdit) {
        Form.reset();

        document.getElementById("editPlayerName").value = playerToEdit.name;
        document.getElementById("editPlayerNationality").value =
          playerToEdit.nationality;
        document.getElementById("editPlayerClub").value = playerToEdit.club;
        document.getElementById("editPlayerRating").value = playerToEdit.rating;
        playerPosition.value = playerToEdit.position;

        // Ensure stats object exists
        playerToEdit.stats = playerToEdit.stats || {};

        if (playerToEdit.position === "GK") {
          GoalKeeperStats.classList.remove("hidden");
          outfieldStats.classList.add("hidden");

          // Default to empty string if stat doesn't exist
          document.getElementById("editPlayerDiving").value =
            playerToEdit.stats.diving || "";
          document.getElementById("editPlayerHandling").value =
            playerToEdit.stats.handling || "";
          document.getElementById("editPlayerKicking").value =
            playerToEdit.stats.kicking || "";
          document.getElementById("editPlayerReflexes").value =
            playerToEdit.stats.reflexes || "";
          document.getElementById("editPlayerSpeed").value =
            playerToEdit.stats.speed || "";
          document.getElementById("editPlayerPositioning").value =
            playerToEdit.stats.positioning || "";
        } else {
          GoalKeeperStats.classList.add("hidden");
          outfieldStats.classList.remove("hidden");

          // Default to empty string if stat doesn't exist
          document.getElementById("editPlayerPace").value =
            playerToEdit.stats.pace || "";
          document.getElementById("editPlayerShooting").value =
            playerToEdit.stats.shooting || "";
          document.getElementById("editPlayerPassing").value =
            playerToEdit.stats.passing || "";
          document.getElementById("editPlayerDribbling").value =
            playerToEdit.stats.dribbling || "";
          document.getElementById("editPlayerDefending").value =
            playerToEdit.stats.defending || "";
          document.getElementById("editPlayerPhysical").value =
            playerToEdit.stats.physical || "";
        }

        editingBox.classList.remove("hidden");
        Form.classList.remove("hidden");
      } else {
        console.error("Player not found:", playerName);
      }
    });
  });

  playerPosition.addEventListener("change", function () {
    if (playerPosition.value === "GK") {
      GoalKeeperStats.classList.remove("hidden");
      outfieldStats.classList.add("hidden");
    } else {
      GoalKeeperStats.classList.add("hidden");
      outfieldStats.classList.remove("hidden");
    }
  });
}

const Save = document.getElementById("editSave");
const cancelButton = document.getElementById("editCancel");

Save.addEventListener("click", (event) => {
  event.preventDefault();

  const updatedPlayer = {
    name: document.getElementById("editPlayerName").value,
    position: document.getElementById("editPlayerPosition").value,
    nationality: document.getElementById("editPlayerNationality").value,
    club: document.getElementById("editPlayerClub").value,
    rating: document.getElementById("editPlayerRating").value,
    photo: "", // You might want to keep the existing photo
    flag: "", // You might want to keep the existing flag
    stats: {},
  };

  if (updatedPlayer.position === "GK") {
    updatedPlayer.stats = {
      diving: document.getElementById("editPlayerDiving").value,
      handling: document.getElementById("editPlayerHandling").value,
      kicking: document.getElementById("editPlayerKicking").value,
      reflexes: document.getElementById("editPlayerReflexes").value,
      speed: document.getElementById("editPlayerSpeed").value,
      positioning: document.getElementById("editPlayerPositioning").value,
    };
  } else {
    updatedPlayer.stats = {
      pace: document.getElementById("editPlayerPace").value,
      shooting: document.getElementById("editPlayerShooting").value,
      passing: document.getElementById("editPlayerPassing").value,
      dribbling: document.getElementById("editPlayerDribbling").value,
      defending: document.getElementById("editPlayerDefending").value,
      physical: document.getElementById("editPlayerPhysical").value,
    };
  }

  const players = JSON.parse(localStorage.getItem("players")) || [];
  const playerIndex = players.findIndex(
    (player) => player.name === updatedPlayer.name
  );

  if (playerIndex !== -1) {
    // Preserve existing photo and flag
    updatedPlayer.photo = players[playerIndex].photo;
    updatedPlayer.flag = players[playerIndex].flag;

    players[playerIndex] = updatedPlayer;
    localStorage.setItem("players", JSON.stringify(players));
    alert("Player updated successfully!");

    const editingBox = document.getElementById("EditingBox");
    editingBox.classList.add("hidden");

    displayAllPlayers();
  } else {
    console.error("Player not found for update:", updatedPlayer.name);
  }
});

cancelButton.addEventListener("click", function () {
  const editingBox = document.getElementById("EditingBox");
  editingBox.classList.add("hidden");
  document.getElementById("editPlayerForm").reset();
});
// Allow the drop
function allowDrop(event) {
  event.preventDefault();
}

// Handle the drop
function drop(event) {
  event.preventDefault();
  const playerData = event.dataTransfer.getData("text/plain");
  const player = JSON.parse(playerData);

  // Get the goalkeeper name element
  const goalkeeperNameElement = document.getElementById("goalkeeperName");

  // Update the h2 element with the player's name
  goalkeeperNameElement.innerText = player.name; // Set the player's name
}

// Handle drag start
document.querySelectorAll(".player-card").forEach((card) => {
  card.addEventListener("dragstart", (event) => {
    const playerData = card.getAttribute("data-player");
    event.dataTransfer.setData("text/plain", playerData);
  });
});
