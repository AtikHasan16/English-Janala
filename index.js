const lessonLoad = () => {
  const ulr = "https://openapi.programming-hero.com/api/levels/all";
  fetch(ulr)
    .then((response) => response.json())
    .then((data) => lesson(data));
};

const lesson = (lessonData) => {
  const container = document.getElementById("lesson-container");
  container.innerHTML - "";
  lessonData.data.forEach((data) => {
    const levelNo = data.level_no;

    const lessonBtn = document.createElement("div");
    lessonBtn.innerHTML = `<button class="btn btn-outline btn-primary "
              ><i class="fa-solid fa-book-open"></i>Lesson ${levelNo}</button>`;
    container.appendChild(lessonBtn);
  });
};

lessonLoad();
