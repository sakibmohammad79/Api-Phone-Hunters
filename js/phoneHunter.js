const loadPhoneDetails = (searchFieldValue, dataLimit) =>{
    const url =` https://openapi.programming-hero.com/api/phones?search=${searchFieldValue}`
    fetch(url)
    .then((res) => res.json())
    .then((data) => showPhoneDetails(data.data, dataLimit))
}

const showPhoneDetails = (datas, dataLimit) => {
    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.textContent = '';
    
    // show more button
    if(dataLimit && datas.length > 10){
        datas =  datas.slice(0, 10);
        const showMore = document.getElementById('show-more');
        showMore.classList.remove('d-none');
    }
    else{
        const showMore = document.getElementById('show-more');
        showMore.classList.add('d-none');
    }
    

    // validation
    if (datas.length === 0){
        const NoPhone = document.getElementById('no-phone-message');
        NoPhone.classList.remove('d-none');
    }
    else{
        const NoPhone = document.getElementById('no-phone-message');
        NoPhone.classList.add('d-none');
    }

    datas.forEach(data => {
        //console.log(data);
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-3 rounded">
            <img src="${data.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${data.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <button onclick="PhoneDetails('${data.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">more details</button>
            </div>
         </div>
        `
        phoneContainer.appendChild(phoneDiv);
    })

    // spinner stop handler
    toggleSpinner(false);
}

const processSearch = (dataLimit) => {
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchFieldValue = searchField.value;
    loadPhoneDetails(searchFieldValue, dataLimit);
}

// input field srearch with enter
document.getElementById('search-field').addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        processSearch(10);
    }
})

const searchField = () =>{
    processSearch(10);
}

const loadingSpinner = document.getElementById('loader');
const toggleSpinner = isLoading =>{
    if(isLoading){
        loadingSpinner.classList.remove('d-none');
    }
    else{
        loadingSpinner.classList.add('d-none');
    }
}

// show more button show all data
document.getElementById('btn-show-more').addEventListener('click', function(){
    processSearch();
})



const PhoneDetails = async(id) =>{
    const URL = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(URL);
    const data = await res.json();
    phoneModalDetails(data.data);
}

const phoneModalDetails = (data) =>{
    const phoneTitle = document.getElementById('exampleModalLabel');
    phoneTitle.innerText = data.name;

    const phoneDetail = document.getElementById('phone-detail');
    phoneDetail.innerHTML = `
    <p>ReleaseData: ${data.releaseDate ? data.releaseDate : 'Up Coming'}</P>
    <p>Main Features: ${data.mainFeatures? data.mainFeatures.memory : 'No Features'}</p>
    `
}


loadPhoneDetails('apple');