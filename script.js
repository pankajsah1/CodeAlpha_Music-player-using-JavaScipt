const songs = [
      {
        title: "Sunny Vibes",
        artist: "Audio A",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
      },
      {
        title: "Chill Beats",
        artist: "DJ Cool",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
      },
      {
        title: "Night Drive",
        artist: "Synthwave",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
      }
    ];

    const audio = document.getElementById("audio");
    const title = document.getElementById("title");
    const artist = document.getElementById("artist");
    const playPauseBtn = document.getElementById("playPauseBtn");
    const progress = document.getElementById("progress");
    const durationDisplay = document.getElementById("duration");
    const volume = document.getElementById("volume");
    const playlistDiv = document.getElementById("playlist");

    let currentSongIndex = 0;
    let isPlaying = false;

    function loadSong(index) {
      const song = songs[index];
      audio.src = song.src;
      title.innerText = song.title;
      artist.innerText = song.artist;
      updatePlaylistUI(index);
    }

    function playSong() {
      audio.play();
      isPlaying = true;
      playPauseBtn.innerText = "⏸️";
    }

    function pauseSong() {
      audio.pause();
      isPlaying = false;
      playPauseBtn.innerText = "▶️";
    }

    function playPause() {
      if (isPlaying) pauseSong();
      else playSong();
    }

    function nextSong() {
      currentSongIndex = (currentSongIndex + 1) % songs.length;
      loadSong(currentSongIndex);
      playSong();
    }

    function prevSong() {
      currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
      loadSong(currentSongIndex);
      playSong();
    }

    function formatTime(seconds) {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    audio.ontimeupdate = () => {
      progress.value = audio.currentTime / audio.duration || 0;
      durationDisplay.innerText = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
    };

    progress.oninput = () => {
      audio.currentTime = progress.value * audio.duration;
    };

    volume.oninput = () => {
      audio.volume = volume.value;
    };

    audio.onended = () => {
      nextSong();
    };

    function updatePlaylistUI(activeIndex) {
      playlistDiv.innerHTML = "";
      songs.forEach((song, index) => {
        const div = document.createElement("div");
        div.innerText = `${song.title} - ${song.artist}`;
        div.className = index === activeIndex ? "active" : "";
        div.onclick = () => {
          currentSongIndex = index;
          loadSong(index);
          playSong();
        };
        playlistDiv.appendChild(div);
      });
    }

    // Load first song
    loadSong(currentSongIndex);