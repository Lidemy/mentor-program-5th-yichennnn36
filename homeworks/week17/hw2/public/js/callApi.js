const mainSection = document.querySelector('.main-index');

document.querySelector('#pick-btn').addEventListener('click', () => {
  mainSection.innerHTML = '';
  renderResult();
});

async function getMusicData() {
  const response = await fetch('https://draw-first-project.herokuapp.com/api');
  const data = await response.json();
  if (data.error) {
    console.log(`Error: ${data.error} & ${data.message}`);
    return;
  }
  return data;
}

async function renderResult() {
  const data = await getMusicData();
  mainSection.innerHTML = `
    <section class="main">
      <div class="wrapper">
        <div class="card mb-3">
          <img src="${data.imageUrl}" class="card-img-top" alt="音樂圖片">
          <div class="card-body">
            <h5 class="card-title">${data.name}</h5>
            <p class="card-text">${data.description}</p>
          </div>
        </div>
      </div>
    </section>`;
}
