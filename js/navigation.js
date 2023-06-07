// Sélection de tous les liens de navigation
const navLinks = document.querySelectorAll('.nav--links a');

// Parcours des liens de navigation
navLinks.forEach((link) => {
  // Vérification si le lien correspond à la page actuelle
  if (link.href === window.location.href) {
    // Ajout de la classe "active" au lien
    link.classList.add('active');
  } else {
    // Suppression de la classe "active" des autres liens
    link.classList.remove('active');
  }
});


function addEllipsisClass() {
    const sliderCards = document.querySelectorAll('.popularBlock--slider__card .titleOf p');
    const singleCards = document.querySelectorAll('.popularBlock--single__card .titleOf p');
  
    sliderCards.forEach((card) => {
      if (card.textContent.length > 18) {
        card.classList.add('ellipsis');
      }
    });
  
    singleCards.forEach((card) => {
      if (card.textContent.length > 18) {
        card.classList.add('ellipsis');
      }
    });
  }