const API_KEY='efd509eb';
let searchResultNumber=document.querySelector('.search-result');
let elForm=document.querySelector('.form');
let elInput=document.querySelector('.input');
let elSelect=document.querySelector('.select');
let elList=document.querySelector('.list');
let elPagination=document.querySelector('.pagination')
let prevBtn=document.querySelector('.prev');
let nextBtn=document.querySelector('.next');

let filmName='panda';
let filmPage=1;
let fullArr=[];
let selectType=[];
//sort menu
let sortType=(arr)=>{
    elSelect.innerHTML="";
    arr.forEach(item=>{
        if(!selectType.includes(item.Type)) selectType.push(item.Type);
    })
    selectType.forEach(item=>{
        let newOption=document.createElement('option');
     newOption.setAttribute('class','option');
     newOption.textContent=item;
    elSelect.appendChild(newOption);
    })
}
// render Movies
let renderMovies=(arr,htmlElement)=>{
    let result=''
    arr.forEach(item=>{
        const html=`
        <li class="film card">
            <div class="card-header">
                <img src="${item.Poster}" alt="">
            </div>
            <div class="card-body">
                <h3 class="card-title film__title">${item.Title}</h3>
                <p class="film__type">${item.Type}</p>
                <p class="film__year">${item.Year}</p>
            </div>
        </li>
        `
        result+=html;
    });
    htmlElement.innerHTML=result;
}
//render Page
let res;
let renderPage=(data)=>{
    res=0;
    let txt='';
    if(Number(data)%10===0){
        res=Math.floor(data/10);
    }
    else{
        res=Math.floor(data/10)+1;
    }
    for(let item=1;item<=res;item++){
        const page=`
        <li class="page-item"><a class="page-link" href="#" data-pageid=${item}>${item}</a></li>
        `
        txt+=page;
    }
    elPagination.innerHTML=txt;
}
// pagination
elPagination.addEventListener('click',(e)=>{
    if(e.target.matches('.page-link')){
      filmPage=e.target.dataset.pageid*1;
      prevBtn.disabled=false;
      nextBtn.disabled=false;
    fullData();
    }
})
// input search 
elForm.addEventListener('submit',e=>{
    e.preventDefault();
    filmName=elInput.value.toLowerCase();
    filmPage=1;
    fullData();
})
//render select menu
elSelect.addEventListener('change',()=>{
  let sortedArr=fullArr.filter(item=>item.Type===elSelect.value)
  renderMovies(sortedArr,elList)
})
// prev btn
prevBtn.addEventListener('click',()=>{
    if(filmPage>0){
        filmPage--;
        fullData();
    }
    else if(filmPage===1 || filmPage<=0){
        prevBtn.disabled=true;
        filmPage=1;
        fullData();
    }
    nextBtn.disabled=false;
})
//next btn
nextBtn.addEventListener('click',()=>{
    if(filmPage<=res){
        filmPage++;
        fullData()
    }
    else{
        filmPage=res;
        nextBtn.disabled=true;
        fullData();
    }
    prevBtn.disabled=false;
})
// All data
const fullData=()=>{
    const request=fetch(`https://www.omdbapi.com/?s=${filmName}&page=${filmPage}&apikey=${API_KEY}`)
    .then(req=>req.json())
    .then(data=>{
        if(data.Response==='True'){
            fullArr=data.Search;
            searchResultNumber.textContent=data.totalResults;
        sortType(data.Search);
        renderMovies(data.Search,elList)
        renderPage(data.totalResults)
        }
        else{
          alert('Xatolik')
          searchResultNumber.textContent=0;
          elInput.value="";
            elList.innerHTML=""
            elPagination.innerHTML="";
        }
    })
}
fullData(); 


