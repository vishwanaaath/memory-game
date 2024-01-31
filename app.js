const hashMapArray = [];
let values = [];

function fillValues() {
  for (let i = 1; i <= 36; i++) {
    values[i] = i;
  }
}
fillValues();

function fillHashMap() {
  for (let i = 1; i <= 18; i++) {
    if (values[i] !== undefined && values[i + 1] !== undefined) {
      const key = `${i}`;
      const hashMap = {};
      hashMap[key] = { i: i, j: i + 18 };
      hashMapArray.push(hashMap);
    }
  }
}

fillHashMap();

hashMapArray.forEach((hashMap) => {
  for (const key in hashMap) {
    if (hashMap.hasOwnProperty(key)) {
      const { i, j } = hashMap[key];
      console.log(` ${i} ${j}`);
      console.log(hashMap);
    }
  }
});

function insertImage() {
  let elementsToAppend = [];
  const bannerDiv = document.createElement("div");
  bannerDiv.id = "bannerDiv";
  bannerDiv.className = "bannerDiv";

  const banner = document.createElement("img");
  banner.src = "image/banner.png";
  banner.id = "banner";
  bannerDiv.appendChild(banner);
  container.appendChild(bannerDiv);

  for (const hashMap of hashMapArray) {
    for (const key in hashMap) {
      if (hashMap.hasOwnProperty(key)) {
        const { i, j } = hashMap[key];

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

      if (
        !selectedImages.includes(imageId) &&
        this.src.includes("pokeball.png")
      ) {
        selectedImages.push(imageId);

        this.src = `image/${imageId}.png`;

        if (selectedImages.length === 2) {
          const [id1, id2] = selectedImages;

          if (checkHashMap(id1, id2)) {
            console.log(id1, id2);
            revealImages(id1, id2);
            points++;
            let score = document.getElementById("score");
            score.innerHTML = "SCORE: " + points;
            console.log("Points: " + points);

            if (points === 18) {
              console.log("Congratulations! You won!");
              displayWon();
            }
          } else {
            setTimeout(() => {
              hideImages(id1, id2);
            }, 250);
          }

          selectedImages = [];
        }
      }
    });
  });
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

function checkHashMap(id1, id2) {
  for (const hashMap of hashMapArray) {
    for (const key in hashMap) {
      if (hashMap.hasOwnProperty(key)) {
        const { i, j } = hashMap[key];
        if ((i === id1 && j === id2) || (i === id2 && j === id1)) {
          return true;
        }
      }
    }
  }
  return false;
}
showPokemon();

function displayWon() {
  if (points === 18) {
    container.style.display = "none";
    let won = document.getElementById("won");
    won.style.display = "block";
  }
}
