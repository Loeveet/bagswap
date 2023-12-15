let players = [];

document.getElementById("startAssignmentBtn").addEventListener("click", startAssignment);
document.getElementById("clearPlayersBtn").addEventListener("click", clearPlayers);

document.getElementById("addPlayerBtn").addEventListener("click", addPlayer);

function addPlayer() {
    let playerNameInput = document.getElementById("playerNameInput");
    let playerName = playerNameInput.value;
    if (playerName) {
      players.push({ Name: playerName, Bag: null });
      updatePlayersList();
      playerNameInput.value = "";
    }
  }
  
  function startAssignment() {
    document.getElementById("startAssignmentBtn").disabled = true;

    let availableBags = players.map(player => `${player.Name}s väska`);
    let assignedBags = [];

    function assignBagsRecursively() {
        for (let i = 0; i < players.length; i++) {
            let randomIndex = Math.floor(Math.random() * availableBags.length);
            let assignedBagName = availableBags[randomIndex];

            while (assignedBagName.includes(players[i].Name) || assignedBags.includes(assignedBagName)) {
                randomIndex = Math.floor(Math.random() * availableBags.length);
                assignedBagName = availableBags[randomIndex];
            }

            players[i].Bag = assignedBagName;
            assignedBags.push(assignedBagName);
        }

        const hasPlayerReceivedOwnBag = players.some(player => player.Bag.includes(player.Name));

        if (hasPlayerReceivedOwnBag) {
            assignedBags = [];
            assignBagsRecursively();
        } else {
            document.getElementById("startAssignmentBtn").disabled = false;
        }
    }

    assignBagsRecursively();

    displayResults();
}




  
  

function clearPlayers() {
    players = [];
    updatePlayersList();
}

function updatePlayersList() {
    let playersList = document.getElementById("playersList");
    playersList.innerHTML = "<h3>Spelare:</h3>";

    players.forEach(player => {
        playersList.innerHTML += `<p>${player.Name}</p>`;
    });
}

function displayResults() {
    let results = document.getElementById("results");
    results.innerHTML = "<h3>Resultat:</h3>";

    players.forEach(player => {
        results.innerHTML += `<p>${player.Name} ska spela med ${player.Bag}</p>`;
    });
}
