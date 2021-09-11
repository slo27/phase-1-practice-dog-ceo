// console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const dogBreedUrl = 'https://dog.ceo/api/breeds/list/all'


// Challenge 1
// Add JavaScript that:
let init = () => {
    const dogImage = document.getElementById('dog-image-container');
    const dogBreeds = document.querySelector('#dog-breeds');
    const breedDropDown = document.getElementById('breed-dropdown');
    let allBreeds = [];
    
    // parses the response as JSON
    // adds image elements to the DOM for each 🤔 image in the array
    let renderDogImage = (json) => {
        json.message.forEach(link => {
            let imgTag = document.createElement('img');
            imgTag.src = link;
            dogImage.appendChild(imgTag);
        });
    };
    
    // on page load, fetches the images using the url  
    fetch(imgUrl)
    .then((resp) => resp.json())
    .then((json) => {
        renderDogImage(json);
    });
    
    // adds the breeds to the page in the <ul> provided in index.html
    let renderBreedsList = (json) => {
        allBreeds = Object.keys(json.message);
        let breeds = Object.keys(json.message);
        breeds.forEach(singleBreed => {
            let breedTag = document.createElement('li');
            breedTag.innerText = singleBreed;
            dogBreeds.appendChild(breedTag);
            // Challenge 3
            // Once all of the breeds are rendered in the <ul>, 
            // add JavaScript so that, when the user clicks on any one of the <li>s, 
            // the font color of that <li> changes. This can be a color of your choosing.
            breedTag.addEventListener("click", () => {
                breedTag.style.color = 'pink';
            });
        });
    };

    // Challenge 2
    // After the first challenge is completed, add JavaScript that:
    // on page load, fetches all the dog breeds using the url 
    fetch(dogBreedUrl)
    .then(resp => resp.json()) ///* one parameter = no extra (rep, rep2) (())
    .then(json => {
        renderBreedsList(json);
    });

    // Challenge 4
    // add JavaScript so that the user can filter breeds that start with a particular letter using a dropdown.
    let filterBreeds = event => {
        let filterLetter = event.target.value;
        let filteredBreeds = allBreeds.filter(singleBreed => singleBreed[0] === filterLetter);
        Array.from(dogBreeds.children).forEach(singleDogBreed => singleDogBreed.remove());
        filteredBreeds.forEach(singleFilteredBreed => {
            let breedTag = document.createElement('li');
            breedTag.innerText = singleFilteredBreed;
            dogBreeds.appendChild(breedTag);
        });
    };
    breedDropDown.addEventListener('change', filterBreeds);
};
document.addEventListener("DOMContentLoaded", init);