export const bhojpuriSongItems = [
    {
        id: "bj1",
        name: "Maroon Color Sadiya.mp3",
        path: "../music/Bhojpuri-Song/Maroon-Color-Sadiya.mp3"
    },
    {
        id: "bj2",
        name: "Nathuniya.mp3",
        path: "../music/Bhojpuri-Song/Nathuniya.mp3"
    },
    {
        id: "bj3",
        name: "Palang Sagwan Ke.mp3",
        path: "../music/Bhojpuri-Song/Palang-Sagwan-Ke.mp3"
    },
    {
        id: "bj4",
        name: "Garam Masala.mp3",
        path: "../music/Bhojpuri-Song/गरम-मसल-Garam-Masala.mp3"
    },
]


export const hindiSongItems = [
    {
        id: "h1",
        name: "Apna Bana Le.m4a",
        path: "../music/Hindi-Song/Apna-Bana-Le.m4a"
    },
    {
        id: "h2",
        name: "Dekha Tenu Pehli Pehli Baar Ve.mp3",
        path: "../music/Hindi-Song/Dekha-Tenu-Pehli-Pehli-Baar-Ve.mp3"
    },
    {
        id: "h3",
        name: "O Maahi.m4a",
        path: "../music/Hindi-Song/O-Maahi.m4a"
    },
    {
        id: "h4",
        name: "Raataan Lambiyan.m4a",
        path: "../music/Hindi-Song/Raataan-Lambiyan.m4a"
    },
    {
        id: "h5",
        name: "Zara Sa.m4a",
        path: "../music/Hindi-Song/Zara-Sa.m4a"
    }
];

const genreString = "Bhojpuri Songs, Hindi Songs"

export const genreItem = genreString.split(',').map(item => item.trim()).filter(item => item.length > 0)


