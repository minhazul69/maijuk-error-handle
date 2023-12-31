const elementById = (id) => {
  return document.getElementById(id);
};

const handleSearch = () => {
  // const keyword = document.getElementById("keyword");
  const keyword = elementById("keyword");
  if (keyword.value == "" || !isNaN(keyword.value)) {
    return alert("Plece Type A Valid name");
  } else {
    const url = `https://theaudiodb.com/api/v1/json/2/search.php?s=${keyword.value}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => showArtists(data));
  }
};

const showArtists = (data) => {
  if (data.artists == null) {
    return alert("Search result not found");
  } else {
    elementById("keyword").value = "";
    const artistContainer = elementById("artists");
    artistContainer.textContent = "";
    elementById("albums").textContent = "";
    data?.artists?.forEach((artist) => {
      const div = document.createElement("div");
      div.classList.add("artist-card");
      div.innerHTML = `<div class="image-container">
      <div class="image-container-inner">
      <img
      src="${
        artist.strArtistThumb
          ? artist.strArtistThumb
          : "https://images.macrumors.com/t/vMbr05RQ60tz7V_zS5UEO9SbGR0=/1600x900/smart/article-new/2018/05/apple-music-note.jpg"
      }"
      alt=""
      />
    </div>
  </div>
  <div class="info-container">
    <h1>${artist.strArtist}</h1>
    <p>Country: ${artist.strCountry}</p>
    <p>Style: ${artist.strGenre}</p>
    </div>
    <button class="album-button">
    <i class="fa-solid fa-compact-disc"></i>
    <p onclick="fetchAlbums('${
      artist.idArtist
    }')" class="button-title">Albums</p>
  </button>`;
      artistContainer.appendChild(div);
    });
  }
};

const fetchAlbums = (id) => {
  const url = `https://theaudiodb.com/api/v1/json/2/album.php?i=${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showAlbum(data));
  // const artistContainer = elementById("artists");
  // artistContainer.innerHTML = "";
};

const showAlbum = (data) => {
  const album = data.album;
  const albumContainer = elementById("albums");
  album.forEach((item) => {
    albumContainer.textContent = "";
    const div = document.createElement("div");
    div.classList.add("album");
    div.innerHTML = `
        <div class="album-image-container">
          <img
            src="${
              item.strAlbumThumb
                ? item.strAlbumThumb
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
            }"
            alt=""
          />
        </div>
        <div class="album-name">
          <h3>${item.strAlbum}</h3>
        </div>
      `;

    albumContainer.appendChild(div);
  });
};
