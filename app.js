let players = [];

document.getElementById("createPlayerBtn").addEventListener("click", createPlayer);
document.getElementById("startAssignmentBtn").addEventListener("click", startAssignment);
document.getElementById("clearPlayersBtn").addEventListener("click", clearPlayers);


function createPlayer() {
    let playerName = prompt("Ange spelarens namn:");
    players.push({ Name: playerName, Bag: null });
    updatePlayersList();
}

function startAssignment() {
    let availableBags = players.map(player => `${player.Name}s väska`);

    for (let i = 0; i < players.length; i++) {
        let randomIndex = Math.floor(Math.random() * availableBags.length);
        let assignedBagName = availableBags[randomIndex];

        while (assignedBagName.includes(players[i].Name)) {
            randomIndex = Math.floor(Math.random() * availableBags.length);
            assignedBagName = availableBags[randomIndex];
        }

        players[i].Bag = assignedBagName;
        availableBags.splice(randomIndex, 1);
    }

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
