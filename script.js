document.addEventListener("DOMContentLoaded", () => {
    const colors = ["rod", "gronn", "svart", "gul", "hvit","brun", "lilla", "turkis", "rosa", "oranjse", "gull", "solv", "grå", "blå"];
    const colorImages = {
        "rod": "img/rojo.jpg",        // rojo
        "gronn": "img/verde.jpg",      // verde
        "svart": "img/negro.jpg",      // negro
        "gul": "img/amarillo.jpg",// amarillo
        "hvit": "img/blanco.jpg",    // blanco
        "brun": "img/marron.jpg",    // marron
        "lilla": "img/morado.jpg",    // morado
        "turkis": "img/turquesa.jpg",// turquesa
        "rosa": "img/rosa.jpg",        // rosa
        "oranjse": "img/naranja.jpg",  // naranja
        "gull": "img/dorado.jpg",    // dorado
        "solv": "img/plateado.jpg", // plateado
        "grå": "img/gris.jpg",    // gris
        "blå": "img/azul.jpg"    // azul
        
    };

    let currentColor;
    const colorImage = document.getElementById("color-image");
    const guessInput = document.getElementById("guess-input");
    const guessButton = document.getElementById("guess-button");
    const changeImageButton = document.getElementById("change-image-button");
    const messageDiv = document.getElementById("message");
    const restartButton = document.getElementById("restart-button");
    const keyboardContainer = document.getElementById("keyboard-container");
    const clearButton = document.getElementById("clear-button");

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
        
        guessInput.disabled = false;
        guessButton.disabled = false;
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
            messageDiv.textContent = "¡Error! Intenta de nuevo.";
            messageDiv.classList.remove("success");
            messageDiv.classList.add("error");
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
});