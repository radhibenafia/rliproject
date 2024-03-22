$(document).ready(function () {
    // Utiliser fadeIn pour afficher la page progressivement
    $('body').fadeIn(4000);
});

// Fonction pour générer le diagramme des bits
function generateBitDiagram(frame) {
    var bitsContainer = document.getElementById('bits-container');
    bitsContainer.innerHTML = ''; // Nettoyer le conteneur des bits

    // Boucler à travers chaque bit de la trame
    for (var i = 0; i < frame.length; i++) {
        var bit = frame.charAt(i);
        var bitElement = document.createElement('div');
        bitElement.classList.add('bit');
        if (bit === '1') {
            bitElement.classList.add('bit-active');
        }
        bitsContainer.appendChild(bitElement);
    }
}

// Fonction pour mettre à jour le diagramme des bits en fonction de la trame entrée
function updateBitDiagram() {
    var canFrame = document.getElementById('canFrame').value.trim();
    if (canFrame === '') {
        generateBitDiagram('0000000000'); // Si aucune trame n'est entrée, aucun bit n'est actif
    } else {
        generateBitDiagram(canFrame);
    }
}

// Appeler la fonction de mise à jour du diagramme des bits lors du décodage de la trame
function decodeFrame() {
    var canFrames = document.getElementById('canFrame').value.trim();
    var decodedResult = document.getElementById('decodedResult');
    var frameCount = document.getElementById('frameCount');

    if (canFrames === '') {
        alert('Veuillez entrer une chaîne de trame CAN valide.'); // Afficher une boîte de dialogue en cas de trame non valide
        frameCount.innerHTML = ''; // Réinitialiser le compteur de trames
        decodedResult.innerHTML = ''; // Effacer les résultats précédents
        return;
    }

    // Diviser la chaîne en trames individuelles
    var frames = canFrames.match(/.{10}/g);

    // Afficher le nombre de trames
    frameCount.innerHTML = 'Nombre de trames : ' + frames.length;

    // Votre code de décodage pour chaque trame
    var decodedFrames = [];
    for (var i = 0; i < frames.length; i++) {
        var frame = frames[i];
        var startBit = frame.charAt(0);
        var firstWord = frame.substring(1, 5);
        var secondWord = frame.substring(5, 9);
        var stopBit = frame.charAt(9);

        // Inverser les chaînes firstWord et secondWord
        var reversedFirstWord = firstWord.split('').reverse().join('');
        var reversedSecondWord = secondWord.split('').reverse().join('');

        // Convertir les mots binaires en hexadécimal
        var hexFirstWord = parseInt(reversedFirstWord, 2).toString(16).toUpperCase();
        var hexSecondWord = parseInt(reversedSecondWord, 2).toString(16).toUpperCase();

        // Ajouter les résultats à la liste des trames décodées
        decodedFrames.push('<span class="decoded-frame"> mot : ' + hexSecondWord + hexFirstWord + '</span>');
    }

    // Afficher les résultats
    decodedResult.innerHTML = decodedFrames.join('<br>');

    // Ajouter la classe d'animation de rotation
    document.getElementById('canFrame').classList.add('rotate');

    // Mettre à jour le diagramme des bits
    updateBitDiagram();
}
