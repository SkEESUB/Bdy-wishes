/**
 * ============================================================================
 *  birthday.config.js — SINGLE SOURCE OF TRUTH FOR ALL PERSONAL CONTENT
 * ============================================================================
 *  Central configuration for recipient, target countdown, password,
 *  4 personal memory photographs, and exactly 12 personalized surprise gifts.
 * ============================================================================
 */

import heroImg from "../assets/images/birthday-hero.jpg";
import giftImg from "../assets/images/gift-reveal.jpg";

// Latest 4 personal photographs uploaded by user
import memory01 from "../assets/images/memory-01.jpg";
import memory02 from "../assets/images/memory-02.jpg";
import memory03 from "../assets/images/memory-03.jpg";
import memory04 from "../assets/images/memory-04.jpg";

// 12 Personalized Gift Illustrations
import gift01Rose from "../assets/images/surprises/surprise-01-rose.svg";
import gift02Chocolates from "../assets/images/surprises/surprise-02-chocolates.svg";
import gift03BowHairpins from "../assets/images/surprises/surprise-03-bow-hairpins.svg";
import gift04CoffeeCup from "../assets/images/surprises/surprise-04-coffee-cup.svg";
import gift05TulipBracelet from "../assets/images/surprises/surprise-05-tulip-bracelet.svg";
import gift06PokaTree from "../assets/images/surprises/surprise-06-poka-tree.svg";
import gift07Rings from "../assets/images/surprises/surprise-07-rings.svg";
import gift08Pendant from "../assets/images/surprises/surprise-08-pendant.svg";
import gift09LightingPanda from "../assets/images/surprises/surprise-09-lighting-panda.svg";
import gift10SolarSystem from "../assets/images/surprises/surprise-10-solar-system.svg";
import gift11LoveNotes from "../assets/images/surprises/surprise-11-love-notes.svg";
import gift12BirthdayCurrency from "../assets/images/surprises/surprise-12-birthday-currency.svg";

// Video posters
import videoPoster1 from "../assets/images/video-1-poster.svg";
import videoPoster2 from "../assets/images/video-2-poster.svg";

