const discussContainer = document.getElementById('discussContainer');
const countContainer = document.getElementById('countContainer');
const count = document.getElementById('count');
const searchfield = document.getElementById('search');
const latestContainer = document.getElementById('latestContainer');
let c = 0;


const getdata = async () => {
    const url = 'https://openapi.programming-hero.com/api/retro-forum/posts'
    const get = await fetch(url);
    const Data = await get.json();
    const data = Data.posts;
    toggleLoading(true);
    setTimeout(() => {
        showdata(data)
    }, 2000);

}

getdata();

const showdata = (data) => {
    discussContainer.textContent = '';

    console.log(data);
    toggleLoading(false);
    data.forEach(topic => {
        const div = document.createElement('div');
        div.innerHTML = `<div class="flex flex-col lg:flex-row gap-2 lg:gap-4 bg-[#797DFC1A] rounded-xl p-4 lg:p-10 shadow-sm lg:shadow-lg shadow-purple-300 ">
        <!-- img  -->
        <div class="">
            <div class="relative bg-white w-20 mx-auto rounded-lg">
                <img class=" mx-auto rounded-xl" src="${topic.image}" alt="">
                <span class="absolute top-1 -right-1 transform -translate-y-1/2 w-3.5 h-3.5 ${topic.isActive ? 'bg-green-500' : 'bg-red-500'} border-2 border-white rounded-full"></span>
            </div>

            <!-- text  -->

        </div>
        <div class="w-full lg:w-[85%] text-center lg:text-left space-y-2" >
            <div class="flex justify-center lg:justify-start text-center lg:text-left gap-3 ">
                <p>#${topic.category}</p>
                <p>Author : ${topic.author.name}</p>
            </div>
            <h1 class="font-bold text-xl">${topic.title}</h1>
            <p class="font-inter text-[#12132D99] lg:pb-5">${topic.description}</p>
            
            <hr class="border-dashed border-gray-400 ">
            
            <div class="flex justify-between items-center lg:pt-5">
                <div class="flex flex-row gap-2 gap-4">
                    <div><i class="text-gray-500 fa-regular fa-comment-dots"></i>  ${topic.comment_count}</div>
                    <div><i class="text-gray-500 fa-regular fa-eye"></i>  ${topic.view_count}</div>
                    <div><i class="text-gray-500 fa-regular fa-clock"></i>  ${topic.posted_time} min</div>
                </div>
                <div>
                <button class="btn btn-circle btn-outline text-white text-xl bg-gradient-to-r from-blue-400 to-purple-600" onclick="throwdata('${escapeSingleQuotes(topic.title)}', '${topic.view_count}')">
                <i class="fa-regular fa-envelope-open"></i>
              </button>
              
                </div>
            </div>
        </div>

    </div>`
        discussContainer.appendChild(div);
    });
}


const cross = () => {
    const cross = document.getElementById('cross');
    const showbtn = document.getElementById('showbtn');
    cross.classList.add('hidden');
    showbtn.classList.remove('hidden');
}
const show = () => {
    const cross = document.getElementById('cross');
    cross.classList.remove('hidden');
    showbtn.classList.add('hidden')
}

const throwdata = (title, viwes) => {
    console.log(title, viwes);
    c++;
    count.innerText = c;
    const div = document.createElement('div');
    div.innerHTML = `<div class="flex p-4 lg:p-2 justify-between bg-white rounded-md items-center shadow-md shadow-purple-200">
    <p class="font-semibold lg:max-w-[70%]">${title}</p>
    <p><i class="fa-regular fa-eye text-gray-500"></i>  ${viwes}</p>

</div>`
    countContainer.appendChild(div);
}
const escapeSingleQuotes = (title) => {
    return title.replace(/'/g, "\\'");
};


const search = async () => {
    const searchText = searchfield.value.toLowerCase();
    console.log(searchText);
    if (searchText !== 'comedy' && searchText !== 'music' && searchText !== 'coding') {
        alert('Invalid Category! Try searching comedy, music, or coding');
        return;
    }
    const fetching = await fetch(` https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`)
    const Data = await fetching.json();
    const data = Data.posts;

    discussContainer.textContent = '';
    toggleLoading(true);
    setTimeout(() => {
        showdata(data)
    }, 2000);

}

const toggleLoading = (isloading) => {
    const loading = document.getElementById('loading');
    if (isloading)
        loading.classList.remove('hidden');
    else
        loading.classList.add('hidden')
}

const latest = async () => {
    const fetching = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts')
    const Data = await fetching.json();
    Data.forEach((topic) => {
        console.log(topic);
        const div = document.createElement('div');
        div.innerHTML = `<div class="p-3 lg:p-6 flex flex-col border-gray-200 border rounded-2xl  gap-2 lg:gap-4 h-auto lg:h-full shadow-md shadow-purple-200">
        <img class="min-w-full min-h-[80px] rounded-xl" src="${topic.cover_image}" alt="">
        <p class="text-[#12132D99]"><i class="fa-solid fa-calendar-plus"></i>  ${topic.author.posted_date ? topic.author.posted_date : 'No publish date'}</p>
        <p class="font-extrabold text-lg">${topic.title}</p>
        <p class="text-[#12132D99] w-[90%]">${topic.description}</p>
        <div class="flex justify-start flex-1 items-end">
            <img class="rounded-full w-9 h-9" src="${topic.profile_image}" alt="profile picture">
            <div class="space-y-0.5 font-medium  text-left rtl:text-right ms-3 ">
                <p class="text-lg">${topic.author.name}</p>
                <p class="text-sm text-gray-500 dark:text-gray-400 ">${topic.author.designation ? topic.author.designation : 'Unknown'}</p>
            </div>
        </div>    
    </div>`
        latestContainer.appendChild(div);
    })

}
latest();