// // SWIPER JS 

// var swiper = new Swiper(".headerBloc--news", {
//     spaceBetween: 30,
//     centeredSlides: true,
//     autoplay: {
//       delay: 4000,
//       disableOnInteraction: false,
//     },
//     pagination: {
//       el: ".swiper-pagination",
//       clickable: true,
//     },
//   });

// var swiper = new Swiper(".popularBlock--slider", {
//     slidesPerView: 6,
//     spaceBetween: 20,
//     freeMode: true,
//     breakpoints: {
//       0: {
//         slidesPerView: 1,
//         spaceBetween: 20,
//       },
//       400: {
//         slidesPerView: 2,
//         spaceBetween: 40,
//       },
//       600: {
//         slidesPerView: 3,
//         spaceBetween: 40,
//       },
//       991: {
//         slidesPerView: 4,
//         spaceBetween: 50,
//       },
//       1201: {
//         slidesPerView: 5,
//         spaceBetween: 50,
//       },
//     },

// });








// // Fonction pour effectuer une requête à l'API AniList
// async function fetchData(query, variables) {
//     const response = await fetch('https://graphql.anilist.co', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//       },
//       body: JSON.stringify({
//         query: query,
//         variables: variables,
//       }),
//     });
  
//     const data = await response.json();
//     return data;
//   }
  


// // Fonction spécifique pour afficher les résultats des mangas populaires
// function displayPopularManga(results) {
//     const swiperWrapper = document.getElementById('popularmangaAll');
  
//     for (const result of results) {
//       const mediaTitle = result.title.english || result.title.romaji || result.title.native;
//       const mediaImage = result.coverImage.extraLarge;
  
//       const swiperSlide = document.createElement('div');
//       swiperSlide.classList.add('popularBlock--single__card', 'card');
//       swiperSlide.title = mediaTitle;
  
//       const imageElement = document.createElement('img');
//       imageElement.src = mediaImage;
//       imageElement.alt = mediaTitle;
//       imageElement.title = mediaTitle;
  
//       const titleElement = document.createElement('p');
//       titleElement.textContent = mediaTitle;
  
//       const slideText = document.createElement('div');
//       slideText.classList.add('titleOf');
//       slideText.appendChild(titleElement);
  
//       swiperSlide.appendChild(imageElement);
//       swiperSlide.appendChild(slideText);
//       swiperWrapper.appendChild(swiperSlide);
//     }
//   }
  
//   // Fonction spécifique pour afficher les résultats des animes populaires
//   function displayPopularAnime(results) {
//     const swiperWrapper = document.getElementById('popularanimeAll');
  
//     for (const result of results) {
//       const mediaTitle = result.title.english || result.title.romaji || result.title.native;
//       const mediaImage = result.coverImage.extraLarge;
  
//       const swiperSlide = document.createElement('div');
//       swiperSlide.classList.add('popularBlock--single__card', 'card');
//       swiperSlide.title = mediaTitle;
  
//       const imageElement = document.createElement('img');
//       imageElement.src = mediaImage;
//       imageElement.alt = mediaTitle;
//       imageElement.title = mediaTitle;
  
//       const titleElement = document.createElement('p');
//       titleElement.textContent = mediaTitle;
  
//       const slideText = document.createElement('div');
//       slideText.classList.add('titleOf');
//       slideText.appendChild(titleElement);
  
//       swiperSlide.appendChild(imageElement);
//       swiperSlide.appendChild(slideText);
//       swiperWrapper.appendChild(swiperSlide);
//     }
//   }
  
//   // Fonction spécifique pour afficher les résultats des animes à venir
//   function displayUpcomingAnime(results) {
//     const swiperWrapper = document.getElementById('upcominganimeAll');
  
//     for (const result of results) {
//       const mediaTitle = result.title.english || result.title.romaji || result.title.native;
//       const mediaImage = result.coverImage.extraLarge;
  
//       const swiperSlide = document.createElement('div');
//       swiperSlide.classList.add('popularBlock--single__card', 'card');
//       swiperSlide.title = mediaTitle;
  
//       const imageElement = document.createElement('img');
//       imageElement.src = mediaImage;
//       imageElement.alt = mediaTitle;
//       imageElement.title = mediaTitle;
  
//       const titleElement = document.createElement('p');
//       titleElement.textContent = mediaTitle;
  
//       const slideText = document.createElement('div');
//       slideText.classList.add('titleOf');
//       slideText.appendChild(titleElement);
  
//       swiperSlide.appendChild(imageElement);
//       swiperSlide.appendChild(slideText);
//       swiperWrapper.appendChild(swiperSlide);
//     }
//   }
  
//   // Fonction spécifique pour afficher les résultats des animes populaires de tous les temps
//   function displayAllTimePopularAnime(results) {
//     const swiperWrapper = document.getElementById('popularanimeAll');
  
