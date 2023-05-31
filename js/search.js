// SEARCH FOCUS 

const search=document.getElementById('searchInputlight');

search.addEventListener('focus',(event)=>{

document.getElementById('search-wrapper').style.border="1px solid var(--mainColor)";

});


search.addEventListener('focusout',(event)=>{

document.getElementById('search-wrapper').style.border="1px solid rgba(0, 0, 0, 0.276)";

});