const lessonLoad = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayLesson(data));
};

const loadLevel = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevel(data.data));
};
const displayLevel = (level) => {
  console.log(level);
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = ``;

  if (level.length == 0) {
    wordContainer.innerHTML = `<div class="p-10">
      <p class="text-lg mb-5">এখানে এখনো কোন Lesson যুক্ত করা হয়নি
</p>
      <h1 class="text-4xl font-bold">পরের Lesson Select করুন।</h1>
    </div>;`;
    return;
  }

  level.forEach((word) => {
    const wordCard = document.createElement("div");
    wordCard.innerHTML = `
    <div class="bg-white rounded-2xl w-md p-10 space-y-5 shadow-xl h-full">
        <h1 class="text-4xl font-bold">${word.word}</h1>
        <h2 class="text-xl">Meaning / pronunciation</h2>
        <h2 class="text-2xl mb-10">${word.meaning} / ${word.pronunciation}</h2>
        <div class="flex justify-between">
          <p
            class="bg-sky-100 p-3 rounded-md hover:bg-sky-400 transition-colors duration-300"
          >
            <i class="fa-solid fa-circle-info"></i>
          </p>
          <p
            class="bg-sky-100 p-3 rounded-md hover:bg-sky-400 transition-colors duration-300"
          >
            <i class="fa-solid fa-volume-high"></i>
          </p>
        </div>
      </div>
    `;
    wordContainer.appendChild(wordCard);
  });
};

const displayLesson = (lessonData) => {
  const container = document.getElementById("lesson-container");
  container.innerHTML - "";
  lessonData.data.forEach((data) => {
    const levelNo = data.level_no;

    const lessonBtn = document.createElement("div");
    lessonBtn.innerHTML = `<button onclick="loadLevel(${levelNo})" class="btn btn-outline btn-primary "
              ><i class="fa-solid fa-book-open"></i>Lesson ${levelNo}</button>`;
    container.appendChild(lessonBtn);
  });
};

lessonLoad();
