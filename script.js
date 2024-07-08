"use strict";

const apiURL = "https://itunes.apple.com/search?term=";

const userInput = document.querySelector(".user-input");
const resultsList = document.querySelector(".results-list");
const loader = document.querySelector(".loader");
const noResultsMessage = document.querySelector(".no-results-msg");

userInput.addEventListener("input", (e) => {
  const keyword = e.target.value;
  console.log(keyword);
  if (keyword.trim() === "") {
    resultsList.innerHTML = "";
    noResultsMessage.style.display = "none";
  } else {
    getResults(keyword);
  }
});

const getResults = async (keyword) => {
  loader.style.display = "block";
  try {
    const response = await fetch(
      `${apiURL}${encodeURIComponent(keyword)}&entity=song`
    );
    const data = await response.json();
    displayResults(data.results);
  } catch (error) {
    console.log(error);
  } finally {
    loader.style.display = "none";
  }
};

const displayResults = (resultsArr) => {
  resultsList.innerHTML = "";

  if (resultsArr.length === 0) {
    noResultsMessage.style.display = "block";
    noResultsMessage.innerHTML = `<p>No results found...</p>`;
    return;
  }
  noResultsMessage.style.display = "none";
  resultsArr.forEach((result) => {
    const resultContainer = document.createElement("li");
    resultContainer.classList.add("result-container");

    const artist = document.createElement("div");
    artist.classList.add("result-content");
    artist.innerHTML = `<strong>Artist:</strong> ${result.artistName}`;
    resultContainer.appendChild(artist);

    const track = document.createElement("div");
    track.classList.add("result-content");
    track.innerHTML = `<strong>Song name:</strong> ${result.trackName}`;
    resultContainer.appendChild(track);

    resultsList.appendChild(resultContainer);
  });
};
