const searchSongs = () => {
    const searchText = document.getElementById('search-field').value;

    const url = `https://api.lyrics.ovh/suggest/${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            showSongs(data.data);
        })
        .catch(error => console.log('Something Went wrong'));
}

const showSongs = songs => {
    const songContainer = document.getElementById('songContainer');
    // console.log(songs);
    document.getElementById('search-field').value = ''
    songContainer.innerHTML = '';
    songs.forEach(song => {
        // console.log(song.title);
        const songDiv = document.createElement('div');
        songDiv.className = 'class="single-result row align-items-center my-3 p-3'
        songDiv.innerHTML = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album : <span>${song.album.title}</span></p>
            <p class="author lead">Artist : <span>${song.artist.name}</span></p>
            <audio controls>
                <source src="${song.preview}" type="audio/mpeg">
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="getLyrics('${song.artist.name}','${song.album.title}')" class="btn btn-success">Get Lyrics</button>
        </div>`;

        songContainer.appendChild(songDiv);
    });
}

const getLyrics = async(artist, title) => {
    // console.log(artist, title);
    try {
        const url = `https://api.lyrics.ovh/v2/${artist}/${title}`;
        const res = await fetch(url);
        const data = await res.json();
        displayLyrics(data.lyrics);

    } catch (error) {
        displayError('Something Went Wrong');
    }
}
const displayLyrics = lyrics => {
    const lyricsDiv = document.getElementById('lyricsArea');
    lyricsDiv.innerText = lyrics;
}
const displayError = error => {
    const errorText = document.getElementById('error-message');
    errorText.innerText = error;
}