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


const search=document.getElementById('searchInput');

search.addEventListener('focus',(event)=>{

document.getElementById('search-wrapper').style.border="1px solid var(--mainColor)";

});


search.addEventListener('focusout',(event)=>{

document.getElementById('search-wrapper').style.border="1px solid rgba(0, 0, 0, 0.276)";

});