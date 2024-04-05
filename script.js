console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");
// document.body.style.backgroundColor="white";
btn1.addEventListener('click', () => {
    document.body.style.backgroundColor="black";
    btn1.style.backgroundColor="black";
    btn2.style.backgroundColor="grey";
})
btn2.addEventListener('click', () => {
    document.body.style.backgroundColor="green";
    btn2.style.backgroundColor="black";
    btn1.style.backgroundColor="grey";
})

let songs = [
    {songName: "O mahi", filePath: "1.mp3", coverPath: "1.jpg"},
    {songName: "Satranga", filePath: "2.mp3", coverPath: "2.jpg"},
    {songName: "Pehle bhi main", filePath: "3.mp3", coverPath: "3.jpg"},
    {songName: "Tera mera hai pyar amar", filePath: "4.mp3", coverPath: "4.jpg"},
    {songName: "Tera hone laga hoon", filePath: "5.mp3", coverPath: "5.jpg"},
    {songName: "Tere Hawaale", filePath: "2.mp3", coverPath: "6.jpg"},
    {songName: "Mann jogiya", filePath: "2.mp3", coverPath: "7.jpg"},
    {songName: "Le aaunga", filePath: "2.mp3", coverPath: "8.jpg"},
    {songName: "Ilzaam", filePath: "2.mp3", coverPath: "9.jpg"},
    {songName: "Your eyes", filePath: "4.mp3", coverPath: "10.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})