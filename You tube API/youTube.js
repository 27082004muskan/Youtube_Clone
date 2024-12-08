const videoCardContainer=document.querySelector('.video-container');

let api_key="AIzaSyCGGAEiDfOzppo2kHz9yz9LeI-uHp0mT5E";
let video_http="https://www.googleapis.com/youtube/v3/videos?";
let channel_http="https://www.googleapis.com/youtube/v3/channels?";  //add ques mark in last
fetch(video_http + new URLSearchParams({
    key:api_key,
    part:'snippet',    //sset part param to snippet so ,we will get video related data
    chart:'mostPopular',  //set param to mostPopular to fetch papular videos
    maxResults:70 , //it should be maxRResults with "s",set this to 1 for now ,so we can understand data structure easily
    regionCode:'IN' //specify from which region we are fetching data


}))
.then(res=>res.json())  //res=resolution
.then(data=>{
    // console.log(data);
    data.items.forEach(item => {
        getChannelIcon(item);
    })
})
.catch(err=> console.log(err));
//create getChannelIcon fxn ro fetch channel icon seperately because it is not present
const getChannelIcon=(video_data)=>{
  fetch(channel_http+new URLSearchParams ({
    key:api_key,
    part:'snippet', 
    id:video_data.snippet.channelId
  }))
  .then(res=>res.json())
  .then(data=>{
video_data.channelThumbnail=data.items[0].snippet.thumbnails.default.url;  //make new key"channelthumbnail" and store channel icon url there 
makeVideoCard(video_data);
  })
}

const makeVideoCard=(data)=>{
    videoCardContainer.innerHTML+=`
    <div class="video" onclick="location.href='https://youtube.com/watch?v=${data.id}'">
    <img src="${data.snippet.thumbnails.high.url}" class="thumbnail"alt="">
    <div class="content">
    <img src="${data.channelThumbnail}" class="channel-icon"alt="">
 <div class="info">
    <h4 class="title">${data.snippet.title}</h4>
    <p class="channel-name"${data.snippet.channelTitle}></p>
 </div>
   
</div>
</div> 

`}
//search bar
const searchInput=document.querySelector('.search-bar');
const searchBtn=document.querySelector('.search-btn');
let searchLink="https://www.youtube.com/results?search_query=";
searchBtn.addEventListener('click',()=>{
    if(searchInput.value.length){
        location.href=searchLink+searchInput.value;
    }
})
