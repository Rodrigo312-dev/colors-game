document.addEventListener("DOMContentLoaded", () => {
    const colors = ["rød", "grønn", "svart", "gul", "hvit","brun", "lilla", "turkis", "rosa", "oransje", "gull", "sølv", "grå", "blå"];
    const colorImages = {
        "rød": "img/rojo.jpg",        // rojo
        "grønn": "img/verde.jpg",      // verde
        "svart": "img/negro.jpg",      // negro
        "gul": "img/amarillo.jpg",// amarillo
        "hvit": "img/blanco.jpg",    // blanco
        "brun": "img/marron.jpg",    // marron
        "lilla": "img/morado.jpg",    // morado
        "turkis": "img/turquesa.jpg",// turquesa
        "rosa": "img/rosa.jpg",        // rosa
        "oransje": "img/naranja.jpg",  // naranja
        "gull": "img/dorado.jpg",    // dorado
        "sølv": "img/plateado.jpg", // plateado
        "grå": "img/gris.jpg",    // gris
        "blå": "img/azul.jpg"    // azul
        
    };

    let currentColor;
    let lives = 3;  // Número de vidas inicial
    const colorImage = document.getElementById("color-image");
    const guessInput = document.getElementById("guess-input");
    const guessButton = document.getElementById("guess-button");
    const changeImageButton = document.getElementById("change-image-button");
    const messageDiv = document.getElementById("message");
    const restartButton = document.getElementById("restart-button");
    const keyboardContainer = document.getElementById("keyboard-container");
    const clearButton = document.getElementById("clear-button");
    const livesDiv = document.getElementById("lives");
    const backgroundMusic = document.getElementById('background-music');

    function getRandomColor(exclude) {
        let newColor;
        do {
            newColor = colors[Math.floor(Math.random() * colors.length)];
        } while (newColor === exclude);
        return newColor;
    }

    function startGame() {
        // Escoger un color aleatorio que no sea el actual
        currentColor = getRandomColor();
        colorImage.src = colorImages[currentColor];

        // Reiniciar la interfaz de usuario
        guessInput.value = "";
        messageDiv.textContent = "";
        messageDiv.classList.remove("success", "error");
        restartButton.style.display = "none";
        lives = 3;  // Reiniciar el número de vidas
        updateLivesDisplay();
        guessInput.disabled = false;
        guessButton.disabled = false;
        clearButton.disabled = false;
        changeImageButton.disabled = false;
    }

    function changeImage() {
        const newColor = getRandomColor(currentColor);
        currentColor = newColor;
        colorImage.src = colorImages[currentColor];
        messageDiv.textContent = "";
        guessInput.value = "";
        messageDiv.classList.remove("success", "error");
        guessInput.disabled = false;
        guessButton.disabled = false;
        restartButton.style.display = "none";
    }

    function celebrate() {
        // Llamar a la función confetti
        confetti({
            particleCount: 200,
            spread: 70,
            origin: { y: 0.6 }
        });
    }

    function clearText() {
        guessInput.value = "";
    }

    function updateLivesDisplay() {
        livesDiv.textContent = `Vidas restantes: ${lives}`;
    }

    guessButton.addEventListener("click", () => {
        const userGuess = guessInput.value.toLowerCase();
        if (userGuess === currentColor) {
            messageDiv.textContent = "¡Correcto! ¡Felicidades!";
            messageDiv.classList.remove("error");
            messageDiv.classList.add("success");
            guessInput.disabled = true;
            guessButton.disabled = true;
            restartButton.style.display = "block";
            colorImage.src = "img/festejo.png";
            celebrate(); // Llamar a la función de celebración
        } else {
            lives--;  // Reducir el número de vidas
            if (lives > 0) {
                messageDiv.textContent = "¡Error! Intenta de nuevo.";
                messageDiv.classList.remove("success");
                messageDiv.classList.add("error");
                updateLivesDisplay();  // Actualizar la visualización de las vidas
            } else {
                messageDiv.textContent = "¡Se acabaron las vidas! Has perdido.";
                messageDiv.classList.remove("success");
                messageDiv.classList.add("error");
                guessInput.disabled = true;
                guessButton.disabled = true;
                changeImageButton.disabled = true;
                clearButton.disabled = true;
                restartButton.style.display = "block";
            }
        }
    });

    changeImageButton.addEventListener("click", changeImage);

    restartButton.addEventListener("click", startGame);

    clearButton.addEventListener("click", clearText);

    // Crear el teclado
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ".split("");
    alphabet.forEach(letter => {
        const button = document.createElement("button");
        button.textContent = letter;
        button.addEventListener("click", () => {
            guessInput.value += letter;
        });
        keyboardContainer.appendChild(button);
    });


    // Iniciar el juego por primera vez
    startGame();
    // Intentar reproducir la música cuando la página se cargue
    backgroundMusic.play().catch(function(error) {
        console.log('La reproducción automática fue bloqueada. Reproducción manual requerida.');

        // Mostrar el botón de reproducción manual
        var playButton = document.createElement('button');
        playButton.innerText = 'Iniciar Música';
        playButton.style.position = 'absolute';
        playButton.style.top = '10px';
        playButton.style.left = '10px';
        playButton.style.zIndex = '1000';
        document.body.appendChild(playButton);

        playButton.addEventListener('click', function() {
            backgroundMusic.play();
            playButton.remove();
        });
    });
});