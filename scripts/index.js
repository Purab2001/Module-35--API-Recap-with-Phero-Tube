function removeActiveClass() {
    const activeButtons = document.getElementsByClassName("active");
    for (let btn of activeButtons) {
      btn.classList.remove("active");       
    }
}

function loadCategories() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((response) => response.json())
    .then((data) => displayCategories(data.categories));
}

function loadVideos() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((response) => response.json())
    .then((data) => {
        removeActiveClass();
        document.getElementById("btn-all").classList.add("active");
        displayVideos(data.videos)
    });
}

const loadCategoryVideos = (id) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
        removeActiveClass();
        const clickedButtons = document.getElementById(`btn-${id}`);
        clickedButtons.classList.add("active");
        displayVideos(data.category)
    });
};

function displayCategories(categories) {
  const categoryContainer = document.getElementById("category-container");
  for (const cat of categories) {
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
        <button id="btn-${cat.category_id}" onclick=loadCategoryVideos(${cat.category_id}) class="btn btn-sm border-none bg-gray-200 hover:bg-red-500 hover:text-white">${cat.category}</button>
        `;
    categoryContainer.appendChild(categoryDiv);
  }
}

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("video-container");

  videoContainer.innerHTML = "";

  if (videos.length === 0) {
    videoContainer.innerHTML = `
      <div class="col-span-full flex flex-col items-center justify-center text-center py-30">
        <img class="w-[120px]" src="assets/Icon.png" alt="">
        <h2 class="text-2xl font-bold">Oops!! Sorry, <br> There is no content here</h2>
      </div>
      `;
    return;
  }

  videos.forEach((video) => {
    const videoCard = document.createElement("div");
    videoCard.innerHTML = `
      <div class="card">
        <figure class="relative">
          <img
            class="w-full h-[150px] object-cover rounded-lg"
            src="${video.thumbnail}"
            alt="Thumbnail" />
            <span class="absolute bottom-2 right-2 text-sm text-white bg-black px-2 rounded">3hrs 56 min ago</span>
        </figure>
        <div class="flex gap-3 px-0 py-5">
          <div>
            <div class="avatar">
              <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                <img src="${video.authors[0].profile_picture}" />
              </div>
            </div>
          </div>
          <div>
            <h2 class="font-semibold mb-1">${video.title}</h2>
            <p class="text-xs text-gray-400 flex gap-1">${video.authors[0].profile_name} <img class="w-5 h-5" src="https://img.icons8.com/?size=100&id=98A4yZTt9abw&format=png&color=000000" alt=""></p>
            <p class="text-xs text-gray-400">${video.others.views} views</p>
          </div>
        </div>
      </div>
        `;
    videoContainer.appendChild(videoCard);
  });
};

loadCategories();
