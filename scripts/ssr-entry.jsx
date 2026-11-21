import { renderToString } from "react-dom/server";
import Countdown from "../src/components/Countdown.jsx";
import PasswordScreen from "../src/components/PasswordScreen.jsx";
import CandleCake from "../src/components/CandleCake.jsx";
import BirthdayCelebration from "../src/components/BirthdayCelebration.jsx";
import PhotoCollage from "../src/components/PhotoCollage.jsx";
import SurpriseGrid from "../src/components/SurpriseGrid.jsx";
import BirthdayLetter from "../src/components/BirthdayLetter.jsx";
import GiftBox from "../src/components/GiftBox.jsx";
import VinylPlayer from "../src/components/VinylPlayer.jsx";
import VideoGallery from "../src/components/VideoGallery.jsx";
import MemoryMap from "../src/components/MemoryMap.jsx";
import ScrapbookBackground from "../src/components/decor/ScrapbookBackground.jsx";
import JourneyNav from "../src/components/JourneyNav.jsx";
import App from "../src/App.jsx";

const r = (el) => () => renderToString(el);

export const scenes = {
  Countdown: r(<Countdown onOpen={() => {}} />),
  PasswordScreen: r(<PasswordScreen onUnlock={() => {}} />),
  CandleCake: r(<CandleCake onComplete={() => {}} />),
  BirthdayCelebration: r(<BirthdayCelebration />),
  PhotoCollage: r(<PhotoCollage />),
  SurpriseGrid: r(<SurpriseGrid />),
  BirthdayLetter: r(<BirthdayLetter />),
  GiftBox: r(<GiftBox />),
  VinylPlayer: r(<VinylPlayer />),
  VideoGallery: r(<VideoGallery />),
  MemoryMap: r(<MemoryMap />),
  ScrapbookBackground: r(<ScrapbookBackground />),
  JourneyNav: r(<JourneyNav unlockedSections={["candles", "celebration", "collage", "surprises", "letter", "gift", "music", "videos", "map"]} />),
  App: r(<App />),
};

export { birthday as config } from "../src/config/birthday.config.js";
