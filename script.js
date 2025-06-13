const correctSound = new Audio("yay-roblox.mp3");
const loserSound = new Audio("roblox-crying-work-at-pizza-place.mp3")
const why = new Audio("uhoh.mp3")
const bruhAudio = new Audio("ten-toes.mp3");
bruhAudio.loop = true;
const bruhBtn = document.getElementById("bruh");
const cardImages = {
  1: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Playing_card_heart_A.svg/640px-Playing_card_heart_A.svg.png",
  2: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/02_of_hearts.svg/144px-02_of_hearts.svg.png",
  3: "https://knowyourdestinycards.com/wp-content/uploads/2013/11/3H.jpg",
  4: "https://www.sevenreflections.com/images/biggercards/4.png",
  5: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVEUe35RRsc8TMcraLq70_PTM80DdSwSEwSw&s",
  6: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj8NOS-4vl8yn-iQJPFHY9kzTWPlqqu-N04_gZy6qrIpbRm2kccxb3LPNa6wGdJWmjJjmgS3cm3EyoKouZEAyVYmQMSoA4mVNg50AzPXSSsO6No0wo4VJ4t2YJRqSJB_6Q8kmEEBaxnE-8/s1600/6hearts.png",
  7: "https://img1.wsimg.com/isteam/ip/3ab5a4ee-598a-41ad-80fa-ebbaa34d26b5/cod-7h.jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:400,cg:true",
  8: "https://www.sevenreflections.com/images/biggercards/8.png",
  9: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Playing_card_heart_9.svg/614px-Playing_card_heart_9.svg.png",
  10: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/10_of_hearts_-_David_Bellot.svg/800px-10_of_hearts_-_David_Bellot.svg.png",
  11: "https://cdn.shopify.com/s/files/1/0461/0608/3492/t/39/assets/jack_of_hearts2.svg-1676949995220_1000x.png?v=1676949996",
  12: "https://t3.ftcdn.net/jpg/00/70/12/64/360_F_70126403_M7fUpLUD7jqBa13AoCyYwhU0fDbCjyWv.jpg",
  13: "https://i.pinimg.com/originals/33/d2/d7/33d2d7a0a79d2e2552914b6abaf1bf21.jpg"
};

const streakDisplay = document.querySelector(".score p");
const highBtn = document.querySelector(".Higher");
const lowBtn = document.querySelector(".Lower");
const cardDisplay = document.getElementById("card-display");
const invert = document.getElementById("invert");


bruhBtn.addEventListener("click", () => {
  try {
    bruhAudio.currentTime = 0;
    bruhAudio.play();
  } catch (e) {
    console.log("Audio play error:", e);
  }
});


invert.addEventListener("click", () => {
  document.body.classList.toggle("invert");

  try {
      why.currentTime = 0;
      why.play();
    } catch (e) {
      console.log("Audio play error:", e);
    }
});

let streak = 0;
let currentCard = null;

function cardPull() {
  const num = Math.floor(Math.random() * 13) + 1;
  let display, value;

  switch (num) {
    case 1:
      display = 'A';
      value = 14;
      break;
    case 11:
      display = 'J';
      value = 11;
      break;
    case 12:
      display = 'Q';
      value = 12;
      break;
    case 13:
      display = 'K';
      value = 13;
      break;
    default:
      display = num.toString();
      value = num;
  }

  const image = cardImages[num];
  return { display, value, image };
}

function updateStreakDisplay() {
  streakDisplay.textContent = `Streak: ${streak}`;
}

function playGame(playerGuess) {
  const newCard = cardPull();

  if (!currentCard) {
    currentCard = newCard;
    cardDisplay.src = currentCard.image;
    return;
  }

  if (
    (playerGuess === 'higher' && newCard.value > currentCard.value) ||
    (playerGuess === 'lower' && newCard.value < currentCard.value)
  ) {
    streak++;
    try {
      correctSound.currentTime = 0;
      correctSound.play();
    } catch (e) {
      console.log("Audio play error:", e);
    }

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

  } else if (newCard.value === currentCard.value) {

  } else {
    streak = 0;
    try {
      loserSound.currentTime = 0;
      loserSound.play();
    } catch (e) {
      console.log("Audio play error:", e);
    }
  }

  currentCard = newCard;
  cardDisplay.src = currentCard.image;
  updateStreakDisplay();
}


highBtn.addEventListener('click', () => playGame('higher'));
lowBtn.addEventListener('click', () => playGame('lower'));


currentCard = cardPull();
cardDisplay.src = currentCard.image;
updateStreakDisplay();

