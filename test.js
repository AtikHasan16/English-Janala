const synonyms = ["enthusiastic", "excited", "keen"];

const showSyn = (synonyms) => {
  const newTag = synonyms.map((word) => `<span class="btn">${word}</span>`);
  const oneLine = newTag.join(" ");
  //   console.log(oneLine);
};

showSyn(synonyms);
