// SEARCH FOCUS 

const search=document.getElementById('searchInputlight');

search.addEventListener('focus',(event)=>{
    event.preventDefault();

document.getElementById('search-wrapper').style.border="1px solid var(--mainColor)";

});


search.addEventListener('focusout',(event)=>{
    event.preventDefault();

document.getElementById('search-wrapper').style.border="1px solid rgba(0, 0, 0, 0.276)";

});



// Récupérer les éléments <a> dans la div
const searchButtons = document.querySelectorAll('.searchBlock--txt__icons a');

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

