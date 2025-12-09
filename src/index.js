import { bhojpuriSongItems } from "../assets/assets.js";
import { genreItem } from "../assets/assets.js";
import { hindiSongItems } from "../assets/assets.js";

let currentSong = new Audio()

const controlButtonsDiv = document.getElementById("controls")

const controlImages = controlButtonsDiv.querySelectorAll("img");

const currentDurationSpan = document.getElementById("currentDuration")

if (!currentSong.src) {
    controlImages.forEach(img => {
        img.style.pointerEvents = "none";
        img.style.userSelect = "none";
        img.style.opacity = "0.5";
    })
} 


const setCurrentSong = (song) => {

    currentSong.src = song.path;
    playButton.src = "../assets/play.svg"
    currentSong.pause()
    isSongPlaying = false

    controlImages.forEach(img => {
        img.style.pointerEvents = "auto";
        img.style.userSelect = "auto";
        img.style.opacity = "1";
    })

    progressBar.style.width = "0"

    currentSong.onloadedmetadata = () => {

        const totalSeconds = currentSong.duration;

        const minutes = Math.floor(totalSeconds / 60);
        const seconds = Math.floor(totalSeconds % 60);

        const formattedSeconds = String(seconds).padStart(2, '0');

        const currentSongMinutes = `${minutes}:${formattedSeconds}`;

        totalDuration.innerText = currentSongMinutes;
    };
};

currentSong.addEventListener('timeupdate', () => {
    const currentTimeInSeconds = currentSong.currentTime;
    
    const minutes = Math.floor(currentTimeInSeconds / 60);
    const seconds = Math.floor(currentTimeInSeconds % 60);
    
    const formattedSeconds = String(seconds).padStart(2, '0');

    currentDurationSpan.innerText = `${minutes}:${formattedSeconds}`;
});

//category items

const genreList = document.getElementById("genre-list")

genreItem.forEach(genre => {

    const listItem = document.createElement("li");

    listItem.className = "my-1 active:bg-blue-400 rounded-md text-md font-medium hover:bg-blue-200 cursor-pointer py-4 px-4"

    listItem.id = `${genre.toLowerCase().replace(/ /g, "")}` + "-folder"

    listItem.textContent = genre;
    genreList.appendChild(listItem)
})


//Playlist items

const bhojpuriList = document.getElementById("bhojpuri-items")

bhojpuriSongItems.forEach(song => {
    const songItem = document.createElement("p")
    songItem.textContent = song.name;
    bhojpuriList.appendChild(songItem)
    songItem.onclick = () => setCurrentSong(song)
    songItem.className = "p-2 overflow-scroll hide-scrollbar text-sm hover:bg-blue-200 active:bg-blue-400 cursor-pointer"
})

const bhojpuriSelectorButton = document.getElementById('bhojpurisongs-folder')

const emptyMessage = document.getElementById("empty-items")

let isbhojpuriSongPlaylistOpen = false

const toggleBhojpuriPlaylist = () => {

    if (isbhojpuriSongPlaylistOpen) {
        bhojpuriList.className = "hidden overflow-hidden";
        emptyMessage.className = "h-full justify-between flex items-center"
        isbhojpuriSongPlaylistOpen = false
    } else {
        bhojpuriList.className = "flex flex-col h-full justify-start"
        emptyMessage.className = "hidden"
        isbhojpuriSongPlaylistOpen = true
        hindiList.className = "hidden"
        isHindiSongPlaylistOpen = false
    }
}


bhojpuriSelectorButton.addEventListener("click", toggleBhojpuriPlaylist)

//hindi items

const hindiList = document.getElementById("hindi-items")

hindiSongItems.forEach(song => {
    const songItem = document.createElement("p")
    songItem.textContent = song.name;
    hindiList.appendChild(songItem)
    songItem.onclick = () => setCurrentSong(song)
    songItem.className = "p-2 overflow-scroll hide-scrollbar text-sm hover:bg-blue-200 active:bg-blue-400 cursor-pointer"
})

const hindiSelectorButton = document.getElementById('hindisongs-folder')

let isHindiSongPlaylistOpen = false

const toggleHindiPlaylist = () => {

    if (isHindiSongPlaylistOpen) {
        hindiList.className = "hidden overflow-hidden";
        emptyMessage.className = "h-full justify-between flex items-center"
        isHindiSongPlaylistOpen = false
    } else {
        hindiList.className = "flex flex-col h-full justify-start"
        bhojpuriList.className = "hidden"
        emptyMessage.className = "hidden"
        isbhojpuriSongPlaylistOpen = false
        isHindiSongPlaylistOpen = true
    }
}


