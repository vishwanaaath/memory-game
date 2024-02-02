const MapArray = [];
let values = [];

function fillmap() {
  for (let i = 1; i <= 18; i++) {
    if (i !== undefined && i + 1 !== undefined) {
      const k = `${i}`;
      const map = {};
      map[k] = { i: i, j: i + 18 };
      MapArray.push(map);
    }
  }
}

fillmap();

MapArray.forEach((map) => {
  for (const k in map) {
    if (map.hasOwnProperty(k)) {
      const { i, j } = map[k];
      console.log(` ${i} and ${j}`);
      console.log(map);
    }
  }
});

function insertImage() {
  let elementsToAppend = [];
  for (const map of MapArray) {
    for (const k in map) {
      if (map.hasOwnProperty(k)) {
        const { i, j } = map[k];

        const firstImageDiv = document.createElement("div");
        firstImageDiv.className = "firstImageDiv";

        const secondImageDiv = document.createElement("div");
        secondImageDiv.className = "secondImageDiv";

        const image1 = document.createElement("img");
        image1.id = `${i}`;
        image1.className = "image1";
        image1.src = `image/pokeball.png`;
        // image1.src = `image1/${i}.png`;
        image1.alt = `Image ${image1.id}`;
        firstImageDiv.appendChild(image1);

        const image2 = document.createElement("img");
        image2.id = `${j}`;
        image2.className = "image2";
        image2.src = `image/pokeball.png`;
        // image2.src = `image1/${j}.png`;
        image2.alt = `Image ${image1.id}`;
        secondImageDiv.appendChild(image2);

        elementsToAppend.push(secondImageDiv);
        elementsToAppend.push(firstImageDiv);

        shuffleArray(elementsToAppend);
      }
      elementsToAppend.forEach((element) => {
        container.appendChild(element);
      });
    }
  }
}
insertImage();

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

let selectedImages = [];
let points = 0;
let click = 0;

function showPokemon() {
  const images = document.querySelectorAll("img");
  images.forEach((image) => {
    image.addEventListener("click", function () {
      click++;
      let clickElement = document.getElementById("click");
      clickElement.innerHTML = "CLICKS: " + click;
      const imageId = parseInt(this.id);

      // if (this.src.includes("pokeball.png")) {
      selectedImages.push(imageId);

      this.src = `image/${imageId}.png`;

      if (selectedImages.length === 2) {
        const [id1, id2] = selectedImages;

        if (checkmap(id1, id2)) {
          console.log(id1, id2);
          revealImages(id1, id2);
          increasePoints();
          if (points === 18) {
            alert("Congratulations! You won!");
            if (click > 100) alert("Try guessing with less clicks");
          }
        } else {
          setTimeout(() => {
            hideImages(id1, id2);
          }, 250);
        }

        selectedImages = [];
      }
      // }
    });
  });
}
function increasePoints() {
  points++;
  let score = document.getElementById("score");
  score.innerHTML = "SCORE: " + points;
  console.log("Points: " + points);
  return points;
}

function revealImages(id1, id2) {
  const images = document.querySelectorAll("img");

  images.forEach((image) => {
    if (image.id === id1 || parseInt(image.id) === id2) {
      image.id = parseInt(image.id);
      image.src = `image/${image.id}.png`;
    }
  });
}

function hideImages(id1, id2) {
  const images = document.querySelectorAll("img");

  images.forEach((image) => {
    if (parseInt(image.id) === id1 || parseInt(image.id) === id2) {
      image.src = "image/pokeball.png";
    }
  });
}

function checkmap(id1, id2) {
  for (const map of MapArray) {
    for (const k in map) {
      if (map.hasOwnProperty(k)) {
        const { i, j } = map[k];
        if ((i === id1 && j === id2) || (i === id2 && j === id1)) {
          return true;
        }
      }
    }
  }
  return false;
}
showPokemon();
