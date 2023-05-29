// SWIPER JS 

var swiper = new Swiper(".headerBloc--news", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

var swiper = new Swiper(".popularBlock--slider", {
    slidesPerView: 6,
    spaceBetween: 20,
    freeMode: true,

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


// SEARCH FOCUS 

// const search=document.getElementById('searchInputlight');

// search.addEventListener('focus',(event)=>{

// document.getElementById('search-wrapper').style.border="1px solid var(--mainColor)";

// });


// search.addEventListener('focusout',(event)=>{

// document.getElementById('search-wrapper').style.border="1px solid rgba(0, 0, 0, 0.276)";

// });





// API 

// var query = `
// query ($page: Int) {
//   Page(page: $page, perPage: 10) {
//     media(type: MANGA, sort: TRENDING_DESC) {
//       id
//       title {
//         romaji
//         english
//         native
//       }
//       coverImage{
//         extraLarge
//       }
//     }
//   }
// }
// `;

// var variables = {
//   page: 1 // Page number, adjust as needed
// };

// var url = 'https://graphql.anilist.co';
// var options = {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//   },
//   body: JSON.stringify({
//     query: query,
//     variables: variables
//   })
// };

// fetch(url, options)
//   .then(handleResponse)
//   .then(handleData)
//   .catch(handleError);

// function handleResponse(response) {
//   return response.json().then(function (json) {
//     return response.ok ? json : Promise.reject(json);
//   });
// }

// function handleData(data) {
//   console.log(data);
//   // Traitement des données de réponse ici
//   var mangaTitles = data.data.Page.media; // Obtenez les titres des mangas à partir des données de réponse

//   var swiperWrapper = document.querySelector('.swiper-wrapper'); // Sélectionnez le conteneur des éléments swiper

//   for (var i = 0; i < mangaTitles.length; i++) {
//     var mangaTitle = mangaTitles[i].title.romaji; // Obtenez le titre romaji du manga correspondant
//     var mangaImage = mangaTitles[i].coverImage.extraLarge; // Obtenez l'URL de l'image du manga

//     var swiperSlide = document.createElement('div'); // Créez un élément div pour swiper-slide
//     swiperSlide.classList.add('popularBlock--slider__card', 'swiper-slide');

//     var imageElement = document.createElement('img'); // Créez un élément img pour l'image
//     imageElement.src = mangaImage;
//     imageElement.alt = '';

//     var titleElement = document.createElement('p'); // Créez un élément h1 pour le titre romaji
//     titleElement.textContent = mangaTitle;

//     var slideText = document.createElement('div'); // Créez un élément div pour le conteneur de texte
//     slideText.classList.add('titleOf');
//     slideText.appendChild(titleElement);

//     swiperSlide.appendChild(imageElement);
//     swiperSlide.appendChild(slideText);
//     swiperWrapper.appendChild(swiperSlide);
//   }
  
  
// }

// function handleError(error) {
//   alert('Erreur, consultez la console');
//   console.error(error);
// }







// var queryManga = `
//   query ($page: Int) {
//     Page(page: $page, perPage: 12) {
//       media(type: MANGA, sort: POPULARITY_DESC,) {
//         id
//         title {
//           romaji
//           english
//           native
//         }
//         coverImage {
//           extraLarge
//         }
//       }
//     }
//   }
// `;

// var queryAnime = `
//   query ($page: Int) {
//     Page(page: $page, perPage: 12) {
//       media(type: ANIME, sort: POPULARITY_DESC) {
//         id
//         title {
//           romaji
//           english
//           native
//         }
//         coverImage {
//           extraLarge
//         }
//       }
//     }
//   }
// `;

// var queryUpcomingAnime = `
//   query ($page: Int) {
//     Page(page: $page, perPage: 12) {
//       media(type: ANIME, sort: POPULARITY_DESC, seasonYear: 2023, season: WINTER) {
//         id
//         title {
//           romaji
//           english
//           native
//         }
//         coverImage {
//           extraLarge
//         }
//       }
//     }
//   }
// `;

// var variables = {
//   page: 1 // Page number, adjust as needed
// };

// var url = 'https://graphql.anilist.co';
// var options = {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//   },
//   body: JSON.stringify({
//     query: queryManga,
//     variables: variables
//   })
// };

// fetch(url, options)
//   .then(function (response) {
//     return response.json().then(function (json) {
//       return response.ok ? json : Promise.reject(json);
//     });
//   })
//   .then(function (mangaData) {
//     handleData(mangaData, 'manga');

//     // Fetch anime data
//     options.body = JSON.stringify({
//       query: queryAnime,
//       variables: variables
//     });

//     return fetch(url, options)
//       .then(function (response) {
//         return response.json().then(function (json) {
//           return response.ok ? json : Promise.reject(json);
//         });
//       })
//       .then(function (animeData) {
//         handleData(animeData, 'anime');

//         // Fetch upcoming anime data
//         options.body = JSON.stringify({
//           query: queryUpcomingAnime,
//           variables: variables
//         });

//         return fetch(url, options)
//           .then(function (response) {
//             return response.json().then(function (json) {
//               return response.ok ? json : Promise.reject(json);
//             });
//           })
//           .then(function (upcomingAnimeData) {
//             handleData(upcomingAnimeData, 'upcoming');
//           });
//       });
//   })
//   .catch(function (error) {
//     alert('Erreur, consultez la console');
//     console.error(error);
//   });

// function handleData(data, containerId) {
//   console.log(data);
//   var mediaTitles = data.data.Page.media; // Obtenez les titres des médias à partir des données de réponse
//   var swiperWrapper = document.getElementById(containerId); // Sélectionnez le conteneur des éléments swiper

//   if (!swiperWrapper) {
//     console.error('Le conteneur', containerId, 'n\'existe pas');
//     return;
//   }

//   for (var i = 0; i < mediaTitles.length; i++) {
//     var mediaTitle = mediaTitles[i].title.romaji; // Obtenez le titre romaji du média correspondant
//     if (mediaTitle.length > 28) {
//       mediaTitle = mediaTitle.substring(0, 20) + '...'; // Limite la longueur du titre à 28 caractères
//     }
//     var mediaImage = mediaTitles[i].coverImage.extraLarge; // Obtenez l'URL de l'image du média

//     var swiperSlide = document.createElement('div'); // Créez un élément div pour swiper-slide
//     swiperSlide.classList.add('popularBlock--slider__card', 'swiper-slide');

//     var imageElement = document.createElement('img'); // Créez un élément img pour l'image
//     imageElement.src = mediaImage;
//     imageElement.alt = '';

//     var titleElement = document.createElement('p'); // Créez un élément p pour le titre romaji
//     titleElement.textContent = mediaTitle;

//     var slideText = document.createElement('div'); // Créez un élément div pour le conteneur de texte
//     slideText.classList.add('titleOf');
//     slideText.appendChild(titleElement);

//     swiperSlide.appendChild(imageElement);
//     swiperSlide.appendChild(slideText);
//     swiperWrapper.appendChild(swiperSlide);
//   }
// }



var queryAllTimePopular = `
  query ($page: Int) {
    Page(page: $page, perPage: 5) {
      media(type: ANIME, sort: SCORE_DESC) {
        id
        title {
          romaji
          english
          native
        }
        coverImage {
          extraLarge
        }
        genres
        rankings{
          rank
        }
        averageScore
        format
        status
        episodes
        duration
        startDate{
          year
        }
      }
    }
  }
`;

var queryManga = `
  query ($page: Int) {
    Page(page: $page, perPage: 18) {
      media(type: MANGA, sort: POPULARITY_DESC,) {
        id
        title {
          romaji
          english
          native
        }
        coverImage {
          extraLarge
        }
        chapters
        volumes
      }
    }
  }
`;

var queryAnime = `
  query ($page: Int) {
    Page(page: $page, perPage: 18) {
      media(type: ANIME, sort: POPULARITY_DESC) {
        id
        title {
          romaji
          english
          native
        }
        coverImage {
          extraLarge
        }
      }
    }
  }
`;

var queryUpcomingAnime = `
  query ($page: Int) {
    Page(page: $page, perPage: 18) {
      media(type: ANIME, sort: POPULARITY_DESC, seasonYear: 2023, season: WINTER) {
        id
        title {
          romaji
          english
          native
        }
        coverImage {
          extraLarge
        }
      }
    }
  }
`;



var variables = {
  page: 1 // Page number, adjust as needed
};

var url = 'https://graphql.anilist.co';
var options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({
    query: queryManga,
    variables: variables
  })
};

fetch(url, options)
  .then(function (response) {
    return response.json().then(function (json) {
      return response.ok ? json : Promise.reject(json);
    });
  })
  .then(function (mangaData) {
    handleData(mangaData, 'popularmanga');

    // Fetch anime data
    options.body = JSON.stringify({
      query: queryAnime,
      variables: variables
    });

    return fetch(url, options)
      .then(function (response) {
        return response.json().then(function (json) {
          return response.ok ? json : Promise.reject(json);
        });
      })
      .then(function (animeData) {
        handleData(animeData, 'popularanime');

        // Fetch upcoming anime data
        options.body = JSON.stringify({
          query: queryUpcomingAnime,
          variables: variables
        });

        return fetch(url, options)
          .then(function (response) {
            return response.json().then(function (json) {
              return response.ok ? json : Promise.reject(json);
            });
          })
          .then(function (upcomingAnimeData) {
            handleData(upcomingAnimeData, 'upcominganime');

            // Fetch all-time popular anime data
            options.body = JSON.stringify({
              query: queryAllTimePopular,
              variables: variables
            });

            return fetch(url, options)
              .then(function (response) {
                return response.json().then(function (json) {
                  return response.ok ? json : Promise.reject(json);
                });
              })
              .then(function (allTimePopularData) {
                handleAllTimePopularData(allTimePopularData, 'alltimepopular');
              });
          });
      });
  })
  .catch(function (error) {
    alert('Erreur, consultez la console');
    console.error(error);
  });

// SWIPER FUNCTION 
function handleData(data, containerId) {
  console.log(data);
  var mediaTitles = data.data.Page.media; // Obtenez les titres des médias à partir des données de réponse
  var swiperWrapper = document.getElementById(containerId); // Sélectionnez le conteneur des éléments swiper

  if (!swiperWrapper) {
    console.error('Le conteneur', containerId, 'n\'existe pas');
    return;
  }

  for (var i = 0; i < mediaTitles.length; i++) {
    var mediaTitle = mediaTitles[i].title.english; // Obtenez le titre romaji du média correspondant
    if (mediaTitle.length > 25) {
      mediaTitle = mediaTitle.substring(0, 24) + '...'; // Limite la longueur du titre à 28 caractères
    }
    var mediaImage = mediaTitles[i].coverImage.extraLarge; // Obtenez l'URL de l'image du média

    var swiperSlide = document.createElement('div'); // Créez un élément div pour swiper-slide
    swiperSlide.classList.add('popularBlock--slider__card', 'swiper-slide', 'card');
    swiperSlide.title = mediaTitles[i].title.english;
    // swiperSlide.innerHTML = `
    // // <img src="${mediaImage}" alt="cover">
    // <p class="titleOf">${ mediaTitles[i].title.english}</p>
    // `
    // swiperWrapper.appendChild(swiperSlide);
    var imageElement = document.createElement('img'); // Créez un élément img pour l'image
    imageElement.src = mediaImage;
    imageElement.alt = mediaTitle;
    imageElement.title = mediaTitles[i].title.english; // Ajoute le titre complet en tant qu'attribut "title" de l'élément "img"
    
    var titleElement = document.createElement('p'); // Créez un élément p pour le titre romaji
    titleElement.textContent = mediaTitle;
    
    var slideText = document.createElement('div'); // Créez un élément div pour le conteneur de texte
    slideText.classList.add('titleOf');
    slideText.appendChild(titleElement);
    
    swiperSlide.appendChild(imageElement);
    swiperSlide.appendChild(slideText);
    swiperWrapper.appendChild(swiperSlide);
  }
}

function handleAllTimePopularData(data, containerId) {
  console.log(data);
  var mediaList = data.data.Page.media; // Obtenir la liste des médias à partir des données de réponse
  var container = document.getElementById(containerId); // Sélectionner l'élément de conteneur

  if (!container) {
    console.error('Le conteneur', containerId, 'n\'existe pas');
    return;
  }

  var currentPage = window.location.href; // Obtenir l'URL de la page actuelle

  for (var i = 0; i < mediaList.length; i++) {
    var media = mediaList[i];
    var mediaTitle = media.title.english; // Obtenir le titre anglais du média
    if (mediaTitle.length > 60) {
      mediaTitle = mediaTitle.substring(0, 70) + '...'; // Limiter la longueur du titre à 23 caractères
    }
    var mediaImage = media.coverImage.extraLarge; // Obtenir l'URL de l'image du média
    var mediaRank = media.rankings[0].rank; // Obtenir le classement du média
    var mediaGenres = media.genres; // Obtenir les genres du média

    var element = document.createElement('div'); // Créer un élément div pour le média
    element.classList.add('headerBlock--top__element'); // Ajouter votre classe personnalisée souhaitée ici
    element.title = mediaTitle;

    var imageWrapper = document.createElement('div'); // Créer un élément div pour envelopper l'image
    imageWrapper.classList.add('headerBlock--top__elmentImg'); // Ajouter votre classe personnalisée souhaitée ici

    var imageElement = document.createElement('img'); // Créer un élément img pour l'image
    imageElement.src = mediaImage;
    imageElement.alt = mediaTitle;
    imageWrapper.appendChild(imageElement);
    element.appendChild(imageWrapper);

    var contentWrapper = document.createElement('div'); // Créer un élément div pour envelopper le contenu
    contentWrapper.classList.add('headerBlock--top__elmentTxt'); // Ajouter votre classe personnalisée souhaitée ici

    var rankElement = document.createElement('h4'); // Créer un élément h4 pour le classement
    rankElement.textContent = mediaRank + '.';
    rankElement.classList.add('rank'); // Ajouter votre classe personnalisée souhaitée ici
    contentWrapper.appendChild(rankElement);

    var titleElement = document.createElement('p'); // Créer un élément p pour le titre
    titleElement.classList.add('titleOf'); // Ajouter votre classe personnalisée souhaitée ici
    titleElement.textContent = mediaTitle;
    contentWrapper.appendChild(titleElement);

    var tagsElement = document.createElement('div'); // Créer un élément div pour les balises
    tagsElement.classList.add('genres'); // Ajouter votre classe personnalisée souhaitée ici

    for (var j = 0; j < 2 && j < mediaGenres.length; j++) {
      var genre = mediaGenres[j];
      var tagElement = document.createElement('span'); // Créer un élément span pour chaque genre
      tagElement.textContent = genre;
      tagsElement.appendChild(tagElement);
    }

    contentWrapper.appendChild(tagsElement);
    element.appendChild(contentWrapper);

    if (currentPage.includes('search-manga')) {
      var infoWrapper = document.createElement('div');
      infoWrapper.classList.add('infoWrapper');
    
      var statusWrapper = document.createElement('div');
      statusWrapper.classList.add('infoItemQuery');
      
      var statusElement = document.createElement('p'); 
      statusElement.textContent = media.averageScore + '%';
      
      statusWrapper.appendChild(statusElement);
      
      infoWrapper.appendChild(statusWrapper);
    
      var episodesWrapper = document.createElement('div');
      episodesWrapper.classList.add('infoItemQuery');
      
      var episodesElement = document.createElement('p');
      episodesElement.textContent = media.format;
      
      var episodesSpan = document.createElement('span');
      if (media.episodes > 1) {
        episodesSpan.textContent = media.episodes + 'épisodes';
      } else {
        episodesSpan.textContent = media.episodes+ 'film';
      }
      
      episodesElement.appendChild(episodesSpan);
      episodesWrapper.appendChild(episodesElement);
      
      infoWrapper.appendChild(episodesWrapper);
    
      var formatWrapper = document.createElement('div');
      formatWrapper.classList.add('infoItemQuery');
      
      var formatElement = document.createElement('p');
      formatElement.textContent = media.startDate.year;
      
      var formatSpan = document.createElement('span');
      formatSpan.textContent = media.status;
      
      formatElement.appendChild(formatSpan);
      formatWrapper.appendChild(formatElement);
      
      infoWrapper.appendChild(formatWrapper);
    
      element.appendChild(infoWrapper);
    }

    container.appendChild(element);
  }
}