//     for (const result of results) {
//       const mediaTitle = result.title.english || result.title.romaji || result.title.native;
//       const mediaImage = result.coverImage.extraLarge;
  
//       const swiperSlide = document.createElement('div');
//       swiperSlide.classList.add('headerBlock--top__element', 'card');
//       swiperSlide.title = mediaTitle;
  
//       const elementImg = document.createElement('div');
//       elementImg.classList.add('headerBlock--top__elmentImg');
//       const imageElement = document.createElement('img');
//       imageElement.src = mediaImage;
//       imageElement.alt = '';
//       elementImg.appendChild(imageElement);
  
//       const elementTxt = document.createElement('div');
//       elementTxt.classList.add('headerBlock--top__elmentTxt');
//       const rankElement = document.createElement('h4');
//       rankElement.textContent = ``;
//       const titleElement = document.createElement('p');
//       titleElement.classList.add('titleOf');
//       titleElement.textContent = mediaTitle;
//       const genresElement = document.createElement('div');
//       genresElement.classList.add('genres');
  
//       for (const genre of result.genres) {
//         const genreSpan = document.createElement('span');
//         genreSpan.textContent = genre;
//         genresElement.appendChild(genreSpan);
//       }
  
//       elementTxt.appendChild(rankElement);
//       elementTxt.appendChild(titleElement);
//       elementTxt.appendChild(genresElement);
  
//       swiperSlide.appendChild(elementImg);
//       swiperSlide.appendChild(elementTxt);
//       swiperWrapper.appendChild(swiperSlide);
//     }
//   }
  
//   // Fonction pour récupérer les données des mangas populaires
// async function getPopularManga() {
//     const queryManga = `
//       query ($page: Int) {
//         Page(page: $page) {
//           media(type: MANGA, sort: POPULARITY_DESC) {
//             id
//             title {
//               romaji
//               english
//               native
//             }
//             coverImage {
//               extraLarge
//             }
//           }
//         }
//       }
//     `;
  
//     const variables = {
//       page: 1,
//     };
  
//     try {
//       const data = await fetchData(queryManga, variables);
//       const popularManga = data.data.Page.media;
//       displayPopularManga(popularManga);
//     } catch (error) {
//       console.log(error);
//     }
//   }
  
//   // Fonction pour récupérer les données des animes populaires
//   async function getPopularAnime() {
//     const queryAnime = `
//       query ($page: Int) {
//         Page(page: $page) {
//           media(type: ANIME, sort: POPULARITY_DESC) {
//             id
//             title {
//               romaji
//               english
//               native
//             }
//             coverImage {
//               extraLarge
//             }
//           }
//         }
//       }
//     `;
  
//     const variables = {
//       page: 1,
//     };
  
//     try {
//       const data = await fetchData(queryAnime, variables);
//       const popularAnime = data.data.Page.media;
//       displayPopularAnime(popularAnime);
//     } catch (error) {
//       console.log(error);
//     }
//   }
  
//   // Fonction pour récupérer les données des animes à venir
//   async function getUpcomingAnime() {
//     const queryUpcomingAnime = `
//       query ($page: Int) {
//         Page(page: $page) {
//           media(type: ANIME, sort: POPULARITY_DESC, seasonYear: 2023, season: WINTER) {
//             id
//             title {
//               romaji
//               english
//               native
//             }
//             coverImage {
//               extraLarge
//             }
//           }
//         }
//       }
//     `;
  
//     const variables = {
//       page: 1,
//     };
  
//     try {
//       const data = await fetchData(queryUpcomingAnime, variables);
//       const upcomingAnime = data.data.Page.media;
//       displayUpcomingAnime(upcomingAnime);
//     } catch (error) {
//       console.log(error);
//     }
//   }
  
//   // Fonction pour récupérer les données des animes populaires de tous les temps
//   async function getAllTimePopularAnime() {
//     const queryAllTimePopular = `
//       query ($page: Int) {
//         Page(page: $page) {
//           media(type: ANIME, sort: SCORE_DESC) {
//             id
//             title {
//               romaji
//               english
//               native
//             }
//             coverImage {
//               extraLarge
//             }
//             genres
//             rankings {
//               rank
//             }
//             averageScore
//             format
//             status
//             episodes
//             duration
//             startDate {
//               year
//             }
//           }
//         }
//       }
//     `;
  
//     const variables = {
//       page: 1,
//     };
  
//     try {
//       const data = await fetchData(queryAllTimePopular, variables);
//       const allTimePopularAnime = data.data.Page.media;
//       displayAllTimePopularAnime(allTimePopularAnime);
//     } catch (error) {
//       console.log(error);
//     }
//   }
  
//   // Appel des fonctions pour récupérer les données et afficher les résultats
//   getPopularManga();
//   getPopularAnime();
//   getUpcomingAnime();
//   getAllTimePopularAnime();
  