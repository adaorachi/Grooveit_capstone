const toggleArrayEle = arrayEle => {
  const allListName = document.querySelectorAll(arrayEle);
  allListName.forEach(list => {
    list.classList.toggle('close');
  });
};

const toggleSingleEle = (ele, classToggled) => {
  const eleDoc = document.querySelector(ele);
  eleDoc.classList.toggle(classToggled);
};

const closeDrawer = () => {
  toggleSingleEle('.navbar-drawer', 'close');
  toggleSingleEle('.logo-brand', 'close');
  toggleSingleEle('.drawer-open', 'close');
  toggleSingleEle('.drawer-close', 'open');
  toggleArrayEle('.navbar-drawer-links .list-name');
};

const clickGenre = id => {
  const array = document.querySelectorAll('.genre-name');
  Array.from(array).forEach(item => {
    if (item.id === id) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
};

const convertSongDuration = time => {
  const num = time;
  const hours = (num / 60);
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);
  const rminutes2 = rminutes.toString().length === 1 ? `${rminutes}0` : `${rminutes}`;
  return `${rhours}:${rminutes2}`;
};

const convertSongDurationSec = t => {
  const time = Number(t);
  const h = Math.floor(time / 3600);
  const m = Math.floor((time % 3600) / 60);
  const hDisplay = h > 0 ? h + (h === 1 ? 'hr' : ' hrs') : '';
  const mDisplay = m > 0 ? m + (m === 1 ? 'min' : ' mins') : '';
  return `${hDisplay} ${mDisplay}`;
};

const shuffle = arr => {
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    // eslint-disable-next-line no-param-reassign
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const shortenWord = (string, num) => {
  let str = string;
  if (string.length > num) {
    str = `${string.slice(0, num)}...`;
  }
  return str;
};

const convertUnixTime = time => {
  const d = new Date(time * 1000);
  return d.toDateString();
};

const updateDefaultPlayer = obj => {
  const {
    playerImg, playerTitle, playerArtist,
  } = obj;
  document.getElementById('player-img').setAttribute('src', playerImg);
  document.getElementById('player-title').innerText = playerTitle;
  document.getElementById('player-artist').innerText = playerArtist;
  // const playerAud = document.getElementById('player-audio');
};

const musicPlayer = (e, card) => {
  function mem(id) {
    const array = document.querySelectorAll(`.${card}`);
    Array.from(array).forEach(item => {
      const itemId = item.id;
      if (itemId !== id) {
        const audio = document.getElementById(`audio-${itemId}`);
        audio.pause();
        document.getElementById(`play-button-${itemId}`).style.display = 'block';
        document.getElementById(`pause-button-${itemId}`).style.display = 'none';
      }
    });
  }

  if (e.target.classList.contains(`${card}`)) {
    const { id } = e.target;
    // console.log(id);
    const audio = document.getElementById(`audio-${id}`);
    const artist = document.getElementById(`artist-${id}`).innerText;
    const title = document.getElementById(`title-${id}`).innerText;
    const image = document.getElementById(`image-${id}`).getAttribute('src');
    const audioPrev = document.getElementById(`audio-prev-${id}`).getAttribute('src');
    if (audio.paused) {
      audio.play();
      const bb = {};
      bb.playerImg = image;
      bb.playerTitle = title;
      bb.playerArtist = artist;
      bb.playerAudio = audioPrev;
      updateDefaultPlayer(bb);

      document.getElementById(`play-button-${id}`).style.display = 'none';
      document.getElementById(`pause-button-${id}`).style.display = 'block';
      if (card !== 'audio-button') {
        mem(id);
      }
    } else {
      audio.pause();
      document.getElementById(`play-button-${id}`).style.display = 'block';
      document.getElementById(`pause-button-${id}`).style.display = 'none';
    }
  }
};

const navScroll = () => {
  window.addEventListener('scroll', () => {
    if (window.scrollY >= 200) {
      document.querySelector('.navbar-row').classList.add('scrolled');
      document.querySelector('.search-input').classList.add('scrolled');
      document.querySelector('.search-bar-input').classList.add('scrolled');
    } else if (window.scrollY < 200) {
      document.querySelector('.navbar-row').classList.remove('scrolled');
      document.querySelector('.search-input').classList.remove('scrolled');
      document.querySelector('.search-bar-input').classList.remove('scrolled');
    }
  });
};

const toggleDark = () => {
  const toggleSwitch = document.getElementById('toggle-dark');

  toggleSwitch.addEventListener('change', e => {
    if (e.target.checked) {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  });
};

export {
  closeDrawer,
  clickGenre,
  convertSongDuration,
  convertSongDurationSec,
  shuffle,
  shortenWord,
  convertUnixTime,
  updateDefaultPlayer,
  musicPlayer,
  navScroll,
  toggleDark,
};
