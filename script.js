// script.js

function validateInput(value, id) {
    if (isNaN(value) || value <= 0) {
        displayError(id, 'Veuillez entrer une valeur valide.');
        return false;
    }
    clearError(id);
    return true;
}

function displayError(id, message) {
    const element = document.getElementById(id);
    element.classList.add('error');
    element.nextElementSibling.innerHTML = message;
}

function clearError(id) {
    const element = document.getElementById(id);
    element.classList.remove('error');
    element.nextElementSibling.innerHTML = '';
}

function calculateFrequencies() {
    const motif = document.getElementById('motif').value;
    const frequencies = getFrequencies(motif);
    displayFrequencies(frequencies);
}

function getFrequencies(motif) {
    let frequencies = [];
    for (let i = 1; i <= 12; i += parseInt(motif)) {
        frequencies.push(i);
    }
    return frequencies;
}

function displayFrequencies(frequencies) {
    const frequenciesDiv = document.getElementById('frequencies');
    frequenciesDiv.innerHTML = '<h3>Fréquences Assignées:</h3>';
    const ul = document.createElement('ul');
    frequencies.forEach(freq => {
        const li = document.createElement('li');
        li.textContent = freq;
        ul.appendChild(li);
    });
    frequenciesDiv.appendChild(ul);
}

function calculateNetworkSize() {
    const area = parseFloat(document.getElementById('area').value);
    const cellSize = parseFloat(document.getElementById('cell-size').value);
    
    if (!validateInput(area, 'area') || !validateInput(cellSize, 'cell-size')) {
        return;
    }

    const numberOfCells = Math.ceil(area / cellSize);
    const numberOfClusters = Math.ceil(numberOfCells / 3);  // Exemple avec K=3

    displayNetworkSize(numberOfCells, numberOfClusters);
}

function displayNetworkSize(cells, clusters) {
    const networkSizeDiv = document.getElementById('network-size');
    networkSizeDiv.innerHTML = `
        <h3>Dimensionnement du Réseau:</h3>
        <p>Nombre de cellules: ${cells}</p>
        <p>Nombre de clusters: ${clusters}</p>
    `;
}

function calculateCapacity() {
    const numUsers = parseFloat(document.getElementById('num-users').value);
    const bandwidthPerUser = parseFloat(document.getElementById('bandwidth-per-user').value);
    const totalBandwidth = parseFloat(document.getElementById('total-bandwidth').value);

    if (!validateInput(numUsers, 'num-users') || !validateInput(bandwidthPerUser, 'bandwidth-per-user') || !validateInput(totalBandwidth, 'total-bandwidth')) {
        return;
    }

    const requiredBandwidth = numUsers * bandwidthPerUser;
    const capacity = totalBandwidth / requiredBandwidth;

    displayCapacity(requiredBandwidth, capacity);
}

function displayCapacity(requiredBandwidth, capacity) {
    const capacityResultsDiv = document.getElementById('capacity-results');
    capacityResultsDiv.innerHTML = `
        <h3>Résultats de l'Analyse de Capacité:</h3>
        <p>Bande passante requise: ${requiredBandwidth} Mbps</p>
        <p>Capacité du réseau: ${capacity >= 1 ? 'Suffisante' : 'Insuffisante'}</p>
        <p>Rapport de capacité: ${capacity.toFixed(2)}</p>
    `;
}
