// SEARCH FOCUS 

const search = document.getElementById('searchInputlight');

search.addEventListener('focus',(event)=>{
    event.preventDefault();

document.getElementById('search-wrapper').style.border="1px solid var(--mainColor)";

});


search.addEventListener('focusout',(event)=>{
    event.preventDefault();

document.getElementById('search-wrapper').style.border="1px solid rgba(0, 0, 0, 0.276)";

});



// Récupérer les éléments <a> dans la div
const searchButtons = document.querySelectorAll('.searchBlock--txt__icons a ');

// Fonction pour gérer le clic et le survol sur un lien
function handleInteraction(event) {
  event.preventDefault();
  // Retirer la classe activeSearchBtn de tous les liens
  searchButtons.forEach(button => {
    button.classList.remove('activeSearchBtn');
  });

  // Ajouter la classe activeSearchBtn sur le lien survolé
  this.classList.add('activeSearchBtn');
}

// Ajouter des gestionnaires d'événements pour le clic à chaque lien
searchButtons.forEach(button => {
  button.addEventListener('click', handleInteraction);
});


// BLOCK DISPARTION SEARCH ----------------

// Sélectionner le bouton
const animeSearchBtn = document.getElementById("animeSearchBtn");
const mangaSearchBtn = document.getElementById("mangaSearchBtn");

// Sélectionner les sections
const mangaBlock = document.getElementById("principalSearchMangaBlock");
const animeBlock = document.getElementById("principalSearchAnimeBlock");
// Sélectionner l'élément img par sa classe CSS
const imgElement = document.querySelector(".searchBlock--img img");

// Ajouter un gestionnaire d'événements de clic au bouton
animeSearchBtn.addEventListener("click", function() {
  // Cacher la section mangaBlock
  mangaBlock.style.display = "none";

  // Afficher la section animeBlock
  animeBlock.style.display = "block";
  // Changer la source de l'image
  imgElement.src = "img/testbanner.jpg";
});

// Ajouter un gestionnaire d'événements de clic au bouton
mangaSearchBtn.addEventListener("click", function() {
  // Cacher la section mangaBlock
  mangaBlock.style.display = "block";

  // Afficher la section animeBlock
  animeBlock.style.display = "none";
  // Changer la source de l'image
  imgElement.src = "img/testbannermanga.jpg";
});



const image = document.querySelector('.searchBlock--img img');
const blockHeight = 440; // Hauteur du bloc de l'image en pixels
const maxScale = 1.2; // Échelle maximale de zoom

function handleZoomScroll() {
  const scrollPosition = window.pageYOffset;
  const scrollPercentage = (scrollPosition / blockHeight) * 100;

  if (scrollPercentage <= 100) {
    const scale = 1 + (scrollPercentage / 100) * (maxScale - 1); // Ajustez le coefficient de mise à l'échelle ici
    image.style.transform = `scale(${scale})`;
  } else {
    image.style.transform = `scale(${maxScale})`; // Maintient l'échelle maximale lorsque le défilement dépasse la hauteur du bloc
  }
}

window.addEventListener('scroll', handleZoomScroll);




