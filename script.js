document.addEventListener("DOMContentLoaded", function () {
    let dogData = [];
    let currentDogIndex = 0;

    fetch('breeds.json')
        .then(response => response.json())
        .then(data => {
            dogData = data;
            currentDogIndex = Math.floor(Math.random() * dogData.length);
            displayDog();
            populateDatalist();
        })
        .catch(error => console.error('Error loading JSON file:', error));

    function populateDatalist() {
        const breedList = document.getElementById('dog-breeds-list');
        dogData.forEach(dog => {
            const option = document.createElement('option');
            option.value = dog.name;
            breedList.appendChild(option);
        });
    }

    document.getElementById('guess-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const userInput = document.querySelector('.form-animal').value.trim().toLowerCase();
        const correctAnswer = dogData[currentDogIndex].name.toLowerCase();

        if (userInput === correctAnswer) {
            alert('ACERTOU!!!!!!!!!');
        } else {
            alert('Incorreto! Tente novamente.');
        }
    });

    function displayDog() {
        const dog = dogData[currentDogIndex];
        const dogImage = document.getElementById('dog-image');
        const dogOrigin = document.getElementById('dog-origin');

        dogImage.src = dog.imageURL;
        dogImage.alt = dog.name;
        dogOrigin.textContent = `Origem: ${dog.origin}`;
    }
});