export const birthday = {
  /* ---------------------------------------------------------------- 01 WHO */
  recipient: {
    name: "Sri Lakshmi",
    nickname: "Sunshine",
    from: "Me",
    tagline: "the softest, loudest, most wonderful person I know",
  },

  /* -------------------------------------------------------------- 02 WHEN */
  /** Exact IST Target: 24 November 2026, 12:00 AM IST (Asia/Kolkata) */
  date: {
    targetDate: "2026-11-24T00:00:00+05:30",
    timezone: "Asia/Kolkata",
    month: 11,
    day: 24,
    year: 2026,
    hour: 0,
    minute: 0,
  },

  /* -------------------------------------------------------- 03 PASSWORD */
  /** Playful client-side gate (letters: m-y-l-o-v-e) */
  password: "mylove",
  passwordHint: "six lowercase letters — for my favorite person",

  /* ------------------------------------------------------- 04 COUNTDOWN */
  countdown: {
    kicker: "a little surprise is being wrapped…",
    heading: "Someone special has a surprise waiting…",
    message:
      "Shhh. Come back a little closer. Something tiny, silly and extremely heartfelt is hidden behind this screen.",
    birthdayTodayHeading: "IT'S TODAY!",
    birthdayTodayMessage:
      "No more waiting. The candles are lit, the cake is frosted and I have been rehearsing my speech. Ready?",
    earlyLabel: "open early (I won't tell)",
    unitLabels: { days: "days", hours: "hours", minutes: "minutes", seconds: "seconds" },
  },

  /* -------------------------------------------------------- 05 CANDLES */
  candles: {
    count: 5,
    heading: "Make a wish, then blow!",
    hint: "Tap the mic button and gently blow into your phone — or press the button below.",
    micDenied: "No mic access? No problem at all — use the button instead.",
    wishPrompt: "Close your eyes… think of something impossible…",
    afterBlow: "Your wish is officially in the mail. 💌",
  },

  /* ---------------------------------------------------- 06 CELEBRATION */
  celebration: {
    headline: "HAPPY BIRTHDAY",
    message:
      "You make ordinary days taste like frosting. Here's to another year of your laugh, your terrible puns and the way you make every room softer.",
    signature: "with all my love,",
    subline: "may this year be gentle with you",
  },

  /* -------------------------------------------------------- 07 LETTER */
  letter: {
    title: "A letter, folded four times",
    openLabel: "Open the letter",
    greeting: "Dear Sri Lakshmi,",
    paragraphs: [
      "I started writing this a week ago and deleted it five times, because everything I typed sounded smaller than what I actually mean.",
      "So here is the plain version: knowing you is my favourite thing. You are the reason my camera roll is 90% blurry photos of nothing, and 10% of you laughing at something ridiculous.",
      "You have the rare kind of kindness that doesn't announce itself. You just quietly make people feel less alone, and then you make a joke so nobody gets too sentimental. I noticed. I always notice.",
      "This year I hope you get everything you quietly wished for and a few things you didn't dare to. I hope your tea is always the right temperature and your playlists never shuffle to a sad song at the wrong moment.",
      "Happy birthday, sunshine. I'm so glad you were born, and I'm even gladder that I get to be around for it.",
    ],
    signoff: "Yours, entirely and always,",
    signature: "Me 🤍",
    postscript: "P.S. There are 12 personalized surprises further down. Don't skip them, they took ages.",
  },

  /* -------------------------------------------------------- 08 POLAROIDS (EXACTLY 4) */
  gallery: [
    {
      id: "g1",
      src: memory01,
      caption: "Our First Moments",
      note: "Two cups, one window seat, and three hours that felt like ten minutes. Where it all began.",
      date: "Special Memory 01",
      rotate: -2.5,
    },
    {
      id: "g2",
      src: memory02,
      caption: "Laughter & Warmth",
      note: "Your bright smile makes every single ordinary day extraordinary.",
      date: "Special Memory 02",
      rotate: 2,
    },
    {
      id: "g3",
      src: memory03,
      caption: "The Shoreline Sunset",
      note: "Cold feet, warm everything else. Unforgettable memories with you.",
      date: "Special Memory 03",
      rotate: -2,
    },
    {
      id: "g4",
      src: memory04,
      caption: "Forever & Always",
      note: "Grateful for your presence in my life, today and every single day.",
      date: "Special Memory 04",
      rotate: 2.5,
    },
  ],

  /* ----------------------------------------------- 09 TWELVE PERSONALIZED SURPRISES */
  /** EXACTLY 12 CARDS — Each card follows: 1. Item Name, 2. Image, 3. Subtitle, 4. Full Message */
  surprises: [
    {
      id: "s1",
      number: 1,
      itemName: "ROSE 🌹",
      subtitle: "First Impression & Smile",
      description:
        "Flowers anni beautiful ga untayi, kani konni flowers chusthe special people gurthostharu. Ee rose chusinappudalla nee smile gurthuraavali.",
      image: gift01Rose,
      palette: "pink",
      title: "First Impression & Smile",
      message:
        "Flowers anni beautiful ga untayi, kani konni flowers chusthe special people gurthostharu. Ee rose chusinappudalla nee smile gurthuraavali.",
    },
    {
      id: "s2",
      number: 2,
      itemName: "CHOCOLATES 🍫",
      subtitle: "Sweetness in Life",
      description:
        "Life lo konni moments bitter ga untayi. Appudu ee chocolates thini, life lo sweetness inka chaala undhani gurthupettuko.",
      image: gift02Chocolates,
      palette: "butter",
      title: "Sweetness in Life",
      message:
        "Life lo konni moments bitter ga untayi. Appudu ee chocolates thini, life lo sweetness inka chaala undhani gurthupettuko.",
    },
    {
      id: "s3",
      number: 3,
      itemName: "BOW HAIR PINS 🎀",
      subtitle: "Cute Little You",
      description:
        "Nee hair ki oka cute bow, nee smile ki oka extra glow. Nuvvu already cute eh, inkonchem cute cheyyadaniki ee small gift.",
      image: gift03BowHairpins,
      palette: "pink",
      title: "Cute Little You",
      message:
        "Nee hair ki oka cute bow, nee smile ki oka extra glow. Nuvvu already cute eh, inkonchem cute cheyyadaniki ee small gift.",
    },
    {
      id: "s4",
      number: 4,
      itemName: "COFFEE CUP ☕",
      subtitle: "Beautiful Mornings",
      description:
        "Prathi morning coffee tho start avuthundi. Alage nee day kuda oka beautiful smile tho start avvali. Ee cup tho paatu mana conversations kuda gurthuraavali.",
      image: gift04CoffeeCup,
      palette: "blue",
      title: "Beautiful Mornings",
      message:
        "Prathi morning coffee tho start avuthundi. Alage nee day kuda oka beautiful smile tho start avvali. Ee cup tho paatu mana conversations kuda gurthuraavali.",
    },
    {
      id: "s5",
      number: 5,
      itemName: "TULIP BRACELET 🌷",
      subtitle: "Our Bond",
      description:
        "Ee bracelet nee hand lo untundi, kani deeni venaka unna affection nee heart lo undalani. Just like this bracelet, mana bond kuda eppudu nee tho undali.",
      image: gift05TulipBracelet,
      palette: "lavender",
      title: "Our Bond",
      message:
        "Ee bracelet nee hand lo untundi, kani deeni venaka unna affection nee heart lo undalani. Just like this bracelet, mana bond kuda eppudu nee tho undali.",
    },
    {
      id: "s6",
      number: 6,
      itemName: "POKA TREE 🌱",
      subtitle: "Growing Together",
      description:
        "Chettu perigina prathi roju kottha leaves vasthayi. Alage mana Bond kuda roju roju ki inka beautiful ga grow avvali. Enni seasons maarina, mana bond strong ga undali.",
      image: gift06PokaTree,
      palette: "mint",
      title: "Growing Together",
      message:
        "Chettu perigina prathi roju kottha leaves vasthayi. Alage mana Bond kuda roju roju ki inka beautiful ga grow avvali. Enni seasons maarina, mana bond strong ga undali.",
    },
    {
      id: "s7",
      number: 7,
      itemName: "RINGS 💍",
      subtitle: "An Endless Bond",
      description:
        "Ring ki starting, ending undochu. Kani mana Bond ki matram ending ane word undakudadhu. Ee ring chusinappudalla oka special bond gurthuraavali.",
      image: gift07Rings,
      palette: "lavender",
      title: "An Endless Bond",
      message:
        "Ring ki starting, ending undochu. Kani mana Bond ki matram ending ane word undakudadhu. Ee ring chusinappudalla oka special bond gurthuraavali.",
    },
    {
      id: "s8",
      number: 8,
      itemName: "PENDANT ✨",
      subtitle: "A Beautiful Memory",
      description:
        "Konni gifts just accessories, konni gifts memories. Ee pendant oka accessory ga kaakunda, nee life lo oka small beautiful memory ga undipovali.",
      image: gift08Pendant,
      palette: "butter",
      title: "A Beautiful Memory",
      message:
        "Konni gifts just accessories, konni gifts memories. Ee pendant oka accessory ga kaakunda, nee life lo oka small beautiful memory ga undipovali.",
    },
    {
      id: "s9",
      number: 9,
      itemName: "LITTLE LIGHTING PANDA 🐼",
      subtitle: "A Little Light for You",
      description:
        "Konni lights room ni bright chestayi… konni lights mana heart ni bright chestayi. Ee chinna Panda nee life lo alanti oka light la undali. Eppudaina nuvvu dull ga feel ayina, deenini chusi smile cheyyali… endukante nee smile kanna beautiful light inkoti ledhu. ✨",
      image: gift09LightingPanda,
      palette: "blue",
      title: "A Little Light for You",
      message:
        "Konni lights room ni bright chestayi… konni lights mana heart ni bright chestayi. Ee chinna Panda nee life lo alanti oka light la undali. Eppudaina nuvvu dull ga feel ayina, deenini chusi smile cheyyali… endukante nee smile kanna beautiful light inkoti ledhu. ✨",
    },
    {
      id: "s10",
      number: 10,
      itemName: "3D SOLAR SYSTEM 🪐",
      subtitle: "You Are My Universe",
      description:
        "Ee universe lo enno planets, stars unna… prathi okkati daani own beauty tho shine avuthundi. Alage nuvvu kuda evaritho compare cheskokunda, nee own way lo shine avvali. Nuvvu reach avvalsina dreams entha distant ga unna, nee journey ni beautiful ga enjoy chesthu munduku vellali. 🌌",
      image: gift10SolarSystem,
      palette: "lavender",
      title: "You Are My Universe",
      message:
        "Ee universe lo enno planets, stars unna… prathi okkati daani own beauty tho shine avuthundi. Alage nuvvu kuda evaritho compare cheskokunda, nee own way lo shine avvali. Nuvvu reach avvalsina dreams entha distant ga unna, nee journey ni beautiful ga enjoy chesthu munduku vellali. 🌌",
    },
    {
      id: "s11",
      number: 11,
      itemName: "THINGS I LOVE ABOUT YOU 💌",
      subtitle: "The Most Personal Gift",
      description:
        "Neelo naaku nachina vishayalu count cheyyadam start chesthe, pages saripovu. Anduke konni reasons ikkada raasanu. Maybe neeku teliyani nee beautiful side ni neeku chupinchadaniki.",
      image: gift11LoveNotes,
      palette: "pink",
      title: "The Most Personal Gift",
      message:
        "Neelo naaku nachina vishayalu count cheyyadam start chesthe, pages saripovu. Anduke konni reasons ikkada raasanu. Maybe neeku teliyani nee beautiful side ni neeku chupinchadaniki.",
    },
    {
      id: "s12",
      number: 12,
      itemName: "BIRTHDAY DATE CURRENCY 💵",
      subtitle: "The Final Special Gift",
      description:
        "Ee currency lo nee birthday date undhi. Money value time tho maarochu, kani ee date value matram naaku eppatiki special. Because this is the day someone as beautiful as you came into this world.",
      image: gift12BirthdayCurrency,
      palette: "mint",
      title: "The Final Special Gift",
      message:
        "Ee currency lo nee birthday date undhi. Money value time tho maarochu, kani ee date value matram naaku eppatiki special. Because this is the day someone as beautiful as you came into this world.",
    },
  ],

  /* ---------------------------------------------------------- 10 GIFT */
  gift: {
    heading: "One more thing…",
    teaser: "A box with your name on it",
    tapLabel: "Tap to open",
    revealTitle: "It's a whole day, just for you",
    message:
      "Inside this box is a promise: one entire day this year that is completely yours. You choose everything — where, when, what we eat, how loud the playlist is. I'll handle the rest. No taking turns, no negotiating, no 'whatever you want'.",
    image: giftImg,
    afterLabel: "reopen the box",
  },

  /* --------------------------------------------------------- 11 MUSIC (TWO SAMPLE SONGS) */
  music: {
    songs: [
      {
        id: "song-1",
        title: "Happy Birthday Music Box",
        artist: "Handmade Music Box Melody",
        src: "/assets/music/sample-song-01.mp3",
        durationLabel: "looping melody",
      },
      {
        id: "song-2",
        title: "Soft Acoustic Serenade",
        artist: "Birthday Acoustic Box",
        src: "/assets/music/sample-song-02.mp3",
        durationLabel: "gentle loop",
      },
    ],
    note: "Replace with your own MP3 files in public/assets/music/",
  },

  /* -------------------------------------------------------- 12 VIDEOS (EXACTLY TWO) */
  videos: [
    {
      id: "v1",
      title: "The Surprise Reveal",
      caption: "The moment everything started — your face was priceless.",
      src: "/assets/videos/sample-video-01.mp4",
      remoteSrc:
        "https://videos.pexels.com/video-files/7600583/7600583-hd_1920_1080_25fps.mp4",
      poster: videoPoster1,
    },
    {
      id: "v2",
      title: "Laughter & Midnight Cake",
      caption: "Holding far too many balloons and laughing uncontrollably.",
      src: "/assets/videos/sample-video-02.mp4",
      remoteSrc:
        "https://videos.pexels.com/video-files/7119631/7119631-hd_1920_1080_25fps.mp4",
      poster: videoPoster2,
    },
  ],

  /* ------------------------------------------------------ 13 MEMORY MAP */
  memoryMap: [
    { id: "m1", name: "The Café Corner", emoji: "☕", x: 14, y: 62, image: memory01, caption: "Where the first conversation ran three hours long.", message: "You ordered the same thing twice and pretended it was a coincidence." },
    { id: "m2", name: "Picnic Hill", emoji: "🧺", x: 34, y: 38, image: memory02, caption: "Peach-coloured sky, wind everywhere.", message: "You said 'we should do this more often'. We said it four more times that year." },
    { id: "m3", name: "The Shoreline", emoji: "🐚", x: 55, y: 70, image: memory03, caption: "Cold feet, warm everything else.", message: "Forty-one shells. We left the forty-first because it was 'too pretty to take'." },
    { id: "m4", name: "The Fair", emoji: "🎡", x: 74, y: 44, image: memory04, caption: "Lights, sugar, and one brave ferris wheel.", message: "You held my sleeve the entire ride and denied it immediately afterwards." },
    { id: "m5", name: "The Long Road", emoji: "🚐", x: 89, y: 66, image: memory01, caption: "Wrong turn, best day.", message: "No signal, one shared bag of crisps, and a playlist made entirely of your favourites." },
  ],
};

export default birthday;
