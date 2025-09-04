const lessonLoad = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayLesson(data));
};

const removeActive = () => {
  const remActive = document.querySelectorAll(".lesson-btn");
  remActive.forEach((element) => {
    element.classList.remove("active");
  });
};

const loadLevel = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevel(data.data));
  removeActive();
  const activeBtn = document.getElementById(`lesson-btn-${id}`);
  activeBtn.classList.add("active");
};
const displayLevel = (level) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = ``;
  if (level.length == 0) {
    wordContainer.innerHTML = `<div class="p-10 col-span-full">
    <img class="mx-auto" src="./assets/alert-error.png" alt="">
      <p class="text-lg mb-5">এখানে এখনো কোন Lesson যুক্ত করা হয়নি</p>
      <h1 class="text-4xl font-bold">পরের Lesson Select করুন।</h1>
    </div>;`;
    return;
  }

  level.forEach((word) => {
    const wordCard = document.createElement("div");
    wordCard.innerHTML = `
    <div class="bg-white rounded-2xl p-10 space-y-5 shadow-xl h-full">
        <h1 class="text-4xl font-bold">${
          word.word ? word.word : "কোন শব্দ পাওয়া যায়নি"
        }</h1>
        <h2 class="text-xl">Meaning / pronunciation</h2>
        <h2 class="text-2xl mb-10">${
          word.meaning ? word.meaning : "কোন অর্থ পাওয়া যায়নি"
        } / ${
      word.pronunciation ? word.pronunciation : "কোন শব্দ পাওয়া যায়নি"
    }</h2>
        <div class="flex justify-between">
          <p
            class="bg-sky-100 p-3 rounded-md hover:bg-sky-400 transition-colors duration-300">
            <i onclick="loadModal(${
              word.id
            })"  class="fa-solid fa-circle-info"></i>
          </p>
          <p
            class="bg-sky-100 p-3 rounded-md hover:bg-sky-400 transition-colors duration-300">
            <i class="fa-solid fa-volume-high"></i>
          </p>
        </div>
      </div>
    `;
    wordContainer.appendChild(wordCard);
  });
};

/**
 * "status": true,
"message": "successfully fetched a word details",
"data": {
"word": "Eager",
"meaning": "আগ্রহী",
"pronunciation": "ইগার",
"level": 1,
"sentence": "The kids were eager to open their gifts.",
"points": 1,
"partsOfSpeech": "adjective",
"synonyms": [
"enthusiastic",
"excited",
"keen"
],
"id": 5
 * 
 */

const loadModal = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;

  const response = await fetch(url);
  const details = await response.json();
  displayModal(details.data);
};

const displayModal = (word) => {
  const modalContainer = document.getElementById("modal-container");

  modalContainer.innerHTML = `
          <div class="p-6 space-y-4 poppins">
            <h1 class="text-3xl font-bold">${word.word} (🎙️: ${word.pronunciation})</h1>
            <div>
              <p class="font-semibold pb-2">Meaning</p>
              <p>${word.meaning}</p>
            </div>
            <div>
              <p class="font-semibold pb-2">Example</p>
              <p>${word.sentence}</p>
            </div>
            <div>
              <h3 class="font-semibold pb-2">সমার্থক শব্দ গুলো</h3>
              <label class="btn">${word.synonyms[0]}</label>
              <label class="btn">${word.synonyms[1]}</label>
              <label class="btn">${word.synonyms[2]}</label>
              
            </div>
          </div>
       `;
  my_modal_5.showModal();
};

const displayLesson = (lessonData) => {
  const container = document.getElementById("lesson-container");
  container.innerHTML - "";
  lessonData.data.forEach((data) => {
    const levelNo = data.level_no;

    const lessonBtn = document.createElement("div");
    lessonBtn.innerHTML = `<button id="lesson-btn-${levelNo}" onclick="loadLevel(${levelNo})" class="btn btn-outline btn-primary lesson-btn"
              ><i class="fa-solid fa-book-open"></i>Lesson ${levelNo}</button>`;
    container.appendChild(lessonBtn);
  });
};

lessonLoad();
