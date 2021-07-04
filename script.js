// Data Object for Songs list

const dbSongs = [
    {
        title: "blurred lines",
        artist: "Robin Thicke",
        coverSong: "blurred",
    },
    {
        title: "Hotel California",
        artist: "Eagles",
        coverSong: "hotel",
    },
    {
        title: "Peter Gabriel",
        artist: "Big Time",
        coverSong: "inside",
    },
    {
        title: "Bad girls",
        artist: "MIA",
        coverSong: "mia",
    },
    {
        title: "Uptown Funk",
        artist: "Mark Ronson",
        coverSong: "uptown",
    }
]

// DOM selectors
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const coverDiv = document.getElementById("coverDiv");
const cover = document.getElementById("cover");
const controlsDiv = document.getElementById("controlsDiv");
const prevIcon = document.getElementById("prevIcon");
const playIcon = document.getElementById("playIcon");
const nextIcon = document.getElementById("nextIcon");
const audio = document.getElementById("audio");
const durationSlider = document.getElementById("durationSlider");
const trackCurrentTime = document.getElementById("trackCurrentTime");
const trackDuration = document.getElementById("trackDuration");


// Global Variable
let trackCounter = 1;
const numberOfSongs = dbSongs.length;

// addEventListeners
playIcon.addEventListener('click', playTrack);
nextIcon.addEventListener('click', playNextTrack);
prevIcon.addEventListener('click', playPrevTrack);
audio.addEventListener('ended', playNextTrack);
durationSlider.addEventListener("change", updateTrackTime);

// loads song detials 
loadTrack();
timer = setInterval(updateProgressBar, 1000);

function loadTrack() {
    const track = dbSongs[trackCounter];
    title.innerHTML = track.title;
    artist.innerHTML = track.artist;
    cover.src = "./img/" + track.coverSong + ".jpg";
    audio.src = "./music/" + track.coverSong + ".mp3";
}

function playTrack() {
    if (audio.paused) {
        audio.play();
        playIcon.classList.remove("fa-play-circle");
        playIcon.classList.add("fa-pause-circle");
        cover.classList.add("animate-cover");
    } else {
        audio.pause();
        playIcon.classList.remove("fa-pause-circle");
        playIcon.classList.add("fa-play-circle");
        cover.classList.remove("animate-cover");
    }
}

function playNextTrack() {
    trackCounter = (trackCounter + 1) % numberOfSongs;
    loadTrack();
    playTrack();
}

function playPrevTrack() {
    trackCounter = (trackCounter - 1 + numberOfSongs) % numberOfSongs;
    loadTrack();
    playTrack();
}

// Updates current time of track based on range slider position
function updateTrackTime() {
    audio.currentTime = audio.duration * (durationSlider.value / 100);
}

// Displays time stamps and updates positions of slider based on current time of track
function updateProgressBar() {
    if (audio.duration) {
        trackCurrentTime.innerHTML = `${Math.floor(audio.currentTime / 60)}:${Math.floor(audio.currentTime % 60)}`;
        trackDuration.innerHTML = `${Math.floor(audio.duration / 60)}:${Math.floor(audio.duration % 60)}`;
        if (Math.floor(audio.currentTime % 60) < 10) {
            trackCurrentTime.innerHTML = `${Math.floor(audio.currentTime / 60)}:0${Math.floor(audio.currentTime % 60)}`;
        }

        durationSlider.value = ((audio.currentTime / audio.duration) * 100);
    }
}