hindiSelectorButton.addEventListener("click", toggleHindiPlaylist)



//responsive sidebar toggle 

const sideBar = document.getElementById("sidebar")
const sideBarToggleButton = document.getElementById("sidebar-button")

let isSidebarOpen = true;

const phoneSidebarToggleButton = document.getElementById("phonesidebartogglebutton")

const phoneSidebarButton = document.getElementById("phoneSidebarButton")

isSidebarOpen ? phoneSidebarButton.className = "hidden" : "";


const closeSidebar = () => {
    if (isSidebarOpen) {

        sideBar.className = "w-0 transition-all duration-300 ease-in-out overflow-hidden h-screen"

        sideBarToggleButton.src = "../assets/panel-left-open.svg"

        isSidebarOpen = false;

        phoneSidebarButton.className = "flex sm:hidden items-center justify-center p-5"

    } else {

        sideBar.className = "w-64 sm:relative fixed z-20 transition-all duration-300 ease-in-out flex overflow-hidden items-start justify-center py-2 px-5 flex-col bg-blue-300 h-screen"

        isSidebarOpen = true
        phoneSidebarButton.className = "hidden"

        sideBarToggleButton.src = "../assets/panel-left-close.svg"

    }

    isSidebarOpen ? sideBarToggleButton.innerText = "Close" : sideBarToggleButton.innerText = "Open"
}

const openSidebar = () => {
    sideBar.className = "w-64 transition-all sm:relative fixed z-20 duration-300 ease-in-out flex overflow-hidden items-start justify-center py-2 px-5 flex-col bg-blue-300 h-screen"
    isSidebarOpen = true
    phoneSidebarButton.className = "hidden"

}

sideBarToggleButton.addEventListener('click', closeSidebar);
phoneSidebarButton.addEventListener('click', openSidebar)
phoneSidebarToggleButton.addEventListener('click', closeSidebar);

//sidebar toggle close


//playlogic

// const musicFolderPath = "../music/Bhojpuri-Song/Maroon-Color-Sadiya.mp3"



const playButton = document.getElementById("play-button")

const progressBar = document.querySelector("#seekbar > div");

const seekbar = document.getElementById("seekbar"); // The outer container



let isSeeking = false;

let isSongPlaying = false;

const playSong = () => {
    if (isSongPlaying) {
        playButton.src = "../assets/play.svg"
        currentSong.pause()
        isSongPlaying = false
    } else {
        playButton.src = "../assets/pause.svg"
        currentSong.play()
        isSongPlaying = true
    }
}
playButton.addEventListener("click", playSong)

//sync the seekbar

currentSong.addEventListener("timeupdate", () => {

    if (!isSeeking && currentSong.duration) {
        const progressPercentage = (currentSong.currentTime / currentSong.duration) * 100;
        progressBar.style.width = `${progressPercentage}%`;
    }
});


//seekbar drag

/**

 * @param {MouseEvent} e - The mouse event object.
 */
const updateTimeFromClick = (e) => {
    // Get the position and size of the seekbar relative to the viewport
    const seekbarRect = seekbar.getBoundingClientRect();

    // Calculate the mouse position relative to the start of the seekbar
    const clickX = e.clientX - seekbarRect.left;

    // Calculate the percentage where the user clicked/dragged (0 to 1)
    let percent = clickX / seekbarRect.width;

    // Clamp the percentage between 0 and 1 to prevent going out of bounds
    percent = Math.min(1, Math.max(0, percent));

    // Update the visual width of the progress bar immediately
    progressBar.style.width = `${percent * 100}%`;

    // Update the song's current time
    currentSong.currentTime = percent * currentSong.duration;
};



//Start Dragging

seekbar.addEventListener("mousedown", (e) => {
    e.preventDefault();
    isSeeking = true;
    updateTimeFromClick(e);
});



//Dragging 

document.addEventListener("mousemove", (e) => {
    if (isSeeking) {
        updateTimeFromClick(e);
    }
});



//Stop Dragging 

document.addEventListener("mouseup", () => {
    if (isSeeking) {
        isSeeking = false;
        if (isSongPlaying) {
            currentSong.play();
        }
    }
});


//duration

let totalDuration = document.getElementById("totalDuration")






