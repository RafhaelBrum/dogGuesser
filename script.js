document.addEventListener("DOMContentLoaded", function () {
    let dogBreeds = [];
    let currentBreed = '';
    let consecutiveWins = 0;
    let highscore = localStorage.getItem('highscore') || 0;

    fetch('https://dog.ceo/api/breeds/list/all')
        .then(response => response.json())
        .then(data => {
            dogBreeds = Object.keys(data.message);
            populateDatalist();
            displayDog();
        })
        .catch(error => console.error('Error loading dog breeds:', error));

    function populateDatalist() {
        const breedList = document.getElementById('dog-breeds-list');
        dogBreeds.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed;
            breedList.appendChild(option);
        });
    }

    function updateRecords() {
        document.getElementById('current-record').textContent = consecutiveWins;
        document.getElementById('max-record').textContent = highscore;
    }

    document.getElementById('guess-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const userInput = document.querySelector('.form-animal').value.trim().toLowerCase();
        const correctAnswer = currentBreed.toLowerCase();

        if (userInput === correctAnswer) {
            consecutiveWins++;
            if (consecutiveWins > highscore) {
                highscore = consecutiveWins;
                localStorage.setItem('highscore', highscore);
            }
            alert('ACERTOU!!!');
            displayDog();
        } else {
            consecutiveWins = 0;
            alert('Incorreto! Tente novamente.');
        }

        updateRecords();
    });

    document.getElementById('new-image-btn').addEventListener('click', function (event) {
        event.preventDefault();
        displayDog(currentBreed);
    });

    document.getElementById('reset').addEventListener('click', function (event) {
        event.preventDefault();
        window.location.reload();
    });

    function displayDog(breed) {
        const selectedBreed = breed ? breed : dogBreeds[Math.floor(Math.random() * dogBreeds.length)];

        const imageURL = `https://dog.ceo/api/breed/${selectedBreed}/images/random`;
        const dogImage = document.getElementById('dog-image');

        fetch(imageURL)
            .then(response => response.json())
            .then(data => {
                dogImage.src = data.message;
                dogImage.alt = selectedBreed;
                currentBreed = selectedBreed;
            })
            .catch(error => console.error('Error loading dog image:', error));
    }

    updateRecords();
});