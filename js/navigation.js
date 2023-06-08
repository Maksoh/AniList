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

// NAV SCROLL 
var navigation = document.querySelector('.navigation');
var lastScrollPosition = window.pageYOffset;

window.addEventListener('scroll', function() {
var currentScrollPosition = window.pageYOffset;

if (currentScrollPosition > lastScrollPosition && currentScrollPosition > 110) {
  // L'utilisateur fait défiler vers le haut
  navigation.classList.remove('scrolled-down');
  navigation.classList.add('scrolled-up');
} else if (currentScrollPosition < lastScrollPosition) {
  // L'utilisateur fait défiler vers le bas
  navigation.classList.remove('scrolled-up');
  navigation.classList.add('scrolled-down');
}

lastScrollPosition = currentScrollPosition;
});


const toggleBtn = document.querySelector('.nav-toggle');
const toggleBtnIcon = document.querySelector('.nav-toggle i');
const dropMenu = document.querySelector('.dropMenu');

toggleBtn.onclick = function(){
  const isOpen = dropMenu.classList.contains('menuOpen')
  
  toggleBtnIcon.classList = isOpen
  ? 'fas fa-bars fa-xl'
  : 'fas fa-xmark fa-xl'
  dropMenu.classList.toggle('menuOpen')
}