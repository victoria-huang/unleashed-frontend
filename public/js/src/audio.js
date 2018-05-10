const wallBump = new Audio('https://dl.dropboxusercontent.com/s/xhwthp126kpct0v/wall_bump.mp3')
const find = new Audio('https://dl.dropboxusercontent.com/s/6wbiboh8hpalrc4/Item%20Found.mp3')
const bg = new Audio('https://dl.dropboxusercontent.com/s/bimvvd0g46urrxc/wholetthedogsout.mp3')
const hello = new Audio('https://dl.dropboxusercontent.com/s/2w54gecma0so2ry/cartoon_character_high_pitched_voice_says_hello.mp3')

function playGetCollectableNoise(){
  find.play()
}

function playWallBump(){
  wallBump.play()
}

function playBg(){
  bg.loop = true;
  bg.play()
}

function playHello(){
  hello.play()
}

function toggleSound() {
  if (bg.muted) {
    // document.querySelector('img#toggle-sound').src = 'https://www.freeiconspng.com/uploads/volume-icon-32.png'
    bg.muted = false;
    wallBump.muted = false;
    find.muted = false;
    hello.muted = false;
  } else {
    // document.querySelector('img#toggle-sound').src = 'https://cdn4.iconfinder.com/data/icons/proglyphs-multimedia/512/Volume_Off-512.png'
    bg.muted = true;
    wallBump.muted = true;
    find.muted = true;
    hello.muted = true;
  }

}
