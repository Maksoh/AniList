var swiper = new Swiper(".relationsBlockSwiper", {
    slidesPerView: 8,
    freeMode: true,
    breakpoints: {

      370: {
        slidesPerView: 2,
        spaceBetween: 5,
      },
      460: {
        slidesPerView: 3,
        spaceBetween: 5,
      },
      570: {
        slidesPerView: 4,
        spaceBetween: 5,
      },
      1330: {
        slidesPerView: 5,
        spaceBetween: 5,
      },
      1530: {
        slidesPerView: 6,
        spaceBetween: 5,
      },
      1790: {
        slidesPerView: 7,
        spaceBetween: 5,
      },
    },

});

// BOUTON LIST ADD 
// Récupérer les références des boutons
const addListBtn = document.querySelector('.addListbtn');
const removeListBtn = document.querySelector('.removeListbtn');

// Ajouter un écouteur d'événement pour le clic sur addListBtn
addListBtn.addEventListener('click', function() {
    addListBtn.style.display = 'none'; // Modifier le display en 'none'
    removeListBtn.style.display = 'block'; // Modifier le display en 'block'
});
removeListBtn.addEventListener('click', function() {
  addListBtn.style.display = 'block'; // Modifier le display en 'none'
  removeListBtn.style.display = 'none'; // Modifier le display en 'block'
});

// ::::::::::: //


// BLOCK APPARITION
// ScrollReveal().reveal('.personCard', { duration: 800, easing:'ease-in', interval: 150});
// OVERVIEW BLOCK ACTION 
const overviewTitle = document.querySelector('.overviewTitle');
const overviewBlock = document.querySelector('.relationsBlock');
// Ajouter un écouteur d'événement pour le clic sur addListBtn
overviewTitle.addEventListener('click', function(event) {
    event.preventDefault();
    overviewBlock.style.display = 'block'; // Modifier le display en 'none'
    characteresBlock.style.display = 'none'; // Modifier le display en 'none'
    staffBlock.style.display = 'none'; // Modifier le display en 'block'
});

// CHARACTERES BLOCK ACTION 
const characteresTitle = document.querySelector('.characteresTitle');
const characteresBlock = document.querySelector('.characteresBlock');
// Ajouter un écouteur d'événement pour le clic sur addListBtn
characteresTitle.addEventListener('click', function(event) {
    event.preventDefault();
    characteresBlock.style.display = 'block'; // Modifier le display en 'none'
    overviewBlock.style.display = 'none'; // Modifier le display en 'block'
    staffBlock.style.display = 'none'; // Modifier le display en 'block'
    reviewsBlock.style.display = 'none'; // Modifier le display en 'none'
});

// STAFF BLOCK ACTION 
const staffTitle = document.querySelector('.staffTitle');
const staffBlock = document.querySelector('.staffBlock');
// Ajouter un écouteur d'événement pour le clic sur addListBtn
staffTitle.addEventListener('click', function(event) {
    event.preventDefault();
    staffBlock.style.display = 'block'; // Modifier le display en 'none'
    overviewBlock.style.display = 'none'; // Modifier le display en 'block'
    characteresBlock.style.display = 'none'; // Modifier le display en 'none'
    reviewsBlock.style.display = 'none'; // Modifier le display en 'none'
});

// REVIEWS BLOCK ACTION 
const reviewsTitle = document.querySelector('.reviewsTitle');
const reviewsBlock = document.querySelector('.reviewsBlock');
// Ajouter un écouteur d'événement pour le clic sur addListBtn
reviewsTitle.addEventListener('click', function(event) {
    event.preventDefault();
    reviewsBlock.style.display = 'block'; // Modifier le display en 'none'
    overviewBlock.style.display = 'none'; // Modifier le display en 'block'
    staffBlock.style.display = 'none'; // Modifier le display en 'block'
    characteresBlock.style.display = 'none'; // Modifier le display en 'none'
});

