import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { renderToString } from "react-dom/server";
import { useMemo, useCallback, useState, useEffect, useRef, useId } from "react";
import { useReducedMotion, motion, AnimatePresence, useInView } from "framer-motion";
import { Cake, PartyPopper, Sparkles, Lock, LockOpen, Delete, Mic, MicOff, Wind, ArrowRight, RotateCw, X, ImageOff, ChevronLeft, ChevronRight, Expand, Heart as Heart$1, MailOpen, Mail, Gift, Disc, Music4, Pause, Play, VolumeX, Volume2, AlertCircle, Film, AlertTriangle, MapPin, Navigation, ArrowUp, ArrowDown, RotateCcw } from "lucide-react";
import confetti from "canvas-confetti";
import gsap from "gsap";
function useCountdown(dateConfig) {
  const target = useMemo(() => {
    if (typeof dateConfig === "string") {
      return new Date(dateConfig);
    }
    if (dateConfig?.targetDate) {
      return new Date(dateConfig.targetDate);
    }
    if (dateConfig?.iso) {
      return new Date(dateConfig.iso);
    }
    return /* @__PURE__ */ new Date("2026-11-24T00:00:00+05:30");
  }, [dateConfig]);
  const compute = useCallback(() => {
    const now = Date.now();
    const targetMs = target.getTime();
    const diff = targetMs - now;
    const isBirthday = diff <= 0 && diff > -24 * 60 * 60 * 1e3;
    const done = diff <= 0;
    const clamped = Math.max(0, diff);
    const totalSeconds = Math.floor(clamped / 1e3);
    return {
      diff,
      isBirthday,
      done,
      days: Math.floor(totalSeconds / 86400),
      hours: Math.floor(totalSeconds % 86400 / 3600),
      minutes: Math.floor(totalSeconds % 3600 / 60),
      seconds: totalSeconds % 60,
      target
    };
  }, [target]);
  const [state, setState] = useState(compute);
  useEffect(() => {
    setState(compute());
    const id = setInterval(() => setState(compute()), 1e3);
    return () => clearInterval(id);
  }, [compute]);
  const targetLabel = useMemo(() => {
    try {
      return target.toLocaleDateString("en-IN", {
        timeZone: "Asia/Kolkata",
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
      });
    } catch {
      return "Tuesday, 24 November 2026";
    }
  }, [target]);
  return { ...state, targetLabel };
}
const heroImg = "/assets/birthday-hero-DW8eaPAz.jpg";
const giftImg = "/assets/gift-reveal-CWBX6an2.jpg";
const memory01 = "/assets/memory-01-CZkuTJtv.jpg";
const memory02 = "/assets/memory-02-6ZjddHsD.jpg";
const memory03 = "/assets/memory-03-DzjP1exY.jpg";
const memory04 = "/assets/memory-04-CXD3kARf.jpg";
const gift01Rose = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20600%20450'%20width='600'%20height='450'%3e%3cdefs%3e%3cradialGradient%20id='roseGlow'%20cx='50%25'%20cy='45%25'%20r='60%25'%3e%3cstop%20offset='0%25'%20stop-color='%23FFF0F3'/%3e%3cstop%20offset='60%25'%20stop-color='%23FCD5DF'/%3e%3cstop%20offset='100%25'%20stop-color='%23F7BACB'/%3e%3c/radialGradient%3e%3cradialGradient%20id='petalDark'%20cx='40%25'%20cy='40%25'%20r='60%25'%3e%3cstop%20offset='0%25'%20stop-color='%23E62744'/%3e%3cstop%20offset='70%25'%20stop-color='%23B8142D'/%3e%3cstop%20offset='100%25'%20stop-color='%237A0A1C'/%3e%3c/radialGradient%3e%3cradialGradient%20id='petalLight'%20cx='45%25'%20cy='35%25'%20r='60%25'%3e%3cstop%20offset='0%25'%20stop-color='%23FF526B'/%3e%3cstop%20offset='75%25'%20stop-color='%23DC1E3A'/%3e%3cstop%20offset='100%25'%20stop-color='%239E0E22'/%3e%3c/radialGradient%3e%3cfilter%20id='shadow'%20x='-10%25'%20y='-10%25'%20width='120%25'%20height='120%25'%3e%3cfeDropShadow%20dx='0'%20dy='8'%20stdDeviation='12'%20flood-color='%23801020'%20flood-opacity='0.18'/%3e%3c/filter%3e%3c/defs%3e%3crect%20width='600'%20height='450'%20fill='url(%23roseGlow)'/%3e%3ccircle%20cx='300'%20cy='210'%20r='170'%20fill='%23FFFFFF'%20opacity='0.6'/%3e%3cg%20transform='translate(300,%20210)'%20filter='url(%23shadow)'%3e%3c!--%20Stem%20and%20leaves%20--%3e%3cpath%20d='M%20-10%2090%20Q%2010%20160%20-15%20220'%20stroke='%234A7545'%20stroke-width='10'%20stroke-linecap='round'%20fill='none'/%3e%3cpath%20d='M%205%20130%20Q%2070%20120%2090%20145%20Q%2060%20170%200%20140%20Z'%20fill='%23588B52'/%3e%3cpath%20d='M%20-5%20170%20Q%20-70%20160%20-90%20190%20Q%20-50%20210%20-10%20180%20Z'%20fill='%23467340'/%3e%3c!--%20Outer%20petals%20--%3e%3cpath%20d='M%20-80%2030%20C%20-120%20-30,%20-70%20-90,%200%20-80%20C%2070%20-90,%20120%20-30,%2080%2030%20C%2050%2090,%20-50%2090,%20-80%2030%20Z'%20fill='url(%23petalDark)'/%3e%3cpath%20d='M%20-90%20-10%20C%20-110%20-70,%20-40%20-110,%2010%20-90%20C%2070%20-110,%20110%20-60,%2080%20-10%20C%2060%2040,%20-60%2040,%20-90%20-10%20Z'%20fill='url(%23petalLight)'/%3e%3cpath%20d='M%20-60%20-40%20C%20-80%20-90,%200%20-120,%2050%20-80%20C%2090%20-40,%2060%2020,%200%2010%20C%20-50%2020,%20-70%20-10,%20-60%20-40%20Z'%20fill='url(%23petalDark)'/%3e%3c!--%20Inner%20bud%20swirls%20--%3e%3cellipse%20cx='0'%20cy='-35'%20rx='46'%20ry='50'%20fill='url(%23petalLight)'/%3e%3cpath%20d='M%20-25%20-50%20C%20-10%20-75,%2025%20-70,%2020%20-45%20C%2015%20-25,%20-20%20-30,%20-25%20-50%20Z'%20fill='%239E0E22'/%3e%3cpath%20d='M%20-15%20-42%20Q%200%20-62%2018%20-40%20Q%205%20-20%20-15%20-42%20Z'%20fill='%23E62744'/%3e%3c!--%20Dew%20drops%20--%3e%3ccircle%20cx='-35'%20cy='-20'%20r='4.5'%20fill='%23FFFFFF'%20opacity='0.75'/%3e%3ccircle%20cx='40'%20cy='10'%20r='3.5'%20fill='%23FFFFFF'%20opacity='0.7'/%3e%3ccircle%20cx='15'%20cy='-60'%20r='2.5'%20fill='%23FFFFFF'%20opacity='0.8'/%3e%3c/g%3e%3c/svg%3e";
const gift02Chocolates = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20600%20450'%20width='600'%20height='450'%3e%3cdefs%3e%3cradialGradient%20id='chocBg'%20cx='50%25'%20cy='50%25'%20r='60%25'%3e%3cstop%20offset='0%25'%20stop-color='%23FFF5E8'/%3e%3cstop%20offset='60%25'%20stop-color='%23FDE6CC'/%3e%3cstop%20offset='100%25'%20stop-color='%23F8D3B0'/%3e%3c/radialGradient%3e%3clinearGradient%20id='chocDark'%20x1='0'%20y1='0'%20x2='1'%20y2='1'%3e%3cstop%20offset='0%25'%20stop-color='%23542B1A'/%3e%3cstop%20offset='100%25'%20stop-color='%232D150B'/%3e%3c/linearGradient%3e%3clinearGradient%20id='chocMilk'%20x1='0'%20y1='0'%20x2='1'%20y2='1'%3e%3cstop%20offset='0%25'%20stop-color='%237C462B'/%3e%3cstop%20offset='100%25'%20stop-color='%234B2412'/%3e%3c/linearGradient%3e%3clinearGradient%20id='goldWrap'%20x1='0'%20y1='0'%20x2='1'%20y2='1'%3e%3cstop%20offset='0%25'%20stop-color='%23FFE899'/%3e%3cstop%20offset='50%25'%20stop-color='%23D9A934'/%3e%3cstop%20offset='100%25'%20stop-color='%23946C15'/%3e%3c/linearGradient%3e%3c/defs%3e%3crect%20width='600'%20height='450'%20fill='url(%23chocBg)'/%3e%3cellipse%20cx='300'%20cy='235'%20rx='190'%20ry='140'%20fill='%23FFFFFF'%20opacity='0.65'/%3e%3c!--%20Chocolate%20box%20platter%20--%3e%3crect%20x='130'%20y='110'%20width='340'%20height='240'%20rx='28'%20fill='%23FFF9F2'%20stroke='%23E6C8AA'%20stroke-width='3'/%3e%3crect%20x='145'%20y='125'%20width='310'%20height='210'%20rx='20'%20fill='%23F4E3D3'/%3e%3c!--%20Praline%201:%20Heart%20Chocolate%20--%3e%3cg%20transform='translate(200,%20175)'%3e%3cpath%20d='M%200%2010%20C%20-25%20-20,%20-50%205,%200%2045%20C%2050%205,%2025%20-20,%200%2010%20Z'%20fill='url(%23chocDark)'/%3e%3cpath%20d='M%20-5%2010%20Q%200%20-5%2010%205'%20stroke='%23DDA876'%20stroke-width='3'%20stroke-linecap='round'%20fill='none'/%3e%3c/g%3e%3c!--%20Praline%202:%20Gold%20Foil%20Truffle%20--%3e%3cg%20transform='translate(300,%20175)'%3e%3ccircle%20cx='0'%20cy='15'%20r='30'%20fill='url(%23goldWrap)'/%3e%3cpath%20d='M%20-20%205%20Q%200%20-15%2020%205%20Q%200%2025%20-20%205%20Z'%20fill='%23FFEAA8'%20opacity='0.6'/%3e%3c/g%3e%3c!--%20Praline%203:%20Swirled%20Milk%20Truffle%20--%3e%3cg%20transform='translate(400,%20175)'%3e%3crect%20x='-26'%20y='-10'%20width='52'%20height='52'%20rx='12'%20fill='url(%23chocMilk)'/%3e%3cpath%20d='M%20-18%208%20Q%200%20-10%2018%208%20Q%200%2026%20-18%2020'%20stroke='%23FFF'%20stroke-width='3'%20stroke-linecap='round'%20fill='none'%20opacity='0.85'/%3e%3c/g%3e%3c!--%20Praline%204:%20White%20&%20Dark%20Swirl%20--%3e%3cg%20transform='translate(200,%20275)'%3e%3crect%20x='-26'%20y='-10'%20width='52'%20height='52'%20rx='12'%20fill='url(%23chocMilk)'/%3e%3ccircle%20cx='0'%20cy='16'%20r='14'%20fill='%23FFF4E6'/%3e%3c/g%3e%3c!--%20Praline%205:%20Dusted%20Cocoa%20Sphere%20--%3e%3cg%20transform='translate(300,%20275)'%3e%3ccircle%20cx='0'%20cy='16'%20r='28'%20fill='url(%23chocDark)'/%3e%3ccircle%20cx='-5'%20cy='10'%20r='18'%20fill='%23753F24'%20opacity='0.6'/%3e%3c/g%3e%3c!--%20Praline%206:%20Gold%20Ribbon%20Box%20accent%20--%3e%3cg%20transform='translate(400,%20275)'%3e%3cpath%20d='M%200%2010%20C%20-25%20-20,%20-50%205,%200%2045%20C%2050%205,%2025%20-20,%200%2010%20Z'%20fill='url(%23chocDark)'/%3e%3ccircle%20cx='0'%20cy='15'%20r='5'%20fill='url(%23goldWrap)'/%3e%3c/g%3e%3c/svg%3e";
const gift03BowHairpins = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20600%20450'%20width='600'%20height='450'%3e%3cdefs%3e%3cradialGradient%20id='bowBg'%20cx='50%25'%20cy='50%25'%20r='60%25'%3e%3cstop%20offset='0%25'%20stop-color='%23FFF0F5'/%3e%3cstop%20offset='60%25'%20stop-color='%23FCDFEA'/%3e%3cstop%20offset='100%25'%20stop-color='%23F7C4DA'/%3e%3c/radialGradient%3e%3clinearGradient%20id='ribbonPink'%20x1='0'%20y1='0'%20x2='1'%20y2='1'%3e%3cstop%20offset='0%25'%20stop-color='%23FFA8C5'/%3e%3cstop%20offset='50%25'%20stop-color='%23F47BA2'/%3e%3cstop%20offset='100%25'%20stop-color='%23D94F7B'/%3e%3c/linearGradient%3e%3clinearGradient%20id='goldClip'%20x1='0'%20y1='0'%20x2='1'%20y2='0'%3e%3cstop%20offset='0%25'%20stop-color='%23EED596'/%3e%3cstop%20offset='100%25'%20stop-color='%23C59C43'/%3e%3c/linearGradient%3e%3c/defs%3e%3crect%20width='600'%20height='450'%20fill='url(%23bowBg)'/%3e%3ccircle%20cx='300'%20cy='225'%20r='170'%20fill='%23FFFFFF'%20opacity='0.6'/%3e%3c!--%20Left%20hairpin%20(larger)%20--%3e%3cg%20transform='translate(230,%20200)%20rotate(-14)'%3e%3c!--%20Gold%20metal%20bobby%20pin%20/%20alligator%20clip%20--%3e%3crect%20x='-120'%20y='8'%20width='220'%20height='12'%20rx='6'%20fill='url(%23goldClip)'/%3e%3ccircle%20cx='95'%20cy='14'%20r='9'%20fill='url(%23goldClip)'/%3e%3c!--%20Fabric%20Bow%20Left%20Loop%20--%3e%3cpath%20d='M%200%2014%20C%20-60%20-45,%20-100%20-20,%20-75%2025%20C%20-55%2055,%20-20%2025,%200%2014%20Z'%20fill='url(%23ribbonPink)'/%3e%3cpath%20d='M%20-5%2014%20C%20-45%20-25,%20-75%20-5,%20-55%2022%20Z'%20fill='%23FFC7DB'%20opacity='0.6'/%3e%3c!--%20Fabric%20Bow%20Right%20Loop%20--%3e%3cpath%20d='M%200%2014%20C%2060%20-45,%20100%20-20,%2075%2025%20C%2055%2055,%2020%2025,%200%2014%20Z'%20fill='url(%23ribbonPink)'/%3e%3cpath%20d='M%205%2014%20C%2045%20-25,%2075%20-5,%2055%2022%20Z'%20fill='%23FFC7DB'%20opacity='0.6'/%3e%3c!--%20Ribbons%20hanging%20--%3e%3cpath%20d='M%20-8%2018%20Q%20-45%2065%20-60%20100%20Q%20-35%2085%20-5%2030%20Z'%20fill='url(%23ribbonPink)'/%3e%3cpath%20d='M%208%2018%20Q%2045%2065%2060%20100%20Q%2035%2085%205%2030%20Z'%20fill='url(%23ribbonPink)'/%3e%3c!--%20Center%20knot%20with%20pearl%20--%3e%3cellipse%20cx='0'%20cy='14'%20rx='16'%20ry='18'%20fill='%23D94F7B'/%3e%3ccircle%20cx='0'%20cy='14'%20r='8'%20fill='%23FFFFFF'/%3e%3ccircle%20cx='-2'%20cy='12'%20r='3'%20fill='%23FFFFFF'%20opacity='0.8'/%3e%3c/g%3e%3c!--%20Right%20hairpin%20(smaller%20companion)%20--%3e%3cg%20transform='translate(390,%20260)%20rotate(16)'%3e%3crect%20x='-80'%20y='6'%20width='160'%20height='10'%20rx='5'%20fill='url(%23goldClip)'/%3e%3cpath%20d='M%200%2010%20C%20-45%20-35,%20-75%20-15,%20-55%2020%20C%20-40%2045,%20-15%2020,%200%2010%20Z'%20fill='url(%23ribbonPink)'/%3e%3cpath%20d='M%200%2010%20C%2045%20-35,%2075%20-15,%2055%2020%20C%2040%2045,%2015%2020,%200%2010%20Z'%20fill='url(%23ribbonPink)'/%3e%3cellipse%20cx='0'%20cy='10'%20rx='12'%20ry='14'%20fill='%23D94F7B'/%3e%3ccircle%20cx='0'%20cy='10'%20r='6'%20fill='%23FFF'/%3e%3c/g%3e%3c/svg%3e";
const gift04CoffeeCup = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20600%20450'%20width='600'%20height='450'%3e%3cdefs%3e%3cradialGradient%20id='coffeeBg'%20cx='50%25'%20cy='50%25'%20r='60%25'%3e%3cstop%20offset='0%25'%20stop-color='%23F3F7FA'/%3e%3cstop%20offset='60%25'%20stop-color='%23DEEBF5'/%3e%3cstop%20offset='100%25'%20stop-color='%23C2DCED'/%3e%3c/radialGradient%3e%3clinearGradient%20id='cupCeramic'%20x1='0'%20y1='0'%20x2='1'%20y2='1'%3e%3cstop%20offset='0%25'%20stop-color='%23FFFFFF'/%3e%3cstop%20offset='60%25'%20stop-color='%23E2EEF7'/%3e%3cstop%20offset='100%25'%20stop-color='%23B8D5EB'/%3e%3c/linearGradient%3e%3clinearGradient%20id='coffeeBrew'%20x1='0'%20y1='0'%20x2='1'%20y2='1'%3e%3cstop%20offset='0%25'%20stop-color='%238F5635'/%3e%3cstop%20offset='100%25'%20stop-color='%235E331B'/%3e%3c/linearGradient%3e%3c/defs%3e%3crect%20width='600'%20height='450'%20fill='url(%23coffeeBg)'/%3e%3cellipse%20cx='300'%20cy='245'%20rx='190'%20ry='130'%20fill='%23FFFFFF'%20opacity='0.6'/%3e%3cg%20transform='translate(290,%20240)'%3e%3c!--%20Saucer%20--%3e%3cellipse%20cx='0'%20cy='85'%20rx='155'%20ry='40'%20fill='%23FFFFFF'%20stroke='%23CADDEB'%20stroke-width='3'/%3e%3cellipse%20cx='0'%20cy='83'%20rx='120'%20ry='26'%20fill='%23EBF3F9'/%3e%3c!--%20Cup%20handle%20--%3e%3cpath%20d='M%2085%20-10%20C%20150%20-10,%20150%2060,%2080%2055'%20fill='none'%20stroke='url(%23cupCeramic)'%20stroke-width='22'%20stroke-linecap='round'/%3e%3cpath%20d='M%2085%20-10%20C%20145%20-10,%20145%2060,%2080%2055'%20fill='none'%20stroke='%23FFFFFF'%20stroke-width='12'%20stroke-linecap='round'/%3e%3c!--%20Cup%20Body%20--%3e%3cpath%20d='M%20-95%20-20%20L%2095%20-20%20C%2090%2070,%2060%2090,%200%2090%20C%20-60%2090,%20-90%2070,%20-95%20-20%20Z'%20fill='url(%23cupCeramic)'%20stroke='%23CADDEB'%20stroke-width='2'/%3e%3c!--%20Cup%20Rim%20&%20Coffee%20Surface%20--%3e%3cellipse%20cx='0'%20cy='-20'%20rx='95'%20ry='32'%20fill='%23FFFFFF'%20stroke='%23CADDEB'%20stroke-width='2'/%3e%3cellipse%20cx='0'%20cy='-20'%20rx='84'%20ry='26'%20fill='url(%23coffeeBrew)'/%3e%3c!--%20Latte%20Art%20Heart%20--%3e%3cpath%20d='M%200%20-16%20C%20-20%20-38,%20-40%20-18,%200%200%20C%2040%20-18,%2020%20-38,%200%20-16%20Z'%20fill='%23FFF2DF'/%3e%3c!--%20Rising%20steam%20--%3e%3cpath%20d='M%20-25%20-65%20Q%20-40%20-95%20-20%20-125%20Q%20-5%20-155%20-15%20-180'%20stroke='%23FFFFFF'%20stroke-width='5'%20fill='none'%20stroke-linecap='round'%20opacity='0.75'/%3e%3cpath%20d='M%2015%20-65%20Q%2035%20-95%2015%20-125%20Q%20-5%20-155%2010%20-180'%20stroke='%23FFFFFF'%20stroke-width='5'%20fill='none'%20stroke-linecap='round'%20opacity='0.75'/%3e%3c/g%3e%3c/svg%3e";
const gift05TulipBracelet = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20600%20450'%20width='600'%20height='450'%3e%3cdefs%3e%3cradialGradient%20id='tulipBg'%20cx='50%25'%20cy='50%25'%20r='60%25'%3e%3cstop%20offset='0%25'%20stop-color='%23FFF3F6'/%3e%3cstop%20offset='60%25'%20stop-color='%23FEE0E9'/%3e%3cstop%20offset='100%25'%20stop-color='%23FCC7D7'/%3e%3c/radialGradient%3e%3clinearGradient%20id='roseGold'%20x1='0'%20y1='0'%20x2='1'%20y2='1'%3e%3cstop%20offset='0%25'%20stop-color='%23FFE3D4'/%3e%3cstop%20offset='50%25'%20stop-color='%23EAA68A'/%3e%3cstop%20offset='100%25'%20stop-color='%23C27357'/%3e%3c/linearGradient%3e%3c/defs%3e%3crect%20width='600'%20height='450'%20fill='url(%23tulipBg)'/%3e%3ccircle%20cx='300'%20cy='225'%20r='170'%20fill='%23FFFFFF'%20opacity='0.6'/%3e%3cg%20transform='translate(300,%20220)'%3e%3c!--%20Bracelet%20chain%20loop%20--%3e%3cellipse%20cx='0'%20cy='0'%20rx='140'%20ry='85'%20fill='none'%20stroke='url(%23roseGold)'%20stroke-width='7'/%3e%3c!--%20Small%20beaded%20links%20along%20bracelet%20--%3e%3ccircle%20cx='-130'%20cy='31.548068280718834'%20r='5'%20fill='%23FFFFFF'%20stroke='%23EAA68A'%20stroke-width='2'/%3e%3ccircle%20cx='-90'%20cy='65.10881786106475'%20r='5'%20fill='%23FFFFFF'%20stroke='%23EAA68A'%20stroke-width='2'/%3e%3ccircle%20cx='-45'%20cy='80.48937532877446'%20r='5'%20fill='%23FFFFFF'%20stroke='%23EAA68A'%20stroke-width='2'/%3e%3ccircle%20cx='0'%20cy='85'%20r='5'%20fill='%23FFFFFF'%20stroke='%23EAA68A'%20stroke-width='2'/%3e%3ccircle%20cx='45'%20cy='80.48937532877446'%20r='5'%20fill='%23FFFFFF'%20stroke='%23EAA68A'%20stroke-width='2'/%3e%3ccircle%20cx='90'%20cy='65.10881786106475'%20r='5'%20fill='%23FFFFFF'%20stroke='%23EAA68A'%20stroke-width='2'/%3e%3ccircle%20cx='130'%20cy='31.548068280718834'%20r='5'%20fill='%23FFFFFF'%20stroke='%23EAA68A'%20stroke-width='2'/%3e%3ccircle%20cx='-110'%20cy='-52.58011380119806'%20r='4'%20fill='%23FFFFFF'%20stroke='%23EAA68A'%20stroke-width='2'/%3e%3ccircle%20cx='-65'%20cy='-75.28326608922613'%20r='4'%20fill='%23FFFFFF'%20stroke='%23EAA68A'%20stroke-width='2'/%3e%3ccircle%20cx='-20'%20cy='-84.12818208191689'%20r='4'%20fill='%23FFFFFF'%20stroke='%23EAA68A'%20stroke-width='2'/%3e%3ccircle%20cx='25'%20cy='-83.63379083473232'%20r='4'%20fill='%23FFFFFF'%20stroke='%23EAA68A'%20stroke-width='2'/%3e%3ccircle%20cx='70'%20cy='-73.61215932167728'%20r='4'%20fill='%23FFFFFF'%20stroke='%23EAA68A'%20stroke-width='2'/%3e%3ccircle%20cx='110'%20cy='-52.58011380119806'%20r='4'%20fill='%23FFFFFF'%20stroke='%23EAA68A'%20stroke-width='2'/%3e%3c!--%20Center%20Tulip%20Charm%20--%3e%3cg%20transform='translate(0,%2085)'%3e%3ccircle%20cx='0'%20cy='0'%20r='6'%20fill='url(%23roseGold)'/%3e%3cline%20x1='0'%20y1='0'%20x2='0'%20y2='18'%20stroke='url(%23roseGold)'%20stroke-width='4'/%3e%3c!--%20Tulip%20petals%20--%3e%3cpath%20d='M%200%2020%20C%20-22%2022,%20-26%2048,%20-12%2060%20C%200%2070,%200%2070,%200%2070%20C%200%2070,%200%2070,%2012%2060%20C%2026%2048,%2022%2022,%200%2020%20Z'%20fill='%23FF789E'/%3e%3cpath%20d='M%200%2025%20C%20-12%2028,%20-15%2048,%200%2065%20C%2015%2048,%2012%2028,%200%2025%20Z'%20fill='%23FF4D7E'/%3e%3cellipse%20cx='0'%20cy='38'%20rx='6'%20ry='14'%20fill='%23FFA5C0'/%3e%3c!--%20Tiny%20stem%20leaf%20--%3e%3cpath%20d='M%200%2068%20Q%20-10%2074%20-16%2070'%20stroke='%2368A362'%20stroke-width='3'%20fill='none'/%3e%3c/g%3e%3c!--%20Side%20Little%20Flower%20Charms%20--%3e%3cg%20transform='translate(-75,%2070)'%3e%3ccircle%20cx='0'%20cy='18'%20r='10'%20fill='%23FFF'%20stroke='%23EAA68A'%20stroke-width='2'/%3e%3ccircle%20cx='0'%20cy='18'%20r='4'%20fill='%23FFB8CE'/%3e%3c/g%3e%3cg%20transform='translate(75,%2070)'%3e%3ccircle%20cx='0'%20cy='18'%20r='10'%20fill='%23FFF'%20stroke='%23EAA68A'%20stroke-width='2'/%3e%3ccircle%20cx='0'%20cy='18'%20r='4'%20fill='%23FFB8CE'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e";
const gift06PokaTree = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20600%20450'%20width='600'%20height='450'%3e%3cdefs%3e%3cradialGradient%20id='treeBg'%20cx='50%25'%20cy='50%25'%20r='60%25'%3e%3cstop%20offset='0%25'%20stop-color='%23F2FAF5'/%3e%3cstop%20offset='60%25'%20stop-color='%23DDF2E6'/%3e%3cstop%20offset='100%25'%20stop-color='%23C0E5CE'/%3e%3c/radialGradient%3e%3clinearGradient%20id='potGrad'%20x1='0'%20y1='0'%20x2='1'%20y2='1'%3e%3cstop%20offset='0%25'%20stop-color='%23FFEAD9'/%3e%3cstop%20offset='100%25'%20stop-color='%23F6CCA9'/%3e%3c/linearGradient%3e%3c/defs%3e%3crect%20width='600'%20height='450'%20fill='url(%23treeBg)'/%3e%3ccircle%20cx='300'%20cy='225'%20r='170'%20fill='%23FFFFFF'%20opacity='0.6'/%3e%3cg%20transform='translate(300,%20240)'%3e%3c!--%20Table%20shadow%20--%3e%3cellipse%20cx='0'%20cy='130'%20rx='90'%20ry='20'%20fill='%23A8D4BC'%20opacity='0.5'/%3e%3c!--%20Ceramic%20Pot%20--%3e%3cpath%20d='M%20-55%2040%20L%2055%2040%20L%2042%20120%20C%2040%20128,%20-40%20128,%20-42%20120%20Z'%20fill='url(%23potGrad)'%20stroke='%23DFB087'%20stroke-width='3'/%3e%3cellipse%20cx='0'%20cy='40'%20rx='55'%20ry='14'%20fill='%23FFEFE3'%20stroke='%23DFB087'%20stroke-width='3'/%3e%3cellipse%20cx='0'%20cy='42'%20rx='46'%20ry='10'%20fill='%236B4E38'/%3e%3c!--%20Tree%20Trunk%20/%20Stem%20--%3e%3cpath%20d='M%200%2042%20Q%20-8%20-20%20-4%20-70%20Q%20-2%20-110%200%20-130'%20stroke='%237A543A'%20stroke-width='12'%20stroke-linecap='round'%20fill='none'/%3e%3cpath%20d='M%20-4%20-30%20Q%2030%20-50%2050%20-70'%20stroke='%237A543A'%20stroke-width='8'%20stroke-linecap='round'%20fill='none'/%3e%3cpath%20d='M%20-4%20-50%20Q%20-35%20-80%20-55%20-100'%20stroke='%237A543A'%20stroke-width='7'%20stroke-linecap='round'%20fill='none'/%3e%3c!--%20Lush%20Green%20Leaves%20(Poka%20tree%20/%20Money%20plant%20leaves)%20--%3e%3c!--%20Center%20Top%20Leaf%20--%3e%3cpath%20d='M%200%20-130%20C%20-30%20-160,%20-35%20-190,%200%20-210%20C%2035%20-190,%2030%20-160,%200%20-130%20Z'%20fill='%23489C57'/%3e%3cpath%20d='M%200%20-130%20Q%200%20-170%200%20-205'%20stroke='%2373C782'%20stroke-width='2'%20fill='none'/%3e%3c!--%20Left%20leaves%20--%3e%3cpath%20d='M%20-55%20-100%20C%20-95%20-110,%20-115%20-140,%20-85%20-160%20C%20-60%20-150,%20-45%20-120,%20-55%20-100%20Z'%20fill='%233D8B4B'/%3e%3cpath%20d='M%20-20%20-10%20C%20-55%20-15,%20-70%20-40,%20-50%20-60%20C%20-30%20-50,%20-15%20-30,%20-20%20-10%20Z'%20fill='%2359AE69'/%3e%3c!--%20Right%20leaves%20--%3e%3cpath%20d='M%2050%20-70%20C%2095%20-75,%20115%20-105,%2085%20-125%20C%2060%20-115,%2045%20-85,%2050%20-70%20Z'%20fill='%2352A562'/%3e%3cpath%20d='M%2020%2010%20C%2060%205,%2075%20-20,%2055%20-40%20C%2035%20-30,%2020%20-10,%2020%2010%20Z'%20fill='%2367BC77'/%3e%3c!--%20Cute%20smiling%20face%20on%20the%20pot%20--%3e%3ccircle%20cx='-16'%20cy='80'%20r='3.5'%20fill='%23523927'/%3e%3ccircle%20cx='16'%20cy='80'%20r='3.5'%20fill='%23523927'/%3e%3cpath%20d='M%20-8%2092%20Q%200%20100%208%2092'%20stroke='%23523927'%20stroke-width='3'%20stroke-linecap='round'%20fill='none'/%3e%3ccircle%20cx='-25'%20cy='88'%20r='5'%20fill='%23FF9999'%20opacity='0.6'/%3e%3ccircle%20cx='25'%20cy='88'%20r='5'%20fill='%23FF9999'%20opacity='0.6'/%3e%3c/g%3e%3c/svg%3e";
const gift07Rings = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20600%20450'%20width='600'%20height='450'%3e%3cdefs%3e%3cradialGradient%20id='ringBg'%20cx='50%25'%20cy='50%25'%20r='60%25'%3e%3cstop%20offset='0%25'%20stop-color='%23FAF5FF'/%3e%3cstop%20offset='60%25'%20stop-color='%23EFE2FC'/%3e%3cstop%20offset='100%25'%20stop-color='%23DDC4F7'/%3e%3c/radialGradient%3e%3clinearGradient%20id='goldRing'%20x1='0'%20y1='0'%20x2='1'%20y2='1'%3e%3cstop%20offset='0%25'%20stop-color='%23FFF0B8'/%3e%3cstop%20offset='50%25'%20stop-color='%23F2BA38'/%3e%3cstop%20offset='100%25'%20stop-color='%23A87A13'/%3e%3c/linearGradient%3e%3clinearGradient%20id='silverRing'%20x1='0'%20y1='0'%20x2='1'%20y2='1'%3e%3cstop%20offset='0%25'%20stop-color='%23FFFFFF'/%3e%3cstop%20offset='50%25'%20stop-color='%23D8E2EC'/%3e%3cstop%20offset='100%25'%20stop-color='%239BAFC1'/%3e%3c/linearGradient%3e%3c/defs%3e%3crect%20width='600'%20height='450'%20fill='url(%23ringBg)'/%3e%3cellipse%20cx='300'%20cy='245'%20rx='180'%20ry='120'%20fill='%23FFFFFF'%20opacity='0.65'/%3e%3c!--%20Velvet%20display%20cushion%20--%3e%3cellipse%20cx='300'%20cy='260'%20rx='140'%20ry='55'%20fill='%23E6D3F8'%20stroke='%23D3B4F0'%20stroke-width='3'/%3e%3cellipse%20cx='300'%20cy='255'%20rx='120'%20ry='42'%20fill='%23F4ECFC'/%3e%3c!--%20Ring%201%20(Gold,%20tilted%20left)%20--%3e%3cg%20transform='translate(265,%20220)%20rotate(-22)'%3e%3cellipse%20cx='0'%20cy='0'%20rx='55'%20ry='55'%20fill='none'%20stroke='url(%23goldRing)'%20stroke-width='14'/%3e%3cellipse%20cx='0'%20cy='0'%20rx='55'%20ry='55'%20fill='none'%20stroke='%23FFFFFF'%20stroke-width='3'%20opacity='0.6'/%3e%3c/g%3e%3c!--%20Ring%202%20(Silver%20with%20Solitaire%20Diamond,%20tilted%20right,%20linked)%20--%3e%3cg%20transform='translate(335,%20215)%20rotate(22)'%3e%3cellipse%20cx='0'%20cy='0'%20rx='55'%20ry='55'%20fill='none'%20stroke='url(%23silverRing)'%20stroke-width='14'/%3e%3cellipse%20cx='0'%20cy='0'%20rx='55'%20ry='55'%20fill='none'%20stroke='%23FFFFFF'%20stroke-width='3'%20opacity='0.8'/%3e%3c!--%20Diamond%20setting%20--%3e%3cg%20transform='translate(0,%20-56)'%3e%3cpolygon%20points='0,-18%2014,-4%209,10%20-9,10%20-14,-4'%20fill='%23E8F4FD'%20stroke='%23B8D5EB'%20stroke-width='2'/%3e%3cpolygon%20points='0,-18%209,10%20-9,10'%20fill='%23FFFFFF'/%3e%3c!--%20Sparkle%20stars%20--%3e%3cpath%20d='M%200%20-35%20L%203%20-24%20L%2014%20-21%20L%203%20-18%20L%200%20-7%20L%20-3%20-18%20L%20-14%20-21%20L%20-3%20-24%20Z'%20fill='%23FFFFFF'/%3e%3c/g%3e%3c/g%3e%3c!--%20Ambient%20light%20glints%20--%3e%3ccircle%20cx='240'%20cy='170'%20r='3'%20fill='%23FFFFFF'/%3e%3ccircle%20cx='380'%20cy='160'%20r='4'%20fill='%23FFFFFF'/%3e%3c/svg%3e";
const gift08Pendant = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20600%20450'%20width='600'%20height='450'%3e%3cdefs%3e%3cradialGradient%20id='pendantBg'%20cx='50%25'%20cy='50%25'%20r='60%25'%3e%3cstop%20offset='0%25'%20stop-color='%23FFFBF0'/%3e%3cstop%20offset='60%25'%20stop-color='%23FEEFC7'/%3e%3cstop%20offset='100%25'%20stop-color='%23F9DE96'/%3e%3c/radialGradient%3e%3clinearGradient%20id='goldChain'%20x1='0'%20y1='0'%20x2='1'%20y2='1'%3e%3cstop%20offset='0%25'%20stop-color='%23FFF2B8'/%3e%3cstop%20offset='50%25'%20stop-color='%23E5AF36'/%3e%3cstop%20offset='100%25'%20stop-color='%23A17210'/%3e%3c/linearGradient%3e%3clinearGradient%20id='gemGrad'%20x1='0'%20y1='0'%20x2='1'%20y2='1'%3e%3cstop%20offset='0%25'%20stop-color='%23FFFFFF'/%3e%3cstop%20offset='40%25'%20stop-color='%23E8F4FD'/%3e%3cstop%20offset='100%25'%20stop-color='%239BC8EA'/%3e%3c/linearGradient%3e%3c/defs%3e%3crect%20width='600'%20height='450'%20fill='url(%23pendantBg)'/%3e%3ccircle%20cx='300'%20cy='225'%20r='170'%20fill='%23FFFFFF'%20opacity='0.6'/%3e%3cg%20transform='translate(300,%20200)'%3e%3c!--%20Fine%20necklace%20chain%20drape%20--%3e%3cpath%20d='M%20-160%20-120%20Q%200%2080%200%2090%20Q%200%2080%20160%20-120'%20fill='none'%20stroke='url(%23goldChain)'%20stroke-width='4'%20stroke-dasharray='7,3'/%3e%3c!--%20Pendant%20Bail%20--%3e%3cellipse%20cx='0'%20cy='94'%20rx='7'%20ry='11'%20fill='url(%23goldChain)'/%3e%3ccircle%20cx='0'%20cy='94'%20r='4'%20fill='%23FFFBF0'/%3e%3c!--%20Main%20Pendant%20Frame:%20Vintage%20teardrop%20with%20sparkling%20jewel%20--%3e%3cg%20transform='translate(0,%20130)'%3e%3c!--%20Gold%20outer%20halo%20--%3e%3cpath%20d='M%200%20-22%20C%20-32%205,%20-35%2048,%200%2065%20C%2035%2048,%2032%205,%200%20-22%20Z'%20fill='url(%23goldChain)'/%3e%3c!--%20Inner%20Crystal%20Teardrop%20--%3e%3cpath%20d='M%200%20-15%20C%20-24%208,%20-26%2040,%200%2054%20C%2026%2040,%2024%208,%200%20-15%20Z'%20fill='url(%23gemGrad)'/%3e%3c!--%20Diamond%20facets%20--%3e%3cpolygon%20points='0,-15%20-14,16%200,32%2014,16'%20fill='%23FFFFFF'%20opacity='0.7'/%3e%3cpolygon%20points='0,32%20-18,22%20-14,46%200,54'%20fill='%2375A8CC'%20opacity='0.5'/%3e%3cpolygon%20points='0,32%2018,22%2014,46%200,54'%20fill='%23A8D4F2'%20opacity='0.6'/%3e%3c!--%20Starburst%20sparkle%20--%3e%3cpath%20d='M%200%2010%20L%204%2022%20L%2016%2026%20L%204%2030%20L%200%2042%20L%20-4%2030%20L%20-16%2026%20L%20-4%2022%20Z'%20fill='%23FFFFFF'/%3e%3c/g%3e%3ccircle%20cx='-12'%20cy='115'%20r='2.5'%20fill='%23FFFFFF'/%3e%3ccircle%20cx='15'%20cy='135'%20r='3'%20fill='%23FFFFFF'/%3e%3c/g%3e%3c/svg%3e";
const gift09LightingPanda = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20600%20450'%20width='600'%20height='450'%3e%3cdefs%3e%3cradialGradient%20id='nightBg'%20cx='50%25'%20cy='50%25'%20r='60%25'%3e%3cstop%20offset='0%25'%20stop-color='%232D354E'/%3e%3cstop%20offset='60%25'%20stop-color='%231E2335'/%3e%3cstop%20offset='100%25'%20stop-color='%23141724'/%3e%3c/radialGradient%3e%3cradialGradient%20id='pandaGlow'%20cx='50%25'%20cy='50%25'%20r='50%25'%3e%3cstop%20offset='0%25'%20stop-color='%23FFF9D2'/%3e%3cstop%20offset='50%25'%20stop-color='%23FFE885'%20stop-opacity='0.5'/%3e%3cstop%20offset='100%25'%20stop-color='%23FFE885'%20stop-opacity='0'/%3e%3c/radialGradient%3e%3cradialGradient%20id='lampSilicone'%20cx='45%25'%20cy='40%25'%20r='60%25'%3e%3cstop%20offset='0%25'%20stop-color='%23FFFFFF'/%3e%3cstop%20offset='70%25'%20stop-color='%23FFFEE6'/%3e%3cstop%20offset='100%25'%20stop-color='%23FFEFA8'/%3e%3c/radialGradient%3e%3c/defs%3e%3crect%20width='600'%20height='450'%20fill='url(%23nightBg)'/%3e%3c!--%20Warm%20ambient%20halo%20--%3e%3ccircle%20cx='300'%20cy='225'%20r='190'%20fill='url(%23pandaGlow)'/%3e%3c!--%20Stars%20in%20background%20--%3e%3ccircle%20cx='100'%20cy='80'%20r='2.5'%20fill='%23FFEAA8'%20opacity='0.8'/%3e%3ccircle%20cx='500'%20cy='90'%20r='3'%20fill='%23FFEAA8'%20opacity='0.7'/%3e%3ccircle%20cx='480'%20cy='330'%20r='2'%20fill='%23FFEAA8'%20opacity='0.6'/%3e%3cg%20transform='translate(300,%20240)'%3e%3c!--%20Wooden%20nightstand%20base%20--%3e%3cellipse%20cx='0'%20cy='115'%20rx='130'%20ry='25'%20fill='%2342352B'/%3e%3cellipse%20cx='0'%20cy='110'%20rx='120'%20ry='20'%20fill='%235E4C3E'/%3e%3c!--%20Panda%20Lamp%20Body%20(Plump%20glowing%20silicone)%20--%3e%3c!--%20Black%20Ears%20--%3e%3cellipse%20cx='-65'%20cy='-80'%20rx='26'%20ry='24'%20fill='%232C2E38'/%3e%3cellipse%20cx='65'%20cy='-80'%20rx='26'%20ry='24'%20fill='%232C2E38'/%3e%3c!--%20Head%20&%20Body%20(soft%20pear%20shape)%20--%3e%3cellipse%20cx='0'%20cy='40'%20rx='88'%20ry='72'%20fill='url(%23lampSilicone)'/%3e%3ccircle%20cx='0'%20cy='-25'%20r='75'%20fill='url(%23lampSilicone)'/%3e%3c!--%20Black%20Eye%20Patches%20--%3e%3cellipse%20cx='-32'%20cy='-25'%20rx='20'%20ry='25'%20transform='rotate(-15%20-32%20-25)'%20fill='%232C2E38'/%3e%3cellipse%20cx='32'%20cy='-25'%20rx='20'%20ry='25'%20transform='rotate(15%2032%20-25)'%20fill='%232C2E38'/%3e%3c!--%20Cute%20Eyes%20--%3e%3ccircle%20cx='-30'%20cy='-24'%20r='6'%20fill='%23FFFFFF'/%3e%3ccircle%20cx='-28'%20cy='-26'%20r='2.5'%20fill='%232C2E38'/%3e%3ccircle%20cx='30'%20cy='-24'%20r='6'%20fill='%23FFFFFF'/%3e%3ccircle%20cx='32'%20cy='-26'%20r='2.5'%20fill='%232C2E38'/%3e%3c!--%20Nose%20&%20Mouth%20--%3e%3cellipse%20cx='0'%20cy='-4'%20rx='8'%20ry='5'%20fill='%232C2E38'/%3e%3cpath%20d='M%20-7%205%20Q%200%2012%207%205'%20stroke='%232C2E38'%20stroke-width='2.5'%20stroke-linecap='round'%20fill='none'/%3e%3c!--%20Rosy%20Cheek%20Glows%20--%3e%3ccircle%20cx='-50'%20cy='-4'%20r='11'%20fill='%23FFAAA6'%20opacity='0.65'/%3e%3ccircle%20cx='50'%20cy='-4'%20r='11'%20fill='%23FFAAA6'%20opacity='0.65'/%3e%3c!--%20Little%20Black%20Paws%20--%3e%3cellipse%20cx='-45'%20cy='55'%20rx='20'%20ry='16'%20fill='%232C2E38'/%3e%3cellipse%20cx='45'%20cy='55'%20rx='20'%20ry='16'%20fill='%232C2E38'/%3e%3c!--%20Feet%20--%3e%3cellipse%20cx='-40'%20cy='100'%20rx='22'%20ry='15'%20fill='%232C2E38'/%3e%3cellipse%20cx='40'%20cy='100'%20rx='22'%20ry='15'%20fill='%232C2E38'/%3e%3c/g%3e%3c/svg%3e";
const gift10SolarSystem = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20600%20450'%20width='600'%20height='450'%3e%3cdefs%3e%3cradialGradient%20id='spaceBg'%20cx='50%25'%20cy='50%25'%20r='60%25'%3e%3cstop%20offset='0%25'%20stop-color='%231A1C38'/%3e%3cstop%20offset='60%25'%20stop-color='%230E1024'/%3e%3cstop%20offset='100%25'%20stop-color='%23070814'/%3e%3c/radialGradient%3e%3cradialGradient%20id='sunGlow'%20cx='50%25'%20cy='50%25'%20r='50%25'%3e%3cstop%20offset='0%25'%20stop-color='%23FFF6D1'/%3e%3cstop%20offset='40%25'%20stop-color='%23FFBD3B'/%3e%3cstop%20offset='100%25'%20stop-color='%23FF7518'/%3e%3c/radialGradient%3e%3c/defs%3e%3crect%20width='600'%20height='450'%20fill='url(%23spaceBg)'/%3e%3c!--%20Stardust%20&%20Constellations%20--%3e%3ccircle%20cx='70'%20cy='60'%20r='2.5'%20fill='%23FFF'%20opacity='0.8'/%3e%3ccircle%20cx='140'%20cy='100'%20r='2.5'%20fill='%23FFF'%20opacity='0.8'/%3e%3ccircle%20cx='220'%20cy='50'%20r='1.5'%20fill='%23FFF'%20opacity='0.8'/%3e%3ccircle%20cx='480'%20cy='70'%20r='1.5'%20fill='%23FFF'%20opacity='0.8'/%3e%3ccircle%20cx='530'%20cy='120'%20r='1.5'%20fill='%23FFF'%20opacity='0.8'/%3e%3ccircle%20cx='80'%20cy='360'%20r='2.5'%20fill='%23FFF'%20opacity='0.8'/%3e%3ccircle%20cx='160'%20cy='400'%20r='2.5'%20fill='%23FFF'%20opacity='0.8'/%3e%3ccircle%20cx='490'%20cy='380'%20r='2.5'%20fill='%23FFF'%20opacity='0.8'/%3e%3ccircle%20cx='540'%20cy='340'%20r='1.5'%20fill='%23FFF'%20opacity='0.8'/%3e%3ccircle%20cx='300'%20cy='30'%20r='1.5'%20fill='%23FFF'%20opacity='0.8'/%3e%3cg%20transform='translate(300,%20225)'%3e%3c!--%20Orbit%20Rings%20(Elliptical%20brass/neon%20wire%20paths)%20--%3e%3cellipse%20cx='0'%20cy='0'%20rx='90'%20ry='40'%20fill='none'%20stroke='%237A8CA8'%20stroke-width='1.5'%20stroke-dasharray='4,4'%20opacity='0.6'/%3e%3cellipse%20cx='0'%20cy='0'%20rx='150'%20ry='65'%20fill='none'%20stroke='%237A8CA8'%20stroke-width='1.5'%20stroke-dasharray='5,5'%20opacity='0.5'/%3e%3cellipse%20cx='0'%20cy='0'%20rx='220'%20ry='95'%20fill='none'%20stroke='%237A8CA8'%20stroke-width='1.8'%20stroke-dasharray='6,6'%20opacity='0.45'/%3e%3c!--%20Center%20Glowing%20Sun%20--%3e%3ccircle%20cx='0'%20cy='0'%20r='48'%20fill='url(%23sunGlow)'/%3e%3ccircle%20cx='0'%20cy='0'%20r='58'%20fill='%23FFBA3B'%20opacity='0.25'/%3e%3c!--%20Planet%201:%20Mercury%20/%20Warm%20rocky%20--%3e%3ccircle%20cx='-85'%20cy='-15'%20r='9'%20fill='%23E0A370'/%3e%3c!--%20Planet%202:%20Earth%20(Blue%20with%20green%20continents)%20--%3e%3cg%20transform='translate(135,%20-28)'%3e%3ccircle%20cx='0'%20cy='0'%20r='16'%20fill='%233D85C6'/%3e%3ccircle%20cx='-3'%20cy='-3'%20r='7'%20fill='%236AA84F'%20opacity='0.85'/%3e%3ccircle%20cx='4'%20cy='5'%20r='6'%20fill='%236AA84F'%20opacity='0.85'/%3e%3c!--%20Moon%20orbit%20--%3e%3ccircle%20cx='22'%20cy='-6'%20r='3.5'%20fill='%23EAEAEA'/%3e%3c/g%3e%3c!--%20Planet%203:%20Saturn%20with%20tilted%20rings%20--%3e%3cg%20transform='translate(-160,%2055)'%3e%3cellipse%20cx='0'%20cy='0'%20rx='36'%20ry='12'%20fill='none'%20stroke='%23DDBE86'%20stroke-width='7'%20transform='rotate(-20)'/%3e%3ccircle%20cx='0'%20cy='0'%20r='20'%20fill='%23E8C992'/%3e%3cellipse%20cx='0'%20cy='0'%20rx='36'%20ry='12'%20fill='none'%20stroke='%23DDBE86'%20stroke-width='4'%20stroke-dasharray='20,10'%20transform='rotate(-20)'/%3e%3c/g%3e%3c!--%20Planet%204:%20Mars%20(Red)%20--%3e%3ccircle%20cx='70'%20cy='35'%20r='11'%20fill='%23D95338'/%3e%3c!--%20Planet%205:%20Neptune%20(Deep%20azure)%20--%3e%3ccircle%20cx='215'%20cy='20'%20r='15'%20fill='%234B6CB7'/%3e%3c/g%3e%3c/svg%3e";
const gift11LoveNotes = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20600%20450'%20width='600'%20height='450'%3e%3cdefs%3e%3cradialGradient%20id='notesBg'%20cx='50%25'%20cy='50%25'%20r='60%25'%3e%3cstop%20offset='0%25'%20stop-color='%23FFF6F8'/%3e%3cstop%20offset='60%25'%20stop-color='%23FDE2EB'/%3e%3cstop%20offset='100%25'%20stop-color='%23F9CADB'/%3e%3c/radialGradient%3e%3clinearGradient%20id='paperGrad'%20x1='0'%20y1='0'%20x2='1'%20y2='1'%3e%3cstop%20offset='0%25'%20stop-color='%23FFFFFF'/%3e%3cstop%20offset='100%25'%20stop-color='%23FAF1E6'/%3e%3c/linearGradient%3e%3c/defs%3e%3crect%20width='600'%20height='450'%20fill='url(%23notesBg)'/%3e%3ccircle%20cx='300'%20cy='225'%20r='170'%20fill='%23FFFFFF'%20opacity='0.6'/%3e%3cg%20transform='translate(300,%20220)'%3e%3c!--%20Open%20scrapbook%20journal%20binder%20--%3e%3c!--%20Left%20Page%20--%3e%3cpath%20d='M%20-170%20-110%20L%20-15%20-115%20L%20-10%20115%20L%20-165%20110%20Z'%20fill='url(%23paperGrad)'%20stroke='%23E4D0BA'%20stroke-width='3'/%3e%3c!--%20Right%20Page%20--%3e%3cpath%20d='M%2015%20-115%20L%20170%20-110%20L%20165%20110%20L%2010%20115%20Z'%20fill='url(%23paperGrad)'%20stroke='%23E4D0BA'%20stroke-width='3'/%3e%3c!--%20Center%20spine%20binding%20rings%20--%3e%3cellipse%20cx='0'%20cy='-80'%20rx='12'%20ry='7'%20fill='%23C59C68'/%3e%3cellipse%20cx='0'%20cy='-40'%20rx='12'%20ry='7'%20fill='%23C59C68'/%3e%3cellipse%20cx='0'%20cy='0'%20rx='12'%20ry='7'%20fill='%23C59C68'/%3e%3cellipse%20cx='0'%20cy='40'%20rx='12'%20ry='7'%20fill='%23C59C68'/%3e%3cellipse%20cx='0'%20cy='80'%20rx='12'%20ry='7'%20fill='%23C59C68'/%3e%3c!--%20Faux%20handwritten%20lines%20&%20doodle%20hearts%20on%20Left%20Page%20--%3e%3cline%20x1='-145'%20y1='-70'%20x2='-35'%20y2='-70'%20stroke='%23D1B89D'%20stroke-width='2'%20stroke-linecap='round'/%3e%3cline%20x1='-145'%20y1='-45'%20x2='-35'%20y2='-45'%20stroke='%23D1B89D'%20stroke-width='2'%20stroke-linecap='round'/%3e%3cline%20x1='-145'%20y1='-20'%20x2='-35'%20y2='-20'%20stroke='%23D1B89D'%20stroke-width='2'%20stroke-linecap='round'/%3e%3cline%20x1='-145'%20y1='5'%20x2='-35'%20y2='5'%20stroke='%23D1B89D'%20stroke-width='2'%20stroke-linecap='round'/%3e%3cline%20x1='-145'%20y1='30'%20x2='-35'%20y2='30'%20stroke='%23D1B89D'%20stroke-width='2'%20stroke-linecap='round'/%3e%3cline%20x1='-145'%20y1='55'%20x2='-35'%20y2='55'%20stroke='%23D1B89D'%20stroke-width='2'%20stroke-linecap='round'/%3e%3cline%20x1='-145'%20y1='80'%20x2='-35'%20y2='80'%20stroke='%23D1B89D'%20stroke-width='2'%20stroke-linecap='round'/%3e%3cpath%20d='M%20-90%20-45%20C%20-105%20-60,%20-120%20-40,%20-90%20-20%20C%20-60%20-40,%20-75%20-60,%20-90%20-45%20Z'%20fill='%23FF789E'/%3e%3c!--%20Right%20Page:%20Mini%20envelope%20tucked%20with%20letter%20&%20washi%20tape%20--%3e%3cg%20transform='translate(85,%20-10)%20rotate(8)'%3e%3crect%20x='-55'%20y='-35'%20width='110'%20height='70'%20rx='8'%20fill='%23FFFBF5'%20stroke='%23E6A8BC'%20stroke-width='2'/%3e%3cpath%20d='M%20-55%20-35%20L%200%205%20L%2055%20-35'%20fill='%23FCE5ED'%20stroke='%23E6A8BC'%20stroke-width='2'/%3e%3ccircle%20cx='0'%20cy='6'%20r='10'%20fill='%23E45B88'/%3e%3c!--%20Letter%20sticking%20out%20--%3e%3crect%20x='-42'%20y='-60'%20width='84'%20height='40'%20rx='4'%20fill='%23FFFFFF'%20stroke='%23D4BBA5'%20stroke-width='1.5'/%3e%3cline%20x1='-30'%20y1='-45'%20x2='30'%20y2='-45'%20stroke='%23E6A8BC'%20stroke-width='2'/%3e%3cline%20x1='-30'%20y1='-32'%20x2='15'%20y2='-32'%20stroke='%23E6A8BC'%20stroke-width='2'/%3e%3c!--%20Pastel%20Washi%20tape%20sticker%20--%3e%3crect%20x='-30'%20y='-70'%20width='60'%20height='16'%20fill='%23BBDFF5'%20opacity='0.8'%20transform='rotate(-4)'/%3e%3c/g%3e%3c!--%20Floating%20paper%20hearts%20--%3e%3cpath%20d='M%20125%2070%20C%20115%2055,%2095%2065,%20125%2090%20C%20155%2065,%20135%2055,%20125%2070%20Z'%20fill='%23E45B88'/%3e%3c/g%3e%3c/svg%3e";
const gift12BirthdayCurrency = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MDAgNDUwIiB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQ1MCI+CiAgPGRlZnM+CiAgICA8cmFkaWFsR3JhZGllbnQgaWQ9ImN1cnJCZyIgY3g9IjUwJSIgY3k9IjUwJSIgcj0iNjAlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI0VBRjhGMSIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjYwJSIgc3RvcC1jb2xvcj0iI0NFRUZFMCIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNBQ0RFQzYiLz4KICAgIDwvcmFkaWFsR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9Im5vdGVHcmFkIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNGNEZDRjciLz4KICAgICAgPHN0b3Agb2Zmc2V0PSI1MCUiIHN0b3AtY29sb3I9IiNFMUY3RUMiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjQzVFREQ4Ii8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0idXJsKCNjdXJyQmcpIi8+CiAgPGNpcmNsZSBjeD0iMzAwIiBjeT0iMjI1IiByPSIxNzAiIGZpbGw9IiNGRkZGRkYiIG9wYWNpdHk9IjAuNiIvPgoKICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzMDAsIDIyNSkgcm90YXRlKC0zKSI+CiAgICA8IS0tIERlY29yYXRpdmUgQmFua25vdGUgRnJhbWUgLS0+CiAgICA8cmVjdCB4PSItMjEwIiB5PSItMTE1IiB3aWR0aD0iNDIwIiBoZWlnaHQ9IjIzMCIgcng9IjE2IiBmaWxsPSJ1cmwoI25vdGVHcmFkKSIgc3Ryb2tlPSIjNEVBODdBIiBzdHJva2Utd2lkdGg9IjQiLz4KICAgIDxyZWN0IHg9Ii0xOTUiIHk9Ii0xMDAiIHdpZHRoPSIzOTAiIGhlaWdodD0iMjAwIiByeD0iMTIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzY4QzQ5NiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtZGFzaGFycmF5PSI2LDQiLz4KCiAgICA8IS0tIENvcm5lciBHdWlsbG9jaGUgJiBEZW5vbWluYXRpb24gQmFkZ2VzIC0tPgogICAgPGNpcmNsZSBjeD0iLTE2NSIgY3k9Ii03MCIgcj0iMTgiIGZpbGw9IiM0RUE4N0EiLz4KICAgIDx0ZXh0IHg9Ii0xNjUiIHk9Ii02MyIgZm9udC1mYW1pbHk9InNlcmlmIiBmb250LXdlaWdodD0iYm9sZCIgZm9udC1zaXplPSIyMCIgZmlsbD0iI0ZGRkZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+4piFPC90ZXh0PgogICAgPGNpcmNsZSBjeD0iMTY1IiBjeT0iLTcwIiByPSIxOCIgZmlsbD0iIzRFQTg3QSIvPgogICAgPHRleHQgeD0iMTY1IiB5PSItNjMiIGZvbnQtZmFtaWx5PSJzZXJpZiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiNGRkZGRkYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPuKYhTwvdGV4dD4KICAgIDxjaXJjbGUgY3g9Ii0xNjUiIGN5PSI3MCIgcj0iMTgiIGZpbGw9IiM0RUE4N0EiLz4KICAgIDx0ZXh0IHg9Ii0xNjUiIHk9Ijc3IiBmb250LWZhbWlseT0ic2VyaWYiIGZvbnQtd2VpZ2h0PSJib2xkIiBmb250LXNpemU9IjIwIiBmaWxsPSIjRkZGRkZGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7imIU8L3RleHQ+CiAgICA8Y2lyY2xlIGN4PSIxNjUiIGN5PSI3MCIgcj0iMTgiIGZpbGw9IiM0RUE4N0EiLz4KICAgIDx0ZXh0IHg9IjE2NSIgeT0iNzciIGZvbnQtZmFtaWx5PSJzZXJpZiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiNGRkZGRkYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPuKYhTwvdGV4dD4KCiAgICA8IS0tIENlbnRlciBWaWduZXR0ZSBNZWRhbGxpb24gLS0+CiAgICA8ZWxsaXBzZSBjeD0iMCIgY3k9IjAiIHJ4PSI4NSIgcnk9Ijg1IiBmaWxsPSIjRkZGRkZGIiBzdHJva2U9IiM0RUE4N0EiIHN0cm9rZS13aWR0aD0iMyIvPgogICAgPGVsbGlwc2UgY3g9IjAiIGN5PSIwIiByeD0iNzUiIHJ5PSI3NSIgZmlsbD0iI0U4RjlGMCIvPgoKICAgIDwhLS0gQ2FsZW5kYXIgRGF0ZSBJY29uIChOb3ZlbWJlciAyNCkgLS0+CiAgICA8cmVjdCB4PSItMzUiIHk9Ii00MCIgd2lkdGg9IjcwIiBoZWlnaHQ9Ijc1IiByeD0iMTAiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iIzM4OEU2MyIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgICA8cmVjdCB4PSItMzUiIHk9Ii00MCIgd2lkdGg9IjcwIiBoZWlnaHQ9IjI0IiByeD0iNiIgZmlsbD0iI0U0NUI4OCIvPgogICAgPGNpcmNsZSBjeD0iLTE2IiBjeT0iLTM4IiByPSIzIiBmaWxsPSIjRkZGRkZGIi8+CiAgICA8Y2lyY2xlIGN4PSIxNiIgY3k9Ii0zOCIgcj0iMyIgZmlsbD0iI0ZGRkZGRiIvPgogICAgPHRleHQgeD0iMCIgeT0iLTIzIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiNGRkZGRkYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk5PVjwvdGV4dD4KICAgIDx0ZXh0IHg9IjAiIHk9IjIyIiBmb250LWZhbWlseT0ic2VyaWYiIGZvbnQtd2VpZ2h0PSI5MDAiIGZvbnQtc2l6ZT0iMzQiIGZpbGw9IiMzODhFNjMiIHRleHQtYW5jaG9yPSJtaWRkbGUiPjI0PC90ZXh0PgoKICAgIDwhLS0gRGVjb3JhdGl2ZSByaWJib25zIGFuZCBzZWFscyAtLT4KICAgIDxwYXRoIGQ9Ik0gLTEyMCAyMCBRIC03MCA1MCAwIDUwIFEgNzAgNTAgMTIwIDIwIiBzdHJva2U9IiM0RUE4N0EiIHN0cm9rZS13aWR0aD0iMyIgZmlsbD0ibm9uZSIvPgogICAgPGNpcmNsZSBjeD0iMTAwIiBjeT0iMCIgcj0iMjIiIGZpbGw9IiNGRkQ1NjYiIHN0cm9rZT0iI0Q0QTAxNyIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgICA8dGV4dCB4PSIxMDAiIHk9IjciIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiPvCfjoA8L3RleHQ+CiAgPC9nPgo8L3N2Zz4=";
const videoPoster1 = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDY3NSIgd2lkdGg9IjEyMDAiIGhlaWdodD0iNjc1Ij4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0idnAxIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI0ZDRTdFRCIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iI0RDRDRGMiIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNCQkRGRjUiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjY3NSIgZmlsbD0idXJsKCN2cDEpIi8+CiAgPCEtLSBEZWNvcmF0aXZlIGZpbG0gZnJhbWVzIC0tPgogIDxnIGZpbGw9IiNGRkZGRkYiIG9wYWNpdHk9IjAuMzUiPgogICAgPHJlY3QgeD0iNjAiIHk9IjQwIiB3aWR0aD0iMTA4MCIgaGVpZ2h0PSI0MCIgcng9IjYiLz4KICAgIDxyZWN0IHg9IjYwIiB5PSI1OTUiIHdpZHRoPSIxMDgwIiBoZWlnaHQ9IjQwIiByeD0iNiIvPgogICAgPHJlY3QgeD0iOTAiIHk9IjQ4IiB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHJ4PSI0IiBmaWxsPSIjNEE1QTZBIiBvcGFjaXR5PSIwLjQiLz48cmVjdCB4PSIxNjAiIHk9IjQ4IiB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHJ4PSI0IiBmaWxsPSIjNEE1QTZBIiBvcGFjaXR5PSIwLjQiLz48cmVjdCB4PSIyMzAiIHk9IjQ4IiB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHJ4PSI0IiBmaWxsPSIjNEE1QTZBIiBvcGFjaXR5PSIwLjQiLz48cmVjdCB4PSIzMDAiIHk9IjQ4IiB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHJ4PSI0IiBmaWxsPSIjNEE1QTZBIiBvcGFjaXR5PSIwLjQiLz48cmVjdCB4PSIzNzAiIHk9IjQ4IiB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHJ4PSI0IiBmaWxsPSIjNEE1QTZBIiBvcGFjaXR5PSIwLjQiLz48cmVjdCB4PSI0NDAiIHk9IjQ4IiB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHJ4PSI0IiBmaWxsPSIjNEE1QTZBIiBvcGFjaXR5PSIwLjQiLz48cmVjdCB4PSI1MTAiIHk9IjQ4IiB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHJ4PSI0IiBmaWxsPSIjNEE1QTZBIiBvcGFjaXR5PSIwLjQiLz48cmVjdCB4PSI1ODAiIHk9IjQ4IiB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHJ4PSI0IiBmaWxsPSIjNEE1QTZBIiBvcGFjaXR5PSIwLjQiLz48cmVjdCB4PSI2NTAiIHk9IjQ4IiB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHJ4PSI0IiBmaWxsPSIjNEE1QTZBIiBvcGFjaXR5PSIwLjQiLz48cmVjdCB4PSI3MjAiIHk9IjQ4IiB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHJ4PSI0IiBmaWxsPSIjNEE1QTZBIiBvcGFjaXR5PSIwLjQiLz48cmVjdCB4PSI3OTAiIHk9IjQ4IiB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHJ4PSI0IiBmaWxsPSIjNEE1QTZBIiBvcGFjaXR5PSIwLjQiLz48cmVjdCB4PSI4NjAiIHk9IjQ4IiB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHJ4PSI0IiBmaWxsPSIjNEE1QTZBIiBvcGFjaXR5PSIwLjQiLz48cmVjdCB4PSI5MzAiIHk9IjQ4IiB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHJ4PSI0IiBmaWxsPSIjNEE1QTZBIiBvcGFjaXR5PSIwLjQiLz48cmVjdCB4PSIxMDAwIiB5PSI0OCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjI0IiByeD0iNCIgZmlsbD0iIzRBNUE2QSIgb3BhY2l0eT0iMC40Ii8+PHJlY3QgeD0iMTA3MCIgeT0iNDgiIHdpZHRoPSI0MCIgaGVpZ2h0PSIyNCIgcng9IjQiIGZpbGw9IiM0QTVBNkEiIG9wYWNpdHk9IjAuNCIvPgogICAgPHJlY3QgeD0iOTAiIHk9IjYwMyIgd2lkdGg9IjQwIiBoZWlnaHQ9IjI0IiByeD0iNCIgZmlsbD0iIzRBNUE2QSIgb3BhY2l0eT0iMC40Ii8+PHJlY3QgeD0iMTYwIiB5PSI2MDMiIHdpZHRoPSI0MCIgaGVpZ2h0PSIyNCIgcng9IjQiIGZpbGw9IiM0QTVBNkEiIG9wYWNpdHk9IjAuNCIvPjxyZWN0IHg9IjIzMCIgeT0iNjAzIiB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHJ4PSI0IiBmaWxsPSIjNEE1QTZBIiBvcGFjaXR5PSIwLjQiLz48cmVjdCB4PSIzMDAiIHk9IjYwMyIgd2lkdGg9IjQwIiBoZWlnaHQ9IjI0IiByeD0iNCIgZmlsbD0iIzRBNUE2QSIgb3BhY2l0eT0iMC40Ii8+PHJlY3QgeD0iMzcwIiB5PSI2MDMiIHdpZHRoPSI0MCIgaGVpZ2h0PSIyNCIgcng9IjQiIGZpbGw9IiM0QTVBNkEiIG9wYWNpdHk9IjAuNCIvPjxyZWN0IHg9IjQ0MCIgeT0iNjAzIiB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHJ4PSI0IiBmaWxsPSIjNEE1QTZBIiBvcGFjaXR5PSIwLjQiLz48cmVjdCB4PSI1MTAiIHk9IjYwMyIgd2lkdGg9IjQwIiBoZWlnaHQ9IjI0IiByeD0iNCIgZmlsbD0iIzRBNUE2QSIgb3BhY2l0eT0iMC40Ii8+PHJlY3QgeD0iNTgwIiB5PSI2MDMiIHdpZHRoPSI0MCIgaGVpZ2h0PSIyNCIgcng9IjQiIGZpbGw9IiM0QTVBNkEiIG9wYWNpdHk9IjAuNCIvPjxyZWN0IHg9IjY1MCIgeT0iNjAzIiB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHJ4PSI0IiBmaWxsPSIjNEE1QTZBIiBvcGFjaXR5PSIwLjQiLz48cmVjdCB4PSI3MjAiIHk9IjYwMyIgd2lkdGg9IjQwIiBoZWlnaHQ9IjI0IiByeD0iNCIgZmlsbD0iIzRBNUE2QSIgb3BhY2l0eT0iMC40Ii8+PHJlY3QgeD0iNzkwIiB5PSI2MDMiIHdpZHRoPSI0MCIgaGVpZ2h0PSIyNCIgcng9IjQiIGZpbGw9IiM0QTVBNkEiIG9wYWNpdHk9IjAuNCIvPjxyZWN0IHg9Ijg2MCIgeT0iNjAzIiB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHJ4PSI0IiBmaWxsPSIjNEE1QTZBIiBvcGFjaXR5PSIwLjQiLz48cmVjdCB4PSI5MzAiIHk9IjYwMyIgd2lkdGg9IjQwIiBoZWlnaHQ9IjI0IiByeD0iNCIgZmlsbD0iIzRBNUE2QSIgb3BhY2l0eT0iMC40Ii8+PHJlY3QgeD0iMTAwMCIgeT0iNjAzIiB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHJ4PSI0IiBmaWxsPSIjNEE1QTZBIiBvcGFjaXR5PSIwLjQiLz48cmVjdCB4PSIxMDcwIiB5PSI2MDMiIHdpZHRoPSI0MCIgaGVpZ2h0PSIyNCIgcng9IjQiIGZpbGw9IiM0QTVBNkEiIG9wYWNpdHk9IjAuNCIvPgogIDwvZz4KICA8IS0tIENlbnRlciBhcnQ6IEJpcnRoZGF5IENha2UgYW5kIEJhbGxvb25zIC0tPgogIDxjaXJjbGUgY3g9IjYwMCIgY3k9IjMzNyIgcj0iMTYwIiBmaWxsPSIjRkZGRkZGIiBvcGFjaXR5PSIwLjg1Ii8+CiAgPHRleHQgeD0iNjAwIiB5PSIzMjAiIGZvbnQtc2l6ZT0iOTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPvCfjok8L3RleHQ+CiAgPHRleHQgeD0iNjAwIiB5PSI0MTAiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXdlaWdodD0iOTAwIiBmb250LXNpemU9IjMyIiBmaWxsPSIjNEE1QTZBIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5USEUgU1VSUFJJU0UgUkVWRUFMPC90ZXh0PgogIDx0ZXh0IHg9IjYwMCIgeT0iNDUwIiBmb250LWZhbWlseT0ic2VyaWYiIGZvbnQtc2l6ZT0iMjIiIGZvbnQtc3R5bGU9Iml0YWxpYyIgZmlsbD0iI0U0OEJCMCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+TWVtb3J5IEZpbG0g4oCiIENoYXB0ZXIgMTwvdGV4dD4KPC9zdmc+";
const videoPoster2 = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDY3NSIgd2lkdGg9IjEyMDAiIGhlaWdodD0iNjc1Ij4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0idnAyIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI0ZGRTlCOCIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iI0Y5QzhEOSIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNEQ0Q0RjIiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjY3NSIgZmlsbD0idXJsKCN2cDIpIi8+CiAgPCEtLSBEZWNvcmF0aXZlIGZpbG0gZnJhbWVzIC0tPgogIDxnIGZpbGw9IiNGRkZGRkYiIG9wYWNpdHk9IjAuMzUiPgogICAgPHJlY3QgeD0iNjAiIHk9IjQwIiB3aWR0aD0iMTA4MCIgaGVpZ2h0PSI0MCIgcng9IjYiLz4KICAgIDxyZWN0IHg9IjYwIiB5PSI1OTUiIHdpZHRoPSIxMDgwIiBoZWlnaHQ9IjQwIiByeD0iNiIvPgogICAgPHJlY3QgeD0iOTAiIHk9IjQ4IiB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHJ4PSI0IiBmaWxsPSIjNEE1QTZBIiBvcGFjaXR5PSIwLjQiLz48cmVjdCB4PSIxNjAiIHk9IjQ4IiB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHJ4PSI0IiBmaWxsPSIjNEE1QTZBIiBvcGFjaXR5PSIwLjQiLz48cmVjdCB4PSIyMzAiIHk9IjQ4IiB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHJ4PSI0IiBmaWxsPSIjNEE1QTZBIiBvcGFjaXR5PSIwLjQiLz48cmVjdCB4PSIzMDAiIHk9IjQ4IiB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHJ4PSI0IiBmaWxsPSIjNEE1QTZBIiBvcGFjaXR5PSIwLjQiLz48cmVjdCB4PSIzNzAiIHk9IjQ4IiB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHJ4PSI0IiBmaWxsPSIjNEE1QTZBIiBvcGFjaXR5PSIwLjQiLz48cmVjdCB4PSI0NDAiIHk9IjQ4IiB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHJ4PSI0IiBmaWxsPSIjNEE1QTZBIiBvcGFjaXR5PSIwLjQiLz48cmVjdCB4PSI1MTAiIHk9IjQ4IiB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHJ4PSI0IiBmaWxsPSIjNEE1QTZBIiBvcGFjaXR5PSIwLjQiLz48cmVjdCB4PSI1ODAiIHk9IjQ4IiB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHJ4PSI0IiBmaWxsPSIjNEE1QTZBIiBvcGFjaXR5PSIwLjQiLz48cmVjdCB4PSI2NTAiIHk9IjQ4IiB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHJ4PSI0IiBmaWxsPSIjNEE1QTZBIiBvcGFjaXR5PSIwLjQiLz48cmVjdCB4PSI3MjAiIHk9IjQ4IiB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHJ4PSI0IiBmaWxsPSIjNEE1QTZBIiBvcGFjaXR5PSIwLjQiLz48cmVjdCB4PSI3OTAiIHk9IjQ4IiB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHJ4PSI0IiBmaWxsPSIjNEE1QTZBIiBvcGFjaXR5PSIwLjQiLz48cmVjdCB4PSI4NjAiIHk9IjQ4IiB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHJ4PSI0IiBmaWxsPSIjNEE1QTZBIiBvcGFjaXR5PSIwLjQiLz48cmVjdCB4PSI5MzAiIHk9IjQ4IiB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHJ4PSI0IiBmaWxsPSIjNEE1QTZBIiBvcGFjaXR5PSIwLjQiLz48cmVjdCB4PSIxMDAwIiB5PSI0OCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjI0IiByeD0iNCIgZmlsbD0iIzRBNUE2QSIgb3BhY2l0eT0iMC40Ii8+PHJlY3QgeD0iMTA3MCIgeT0iNDgiIHdpZHRoPSI0MCIgaGVpZ2h0PSIyNCIgcng9IjQiIGZpbGw9IiM0QTVBNkEiIG9wYWNpdHk9IjAuNCIvPgogICAgPHJlY3QgeD0iOTAiIHk9IjYwMyIgd2lkdGg9IjQwIiBoZWlnaHQ9IjI0IiByeD0iNCIgZmlsbD0iIzRBNUE2QSIgb3BhY2l0eT0iMC40Ii8+PHJlY3QgeD0iMTYwIiB5PSI2MDMiIHdpZHRoPSI0MCIgaGVpZ2h0PSIyNCIgcng9IjQiIGZpbGw9IiM0QTVBNkEiIG9wYWNpdHk9IjAuNCIvPjxyZWN0IHg9IjIzMCIgeT0iNjAzIiB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHJ4PSI0IiBmaWxsPSIjNEE1QTZBIiBvcGFjaXR5PSIwLjQiLz48cmVjdCB4PSIzMDAiIHk9IjYwMyIgd2lkdGg9IjQwIiBoZWlnaHQ9IjI0IiByeD0iNCIgZmlsbD0iIzRBNUE2QSIgb3BhY2l0eT0iMC40Ii8+PHJlY3QgeD0iMzcwIiB5PSI2MDMiIHdpZHRoPSI0MCIgaGVpZ2h0PSIyNCIgcng9IjQiIGZpbGw9IiM0QTVBNkEiIG9wYWNpdHk9IjAuNCIvPjxyZWN0IHg9IjQ0MCIgeT0iNjAzIiB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHJ4PSI0IiBmaWxsPSIjNEE1QTZBIiBvcGFjaXR5PSIwLjQiLz48cmVjdCB4PSI1MTAiIHk9IjYwMyIgd2lkdGg9IjQwIiBoZWlnaHQ9IjI0IiByeD0iNCIgZmlsbD0iIzRBNUE2QSIgb3BhY2l0eT0iMC40Ii8+PHJlY3QgeD0iNTgwIiB5PSI2MDMiIHdpZHRoPSI0MCIgaGVpZ2h0PSIyNCIgcng9IjQiIGZpbGw9IiM0QTVBNkEiIG9wYWNpdHk9IjAuNCIvPjxyZWN0IHg9IjY1MCIgeT0iNjAzIiB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHJ4PSI0IiBmaWxsPSIjNEE1QTZBIiBvcGFjaXR5PSIwLjQiLz48cmVjdCB4PSI3MjAiIHk9IjYwMyIgd2lkdGg9IjQwIiBoZWlnaHQ9IjI0IiByeD0iNCIgZmlsbD0iIzRBNUE2QSIgb3BhY2l0eT0iMC40Ii8+PHJlY3QgeD0iNzkwIiB5PSI2MDMiIHdpZHRoPSI0MCIgaGVpZ2h0PSIyNCIgcng9IjQiIGZpbGw9IiM0QTVBNkEiIG9wYWNpdHk9IjAuNCIvPjxyZWN0IHg9Ijg2MCIgeT0iNjAzIiB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHJ4PSI0IiBmaWxsPSIjNEE1QTZBIiBvcGFjaXR5PSIwLjQiLz48cmVjdCB4PSI5MzAiIHk9IjYwMyIgd2lkdGg9IjQwIiBoZWlnaHQ9IjI0IiByeD0iNCIgZmlsbD0iIzRBNUE2QSIgb3BhY2l0eT0iMC40Ii8+PHJlY3QgeD0iMTAwMCIgeT0iNjAzIiB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHJ4PSI0IiBmaWxsPSIjNEE1QTZBIiBvcGFjaXR5PSIwLjQiLz48cmVjdCB4PSIxMDcwIiB5PSI2MDMiIHdpZHRoPSI0MCIgaGVpZ2h0PSIyNCIgcng9IjQiIGZpbGw9IiM0QTVBNkEiIG9wYWNpdHk9IjAuNCIvPgogIDwvZz4KICA8IS0tIENlbnRlciBhcnQgLS0+CiAgPGNpcmNsZSBjeD0iNjAwIiBjeT0iMzM3IiByPSIxNjAiIGZpbGw9IiNGRkZGRkYiIG9wYWNpdHk9IjAuODUiLz4KICA8dGV4dCB4PSI2MDAiIHk9IjMyMCIgZm9udC1zaXplPSI5MCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+4pyoPC90ZXh0PgogIDx0ZXh0IHg9IjYwMCIgeT0iNDEwIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC13ZWlnaHQ9IjkwMCIgZm9udC1zaXplPSIzMiIgZmlsbD0iIzRBNUE2QSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+TEFVR0hURVIgJmFtcDsgQkFMTE9PTlM8L3RleHQ+CiAgPHRleHQgeD0iNjAwIiB5PSI0NTAiIGZvbnQtZmFtaWx5PSJzZXJpZiIgZm9udC1zaXplPSIyMiIgZm9udC1zdHlsZT0iaXRhbGljIiBmaWxsPSIjNkZBOEQ2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5NZW1vcnkgRmlsbSDigKIgQ2hhcHRlciAyPC90ZXh0Pgo8L3N2Zz4=";
const birthday = {
  /* ---------------------------------------------------------------- 01 WHO */
  recipient: {
    name: "Sri Lakshmi",
    nickname: "Sunshine",
    from: "Me",
    tagline: "the softest, loudest, most wonderful person I know"
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
    minute: 0
  },
  /* -------------------------------------------------------- 03 PASSWORD */
  /** Playful client-side gate (letters: m-y-l-o-v-e) */
  password: "mylove",
  passwordHint: "six lowercase letters — for my favorite person",
  /* ------------------------------------------------------- 04 COUNTDOWN */
  countdown: {
    kicker: "a little surprise is being wrapped…",
    heading: "Someone special has a surprise waiting…",
    message: "Shhh. Come back a little closer. Something tiny, silly and extremely heartfelt is hidden behind this screen.",
    birthdayTodayHeading: "IT'S TODAY!",
    birthdayTodayMessage: "No more waiting. The candles are lit, the cake is frosted and I have been rehearsing my speech. Ready?",
    earlyLabel: "open early (I won't tell)",
    unitLabels: { days: "days", hours: "hours", minutes: "minutes", seconds: "seconds" }
  },
  /* -------------------------------------------------------- 05 CANDLES */
  candles: {
    count: 5,
    heading: "Make a wish, then blow!",
    hint: "Tap the mic button and gently blow into your phone — or press the button below.",
    micDenied: "No mic access? No problem at all — use the button instead.",
    wishPrompt: "Close your eyes… think of something impossible…",
    afterBlow: "Your wish is officially in the mail. 💌"
  },
  /* ---------------------------------------------------- 06 CELEBRATION */
  celebration: {
    headline: "HAPPY BIRTHDAY",
    message: "You make ordinary days taste like frosting. Here's to another year of your laugh, your terrible puns and the way you make every room softer.",
    signature: "with all my love,",
    subline: "may this year be gentle with you"
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
      "Happy birthday, sunshine. I'm so glad you were born, and I'm even gladder that I get to be around for it."
    ],
    signoff: "Yours, entirely and always,",
    signature: "Me 🤍",
    postscript: "P.S. There are 12 personalized surprises further down. Don't skip them, they took ages."
  },
  /* -------------------------------------------------------- 08 POLAROIDS (EXACTLY 4) */
  gallery: [
    {
      id: "g1",
      src: memory01,
      caption: "Our First Moments",
      note: "Two cups, one window seat, and three hours that felt like ten minutes. Where it all began.",
      date: "Special Memory 01",
      rotate: -2.5
    },
    {
      id: "g2",
      src: memory02,
      caption: "Laughter & Warmth",
      note: "Your bright smile makes every single ordinary day extraordinary.",
      date: "Special Memory 02",
      rotate: 2
    },
    {
      id: "g3",
      src: memory03,
      caption: "The Shoreline Sunset",
      note: "Cold feet, warm everything else. Unforgettable memories with you.",
      date: "Special Memory 03",
      rotate: -2
    },
    {
      id: "g4",
      src: memory04,
      caption: "Forever & Always",
      note: "Grateful for your presence in my life, today and every single day.",
      date: "Special Memory 04",
      rotate: 2.5
    }
  ],
  /* ----------------------------------------------- 09 TWELVE PERSONALIZED SURPRISES */
  /** EXACTLY 12 CARDS — Each card follows: 1. Item Name, 2. Image, 3. Subtitle, 4. Full Message */
  surprises: [
    {
      id: "s1",
      number: 1,
      itemName: "ROSE 🌹",
      subtitle: "First Impression & Smile",
      description: "Flowers anni beautiful ga untayi, kani konni flowers chusthe special people gurthostharu. Ee rose chusinappudalla nee smile gurthuraavali.",
      image: gift01Rose,
      palette: "pink",
      title: "First Impression & Smile",
      message: "Flowers anni beautiful ga untayi, kani konni flowers chusthe special people gurthostharu. Ee rose chusinappudalla nee smile gurthuraavali."
    },
    {
      id: "s2",
      number: 2,
      itemName: "CHOCOLATES 🍫",
      subtitle: "Sweetness in Life",
      description: "Life lo konni moments bitter ga untayi. Appudu ee chocolates thini, life lo sweetness inka chaala undhani gurthupettuko.",
      image: gift02Chocolates,
      palette: "butter",
      title: "Sweetness in Life",
      message: "Life lo konni moments bitter ga untayi. Appudu ee chocolates thini, life lo sweetness inka chaala undhani gurthupettuko."
    },
    {
      id: "s3",
      number: 3,
      itemName: "BOW HAIR PINS 🎀",
      subtitle: "Cute Little You",
      description: "Nee hair ki oka cute bow, nee smile ki oka extra glow. Nuvvu already cute eh, inkonchem cute cheyyadaniki ee small gift.",
      image: gift03BowHairpins,
      palette: "pink",
      title: "Cute Little You",
      message: "Nee hair ki oka cute bow, nee smile ki oka extra glow. Nuvvu already cute eh, inkonchem cute cheyyadaniki ee small gift."
    },
    {
      id: "s4",
      number: 4,
      itemName: "COFFEE CUP ☕",
      subtitle: "Beautiful Mornings",
      description: "Prathi morning coffee tho start avuthundi. Alage nee day kuda oka beautiful smile tho start avvali. Ee cup tho paatu mana conversations kuda gurthuraavali.",
      image: gift04CoffeeCup,
      palette: "blue",
      title: "Beautiful Mornings",
      message: "Prathi morning coffee tho start avuthundi. Alage nee day kuda oka beautiful smile tho start avvali. Ee cup tho paatu mana conversations kuda gurthuraavali."
    },
    {
      id: "s5",
      number: 5,
      itemName: "TULIP BRACELET 🌷",
      subtitle: "Our Bond",
      description: "Ee bracelet nee hand lo untundi, kani deeni venaka unna affection nee heart lo undalani. Just like this bracelet, mana bond kuda eppudu nee tho undali.",
      image: gift05TulipBracelet,
      palette: "lavender",
      title: "Our Bond",
      message: "Ee bracelet nee hand lo untundi, kani deeni venaka unna affection nee heart lo undalani. Just like this bracelet, mana bond kuda eppudu nee tho undali."
    },
    {
      id: "s6",
      number: 6,
      itemName: "POKA TREE 🌱",
      subtitle: "Growing Together",
      description: "Chettu perigina prathi roju kottha leaves vasthayi. Alage mana Bond kuda roju roju ki inka beautiful ga grow avvali. Enni seasons maarina, mana bond strong ga undali.",
      image: gift06PokaTree,
      palette: "mint",
      title: "Growing Together",
      message: "Chettu perigina prathi roju kottha leaves vasthayi. Alage mana Bond kuda roju roju ki inka beautiful ga grow avvali. Enni seasons maarina, mana bond strong ga undali."
    },
    {
      id: "s7",
      number: 7,
      itemName: "RINGS 💍",
      subtitle: "An Endless Bond",
      description: "Ring ki starting, ending undochu. Kani mana Bond ki matram ending ane word undakudadhu. Ee ring chusinappudalla oka special bond gurthuraavali.",
      image: gift07Rings,
      palette: "lavender",
      title: "An Endless Bond",
      message: "Ring ki starting, ending undochu. Kani mana Bond ki matram ending ane word undakudadhu. Ee ring chusinappudalla oka special bond gurthuraavali."
    },
    {
      id: "s8",
      number: 8,
      itemName: "PENDANT ✨",
      subtitle: "A Beautiful Memory",
      description: "Konni gifts just accessories, konni gifts memories. Ee pendant oka accessory ga kaakunda, nee life lo oka small beautiful memory ga undipovali.",
      image: gift08Pendant,
      palette: "butter",
      title: "A Beautiful Memory",
      message: "Konni gifts just accessories, konni gifts memories. Ee pendant oka accessory ga kaakunda, nee life lo oka small beautiful memory ga undipovali."
    },
    {
      id: "s9",
      number: 9,
      itemName: "LITTLE LIGHTING PANDA 🐼",
      subtitle: "A Little Light for You",
      description: "Konni lights room ni bright chestayi… konni lights mana heart ni bright chestayi. Ee chinna Panda nee life lo alanti oka light la undali. Eppudaina nuvvu dull ga feel ayina, deenini chusi smile cheyyali… endukante nee smile kanna beautiful light inkoti ledhu. ✨",
      image: gift09LightingPanda,
      palette: "blue",
      title: "A Little Light for You",
      message: "Konni lights room ni bright chestayi… konni lights mana heart ni bright chestayi. Ee chinna Panda nee life lo alanti oka light la undali. Eppudaina nuvvu dull ga feel ayina, deenini chusi smile cheyyali… endukante nee smile kanna beautiful light inkoti ledhu. ✨"
    },
    {
      id: "s10",
      number: 10,
      itemName: "3D SOLAR SYSTEM 🪐",
      subtitle: "You Are My Universe",
      description: "Ee universe lo enno planets, stars unna… prathi okkati daani own beauty tho shine avuthundi. Alage nuvvu kuda evaritho compare cheskokunda, nee own way lo shine avvali. Nuvvu reach avvalsina dreams entha distant ga unna, nee journey ni beautiful ga enjoy chesthu munduku vellali. 🌌",
      image: gift10SolarSystem,
      palette: "lavender",
      title: "You Are My Universe",
      message: "Ee universe lo enno planets, stars unna… prathi okkati daani own beauty tho shine avuthundi. Alage nuvvu kuda evaritho compare cheskokunda, nee own way lo shine avvali. Nuvvu reach avvalsina dreams entha distant ga unna, nee journey ni beautiful ga enjoy chesthu munduku vellali. 🌌"
    },
    {
      id: "s11",
      number: 11,
      itemName: "THINGS I LOVE ABOUT YOU 💌",
      subtitle: "The Most Personal Gift",
      description: "Neelo naaku nachina vishayalu count cheyyadam start chesthe, pages saripovu. Anduke konni reasons ikkada raasanu. Maybe neeku teliyani nee beautiful side ni neeku chupinchadaniki.",
      image: gift11LoveNotes,
      palette: "pink",
      title: "The Most Personal Gift",
      message: "Neelo naaku nachina vishayalu count cheyyadam start chesthe, pages saripovu. Anduke konni reasons ikkada raasanu. Maybe neeku teliyani nee beautiful side ni neeku chupinchadaniki."
    },
    {
      id: "s12",
      number: 12,
      itemName: "BIRTHDAY DATE CURRENCY 💵",
      subtitle: "The Final Special Gift",
      description: "Ee currency lo nee birthday date undhi. Money value time tho maarochu, kani ee date value matram naaku eppatiki special. Because this is the day someone as beautiful as you came into this world.",
      image: gift12BirthdayCurrency,
      palette: "mint",
      title: "The Final Special Gift",
      message: "Ee currency lo nee birthday date undhi. Money value time tho maarochu, kani ee date value matram naaku eppatiki special. Because this is the day someone as beautiful as you came into this world."
    }
  ],
  /* ---------------------------------------------------------- 10 GIFT */
  gift: {
    heading: "One more thing…",
    teaser: "A box with your name on it",
    tapLabel: "Tap to open",
    revealTitle: "It's a whole day, just for you",
    message: "Inside this box is a promise: one entire day this year that is completely yours. You choose everything — where, when, what we eat, how loud the playlist is. I'll handle the rest. No taking turns, no negotiating, no 'whatever you want'.",
    image: giftImg,
    afterLabel: "reopen the box"
  },
  /* --------------------------------------------------------- 11 MUSIC (TWO SAMPLE SONGS) */
  music: {
    songs: [
      {
        id: "song-1",
        title: "Happy Birthday Music Box",
        artist: "Handmade Music Box Melody",
        src: "/assets/music/sample-song-01.mp3",
        durationLabel: "looping melody"
      },
      {
        id: "song-2",
        title: "Soft Acoustic Serenade",
        artist: "Birthday Acoustic Box",
        src: "/assets/music/sample-song-02.mp3",
        durationLabel: "gentle loop"
      }
    ],
    note: "Replace with your own MP3 files in public/assets/music/"
  },
  /* -------------------------------------------------------- 12 VIDEOS (EXACTLY TWO) */
  videos: [
    {
      id: "v1",
      title: "The Surprise Reveal",
      caption: "The moment everything started — your face was priceless.",
      src: "/assets/videos/sample-video-01.mp4",
      remoteSrc: "https://videos.pexels.com/video-files/7600583/7600583-hd_1920_1080_25fps.mp4",
      poster: videoPoster1
    },
    {
      id: "v2",
      title: "Laughter & Midnight Cake",
      caption: "Holding far too many balloons and laughing uncontrollably.",
      src: "/assets/videos/sample-video-02.mp4",
      remoteSrc: "https://videos.pexels.com/video-files/7119631/7119631-hd_1920_1080_25fps.mp4",
      poster: videoPoster2
    }
  ],
  /* ------------------------------------------------------ 13 MEMORY MAP */
  memoryMap: [
    { id: "m1", name: "The Café Corner", emoji: "☕", x: 14, y: 62, image: memory01, caption: "Where the first conversation ran three hours long.", message: "You ordered the same thing twice and pretended it was a coincidence." },
    { id: "m2", name: "Picnic Hill", emoji: "🧺", x: 34, y: 38, image: memory02, caption: "Peach-coloured sky, wind everywhere.", message: "You said 'we should do this more often'. We said it four more times that year." },
    { id: "m3", name: "The Shoreline", emoji: "🐚", x: 55, y: 70, image: memory03, caption: "Cold feet, warm everything else.", message: "Forty-one shells. We left the forty-first because it was 'too pretty to take'." },
    { id: "m4", name: "The Fair", emoji: "🎡", x: 74, y: 44, image: memory04, caption: "Lights, sugar, and one brave ferris wheel.", message: "You held my sleeve the entire ride and denied it immediately afterwards." },
    { id: "m5", name: "The Long Road", emoji: "🚐", x: 89, y: 66, image: memory01, caption: "Wrong turn, best day.", message: "No signal, one shared bag of crisps, and a playlist made entirely of your favourites." }
  ]
};
function Flower({ size = 28, petal = "#F9C8D9", center = "#FFE9B8", style, className }) {
  return /* @__PURE__ */ jsxs("svg", { width: size, height: size, viewBox: "0 0 32 32", style, className, "aria-hidden": "true", children: [
    [0, 60, 120, 180, 240, 300].map((a) => /* @__PURE__ */ jsx("ellipse", { cx: "16", cy: "8.5", rx: "5", ry: "7.5", fill: petal, transform: `rotate(${a} 16 16)` }, a)),
    /* @__PURE__ */ jsx("circle", { cx: "16", cy: "16", r: "5", fill: center }),
    /* @__PURE__ */ jsx("circle", { cx: "16", cy: "16", r: "2", fill: "#fff", opacity: "0.7" })
  ] });
}
function Heart({ size = 22, color = "#E48BB0", style, className }) {
  return /* @__PURE__ */ jsx("svg", { width: size, height: size, viewBox: "0 0 24 24", style, className, "aria-hidden": "true", children: /* @__PURE__ */ jsx(
    "path",
    {
      d: "M12 21s-7.5-4.7-9.3-9.2C1.2 8.1 3.4 4.6 7 4.6c2.1 0 3.7 1.2 5 3 1.3-1.8 2.9-3 5-3 3.6 0 5.8 3.5 4.3 7.2C19.5 16.3 12 21 12 21z",
      fill: color
    }
  ) });
}
function Balloon({ size = 40, color = "#BBDFF5", style, className }) {
  return /* @__PURE__ */ jsxs("svg", { width: size, height: size * 1.35, viewBox: "0 0 32 44", style, className, "aria-hidden": "true", children: [
    /* @__PURE__ */ jsx("ellipse", { cx: "16", cy: "14", rx: "12", ry: "14", fill: color }),
    /* @__PURE__ */ jsx("ellipse", { cx: "12", cy: "10", rx: "3.4", ry: "4.6", fill: "#fff", opacity: "0.55" }),
    /* @__PURE__ */ jsx("path", { d: "M16 28c-1.6 1.8-1.6 3 0 4 1.6-1 1.6-2.2 0-4z", fill: color }),
    /* @__PURE__ */ jsx("path", { d: "M16 32c-2 5 2 8-1 12", stroke: color, strokeWidth: "1.2", fill: "none", strokeLinecap: "round" })
  ] });
}
function Star({ size = 20, color = "#FFE9B8", style, className }) {
  return /* @__PURE__ */ jsx("svg", { width: size, height: size, viewBox: "0 0 24 24", style, className, "aria-hidden": "true", children: /* @__PURE__ */ jsx(
    "path",
    {
      d: "M12 2.5l2.6 6.1 6.6.5-5 4.3 1.6 6.4L12 16.4 6.2 19.8l1.6-6.4-5-4.3 6.6-.5z",
      fill: color
    }
  ) });
}
function Sparkle({ size = 16, color = "#fff", style, className }) {
  return /* @__PURE__ */ jsx("svg", { width: size, height: size, viewBox: "0 0 24 24", style, className, "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M12 1l2 8.2L22 12l-8 2.8L12 23l-2-8.2L2 12l8-2.8z", fill: color, opacity: "0.85" }) });
}
function Sun({ size = 40, style, className }) {
  return /* @__PURE__ */ jsxs("svg", { width: size, height: size, viewBox: "0 0 48 48", style, className, "aria-hidden": "true", children: [
    Array.from({ length: 12 }).map((_, i) => /* @__PURE__ */ jsx("rect", { x: "23", y: "2", width: "2.4", height: "8", rx: "1.2", fill: "#FFE9B8", transform: `rotate(${i * 30} 24 24)` }, i)),
    /* @__PURE__ */ jsx("circle", { cx: "24", cy: "24", r: "11", fill: "#FFDD86" }),
    /* @__PURE__ */ jsx("circle", { cx: "24", cy: "24", r: "8", fill: "#FFF3C4" })
  ] });
}
function Butterfly({ size = 26, color = "#DCD4F2", style, className }) {
  return /* @__PURE__ */ jsxs("svg", { width: size, height: size, viewBox: "0 0 32 32", style, className, "aria-hidden": "true", children: [
    /* @__PURE__ */ jsx("ellipse", { cx: "9", cy: "13", rx: "7", ry: "9", fill: color, transform: "rotate(-16 9 13)" }),
    /* @__PURE__ */ jsx("ellipse", { cx: "23", cy: "13", rx: "7", ry: "9", fill: color, transform: "rotate(16 23 13)" }),
    /* @__PURE__ */ jsx("ellipse", { cx: "11", cy: "23", rx: "4.5", ry: "5.5", fill: color, opacity: "0.75", transform: "rotate(-24 11 23)" }),
    /* @__PURE__ */ jsx("ellipse", { cx: "21", cy: "23", rx: "4.5", ry: "5.5", fill: color, opacity: "0.75", transform: "rotate(24 21 23)" }),
    /* @__PURE__ */ jsx("rect", { x: "15", y: "8", width: "2", height: "18", rx: "1", fill: "#4A5A6A", opacity: "0.45" }),
    /* @__PURE__ */ jsx("path", { d: "M15 9c-2-3-4-4-6-4M17 9c2-3 4-4 6-4", stroke: "#4A5A6A", strokeWidth: "1", fill: "none", opacity: "0.5" })
  ] });
}
function Bow({ size = 34, color = "#F9C8D9", style, className }) {
  return /* @__PURE__ */ jsxs("svg", { width: size, height: size * 0.7, viewBox: "0 0 44 32", style, className, "aria-hidden": "true", children: [
    /* @__PURE__ */ jsx("path", { d: "M22 16C14 6 4 6 4 14s8 10 18 2z", fill: color }),
    /* @__PURE__ */ jsx("path", { d: "M22 16c8-10 18-10 18-2s-8 10-18 2z", fill: color }),
    /* @__PURE__ */ jsx("path", { d: "M22 16c-4 6-6 9-7 13M22 16c4 6 6 9 7 13", stroke: color, strokeWidth: "3.4", strokeLinecap: "round", fill: "none" }),
    /* @__PURE__ */ jsx("circle", { cx: "22", cy: "15", r: "4.2", fill: "#fff", opacity: "0.45" })
  ] });
}
function Leaf({ size = 22, color = "#C9EBDD", style, className }) {
  return /* @__PURE__ */ jsxs("svg", { width: size, height: size, viewBox: "0 0 24 24", style, className, "aria-hidden": "true", children: [
    /* @__PURE__ */ jsx("path", { d: "M4 20C4 9 12 3 21 3c0 9-6 17-17 17z", fill: color }),
    /* @__PURE__ */ jsx("path", { d: "M6 19C9 14 13 10 19 6", stroke: "#fff", strokeWidth: "1.2", fill: "none", opacity: "0.6" })
  ] });
}
function Cloud({ size = 54, color = "#fff", style, className }) {
  return /* @__PURE__ */ jsx("svg", { width: size, height: size * 0.62, viewBox: "0 0 64 40", style, className, "aria-hidden": "true", children: /* @__PURE__ */ jsx(
    "path",
    {
      d: "M16 34h30c8 0 12-5 12-11s-5-11-12-11c-2-7-9-11-16-9S19 8 19 8c-7 0-12 5-12 11s5 15 9 15z",
      fill: color,
      opacity: "0.85"
    }
  ) });
}
function Note({ size = 20, color = "#E48BB0", style, className }) {
  return /* @__PURE__ */ jsx("svg", { width: size, height: size, viewBox: "0 0 24 24", style, className, "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M9 18.5a2.5 2.5 0 1 1-2-2.45V6.2l10-2.2v10.2a2.6 2.6 0 1 1-2-2.45V6.6L9 8.4z", fill: color }) });
}
function Flourish({ className = "", color = "#6FA8D6" }) {
  return /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 220 20", className, "aria-hidden": "true", height: "18", fill: "none", children: [
    /* @__PURE__ */ jsx("path", { d: "M4 10h70", stroke: color, strokeWidth: "2", strokeLinecap: "round", opacity: "0.5" }),
    /* @__PURE__ */ jsx("path", { d: "M146 10h70", stroke: color, strokeWidth: "2", strokeLinecap: "round", opacity: "0.5" }),
    /* @__PURE__ */ jsx("path", { d: "M110 3c6 4 6 10 0 14-6-4-6-10 0-14z", fill: color, opacity: "0.75" }),
    /* @__PURE__ */ jsx("circle", { cx: "88", cy: "10", r: "3", fill: color, opacity: "0.5" }),
    /* @__PURE__ */ jsx("circle", { cx: "132", cy: "10", r: "3", fill: color, opacity: "0.5" })
  ] });
}
const PALETTES = {
  blue: { bg: "#DCEEFB", edge: "#6FA8D6", accent: "#8EC3E6" },
  pink: { bg: "#FDE7F0", edge: "#E48BB0", accent: "#F9C8D9" },
  lavender: { bg: "#EFEAFF", edge: "#A48FD0", accent: "#DCD4F2" },
  mint: { bg: "#E4F7EF", edge: "#6FBFA0", accent: "#C9EBDD" },
  butter: { bg: "#FFF6DF", edge: "#D9A94B", accent: "#FFE9B8" }
};
let ctx = null;
let master = null;
let muted = false;
function ensure() {
  if (typeof window === "undefined") return null;
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    if (!ctx) {
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 0.5;
      master.connect(ctx.destination);
    }
    if (ctx.state === "suspended") ctx.resume().catch(() => {
    });
    return ctx;
  } catch {
    return null;
  }
}
function tone({ freq = 440, dur = 0.25, type = "sine", gain = 0.3, delay = 0, slide = 0 }) {
  const c = ensure();
  if (!c || muted) return;
  try {
    const t0 = c.currentTime + delay;
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (slide) osc.frequency.exponentialRampToValueAtTime(Math.max(40, freq + slide), t0 + dur);
    g.gain.setValueAtTime(1e-4, t0);
    g.gain.exponentialRampToValueAtTime(gain, t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(1e-4, t0 + dur);
    osc.connect(g).connect(master);
    osc.start(t0);
    osc.stop(t0 + dur + 0.05);
  } catch {
  }
}
function noise({ dur = 0.4, gain = 0.18, delay = 0, filterFreq = 900 }) {
  const c = ensure();
  if (!c || muted) return;
  try {
    const t0 = c.currentTime + delay;
    const frames = Math.floor(c.sampleRate * dur);
    const buffer = c.createBuffer(1, frames, c.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < frames; i += 1) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / frames);
    }
    const src = c.createBufferSource();
    src.buffer = buffer;
    const bp = c.createBiquadFilter();
    bp.type = "lowpass";
    bp.frequency.value = filterFreq;
    const g = c.createGain();
    g.gain.value = gain;
    src.connect(bp).connect(g).connect(master);
    src.start(t0);
  } catch {
  }
}
const sfx = {
  unlockKeys: () => [0, 4, 7, 12, 16].forEach((s, i) => tone({ freq: 523.25 * Math.pow(2, s / 12), dur: 0.5, gain: 0.22, delay: i * 0.09 })),
  wrong: () => {
    tone({ freq: 220, dur: 0.18, type: "square", gain: 0.14 });
    tone({ freq: 165, dur: 0.26, type: "square", gain: 0.12, delay: 0.14 });
  },
  key: () => tone({ freq: 880, dur: 0.07, type: "triangle", gain: 0.16 }),
  puff: () => noise({ dur: 0.5, gain: 0.3, filterFreq: 620 }),
  candleOut: () => {
    noise({ dur: 0.35, gain: 0.22, filterFreq: 500 });
    tone({ freq: 320, dur: 0.18, type: "sine", gain: 0.1, slide: -180 });
  },
  pop: () => tone({ freq: 620, dur: 0.14, type: "triangle", gain: 0.24, slide: 260 }),
  cut: () => {
    noise({ dur: 0.22, gain: 0.14, filterFreq: 2400 });
    tone({ freq: 440, dur: 0.12, type: "sine", gain: 0.12 });
  },
  chime: () => [784, 988, 1175].forEach((f, i) => tone({ freq: f, dur: 0.7, gain: 0.16, delay: i * 0.08 })),
  party: () => {
    tone({ freq: 300, dur: 0.5, type: "sawtooth", gain: 0.12, slide: 500 });
    tone({ freq: 900, dur: 0.35, type: "square", gain: 0.08, delay: 0.12 });
  },
  sparkle: () => [1568, 1976, 2637].forEach((f, i) => tone({ freq: f, dur: 0.3, gain: 0.09, delay: i * 0.05 })),
  flip: () => noise({ dur: 0.14, gain: 0.1, filterFreq: 3200 }),
  open: () => [523, 659, 784, 1047].forEach((f, i) => tone({ freq: f, dur: 0.6, gain: 0.14, delay: i * 0.07 }))
};
function Unit({ value, label, palette }) {
  const shown = String(value).padStart(2, "0");
  return /* @__PURE__ */ jsxs("div", { className: "paper relative flex min-w-[62px] flex-col items-center px-2.5 py-2 sm:min-w-[84px] sm:px-4 sm:py-3.5 shadow-xs", children: [
    /* @__PURE__ */ jsx("div", { className: "relative h-[34px] w-full overflow-hidden sm:h-[48px]", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", initial: false, children: /* @__PURE__ */ jsx(
      motion.span,
      {
        initial: { y: 16, opacity: 0, rotate: -2 },
        animate: { y: 0, opacity: 1, rotate: 0 },
        exit: { y: -16, opacity: 0 },
        transition: { duration: 0.3, ease: "easeOut" },
        className: "absolute inset-0 flex items-center justify-center font-ui text-2xl font-bold tabular-nums sm:text-4xl",
        style: { color: palette },
        children: shown
      },
      shown
    ) }) }),
    /* @__PURE__ */ jsx("span", { className: "font-cute text-[11px] uppercase tracking-[0.16em] text-blue-deep/80 sm:text-xs", children: label }),
    /* @__PURE__ */ jsx("span", { className: "absolute -right-1 -top-1 h-3 w-3 rotate-45", style: { backgroundColor: `${palette}55` } })
  ] });
}
function Countdown({ onOpen, onSkip }) {
  const { days, hours, minutes, seconds, isBirthday, done, targetLabel } = useCountdown(birthday.date);
  const reduce = useReducedMotion();
  const [testUnlocked, setTestUnlocked] = useState(false);
  const palettes = ["#6FA8D6", "#E48BB0", "#A48FD0", "#D9A94B"];
  const isUnlocked = isBirthday || done || testUnlocked;
  const handleContinue = () => {
    sfx.pop();
    onOpen?.();
  };
  const handleSkip = () => {
    try {
      localStorage.setItem("bs:countdown-bypassed", "true");
    } catch {
    }
    sfx.pop();
    if (onSkip) {
      onSkip();
    } else {
      onOpen?.();
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-x-hidden px-4 py-4 sm:py-6 text-center", children: [
    /* @__PURE__ */ jsxs("div", { className: "pointer-events-none absolute inset-0", "aria-hidden": "true", children: [
      /* @__PURE__ */ jsx(Balloon, { className: "anim-float absolute left-[5%] top-[8%]", size: 30, color: "#F9C8D9" }),
      /* @__PURE__ */ jsx(Balloon, { className: "anim-float absolute right-[7%] top-[8%]", size: 26, color: "#BBDFF5", style: { animationDelay: "1.2s" } }),
      /* @__PURE__ */ jsx(Balloon, { className: "anim-float absolute right-[12%] bottom-[12%]", size: 34, color: "#DCD4F2", style: { animationDelay: "2.4s" } }),
      /* @__PURE__ */ jsx(Flower, { className: "anim-sway absolute left-[8%] bottom-[10%]", size: 26, petal: "#FFE9B8", center: "#F9C8D9" }),
      /* @__PURE__ */ jsx(Star, { className: "anim-twinkle absolute left-[20%] top-[6%]", size: 16, color: "#FFE9B8" }),
      /* @__PURE__ */ jsx(Sparkle, { className: "anim-twinkle absolute right-[22%] top-[18%]", size: 14, color: "#fff", style: { animationDelay: "0.8s" } })
    ] }),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: reduce ? false : { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: "easeOut" },
        className: "relative z-10 flex w-full max-w-2xl flex-col items-center",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "paper paper-dashed relative mb-3 w-full overflow-hidden p-4 sm:p-5 shadow-scrap", children: [
            /* @__PURE__ */ jsx(Heart, { className: "absolute -left-2 -top-2 rotate-[-12deg]", size: 24, color: "#F9C8D9" }),
            /* @__PURE__ */ jsx(Heart, { className: "absolute -right-2 bottom-3 rotate-[12deg]", size: 22, color: "#BBDFF5" }),
            /* @__PURE__ */ jsx("p", { className: "font-cute text-xs uppercase tracking-[0.2em] text-blue-deep/80 sm:text-sm", children: birthday.countdown.kicker }),
            /* @__PURE__ */ jsx("h1", { className: "mt-1 font-hand text-2xl leading-tight font-bold text-blue-ink sm:text-4xl", children: isUnlocked ? birthday.countdown.birthdayTodayHeading : birthday.countdown.heading }),
            /* @__PURE__ */ jsx("p", { className: "mx-auto mt-1.5 max-w-lg font-body text-xs text-blue-ink/80 sm:text-sm", children: isUnlocked ? birthday.countdown.birthdayTodayMessage : birthday.countdown.message }),
            /* @__PURE__ */ jsxs("div", { className: "relative mx-auto my-3 flex h-[160px] w-full max-w-[380px] items-center justify-center overflow-hidden rounded-2xl border-[3px] border-white bg-cream/40 shadow-scrap sm:h-[200px] sm:max-w-[420px]", children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: heroImg,
                  alt: "Birthday cake illustration with balloons",
                  className: "h-full w-full object-contain p-1"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "absolute inset-x-0 bottom-0 flex items-center justify-between bg-white/85 px-3 py-1 font-cute text-[11px] text-blue-ink backdrop-blur-xs", children: [
                /* @__PURE__ */ jsx("span", { children: "hand-drawn with love" }),
                /* @__PURE__ */ jsx(Cake, { size: 13, className: "text-pink-deep" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3", children: [
            /* @__PURE__ */ jsx(Unit, { value: days, label: birthday.countdown.unitLabels.days, palette: palettes[0] }),
            /* @__PURE__ */ jsx(Unit, { value: hours, label: birthday.countdown.unitLabels.hours, palette: palettes[1] }),
            /* @__PURE__ */ jsx(Unit, { value: minutes, label: birthday.countdown.unitLabels.minutes, palette: palettes[2] }),
            /* @__PURE__ */ jsx(Unit, { value: seconds, label: birthday.countdown.unitLabels.seconds, palette: palettes[3] })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "mt-2.5 font-hand text-base text-blue-ink/80 sm:text-lg", children: [
            "until ",
            targetLabel,
            " (IST)"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 flex w-full max-w-xs flex-col items-center gap-2.5", children: [
            isUnlocked ? /* @__PURE__ */ jsxs(
              motion.button,
              {
                type: "button",
                onClick: handleContinue,
                initial: { scale: 0.9, opacity: 0 },
                animate: { scale: 1, opacity: 1 },
                whileHover: { scale: 1.04 },
                whileTap: { scale: 0.95 },
                transition: { type: "spring", stiffness: 300, damping: 20 },
                className: "group inline-flex w-full items-center justify-center gap-2.5 rounded-full border-[3px] border-white bg-pink-deep px-8 py-3 font-cute text-lg font-bold text-white shadow-scrap-lg transition hover:bg-pink-deep/90 sm:text-xl cursor-pointer",
                "aria-label": "Continue to the birthday surprise",
                children: [
                  /* @__PURE__ */ jsx(PartyPopper, { size: 20, className: "transition group-hover:rotate-12" }),
                  "Continue",
                  /* @__PURE__ */ jsx(Sparkles, { size: 18 })
                ]
              }
            ) : /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                disabled: true,
                className: "inline-flex w-full items-center justify-center gap-2.5 rounded-full border-[3px] border-white/80 bg-pink-pastel/70 px-8 py-3 font-cute text-lg font-bold text-blue-deep/50 shadow-sm opacity-80 cursor-not-allowed sm:text-xl",
                "aria-disabled": "true",
                "aria-label": "Continue button disabled until birthday",
                children: [
                  /* @__PURE__ */ jsx(Lock, { size: 18, className: "opacity-60" }),
                  "Continue",
                  /* @__PURE__ */ jsx(Sparkles, { size: 16, className: "opacity-40" })
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              motion.button,
              {
                type: "button",
                onClick: handleSkip,
                whileHover: { scale: 1.03 },
                whileTap: { scale: 0.96 },
                className: "group inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-dashed border-pink-deep/60 bg-white/95 px-7 py-2.5 font-cute text-base font-bold text-pink-deep shadow-xs transition hover:border-pink-deep hover:bg-pink-pastel/60 active:scale-95 cursor-pointer",
                "aria-label": "Skip Countdown and enter password",
                children: /* @__PURE__ */ jsx("span", { children: "Skip Countdown →" })
              }
            ),
            !isUnlocked && /* @__PURE__ */ jsx("p", { className: "mt-0.5 font-cute text-xs text-blue-deep/75", children: "The surprise unlocks at midnight on 24 November 2026 IST 🤍" })
          ] })
        ]
      }
    )
  ] });
}
const ROWS = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
const MAX = 10;
function PasswordScreen({ onUnlock }) {
  const [entry, setEntry] = useState("");
  const [wrong, setWrong] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const reduce = useReducedMotion();
  const submit = useCallback(
    (value) => {
      if (value.toLowerCase() === birthday.password.toLowerCase()) {
        setUnlocked(true);
        sfx.unlockKeys();
        setTimeout(() => onUnlock?.(), 1500);
      } else {
        setWrong(true);
        sfx.wrong();
        setTimeout(() => {
          setWrong(false);
          setEntry("");
        }, 900);
      }
    },
    [onUnlock]
  );
  const press = (ch) => {
    if (unlocked || entry.length >= MAX) return;
    sfx.key();
    const next = entry + ch;
    setEntry(next);
    if (next.length >= birthday.password.length) setTimeout(() => submit(next), 220);
  };
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Backspace") {
        setEntry((v) => v.slice(0, -1));
        return;
      }
      if (e.key === "Enter") {
        submit(entry);
        return;
      }
      if (/^[a-zA-Z]$/.test(e.key)) press(e.key.toLowerCase());
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [entry, submit]);
  return /* @__PURE__ */ jsxs("div", { className: "relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden px-4 py-10", children: [
    /* @__PURE__ */ jsxs("div", { className: "pointer-events-none absolute inset-0", "aria-hidden": "true", children: [
      /* @__PURE__ */ jsx(Heart, { className: "anim-float absolute left-[12%] top-[16%]", size: 26, color: "#F9C8D9" }),
      /* @__PURE__ */ jsx(Heart, { className: "anim-float absolute right-[14%] top-[24%]", size: 20, color: "#BBDFF5", style: { animationDelay: "1.1s" } }),
      /* @__PURE__ */ jsx(Flower, { className: "anim-sway absolute left-[8%] bottom-[18%]", size: 28, petal: "#DCD4F2", center: "#FFE9B8" }),
      /* @__PURE__ */ jsx(Star, { className: "anim-twinkle absolute right-[10%] bottom-[24%]", size: 18, color: "#FFE9B8" }),
      /* @__PURE__ */ jsx(Sparkle, { className: "anim-twinkle absolute left-[26%] top-[8%]", size: 14, color: "#fff" })
    ] }),
    /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: unlocked ? /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.7, rotate: -8 },
        animate: { opacity: 1, scale: 1, rotate: 0 },
        exit: { opacity: 0, scale: 1.3, filter: "blur(6px)" },
        transition: { type: "spring", stiffness: 200, damping: 16 },
        className: "paper paper-dashed relative z-10 flex w-full max-w-sm flex-col items-center gap-4 p-10 text-center",
        children: [
          /* @__PURE__ */ jsx(LockOpen, { className: "h-12 w-12 text-pink-deep" }),
          /* @__PURE__ */ jsx("h2", { className: "font-hand text-4xl font-bold text-blue-ink", children: "Unlocked!" }),
          /* @__PURE__ */ jsxs("p", { className: "font-body text-blue-ink/80", children: [
            "for ",
            birthday.recipient.name,
            "'s eyes only…"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex gap-1", children: [0, 1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsx(
            Sparkle,
            {
              className: "anim-twinkle",
              size: 16,
              color: ["#E48BB0", "#6FA8D6", "#A48FD0", "#FFE9B8", "#6FBFA0", "#E48BB0"][i],
              style: { animationDelay: `${i * 0.12}s` }
            },
            i
          )) })
        ]
      },
      "unlocked"
    ) : /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: reduce ? false : { opacity: 0, y: 24 },
        animate: wrong ? { x: [0, -8, 8, -6, 6, 0] } : { opacity: 1, y: 0, x: 0 },
        transition: wrong ? { duration: 0.45 } : { duration: 0.6, ease: "easeOut" },
        className: "paper paper-dashed relative z-10 w-full max-w-sm p-6 sm:p-8",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-5 flex flex-col items-center text-center", children: [
            /* @__PURE__ */ jsx("span", { className: "mb-3 grid h-14 w-14 place-items-center rounded-full border-[3px] border-white bg-pink-pastel sticker", children: /* @__PURE__ */ jsx(Lock, { className: "h-6 w-6 text-pink-deep" }) }),
            /* @__PURE__ */ jsx("h2", { className: "font-hand text-3xl font-bold text-blue-ink sm:text-4xl", children: "Secret knock, please" }),
            /* @__PURE__ */ jsxs("p", { className: "mt-1 font-cute text-base text-blue-deep/80", children: [
              birthday.recipient.name,
              ", this one's just for you."
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "mt-1 font-body text-sm text-blue-ink/70", children: [
              "Hint: ",
              birthday.passwordHint
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: `mb-4 flex h-14 items-center justify-center gap-2 rounded-2xl border-2 border-dashed ${wrong ? "border-pink-deep bg-pink-soft" : "border-blue-deep/40 bg-white/70"}`,
              "aria-live": "polite",
              children: Array.from({ length: Math.max(birthday.password.length, entry.length) }).map((_, i) => /* @__PURE__ */ jsx(
                motion.span,
                {
                  animate: wrong ? { y: [0, -6, 0] } : { y: 0 },
                  transition: { delay: i * 0.04, duration: 0.4 },
                  className: `grid h-9 w-7 place-items-center rounded-lg font-ui text-lg font-bold ${entry[i] ? "bg-blue-deep/85 text-white" : "bg-blue-soft/70 text-blue-deep/40"}`,
                  children: entry[i] ? "•" : ""
                },
                i
              ))
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1.5", children: [
            ROWS.map((row, ri) => /* @__PURE__ */ jsx("div", { className: "flex justify-center gap-1.5", style: { paddingLeft: ri * 8 }, children: row.split("").map((ch) => /* @__PURE__ */ jsx(
              motion.button,
              {
                type: "button",
                whileTap: { scale: 0.88 },
                onClick: () => press(ch),
                disabled: unlocked,
                "aria-label": `letter ${ch}`,
                className: "h-11 w-9 rounded-xl border-2 border-white bg-white/85 font-ui text-sm font-bold text-blue-ink shadow-sm transition hover:bg-pink-pastel sm:h-12 sm:w-10 sm:text-base",
                children: ch
              },
              ch
            )) }, ri)),
            /* @__PURE__ */ jsxs("div", { className: "mt-1 flex justify-center gap-2", children: [
              /* @__PURE__ */ jsxs(
                motion.button,
                {
                  type: "button",
                  whileTap: { scale: 0.9 },
                  onClick: () => {
                    sfx.key();
                    setEntry((v) => v.slice(0, -1));
                  },
                  className: "flex h-11 flex-1 items-center justify-center gap-1 rounded-xl border-2 border-white bg-blue-soft font-cute text-base text-blue-ink transition hover:bg-lavender sm:h-12",
                  children: [
                    /* @__PURE__ */ jsx(Delete, { size: 16 }),
                    " back"
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                motion.button,
                {
                  type: "button",
                  whileTap: { scale: 0.9 },
                  onClick: () => submit(entry),
                  className: "flex h-11 flex-1 items-center justify-center gap-1 rounded-xl border-2 border-white bg-pink-deep font-cute text-base font-bold text-white transition hover:scale-[1.03] sm:h-12",
                  children: "unlock"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx(AnimatePresence, { children: wrong && /* @__PURE__ */ jsx(
            motion.p,
            {
              initial: { opacity: 0, y: 6 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0 },
              className: "mt-4 text-center font-hand text-xl text-pink-deep",
              children: "hmm, not quite — try again 💭"
            }
          ) })
        ]
      },
      "locked"
    ) })
  ] });
}
function Section({ id, number, title, kicker, palette = "#6FA8D6", children, className = "", bare = false }) {
  const reduce = useReducedMotion();
  return /* @__PURE__ */ jsxs(
    "section",
    {
      id,
      className: `relative mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-14 sm:px-6 sm:py-20 ${className}`,
      "data-section": id,
      children: [
        /* @__PURE__ */ jsxs(
          motion.header,
          {
            initial: reduce ? false : { opacity: 0, y: 24 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, amount: 0.4 },
            transition: { duration: 0.6, ease: "easeOut" },
            className: "mb-8 text-center sm:mb-12",
            children: [
              number && /* @__PURE__ */ jsx(
                "span",
                {
                  className: "sticker mb-3 inline-flex h-11 w-11 rotate-[-6deg] items-center justify-center rounded-full border-[3px] border-white font-ui text-sm font-bold text-blue-ink shadow-sm",
                  style: { backgroundColor: palette },
                  children: String(number).padStart(2, "0")
                }
              ),
              kicker && /* @__PURE__ */ jsx("p", { className: "font-cute text-base tracking-wide text-blue-deep/80 sm:text-lg", children: kicker }),
              /* @__PURE__ */ jsx("h2", { className: "font-hand text-4xl leading-tight font-bold text-blue-ink sm:text-5xl md:text-6xl", children: title }),
              /* @__PURE__ */ jsx(Flourish, { className: "mx-auto mt-3 w-56 max-w-full", color: palette })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: reduce ? false : { opacity: 0, y: 32 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, amount: 0.15 },
            transition: { duration: 0.7, ease: "easeOut", delay: 0.08 },
            children: bare ? children : /* @__PURE__ */ jsx("div", { className: "paper paper-dashed p-4 sm:p-8", children })
          }
        )
      ]
    }
  );
}
function useBlowDetection({ onBlow, threshold = 0.22, enabled = true } = {}) {
  const [status, setStatus] = useState("idle");
  const [level, setLevel] = useState(0);
  const [error, setError] = useState(null);
  const streamRef = useRef(null);
  const ctxRef = useRef(null);
  const rafRef = useRef(null);
  const aboveSince = useRef(0);
  const lastBlow = useRef(0);
  const lastSet = useRef(0);
  const lastLevel = useRef(0);
  const cbRef = useRef(onBlow);
  cbRef.current = onBlow;
  const cleanup = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (ctxRef.current) {
      try {
        ctxRef.current.close();
      } catch {
      }
      ctxRef.current = null;
    }
    setLevel(0);
    setStatus((s) => s === "listening" || s === "requesting" ? "idle" : s);
  }, []);
  const stop = useCallback(() => cleanup(), [cleanup]);
  const start = useCallback(async () => {
    if (!enabled) return false;
    if (!navigator?.mediaDevices?.getUserMedia) {
      setStatus("unsupported");
      setError("This browser can't use the microphone.");
      return false;
    }
    if (streamRef.current) return true;
    setStatus("requesting");
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false }
      });
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) throw new Error("Web Audio unavailable");
      const ctx2 = new AC();
      ctxRef.current = ctx2;
      const src = ctx2.createMediaStreamSource(stream);
      const analyser = ctx2.createAnalyser();
      analyser.fftSize = 1024;
      analyser.smoothingTimeConstant = 0.75;
      src.connect(analyser);
      streamRef.current = stream;
      const data = new Uint8Array(analyser.frequencyBinCount);
      setStatus("listening");
      const loop = () => {
        analyser.getByteFrequencyData(data);
        let sum = 0;
        const n = 24;
        for (let i = 0; i < n; i += 1) sum += data[i];
        const lvl = Math.min(1, sum / n / 190);
        if (now2() - lastSet.current > 90 || Math.abs(lvl - lastLevel.current) > 0.06) {
          lastSet.current = now2();
          lastLevel.current = lvl;
          setLevel(lvl);
        }
        const now = performance.now();
        if (lvl > threshold) {
          if (!aboveSince.current) aboveSince.current = now;
          if (now - aboveSince.current > 240 && now - lastBlow.current > 700) {
            lastBlow.current = now;
            aboveSince.current = 0;
            cbRef.current?.(lvl);
          }
        } else {
          aboveSince.current = 0;
        }
        rafRef.current = requestAnimationFrame(loop);
      };
      rafRef.current = requestAnimationFrame(loop);
      return true;
    } catch (e) {
      const denied = e?.name === "NotAllowedError" || e?.name === "SecurityError";
      setStatus(denied ? "denied" : "error");
      setError(denied ? "Microphone permission was declined." : e?.message || "Microphone error.");
      cleanup();
      return false;
    }
  }, [cleanup, enabled, threshold]);
  useEffect(() => () => cleanup(), [cleanup]);
  return { status, level, error, start, stop, listening: status === "listening" };
}
const PALETTE = ["#F9C8D9", "#BBDFF5", "#DCD4F2", "#FFE9B8", "#C9EBDD", "#FFF7EC", "#E48BB0", "#6FA8D6"];
function reduced() {
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
}
function useConfetti() {
  const burst = useCallback((origin = { x: 0.5, y: 0.6 }, opts = {}) => {
    if (reduced()) return;
    confetti({
      particleCount: opts.count ?? 90,
      spread: opts.spread ?? 78,
      startVelocity: opts.velocity ?? 42,
      scalar: opts.scalar ?? 1,
      ticks: opts.ticks ?? 220,
      origin,
      colors: PALETTE,
      disableForReducedMotion: true
    });
  }, []);
  const rain = useCallback((duration = 2600) => {
    if (reduced()) return;
    const end = Date.now() + duration;
    const frame = () => {
      confetti({
        particleCount: 4,
        startVelocity: 26,
        spread: 360,
        ticks: 260,
        gravity: 0.7,
        scalar: 0.9,
        origin: { x: Math.random(), y: -0.1 },
        colors: PALETTE,
        disableForReducedMotion: true
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);
  const bigBang = useCallback(() => {
    if (reduced()) return;
    const shots = [
      { o: { x: 0.15, y: 0.75 }, a: 60 },
      { o: { x: 0.85, y: 0.75 }, a: 120 },
      { o: { x: 0.5, y: 0.35 }, a: 360 }
    ];
    shots.forEach(
      (s, i) => setTimeout(
        () => confetti({
          particleCount: 130,
          angle: s.a,
          spread: 100,
          startVelocity: 52,
          ticks: 260,
          origin: s.o,
          colors: PALETTE,
          disableForReducedMotion: true
        }),
        i * 160
      )
    );
    setTimeout(
      () => confetti({
        particleCount: 60,
        spread: 140,
        startVelocity: 34,
        scalar: 1.6,
        shapes: ["circle"],
        origin: { x: 0.5, y: 0.5 },
        colors: PALETTE,
        disableForReducedMotion: true
      }),
      520
    );
  }, []);
  const pop = useCallback((x = 0.5, y = 0.5) => {
    if (reduced()) return;
    confetti({
      particleCount: 34,
      spread: 60,
      startVelocity: 30,
      scalar: 0.85,
      origin: { x, y },
      colors: PALETTE,
      disableForReducedMotion: true
    });
  }, []);
  return { burst, rain, bigBang, pop };
}
const W = 420;
const H = 340;
function Flame({ x, y, out, delay = 0 }) {
  return /* @__PURE__ */ jsxs("g", { children: [
    /* @__PURE__ */ jsx("ellipse", { cx: x, cy: y - 6, rx: "9", ry: "12", fill: "#FFE9B8", opacity: out ? 0 : 0.35, className: "anim-twinkle", style: { animationDelay: `${delay}s` } }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: !out && /* @__PURE__ */ jsx(
      motion.g,
      {
        initial: { opacity: 0, scale: 0.4 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.3 },
        transition: { duration: 0.3 },
        style: { transformBox: "fill-box", transformOrigin: "bottom center" },
        children: /* @__PURE__ */ jsxs("g", { className: "anim-flicker", style: { transformOrigin: `${x}px ${y}px`, animationDelay: `${delay}s` }, children: [
          /* @__PURE__ */ jsx("path", { d: `M${x} ${y - 20} c5 6 6 9 6 12 a6 6 0 0 1 -12 0 c0 -3 1 -6 6 -12z`, fill: "#FFB84D" }),
          /* @__PURE__ */ jsx("path", { d: `M${x} ${y - 12} c3 4 3.6 6 3.6 8 a3.6 3.6 0 0 1 -7.2 0 c0 -2 0.6 -4 3.6 -8z`, fill: "#FFF3C4" })
        ] })
      }
    ) }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: out && /* @__PURE__ */ jsxs(motion.g, { initial: { opacity: 0.7 }, animate: { opacity: 0, y: -46 }, exit: { opacity: 0 }, transition: { duration: 1.6, ease: "easeOut" }, children: [
      /* @__PURE__ */ jsx("circle", { cx: x - 2, cy: y - 18, r: "5", fill: "#E8EEF2", opacity: "0.75" }),
      /* @__PURE__ */ jsx("circle", { cx: x + 4, cy: y - 30, r: "7", fill: "#E8EEF2", opacity: "0.5" }),
      /* @__PURE__ */ jsx("circle", { cx: x - 1, cy: y - 44, r: "9", fill: "#E8EEF2", opacity: "0.3" })
    ] }) })
  ] });
}
function CandleCake({ onComplete }) {
  const total = birthday.candles.count;
  const [out, setOut] = useState(() => Array.from({ length: total }, () => false));
  const [done, setDone] = useState(false);
  const reduce = useReducedMotion();
  const confetti2 = useConfetti();
  const outCount = out.filter(Boolean).length;
  const finishing = useRef(false);
  const extinguish = useCallback(
    (howMany = 1) => {
      setOut((prev) => {
        const next = [...prev];
        let n = howMany;
        for (let i = 0; i < next.length && n > 0; i += 1) {
          if (!next[i]) {
            next[i] = true;
            n -= 1;
            sfx.candleOut();
          }
        }
        const remaining = next.filter((v) => !v).length;
        if (remaining === 0 && !finishing.current) {
          finishing.current = true;
          setTimeout(() => {
            confetti2.burst({ x: 0.5, y: 0.55 }, { count: 120, spread: 100 });
            sfx.chime();
            setDone(true);
            onComplete?.();
          }, 450);
        }
        return next;
      });
    },
    [confetti2, onComplete]
  );
  const blow = useBlowDetection({ onBlow: () => extinguish(2), enabled: true });
  const manualBlow = () => {
    sfx.puff();
    let i = 0;
    const remaining = out.filter((v) => !v).length;
    const step = () => {
      if (i >= remaining) return;
      extinguish(1);
      i += 1;
      setTimeout(step, 260);
    };
    step();
  };
  useEffect(() => () => blow.stop(), [blow.stop]);
  const candleXs = Array.from({ length: total }, (_, i) => 150 + i * (120 / Math.max(1, total - 1)));
  const micLabel = { idle: "Tap to enable the microphone", requesting: "Asking for permission…", listening: "Listening… blow now!", denied: "Microphone declined", unsupported: "Microphone unavailable", error: "Microphone error" };
  return /* @__PURE__ */ jsx(Section, { id: "candles", number: 1, title: birthday.candles.heading, kicker: "the first little ceremony", palette: "#E48BB0", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-6", children: [
    /* @__PURE__ */ jsx("p", { className: "max-w-xl text-center font-body text-blue-ink/85", children: birthday.candles.hint }),
    /* @__PURE__ */ jsxs("svg", { viewBox: `0 0 ${W} ${H}`, className: "w-full max-w-md drop-shadow-sm", role: "img", "aria-label": "A pastel birthday cake with candles", children: [
      /* @__PURE__ */ jsxs("defs", { children: [
        /* @__PURE__ */ jsxs("linearGradient", { id: "tier1", x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "#FFF7EC" }),
          /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "#F6E3D2" })
        ] }),
        /* @__PURE__ */ jsxs("linearGradient", { id: "tier2", x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "#FFE9B8" }),
          /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "#F7DCA5" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("ellipse", { cx: "210", cy: "306", rx: "150", ry: "22", fill: "#DCD4F2", opacity: "0.55" }),
      /* @__PURE__ */ jsx("ellipse", { cx: "210", cy: "300", rx: "140", ry: "20", fill: "#fff" }),
      /* @__PURE__ */ jsx("rect", { x: "86", y: "212", width: "248", height: "86", rx: "16", fill: "url(#tier2)" }),
      /* @__PURE__ */ jsx("rect", { x: "86", y: "206", width: "248", height: "24", rx: "12", fill: "#F9C8D9" }),
      /* @__PURE__ */ jsx("path", { d: "M86 218c14 12 26 0 40 10s26-2 40 8 26-4 40 6 26-6 40 4 28-4 42 6v-14H86z", fill: "#F9C8D9", opacity: "0.95" }),
      [120, 170, 220, 270, 310].map((x, i) => /* @__PURE__ */ jsx("circle", { cx: x, cy: 250 + i % 2 * 16, r: "4", fill: ["#E48BB0", "#6FA8D6", "#DCD4F2", "#FFE9B8", "#C9EBDD"][i % 5] }, x)),
      /* @__PURE__ */ jsx("rect", { x: "128", y: "146", width: "164", height: "72", rx: "14", fill: "url(#tier1)" }),
      /* @__PURE__ */ jsx("rect", { x: "128", y: "140", width: "164", height: "22", rx: "11", fill: "#BBDFF5" }),
      /* @__PURE__ */ jsx("path", { d: "M128 150c12 10 22 0 34 8s22-2 34 6 22-4 34 4 22-4 28 2v-12h-164z", fill: "#BBDFF5", opacity: "0.9" }),
      candleXs.map((x, i) => /* @__PURE__ */ jsxs("g", { children: [
        /* @__PURE__ */ jsx("rect", { x: x - 4, y: out[i] ? 108 : 106, width: "8", height: "38", rx: "4", fill: ["#F9C8D9", "#BBDFF5", "#DCD4F2", "#FFE9B8", "#C9EBDD"][i % 5] }),
        /* @__PURE__ */ jsx("rect", { x: x - 4, y: 108, width: "8", height: "6", fill: "#fff", opacity: "0.5" }),
        /* @__PURE__ */ jsx("line", { x1: x, y1: 106, x2: x, y2: 100, stroke: "#4A5A6A", strokeWidth: "2", strokeLinecap: "round" }),
        /* @__PURE__ */ jsx(Flame, { x, y: 102, out: out[i], delay: i * 0.14 })
      ] }, i))
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex w-full max-w-md flex-col items-center gap-3", children: [
      /* @__PURE__ */ jsx("div", { className: "flex w-full items-center gap-2", "aria-hidden": "true", children: Array.from({ length: 12 }).map((_, i) => /* @__PURE__ */ jsx(
        "span",
        {
          className: "h-2 flex-1 rounded-full transition-all duration-150",
          style: {
            backgroundColor: blow.level * 12 > i ? "#E48BB0" : "#BBDFF5",
            transform: `scaleY(${0.6 + (blow.level * 12 > i ? 1 : 0.4)})`
          }
        },
        i
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-center gap-3", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => blow.listening ? blow.stop() : blow.start(),
            disabled: done,
            className: `inline-flex items-center gap-2 rounded-full border-[3px] border-white px-5 py-3 font-cute text-lg shadow-scrap transition disabled:opacity-50 ${blow.listening ? "bg-pink-deep text-white" : "bg-white text-blue-ink hover:bg-pink-soft"}`,
            children: [
              blow.listening ? /* @__PURE__ */ jsx(Mic, { size: 18 }) : /* @__PURE__ */ jsx(MicOff, { size: 18 }),
              micLabel[blow.status]
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: manualBlow,
            disabled: done,
            className: "inline-flex items-center gap-2 rounded-full border-[3px] border-white bg-blue-deep px-5 py-3 font-cute text-lg text-white shadow-scrap transition hover:scale-105 disabled:opacity-50",
            children: [
              /* @__PURE__ */ jsx(Wind, { size: 18 }),
              " Blow for me"
            ]
          }
        )
      ] }),
      blow.error && /* @__PURE__ */ jsxs("p", { className: "text-center font-body text-sm text-pink-deep", children: [
        blow.error,
        " ",
        birthday.candles.micDenied
      ] }),
      /* @__PURE__ */ jsx("p", { className: "font-cute text-sm text-blue-deep/80", children: done ? birthday.candles.afterBlow : `${outCount} of ${total} candles out` })
    ] }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: done && /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: reduce ? false : { opacity: 0, y: 14, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        className: "paper flex flex-col items-center gap-3 p-5 text-center",
        children: [
          /* @__PURE__ */ jsx("p", { className: "font-hand text-2xl text-blue-ink", children: birthday.candles.wishPrompt }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => onComplete?.({ scrolled: true }),
              className: "inline-flex items-center gap-2 rounded-full border-[3px] border-white bg-pink-deep px-6 py-3 font-cute text-lg font-bold text-white shadow-scrap-lg transition hover:scale-105",
              children: [
                "On to celebration ",
                /* @__PURE__ */ jsx(ArrowRight, { size: 18 })
              ]
            }
          )
        ]
      }
    ) })
  ] }) });
}
const LETTER_COLORS = ["#E48BB0", "#6FA8D6", "#A48FD0", "#D9A94B", "#6FBFA0"];
function BirthdayCelebration({ onComplete }) {
  const scope = useRef(null);
  const headRef = useRef(null);
  const inView = useInView(scope, { once: true, amount: 0.35 });
  const confetti2 = useConfetti();
  const reduce = useReducedMotion();
  const uid = useId().replace(/:/g, "");
  const words = birthday.celebration.headline.split(" ");
  useEffect(() => {
    if (inView) {
      onComplete?.();
    }
  }, [inView, onComplete]);
  useEffect(() => {
    if (!inView || !headRef.current) return void 0;
    const letters = headRef.current.querySelectorAll("[data-letter]");
    if (reduce) {
      gsap.set(letters, { opacity: 1, y: 0, rotate: 0, scale: 1 });
      return void 0;
    }
    const tl = gsap.timeline({ defaults: { ease: "back.out(2)" } });
    tl.fromTo(
      letters,
      { opacity: 0, y: 70, rotate: () => gsap.utils.random(-40, 40), scale: 0.4 },
      { opacity: 1, y: 0, rotate: () => gsap.utils.random(-6, 6), scale: 1, duration: 0.7, stagger: 0.045 }
    ).to(letters, { scale: 1.06, duration: 0.18, stagger: { each: 0.02, from: "start" }, yoyo: true, repeat: 1 }, "-=0.2");
    return () => tl.kill();
  }, [inView, reduce]);
  useEffect(() => {
    if (!inView) return;
    confetti2.bigBang();
    sfx.party();
  }, [inView]);
  return /* @__PURE__ */ jsxs(
    Section,
    {
      id: "celebration",
      number: 2,
      title: "the big moment",
      kicker: "confetti, balloons and a very loud cheer",
      palette: "#E48BB0",
      bare: true,
      children: [
        /* @__PURE__ */ jsxs("div", { ref: scope, className: "relative overflow-hidden rounded-[28px] border-2 border-white bg-gradient-to-b from-blue-soft/80 via-cream to-pink-soft/70 p-6 text-center shadow-scrap-lg sm:p-10", children: [
          /* @__PURE__ */ jsxs("div", { className: "pointer-events-none absolute inset-0", "aria-hidden": "true", children: [
            [
              { l: "6%", t: "18%", c: "#F9C8D9", s: 34, d: 0 },
              { l: "88%", t: "12%", c: "#BBDFF5", s: 28, d: 0.9 },
              { l: "78%", t: "62%", c: "#DCD4F2", s: 40, d: 1.8 },
              { l: "16%", t: "66%", c: "#C9EBDD", s: 30, d: 2.6 }
            ].map((b, i) => /* @__PURE__ */ jsx(Balloon, { className: "anim-float absolute", size: b.s, color: b.c, style: { left: b.l, top: b.t, animationDelay: `${b.d}s` } }, i)),
            /* @__PURE__ */ jsx(Flower, { className: "anim-sway absolute left-[10%] top-[42%]", size: 26, petal: "#FFE9B8", center: "#F9C8D9" }),
            /* @__PURE__ */ jsx(Flower, { className: "anim-sway absolute right-[8%] top-[46%]", size: 30, petal: "#F9C8D9", center: "#FFF7EC", style: { animationDelay: "1.4s" } }),
            [0, 1, 2, 3, 4, 5, 6, 7].map((i) => /* @__PURE__ */ jsx(
              Sparkle,
              {
                className: "anim-twinkle absolute",
                size: 14,
                color: "#fff",
                style: { left: `${8 + i * 11}%`, top: `${12 + i % 3 * 26}%`, animationDelay: `${i * 0.25}s` }
              },
              `s${i}`
            ))
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
            /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: { opacity: 0, scale: 0.8 },
                whileInView: { opacity: 1, scale: 1 },
                viewport: { once: true },
                className: "mx-auto mb-4 inline-flex items-center gap-2 rounded-full border-2 border-white bg-white/80 px-4 py-1.5 font-cute text-sm text-pink-deep shadow-sm",
                children: [
                  /* @__PURE__ */ jsx(PartyPopper, { size: 15 }),
                  " hooray, it's official"
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "h3",
              {
                ref: headRef,
                className: "text-stroke-white mx-auto flex flex-wrap items-baseline justify-center gap-x-3 font-hand text-[15vw] leading-[0.95] font-bold sm:text-[10vw] md:text-[86px]",
                "aria-label": birthday.celebration.headline,
                children: words.map((word, wi) => /* @__PURE__ */ jsx("span", { className: "inline-flex", children: word.split("").map((ch, ci) => /* @__PURE__ */ jsx(
                  "span",
                  {
                    "data-letter": true,
                    className: "inline-block",
                    style: { color: LETTER_COLORS[(wi * 3 + ci) % LETTER_COLORS.length] },
                    children: ch
                  },
                  `${wi}-${ci}`
                )) }, wi))
              }
            ),
            /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: reduce ? false : { opacity: 0, y: 18 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { delay: 0.6, duration: 0.6 },
                className: "paper paper-dashed mx-auto mt-6 max-w-2xl p-6 sm:p-8",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "mb-3 flex justify-center gap-1", "aria-hidden": "true", children: [0, 1, 2, 3, 4].map((i) => /* @__PURE__ */ jsx(Heart, { className: "anim-float", size: 20, color: LETTER_COLORS[i], style: { animationDelay: `${i * 0.2}s` } }, i)) }),
                  /* @__PURE__ */ jsx("p", { className: "font-hand text-2xl leading-snug text-blue-ink sm:text-3xl", children: birthday.celebration.message }),
                  /* @__PURE__ */ jsx("p", { className: "mt-4 font-cute text-lg text-blue-deep", children: birthday.celebration.subline }),
                  /* @__PURE__ */ jsxs("p", { className: "mt-1 font-body text-sm text-blue-ink/70", children: [
                    birthday.celebration.signature,
                    " ",
                    birthday.recipient.from
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "mt-5 flex flex-wrap items-center justify-center gap-2", children: [0, 1, 2, 3, 4, 5, 6, 7].map((i) => /* @__PURE__ */ jsx(Star, { className: "anim-twinkle", size: 16, color: ["#FFE9B8", "#F9C8D9", "#DCD4F2", "#C9EBDD"][i % 4], style: { animationDelay: `${i * 0.15}s` } }, i)) }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => {
                  confetti2.bigBang();
                  sfx.party();
                },
                className: "mt-6 inline-flex items-center gap-2 rounded-full border-[3px] border-white bg-pink-deep px-6 py-3 font-cute text-lg font-bold text-white shadow-scrap-lg transition hover:scale-105",
                children: [
                  /* @__PURE__ */ jsx(RotateCw, { size: 17 }),
                  " more confetti, please"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("span", { id: uid, className: "sr-only", children: [
          "birthday celebration for ",
          birthday.recipient.name
        ] })
      ]
    }
  );
}
function Modal({ open, onClose, children, label = "dialog", maxWidth = "max-w-3xl" }) {
  useEffect(() => {
    if (!open) return void 0;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);
  return /* @__PURE__ */ jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxs(
    motion.div,
    {
      className: "fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6",
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.2 },
      children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            "aria-label": "Close",
            onClick: onClose,
            className: "absolute inset-0 h-full w-full cursor-default bg-blue-ink/45 backdrop-blur-sm"
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            role: "dialog",
            "aria-modal": "true",
            "aria-label": label,
            initial: { opacity: 0, scale: 0.92, y: 22, rotate: -1.5 },
            animate: { opacity: 1, scale: 1, y: 0, rotate: 0 },
            exit: { opacity: 0, scale: 0.95, y: 14 },
            transition: { type: "spring", stiffness: 260, damping: 24 },
            className: `paper relative z-10 max-h-[92vh] w-full overflow-y-auto p-4 sm:p-6 ${maxWidth}`,
            children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: onClose,
                  "aria-label": "Close dialog",
                  className: "absolute right-3 top-3 z-20 grid h-10 w-10 place-items-center rounded-full border-2 border-blue-deep/40 bg-white text-blue-ink transition hover:scale-110 hover:bg-pink-pastel",
                  children: /* @__PURE__ */ jsx(X, { size: 18 })
                }
              ),
              children
            ]
          }
        )
      ]
    }
  ) });
}
function Lightbox({
  open,
  onClose,
  src,
  title,
  caption,
  note,
  date,
  alt = "",
  onPrev,
  onNext,
  hasPrev = false,
  hasNext = false
}) {
  useEffect(() => {
    if (!open) return void 0;
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft" && hasPrev) onPrev?.();
      if (e.key === "ArrowRight" && hasNext) onNext?.();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, hasPrev, hasNext, onPrev, onNext]);
  return /* @__PURE__ */ jsx(Modal, { open, onClose, label: title || "photo memory", maxWidth: "max-w-2xl", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.96 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.96 },
        transition: { duration: 0.25 },
        className: "polaroid mx-auto max-w-lg rotate-[-0.5deg]",
        children: [
          src ? /* @__PURE__ */ jsxs("div", { className: "relative aspect-[4/3] w-full overflow-hidden rounded-[3px] bg-blue-soft", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src,
                alt: alt || caption || title,
                className: "h-full w-full object-cover",
                onError: (e) => {
                  e.currentTarget.style.display = "none";
                  if (e.currentTarget.nextElementSibling) {
                    e.currentTarget.nextElementSibling.style.display = "grid";
                  }
                }
              }
            ),
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: "hidden absolute inset-0 place-items-center bg-blue-soft font-cute text-blue-deep",
                "aria-hidden": "true",
                children: [
                  /* @__PURE__ */ jsx(ImageOff, { size: 32, className: "opacity-60" }),
                  /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm", children: "memory photograph slot" })
                ]
              }
            )
          ] }) : /* @__PURE__ */ jsx("div", { className: "grid h-56 place-items-center rounded-2xl bg-blue-soft font-cute text-blue-deep", children: "no image yet — add one in the config" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 px-1", children: [
            date && /* @__PURE__ */ jsx("span", { className: "font-cute text-xs uppercase tracking-wider text-pink-deep", children: date }),
            /* @__PURE__ */ jsx("h4", { className: "font-hand text-3xl leading-tight font-bold text-blue-ink", children: caption || title }),
            note && /* @__PURE__ */ jsx("p", { className: "mt-2 font-body text-base text-blue-ink/85", children: note })
          ] })
        ]
      },
      src || title
    ) }),
    hasPrev && /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: onPrev,
        "aria-label": "Previous photograph",
        className: "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 sm:-translate-x-5 z-20 grid h-10 w-10 place-items-center rounded-full border-2 border-white bg-white/90 text-blue-ink shadow-scrap transition hover:scale-110 hover:bg-pink-soft",
        children: /* @__PURE__ */ jsx(ChevronLeft, { size: 20 })
      }
    ),
    hasNext && /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: onNext,
        "aria-label": "Next photograph",
        className: "absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 sm:translate-x-5 z-20 grid h-10 w-10 place-items-center rounded-full border-2 border-white bg-white/90 text-blue-ink shadow-scrap transition hover:scale-110 hover:bg-pink-soft",
        children: /* @__PURE__ */ jsx(ChevronRight, { size: 20 })
      }
    )
  ] }) });
}
function PhotoCollage({ onComplete }) {
  const [openIdx, setOpenIdx] = useState(null);
  const bottomRef = useRef(null);
  const isBottomInView = useInView(bottomRef, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const photos = birthday.gallery.slice(0, 4);
  const active = openIdx !== null ? photos[openIdx] : null;
  useEffect(() => {
    if (isBottomInView) {
      onComplete?.();
    }
  }, [isBottomInView, onComplete]);
  const decorations = [
    { C: Flower, props: { size: 26, petal: "#F9C8D9", center: "#FFE9B8" }, style: { top: -14, left: -14 } },
    { C: Heart, props: { size: 22, color: "#E48BB0" }, style: { top: -12, right: -12 } },
    { C: Star, props: { size: 18, color: "#FFE9B8" }, style: { bottom: -10, left: -10 } },
    { C: Butterfly, props: { size: 24, color: "#DCD4F2" }, style: { top: -16, right: -16 } }
  ];
  return /* @__PURE__ */ jsxs(Section, { id: "collage", number: 3, title: "Polaroids & Paper", kicker: "a wall of tiny happy moments", palette: "#A48FD0", children: [
    /* @__PURE__ */ jsxs("p", { className: "mx-auto mb-8 max-w-xl text-center font-body text-blue-ink/80", children: [
      "Tap any photograph to open it up. Exactly ",
      photos.length,
      " personal memories captured in time — tap or use arrow keys to browse through them."
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6", children: photos.map((p, i) => {
      const deco = decorations[i % decorations.length];
      const Deco = deco.C;
      const tilt = p.rotate ?? (i % 2 === 0 ? -2 : 2);
      return /* @__PURE__ */ jsx(
        motion.button,
        {
          type: "button",
          onClick: () => {
            setOpenIdx(i);
            sfx.flip();
            onComplete?.();
          },
          initial: reduce ? false : { opacity: 0, y: 30, rotate: tilt * 2 },
          whileInView: { opacity: 1, y: 0, rotate: tilt },
          viewport: { once: true, amount: 0.25 },
          transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
          whileHover: { scale: 1.05, rotate: tilt * -0.5, zIndex: 10 },
          className: "group relative block cursor-pointer text-left focus:outline-none",
          "aria-label": `open photo: ${p.caption}`,
          children: /* @__PURE__ */ jsxs("div", { className: "polaroid relative shadow-scrap transition hover:shadow-scrap-lg", children: [
            /* @__PURE__ */ jsx(
              "span",
              {
                className: "tape absolute -top-3 left-1/2 z-10 h-7 w-20 -translate-x-1/2 -rotate-2 rounded-[2px]",
                "aria-hidden": "true"
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "relative aspect-square w-full overflow-hidden rounded-[3px] bg-blue-soft", children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: p.src,
                  alt: p.caption,
                  loading: "lazy",
                  className: "h-full w-full object-cover transition duration-500 group-hover:scale-105",
                  onError: (e) => {
                    e.currentTarget.style.display = "none";
                    if (e.currentTarget.nextElementSibling) {
                      e.currentTarget.nextElementSibling.style.display = "grid";
                    }
                  }
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "hidden absolute inset-0 place-items-center bg-blue-soft p-2 text-center font-cute text-xs text-blue-deep", children: [
                /* @__PURE__ */ jsx(ImageOff, { size: 20, className: "mb-1 opacity-60" }),
                "photo slot"
              ] }),
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: "pointer-events-none absolute inset-0 grid place-items-center opacity-0 transition group-hover:opacity-100",
                  style: { backgroundColor: "rgba(74,90,106,.28)" },
                  children: /* @__PURE__ */ jsx(Expand, { className: "text-white", size: 22 })
                }
              )
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 font-hand text-lg leading-tight font-bold text-blue-ink", children: p.caption }),
            p.date && /* @__PURE__ */ jsx("p", { className: "font-cute text-xs text-blue-deep/70", children: p.date }),
            /* @__PURE__ */ jsx(Deco, { className: "sticker absolute", ...deco.props, style: deco.style })
          ] })
        },
        p.id
      );
    }) }),
    /* @__PURE__ */ jsxs("div", { ref: bottomRef, className: "mt-8 flex items-center justify-center gap-3 text-blue-deep/70", "aria-hidden": "true", children: [
      /* @__PURE__ */ jsx(Sparkle, { size: 16, className: "anim-twinkle text-pink-deep" }),
      /* @__PURE__ */ jsxs("span", { className: "font-cute text-sm", children: [
        "four memories configurable in ",
        /* @__PURE__ */ jsx("code", { className: "rounded bg-white px-1.5 py-0.5", children: "birthday.config.js" })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      Lightbox,
      {
        open: openIdx !== null,
        onClose: () => setOpenIdx(null),
        src: active?.src,
        title: active?.caption,
        caption: active?.caption,
        note: active?.note,
        date: active?.date,
        alt: active?.caption,
        hasPrev: openIdx !== null && openIdx > 0,
        hasNext: openIdx !== null && openIdx < photos.length - 1,
        onPrev: () => setOpenIdx((idx) => idx > 0 ? idx - 1 : idx),
        onNext: () => setOpenIdx((idx) => idx < photos.length - 1 ? idx + 1 : idx)
      }
    )
  ] });
}
function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
    }
  }, [key, value]);
  const reset = useCallback(() => setValue(initial), [initial]);
  return [value, setValue, reset];
}
function SurpriseGrid({ onComplete }) {
  const [opened, setOpened] = useLocalStorage("bs:surprises-opened", []);
  const [lovedCards, setLovedCards] = useState(/* @__PURE__ */ new Set());
  const confetti2 = useConfetti();
  const reduce = useReducedMotion();
  const cards = birthday.surprises;
  const openSet = useMemo(() => new Set(opened), [opened]);
  const toggleHeart = useCallback(
    (card, index) => {
      sfx.pop();
      setLovedCards((prev) => {
        const next = new Set(prev);
        if (next.has(card.id)) next.delete(card.id);
        else next.add(card.id);
        return next;
      });
      if (!openSet.has(card.id)) {
        const nextOpened = [...opened, card.id];
        setOpened(nextOpened);
        confetti2.pop(0.2 + index % 4 * 0.2, 0.55);
        if (nextOpened.length >= 3) {
          onComplete?.();
        }
      }
    },
    [confetti2, openSet, opened, onComplete, setOpened]
  );
  return /* @__PURE__ */ jsxs(
    Section,
    {
      id: "surprises",
      number: 4,
      title: "Twelve Little Surprises",
      kicker: "handmade, personal & chosen with love",
      palette: "#6FBFA0",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-8 flex flex-col items-center gap-2", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: cards.map((c) => /* @__PURE__ */ jsx(
            "span",
            {
              className: `h-2.5 w-2.5 rounded-full transition-all duration-300 ${openSet.has(c.id) ? "bg-pink-deep scale-110" : "bg-blue-deep/25"}`,
              "aria-hidden": "true"
            },
            c.id
          )) }),
          /* @__PURE__ */ jsxs("p", { className: "font-cute text-base text-blue-deep", children: [
            openSet.size,
            " of ",
            cards.length,
            " surprises opened ",
            openSet.size === cards.length ? "— you've seen every special gift! 🎉" : openSet.size >= 3 ? "— next chapter unlocked below!" : "— open any 3 to unlock next chapter"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-stretch", children: cards.map((card, index) => {
          const p = PALETTES[card.palette] ?? PALETTES.pink;
          const isLoved = lovedCards.has(card.id) || openSet.has(card.id);
          const tilt = [-1.2, 1.2, -0.8, 1.4, -1, 0.8, -1.4, 1, -0.8, 1.2, -1.2, 0.9][index % 12];
          return /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: reduce ? false : { opacity: 0, y: 24, rotate: tilt * 1.5 },
              whileInView: { opacity: 1, y: 0, rotate: tilt },
              viewport: { once: true, amount: 0.15 },
              transition: { duration: 0.5, delay: index % 4 * 0.08 },
              whileHover: { scale: 1.025, rotate: 0, zIndex: 10 },
              className: "relative flex flex-col h-full rounded-2xl border-2 border-white bg-white/95 p-4 sm:p-5 shadow-scrap transition-all duration-300 hover:shadow-scrap-lg",
              style: { backgroundColor: p.bg },
              children: [
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "tape absolute -top-3 left-1/2 z-10 h-6 w-20 -translate-x-1/2 -rotate-1 rounded-[2px]",
                    "aria-hidden": "true"
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: "mb-3 flex items-center justify-between border-b border-dashed pb-2.5",
                    style: { borderColor: `${p.edge}44` },
                    children: [
                      /* @__PURE__ */ jsx(
                        "span",
                        {
                          className: "sticker grid h-7 w-7 place-items-center rounded-full border-2 border-white font-ui text-xs font-bold text-blue-ink shadow-xs",
                          style: { backgroundColor: p.accent },
                          children: card.number
                        }
                      ),
                      /* @__PURE__ */ jsx("h3", { className: "font-hand text-xl sm:text-2xl font-bold tracking-wide text-blue-ink", children: card.itemName }),
                      /* @__PURE__ */ jsxs("span", { className: "font-cute text-xs text-blue-deep/60", children: [
                        "GIFT ",
                        String(card.number).padStart(2, "0")
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "relative aspect-[4/3] w-full overflow-hidden rounded-xl border-2 border-white bg-white shadow-xs", children: [
                  /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: card.image,
                      alt: card.itemName,
                      loading: "lazy",
                      className: "h-full w-full object-contain p-2 transition duration-500 hover:scale-105",
                      onError: (e) => {
                        e.currentTarget.style.display = "none";
                        if (e.currentTarget.nextElementSibling) {
                          e.currentTarget.nextElementSibling.style.display = "flex";
                        }
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    "div",
                    {
                      className: "hidden h-full w-full flex-col items-center justify-center bg-blue-soft p-3 text-center font-cute text-xs text-blue-deep",
                      "aria-hidden": "true",
                      children: [
                        /* @__PURE__ */ jsx(ImageOff, { size: 24, className: "mb-1 opacity-60" }),
                        /* @__PURE__ */ jsx("span", { children: card.itemName })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("h4", { className: "mt-3.5 font-hand text-2xl font-bold leading-tight text-blue-ink", children: card.subtitle }),
                /* @__PURE__ */ jsxs("p", { className: "mt-2 flex-1 font-body text-sm sm:text-[15px] leading-relaxed text-blue-ink/90 whitespace-pre-line", children: [
                  '"',
                  card.description,
                  '"'
                ] }),
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: "mt-4 flex items-center justify-between border-t border-dashed pt-3",
                    style: { borderColor: `${p.edge}44` },
                    children: [
                      /* @__PURE__ */ jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: () => toggleHeart(card, index),
                          className: "inline-flex items-center gap-1.5 rounded-full border border-white bg-white/90 px-3 py-1 font-cute text-xs font-bold text-blue-ink shadow-xs transition hover:bg-pink-pastel active:scale-95 cursor-pointer",
                          "aria-label": `Gift ${card.number}: ${card.itemName}`,
                          children: [
                            /* @__PURE__ */ jsx(
                              Heart$1,
                              {
                                size: 13,
                                className: isLoved ? "fill-pink-deep text-pink-deep" : "text-blue-deep"
                              }
                            ),
                            isLoved ? "Cherished 🤍" : "Open gift"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxs("span", { className: "font-cute text-xs text-pink-deep flex items-center gap-1", children: [
                        /* @__PURE__ */ jsx(Sparkles, { size: 11 }),
                        " For Sri Lakshmi"
                      ] })
                    ]
                  }
                )
              ]
            },
            card.id
          );
        }) })
      ]
    }
  );
}
function Parchment({ onClose }) {
  const reduce = useReducedMotion();
  const L = birthday.letter;
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: reduce ? false : { opacity: 0, y: 60, scale: 0.9, rotateX: -18 },
      animate: { opacity: 1, y: 0, scale: 1, rotateX: 0 },
      exit: { opacity: 0, y: 30, scale: 0.94 },
      transition: { type: "spring", stiffness: 130, damping: 18 },
      style: { transformPerspective: 1200 },
      className: "parchment relative mx-auto w-full max-w-3xl rounded-[22px] border-[3px] border-[#E4D3B8] p-6 sm:p-10",
      children: [
        /* @__PURE__ */ jsx("span", { className: "pointer-events-none absolute inset-x-6 top-1/3 h-[2px] bg-gradient-to-r from-transparent via-[#C4A87A]/25 to-transparent", "aria-hidden": "true" }),
        /* @__PURE__ */ jsx("span", { className: "pointer-events-none absolute inset-x-6 top-2/3 h-[2px] bg-gradient-to-r from-transparent via-[#C4A87A]/20 to-transparent", "aria-hidden": "true" }),
        /* @__PURE__ */ jsx("span", { className: "pointer-events-none absolute inset-3 rounded-[16px] border border-dashed border-[#C4A87A]/45", "aria-hidden": "true" }),
        /* @__PURE__ */ jsx(Flower, { className: "absolute -left-4 -top-4", size: 34, petal: "#F9C8D9", center: "#FFE9B8" }),
        /* @__PURE__ */ jsx(Flower, { className: "absolute -right-3 -top-3", size: 28, petal: "#DCD4F2", center: "#FFF7EC" }),
        /* @__PURE__ */ jsx(Leaf, { className: "absolute -bottom-3 -left-3 rotate-12", size: 26 }),
        /* @__PURE__ */ jsx(Leaf, { className: "absolute -bottom-3 -right-3 -rotate-12", size: 22, color: "#F9C8D9" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: onClose,
            "aria-label": "Fold the letter back up",
            className: "absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border-2 border-[#C4A87A]/50 bg-white/70 text-blue-ink transition hover:bg-pink-pastel",
            children: /* @__PURE__ */ jsx(X, { size: 16 })
          }
        ),
        /* @__PURE__ */ jsxs("p", { className: "text-center font-cute text-sm uppercase tracking-[0.3em] text-[#A4834F]", children: [
          "a letter from ",
          birthday.recipient.from
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "mt-2 text-center font-hand text-4xl font-bold text-[#5A4632] sm:text-5xl", children: L.title }),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: "hidden",
            animate: "show",
            variants: { show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } },
            className: "mt-6 space-y-4",
            children: [
              /* @__PURE__ */ jsx(motion.p, { variants: itemVariants, className: "font-hand text-3xl text-[#5A4632]", children: L.greeting }),
              L.paragraphs.map((para, i) => /* @__PURE__ */ jsx(motion.p, { variants: itemVariants, className: "font-hand text-xl leading-relaxed text-[#5A4632]/90 sm:text-2xl", children: para }, i)),
              /* @__PURE__ */ jsxs(motion.div, { variants: itemVariants, className: "pt-2 text-right", children: [
                /* @__PURE__ */ jsx("p", { className: "font-hand text-2xl text-[#5A4632]/80", children: L.signoff }),
                /* @__PURE__ */ jsx("p", { className: "font-hand text-3xl font-bold text-[#A4645F]", children: L.signature }),
                /* @__PURE__ */ jsx("p", { className: "mt-3 text-left font-cute text-base text-[#8A6E4C]", children: L.postscript })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-center justify-center gap-3", "aria-hidden": "true", children: [
          /* @__PURE__ */ jsx(Heart, { size: 16, color: "#E48BB0" }),
          /* @__PURE__ */ jsx(Sparkle, { className: "anim-twinkle", size: 14, color: "#D9A94B" }),
          /* @__PURE__ */ jsx(Heart, { size: 16, color: "#6FA8D6" })
        ] })
      ]
    }
  );
}
const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } }
};
function Envelope({ opening, onOpen }) {
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.85, y: -20 },
      transition: { type: "spring", stiffness: 160, damping: 20 },
      className: "relative mx-auto w-full max-w-md",
      style: { transformPerspective: 1e3 },
      children: [
        /* @__PURE__ */ jsxs("div", { className: "relative rounded-2xl border-[3px] border-white bg-gradient-to-b from-[#F7E6D4] to-[#EFD3BB] p-4 shadow-scrap-lg", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative h-52 overflow-hidden rounded-xl bg-[#F3DCBF]", children: [
            /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 400 200", className: "absolute inset-0 h-full w-full", "aria-hidden": "true", children: [
              /* @__PURE__ */ jsx("path", { d: "M0 0h400v200H0z", fill: "#F3DCBF" }),
              /* @__PURE__ */ jsx("path", { d: "M0 8l200 118L400 8", fill: "none", stroke: "#D9B98F", strokeWidth: "2" }),
              /* @__PURE__ */ jsx("path", { d: "M0 0l200 126L400 0z", fill: "#EBD0AC" }),
              /* @__PURE__ */ jsx("path", { d: "M0 200l150-92M400 200L250 108", stroke: "#D9B98F", strokeWidth: "2" })
            ] }),
            /* @__PURE__ */ jsx(
              motion.div,
              {
                className: "absolute inset-x-0 top-0 h-[62%] origin-top",
                style: { transformPerspective: 900 },
                animate: opening ? { rotateX: -168, zIndex: 1 } : { rotateX: 0, zIndex: 3 },
                transition: { duration: 0.7, ease: "easeInOut" },
                children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 400 124", className: "h-full w-full", "aria-hidden": "true", children: [
                  /* @__PURE__ */ jsx("path", { d: "M0 0h400v124L200 124 0 0z", fill: "#E9CBA3" }),
                  /* @__PURE__ */ jsx("path", { d: "M0 0l200 124L400 0", fill: "none", stroke: "#D9B98F", strokeWidth: "2" })
                ] })
              }
            ),
            /* @__PURE__ */ jsxs("p", { className: "absolute bottom-4 left-1/2 -translate-x-1/2 font-hand text-2xl text-[#7A5E3C]", children: [
              "for ",
              birthday.recipient.name
            ] }),
            /* @__PURE__ */ jsx(Bow, { className: "absolute left-1/2 top-[46%] -translate-x-1/2", size: 54, color: "#E48BB0" })
          ] }),
          /* @__PURE__ */ jsx(
            motion.button,
            {
              type: "button",
              onClick: onOpen,
              disabled: opening,
              whileHover: { scale: 1.12, rotate: -6 },
              whileTap: { scale: 0.9 },
              animate: opening ? { scale: 0, opacity: 0, rotate: 160 } : { scale: 1, opacity: 1 },
              className: "absolute -bottom-6 left-1/2 z-10 grid h-16 w-16 -translate-x-1/2 place-items-center rounded-full border-4 border-white bg-pink-deep text-white shadow-scrap-lg",
              "aria-label": birthday.letter.openLabel,
              children: /* @__PURE__ */ jsx(Heart, { size: 22, color: "#fff" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "mt-10 text-center font-cute text-base text-blue-deep", children: [
          birthday.letter.openLabel,
          " 💌"
        ] })
      ]
    }
  );
}
function BirthdayLetter({ onComplete }) {
  const [stage, setStage] = useState("sealed");
  const confetti2 = useConfetti();
  const open = () => {
    setStage("opening");
    sfx.chime();
    setTimeout(() => {
      setStage("open");
      confetti2.burst({ x: 0.5, y: 0.45 }, { count: 60, spread: 70 });
      onComplete?.();
    }, 780);
  };
  return /* @__PURE__ */ jsxs(Section, { id: "letter", number: 5, title: "A Letter For You", kicker: "sealed, folded and a little smudged", palette: "#D9A94B", children: [
    /* @__PURE__ */ jsx("div", { className: "flex min-h-[320px] items-center justify-center py-4", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: stage === "open" ? /* @__PURE__ */ jsx(motion.div, { className: "w-full", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, children: /* @__PURE__ */ jsx(
      Parchment,
      {
        onClose: () => {
          sfx.flip();
          setStage("sealed");
        }
      }
    ) }, "letter") : /* @__PURE__ */ jsx(Envelope, { opening: stage === "opening", onOpen: open }, "envelope") }) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-center gap-2 font-cute text-sm text-blue-deep/70", children: [
      stage === "open" ? /* @__PURE__ */ jsx(MailOpen, { size: 15 }) : /* @__PURE__ */ jsx(Mail, { size: 15 }),
      stage === "open" ? "you can fold it back up and read it again later" : "the wax seal is decorative, the feelings are not"
    ] })
  ] });
}
const FLY = [
  { x: -120, y: -150, r: -160, d: 0 },
  { x: 110, y: -170, r: 150, d: 0.06 },
  { x: -60, y: -200, r: -80, d: 0.12 },
  { x: 60, y: -140, r: 90, d: 0.18 },
  { x: -150, y: -70, r: -120, d: 0.24 },
  { x: 150, y: -90, r: 130, d: 0.3 }
];
function GiftBox({ onComplete }) {
  const [opened, setOpened] = useLocalStorage("bs:gift-opened", false);
  const confetti2 = useConfetti();
  const reduce = useReducedMotion();
  const isOpen = !!opened;
  const toggle = () => {
    if (isOpen) {
      sfx.flip();
      setOpened(false);
      return;
    }
    sfx.open();
    setOpened(true);
    setTimeout(() => confetti2.burst({ x: 0.5, y: 0.55 }, { count: 110, spread: 95 }), 260);
    setTimeout(() => confetti2.pop(0.5, 0.45), 700);
    onComplete?.();
  };
  return /* @__PURE__ */ jsx(Section, { id: "gift", number: 6, title: birthday.gift.heading, kicker: birthday.gift.teaser, palette: "#A48FD0", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative w-full max-w-sm", children: [
      /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 z-20", "aria-hidden": "true", children: FLY.map((f, i) => /* @__PURE__ */ jsx(
        motion.span,
        {
          className: "absolute left-1/2 top-1/2",
          initial: { x: 0, y: 0, opacity: 0, scale: 0.4, rotate: 0 },
          animate: { x: f.x, y: f.y, opacity: [0, 1, 1, 0], scale: [0.5, 1.15, 1, 0.8], rotate: f.r },
          transition: { duration: 1.5, delay: f.d, ease: "easeOut" },
          children: i % 3 === 0 ? /* @__PURE__ */ jsx(Heart, { size: 22, color: "#E48BB0" }) : i % 3 === 1 ? /* @__PURE__ */ jsx(Star, { size: 20, color: "#FFE9B8" }) : /* @__PURE__ */ jsx(Sparkle, { size: 18, color: "#BBDFF5" })
        },
        i
      )) }) }),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          animate: isOpen ? { y: 0 } : { y: [0, -3, 0] },
          transition: isOpen ? { duration: 0.3 } : { duration: 3.4, repeat: Infinity, ease: "easeInOut" },
          className: "relative",
          children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 320 330", className: "w-full", role: "img", "aria-label": "A wrapped gift box", children: [
            /* @__PURE__ */ jsxs("defs", { children: [
              /* @__PURE__ */ jsxs("linearGradient", { id: "wrap", x1: "0", y1: "0", x2: "0", y2: "1", children: [
                /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "#FDE3EC" }),
                /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "#F9C8D9" })
              ] }),
              /* @__PURE__ */ jsxs("linearGradient", { id: "lidg", x1: "0", y1: "0", x2: "0", y2: "1", children: [
                /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "#EFEAFF" }),
                /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "#DCD4F2" })
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              motion.ellipse,
              {
                cx: "160",
                cy: "150",
                rx: "120",
                ry: "90",
                fill: "#FFE9B8",
                initial: false,
                animate: { opacity: isOpen ? 0.35 : 0 },
                transition: { duration: 0.6 }
              }
            ),
            /* @__PURE__ */ jsxs(motion.g, { initial: false, animate: { opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 12 }, children: [
              /* @__PURE__ */ jsx("rect", { x: "108", y: "128", width: "104", height: "72", rx: "10", fill: "#FFF7EC" }),
              /* @__PURE__ */ jsx("rect", { x: "108", y: "128", width: "104", height: "16", rx: "8", fill: "#FFE9B8" }),
              /* @__PURE__ */ jsx("circle", { cx: "140", cy: "172", r: "7", fill: "#F9C8D9" }),
              /* @__PURE__ */ jsx("circle", { cx: "180", cy: "178", r: "6", fill: "#BBDFF5" })
            ] }),
            /* @__PURE__ */ jsx("rect", { x: "86", y: "192", width: "148", height: "112", rx: "12", fill: "url(#wrap)" }),
            /* @__PURE__ */ jsx("rect", { x: "86", y: "192", width: "148", height: "112", rx: "12", fill: "none", stroke: "#E48BB0", strokeWidth: "2", opacity: "0.5" }),
            /* @__PURE__ */ jsx("rect", { x: "150", y: "192", width: "20", height: "112", fill: "#A48FD0", opacity: "0.85" }),
            /* @__PURE__ */ jsx("rect", { x: "86", y: "238", width: "148", height: "16", fill: "#A48FD0", opacity: "0.55" }),
            /* @__PURE__ */ jsxs(motion.g, { initial: false, animate: isOpen ? { y: 46, rotate: 8, opacity: 1 } : { y: 0, rotate: 0, opacity: 0 }, transition: { type: "spring", stiffness: 80, damping: 12 }, children: [
              /* @__PURE__ */ jsx("path", { d: "M104 176c-14 26-4 44 8 56", stroke: "#A48FD0", strokeWidth: "8", fill: "none", strokeLinecap: "round" }),
              /* @__PURE__ */ jsx("path", { d: "M216 176c14 26 4 44-8 56", stroke: "#A48FD0", strokeWidth: "8", fill: "none", strokeLinecap: "round" })
            ] }),
            /* @__PURE__ */ jsxs(
              motion.g,
              {
                style: { transformBox: "fill-box", transformOrigin: "left bottom" },
                initial: false,
                animate: isOpen ? { y: -104, rotate: -22, x: -18 } : { y: 0, rotate: 0, x: 0 },
                transition: { type: "spring", stiffness: 110, damping: 13 },
                children: [
                  /* @__PURE__ */ jsx("rect", { x: "72", y: "168", width: "176", height: "30", rx: "9", fill: "url(#lidg)" }),
                  /* @__PURE__ */ jsx("rect", { x: "72", y: "168", width: "176", height: "30", rx: "9", fill: "none", stroke: "#A48FD0", strokeWidth: "2", opacity: "0.5" }),
                  /* @__PURE__ */ jsx("rect", { x: "152", y: "168", width: "20", height: "30", fill: "#A48FD0", opacity: "0.8" }),
                  /* @__PURE__ */ jsxs("g", { transform: "translate(160 160)", children: [
                    /* @__PURE__ */ jsx("path", { d: "M0 8C-14-6-30-6-30 4s14 14 30 4z", fill: "#E48BB0" }),
                    /* @__PURE__ */ jsx("path", { d: "M0 8C14-6 30-6 30 4S16 18 0 8z", fill: "#E48BB0" }),
                    /* @__PURE__ */ jsx("path", { d: "M0 8c-6 8-8 12-9 18M0 8c6 8 8 12 9 18", stroke: "#E48BB0", strokeWidth: "5", strokeLinecap: "round", fill: "none" }),
                    /* @__PURE__ */ jsx("circle", { cx: "0", cy: "7", r: "5", fill: "#fff", opacity: "0.5" })
                  ] })
                ]
              }
            )
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: toggle,
        className: "inline-flex items-center gap-2 rounded-full border-[3px] border-white bg-lav-deep px-6 py-3 font-cute text-lg font-bold text-white shadow-scrap-lg transition hover:scale-105",
        children: isOpen ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Sparkles, { size: 18 }),
          " ",
          birthday.gift.afterLabel
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Gift, { size: 18 }),
          " ",
          birthday.gift.tapLabel
        ] })
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: reduce ? false : { opacity: 0, y: 26, scale: 0.94 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 14, scale: 0.96 },
        transition: { type: "spring", stiffness: 150, damping: 18 },
        className: "paper paper-dashed w-full max-w-xl overflow-hidden p-0",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx("img", { src: birthday.gift.image, alt: "Illustration of an open pastel gift box", className: "h-44 w-full object-cover sm:h-56" }),
            /* @__PURE__ */ jsx("span", { className: "tape absolute -top-2 left-1/2 h-6 w-24 -translate-x-1/2 -rotate-2 rounded-[2px]", "aria-hidden": "true" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 text-center", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-hand text-3xl font-bold text-blue-ink", children: birthday.gift.revealTitle }),
            /* @__PURE__ */ jsx("p", { className: "mx-auto mt-3 max-w-lg font-body text-blue-ink/85", children: birthday.gift.message }),
            /* @__PURE__ */ jsxs("p", { className: "mt-4 font-cute text-base text-lav-deep", children: [
              "with love, ",
              birthday.recipient.from,
              " · for ",
              birthday.recipient.name
            ] })
          ] })
        ]
      }
    ) }),
    !isOpen && /* @__PURE__ */ jsx("p", { className: "font-hand text-xl text-blue-ink/70", children: "something small is hiding in there…" })
  ] }) });
}
const FREQ = {
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  F4: 349.23,
  G4: 392,
  A4: 440,
  Bb4: 466.16,
  B4: 493.88,
  C5: 523.25,
  D5: 587.33,
  E5: 659.25,
  F5: 698.46,
  G5: 783.99,
  A5: 880,
  C3: 130.81,
  F3: 174.61,
  G3: 196,
  A3: 220
};
const BEAT = 0.42;
const MELODY = [
  [0, "C4", 0.75, 1],
  [0.75, "C4", 0.25, 0.8],
  [1, "D4", 1, 1],
  [2, "C4", 1, 1],
  [3, "F4", 1, 1],
  [4, "E4", 2, 0.9],
  [6.2, "C4", 0.75, 1],
  [6.95, "C4", 0.25, 0.8],
  [7.2, "D4", 1, 1],
  [8.2, "C4", 1, 1],
  [9.2, "G4", 1, 1],
  [10.2, "F4", 2, 0.9],
  [12.4, "C4", 0.75, 1],
  [13.15, "C4", 0.25, 0.8],
  [13.4, "C5", 1, 1],
  [14.4, "A4", 1, 1],
  [15.4, "F4", 1, 1],
  [16.4, "E4", 1, 1],
  [17.4, "D4", 2, 0.9],
  [19.6, "Bb4", 0.75, 1],
  [20.35, "Bb4", 0.25, 0.8],
  [20.6, "A4", 1, 1],
  [21.6, "F4", 1, 1],
  [22.6, "G4", 1, 1],
  [23.6, "F4", 2.5, 0.95]
];
const ACCOMP = [
  [0, "C3"],
  [3, "F3"],
  [4, "C3"],
  [6.2, "C3"],
  [9.2, "G3"],
  [10.2, "C3"],
  [12.4, "C3"],
  [15.4, "F3"],
  [17.4, "G3"],
  [19.6, "F3"],
  [22.6, "Bb4"],
  [23.6, "F3"]
];
const ARPS = [
  [1, "E4"],
  [2.2, "G4"],
  [5, "C4"],
  [7.6, "E4"],
  [11, "G4"],
  [14, "C5"],
  [16, "G4"],
  [18.4, "C4"],
  [21.2, "F4"],
  [24.4, "A4"]
];
const MELODY_DURATION = 28.5;
function pluck(ac, dest, freq, t0, dur, vel, sink) {
  const g = ac.createGain();
  g.gain.setValueAtTime(1e-4, t0);
  g.gain.exponentialRampToValueAtTime(0.24 * vel, t0 + 0.01);
  g.gain.exponentialRampToValueAtTime(1e-4, t0 + Math.max(0.25, dur * BEAT * 1.6));
  g.connect(dest);
  const stopAt = t0 + dur * BEAT * 1.8 + 0.2;
  const o1 = ac.createOscillator();
  o1.type = "sine";
  o1.frequency.value = freq;
  o1.connect(g);
  o1.start(t0);
  o1.stop(stopAt);
  const o2 = ac.createOscillator();
  o2.type = "triangle";
  o2.frequency.value = freq * 2;
  const g2 = ac.createGain();
  g2.gain.value = 0.18;
  o2.connect(g2).connect(g);
  o2.start(t0);
  o2.stop(stopAt);
  if (sink) sink.push(o1, o2);
  return [o1, o2];
}
function createMelodyPlayer() {
  let ac = null;
  let master2 = null;
  let sources = [];
  let playing = false;
  let startedAt = 0;
  let offset = 0;
  let timer = null;
  let volume = 0.6;
  let listeners = [];
  const ensure2 = () => {
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return false;
      if (!ac) {
        ac = new AC();
        master2 = ac.createGain();
        master2.gain.value = volume;
        const comp = ac.createDynamicsCompressor();
        master2.connect(comp).connect(ac.destination);
      }
      if (ac.state === "suspended") ac.resume().catch(() => {
      });
      return true;
    } catch {
      return false;
    }
  };
  const stopSources = () => {
    sources.forEach((s) => {
      try {
        s.stop();
      } catch {
      }
    });
    sources = [];
  };
  const scheduleFrom = (pos) => {
    if (!ensure2()) return;
    const now = ac.currentTime + 0.08;
    startedAt = now;
    offset = pos;
    const events = [];
    MELODY.forEach(([b, n, d, v]) => {
      const t = b * BEAT;
      if (t >= pos - 0.05) events.push({ t, f: FREQ[n], d, v });
    });
    ACCOMP.forEach(([b, n]) => {
      const t = b * BEAT;
      if (t >= pos - 0.05) events.push({ t, f: FREQ[n], d: 1.6, v: 0.5 });
    });
    ARPS.forEach(([b, n]) => {
      const t = b * BEAT;
      if (t >= pos - 0.05) events.push({ t, f: FREQ[n], d: 0.8, v: 0.45 });
    });
    events.forEach((e) => {
      const t0 = now + (e.t - pos);
      pluck(ac, master2, e.f, t0, e.d, e.v, sources);
    });
  };
  const emit = () => listeners.forEach((l) => l());
  const tick = () => {
    if (!playing || !ac) return;
    const pos = ac.currentTime - startedAt + offset;
    if (pos >= MELODY_DURATION) {
      stopSources();
      scheduleFrom(0);
      emit();
      return;
    }
    emit();
  };
  return {
    duration: MELODY_DURATION,
    subscribe(fn) {
      listeners.push(fn);
      return () => {
        listeners = listeners.filter((l) => l !== fn);
      };
    },
    isPlaying: () => playing,
    getPosition: () => {
      if (!playing || !ac) return offset;
      return Math.min(MELODY_DURATION, ac.currentTime - startedAt + offset);
    },
    setVolume(v) {
      volume = Math.max(0, Math.min(1, v));
      if (master2) master2.gain.value = volume;
    },
    play(from) {
      if (!ensure2()) return false;
      if (playing) return true;
      stopSources();
      playing = true;
      scheduleFrom(typeof from === "number" ? from : offset);
      timer = setInterval(tick, 250);
      emit();
      return true;
    },
    pause() {
      if (!playing) return;
      const pos = this.getPosition();
      playing = false;
      clearInterval(timer);
      timer = null;
      stopSources();
      offset = pos;
      if (ac && ac.state === "running") ac.suspend().catch(() => {
      });
      emit();
    },
    seek(pos) {
      const wasPlaying = playing;
      if (playing) {
        this.pause();
      }
      offset = Math.max(0, Math.min(MELODY_DURATION, pos));
      if (ac && ac.state === "suspended") ac.resume().catch(() => {
      });
      if (wasPlaying) this.play(offset);
      emit();
    },
    stop() {
      playing = false;
      clearInterval(timer);
      timer = null;
      stopSources();
      offset = 0;
      emit();
    }
  };
}
const fmt = (s) => {
  if (!Number.isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, "0")}`;
};
function VinylPlayer({ onComplete }) {
  const songs = birthday.music.songs || [
    {
      id: "song-1",
      title: "Happy Birthday Music Box",
      artist: "Handmade Music Box Melody",
      src: "/assets/music/sample-song-01.mp3",
      durationLabel: "looping melody"
    },
    {
      id: "song-2",
      title: "Soft Acoustic Serenade",
      artist: "Birthday Acoustic Box",
      src: "/assets/music/sample-song-02.mp3",
      durationLabel: "gentle loop"
    }
  ];
  const [currentIdx, setCurrentIdx] = useState(0);
  const currentSong = songs[currentIdx] || songs[0];
  const audioRef = useRef(null);
  const melodyRef = useRef(null);
  const [mode, setMode] = useState(currentSong.src ? "file" : "melody");
  const [playing, setPlaying] = useState(false);
  const [pos, setPos] = useState(0);
  const [duration, setDuration] = useState(currentSong.src ? 0 : MELODY_DURATION);
  const [volume, setVolume] = useState(0.7);
  const [muted2, setMuted] = useState(false);
  const [error, setError] = useState(null);
  const reduce = useReducedMotion();
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    if (!playing) return void 0;
    const id = setInterval(() => {
      if (mode === "file" && audioRef.current) {
        setPos(audioRef.current.currentTime || 0);
        if (Number.isFinite(audioRef.current.duration)) setDuration(audioRef.current.duration);
      } else if (melodyRef.current) {
        setPos(melodyRef.current.getPosition());
      }
    }, 200);
    return () => clearInterval(id);
  }, [playing, mode]);
  const selectTrack = (idx) => {
    if (idx === currentIdx) return;
    if (playing) {
      if (mode === "file" && audioRef.current) audioRef.current.pause();
      else melodyRef.current?.pause();
      setPlaying(false);
    }
    setCurrentIdx(idx);
    setPos(0);
    setError(null);
    const nextSong = songs[idx];
    setMode(nextSong.src ? "file" : "melody");
    sfx.key();
  };
  const toggle = () => {
    onComplete?.();
    if (playing) {
      if (mode === "file" && audioRef.current) audioRef.current.pause();
      else melodyRef.current?.pause();
      setPlaying(false);
      return;
    }
    sfx.pop();
    if (mode === "file" && audioRef.current) {
      audioRef.current.play().catch(() => {
        setError("Local song file not ready — playing melodic music box version.");
        setMode("melody");
        if (!melodyRef.current) melodyRef.current = createMelodyPlayer();
        melodyRef.current.play();
        setDuration(MELODY_DURATION);
      });
      setPlaying(true);
      return;
    }
    if (!melodyRef.current) melodyRef.current = createMelodyPlayer();
    melodyRef.current.play();
    setPlaying(true);
  };
  const applyVolume = (v) => {
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
    melodyRef.current?.setVolume(v);
  };
  const seek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const next = ratio * (duration || MELODY_DURATION);
    setPos(next);
    if (mode === "file" && audioRef.current) audioRef.current.currentTime = next;
    else melodyRef.current?.seek(next);
  };
  useEffect(() => {
    if (!playing || reduce) return void 0;
    const id = setInterval(() => {
      const nid = Math.random().toString(36).slice(2, 7);
      const note = {
        id: nid,
        x: 35 + Math.random() * 30,
        size: 16 + Math.floor(Math.random() * 12),
        color: ["#E48BB0", "#6FA8D6", "#A48FD0", "#D9A94B"][Math.floor(Math.random() * 4)]
      };
      setNotes((prev) => [...prev.slice(-6), note]);
      setTimeout(() => setNotes((prev) => prev.filter((n) => n.id !== nid)), 3e3);
    }, 700);
    return () => clearInterval(id);
  }, [playing, reduce]);
  useEffect(
    () => () => {
      melodyRef.current?.stop();
      if (audioRef.current) audioRef.current.pause();
    },
    []
  );
  const pct = duration > 0 ? Math.min(100, pos / duration * 100) : 0;
  return /* @__PURE__ */ jsx(Section, { id: "music", number: 7, title: "Our Little Record", kicker: "press play whenever you like", palette: "#6FA8D6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative w-full max-w-lg", children: [
      /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 z-20", "aria-hidden": "true", children: notes.map((n) => /* @__PURE__ */ jsx(
        motion.span,
        {
          className: "absolute bottom-6",
          style: { left: `${n.x}%` },
          initial: { opacity: 0, y: 0, scale: 0.6 },
          animate: { opacity: [0, 1, 1, 0], y: -110, scale: 1 },
          exit: { opacity: 0 },
          transition: { duration: 3, ease: "easeOut" },
          children: /* @__PURE__ */ jsx(Note, { size: n.size, color: n.color })
        },
        n.id
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "paper paper-dashed p-5 sm:p-7 shadow-scrap", children: [
        /* @__PURE__ */ jsx("div", { className: "mb-4 flex flex-wrap items-center justify-center gap-2", children: songs.map((song, idx) => {
          const isSelected = idx === currentIdx;
          return /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => selectTrack(idx),
              className: `inline-flex items-center gap-1.5 rounded-full border-2 px-3.5 py-1.5 font-cute text-xs font-bold transition cursor-pointer ${isSelected ? "border-pink-deep bg-pink-deep text-white shadow-xs" : "border-white bg-white/80 text-blue-deep hover:bg-pink-pastel"}`,
              children: [
                /* @__PURE__ */ jsx(Disc, { size: 13, className: isSelected ? "animate-spin" : "" }),
                "Track ",
                idx + 1,
                ": ",
                song.title.split(" ")[0]
              ]
            },
            song.id
          );
        }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:gap-7", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative aspect-square w-44 shrink-0 sm:w-52", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-full bg-blue-ink/10 shadow-inner" }),
            /* @__PURE__ */ jsxs(
              motion.div,
              {
                animate: playing && !reduce ? { rotate: 360 } : {},
                transition: { duration: 4.8, repeat: Infinity, ease: "linear" },
                className: "absolute inset-2 grid place-items-center rounded-full border-4 border-white shadow-scrap-lg",
                style: {
                  background: "radial-gradient(circle, #2a3340 0%, #1e2530 65%, #151a22 100%)"
                },
                children: [
                  [0.82, 0.68, 0.54].map((scale, i) => /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: "pointer-events-none absolute rounded-full border border-white/10",
                      style: { width: `${scale * 100}%`, height: `${scale * 100}%` }
                    },
                    i
                  )),
                  /* @__PURE__ */ jsxs("div", { className: "relative grid h-16 w-16 place-items-center rounded-full border-2 border-white bg-pink-pastel p-1 text-center shadow-xs", children: [
                    /* @__PURE__ */ jsx("span", { className: "font-cute text-[9px] font-bold text-pink-deep", children: currentSong.title.slice(0, 14) }),
                    /* @__PURE__ */ jsx("span", { className: "h-2 w-2 rounded-full bg-blue-ink" })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              motion.div,
              {
                animate: { rotate: playing ? 24 : 0 },
                transition: { duration: 0.8, ease: "easeInOut" },
                className: "pointer-events-none absolute right-2 top-2 h-20 w-3 origin-top",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "h-3 w-3 rounded-full border-2 border-white bg-[#C4A87A] shadow-xs" }),
                  /* @__PURE__ */ jsx("div", { className: "mx-auto h-16 w-[3px] bg-[#C4A87A]" }),
                  /* @__PURE__ */ jsx("span", { className: "absolute -left-[3px] bottom-0 h-2 w-2.5 rounded-sm bg-pink-deep" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Music4, { size: 16, className: "text-blue-deep" }),
              /* @__PURE__ */ jsxs("p", { className: "font-cute text-xs uppercase tracking-[0.25em] text-blue-deep", children: [
                "Track ",
                currentIdx + 1,
                " of ",
                songs.length
              ] })
            ] }),
            /* @__PURE__ */ jsx("h4", { className: "truncate font-hand text-2xl font-bold text-blue-ink sm:text-3xl", children: currentSong.title }),
            /* @__PURE__ */ jsx("p", { className: "truncate font-body text-sm text-blue-ink/70", children: currentSong.artist }),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "mt-3 h-3 w-full cursor-pointer rounded-full bg-blue-soft",
                onClick: seek,
                role: "slider",
                "aria-label": "seek",
                "aria-valuenow": Math.round(pct),
                "aria-valuemin": 0,
                "aria-valuemax": 100,
                tabIndex: 0,
                children: /* @__PURE__ */ jsx("div", { className: "relative h-full rounded-full bg-gradient-to-r from-pink-deep to-lav-deep transition-[width] duration-200", style: { width: `${pct}%` }, children: /* @__PURE__ */ jsx("span", { className: "absolute -right-1.5 -top-1 h-5 w-5 rounded-full border-[3px] border-white bg-pink-deep shadow-sm" }) })
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "mt-1 flex justify-between font-ui text-[11px] text-blue-ink/60", children: [
              /* @__PURE__ */ jsx("span", { children: fmt(pos) }),
              /* @__PURE__ */ jsxs("span", { children: [
                currentSong.durationLabel || "looping",
                " · ",
                fmt(duration)
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center gap-3", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: toggle,
                  className: "grid h-14 w-14 shrink-0 place-items-center rounded-full border-[3px] border-white bg-pink-deep text-white shadow-scrap transition hover:scale-105 active:scale-95 cursor-pointer",
                  "aria-label": playing ? "Pause" : "Play",
                  children: playing ? /* @__PURE__ */ jsx(Pause, { size: 22 }) : /* @__PURE__ */ jsx(Play, { size: 22, className: "ml-0.5" })
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-1 items-center gap-2", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      const next = !muted2;
                      setMuted(next);
                      applyVolume(next ? 0 : 0.7);
                      sfx.key();
                    },
                    className: "grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-blue-deep/40 bg-white text-blue-ink cursor-pointer hover:bg-pink-pastel",
                    "aria-label": muted2 ? "Unmute" : "Mute",
                    children: muted2 ? /* @__PURE__ */ jsx(VolumeX, { size: 15 }) : /* @__PURE__ */ jsx(Volume2, { size: 15 })
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "range",
                    min: 0,
                    max: 1,
                    step: 0.01,
                    value: muted2 ? 0 : volume,
                    onChange: (e) => {
                      setMuted(false);
                      applyVolume(Number(e.target.value));
                    },
                    className: "h-1.5 flex-1 cursor-pointer accent-pink-deep",
                    "aria-label": "Volume"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "mt-3 font-cute text-xs text-blue-deep/75", children: [
              "mode: ",
              mode === "file" ? "local audio file" : "synthesised music box"
            ] }),
            error && /* @__PURE__ */ jsxs("p", { className: "mt-1 flex items-center gap-1 font-body text-xs text-pink-deep", children: [
              /* @__PURE__ */ jsx(AlertCircle, { size: 12 }),
              " ",
              error
            ] })
          ] })
        ] })
      ] })
    ] }),
    currentSong.src && /* @__PURE__ */ jsx(
      "audio",
      {
        ref: audioRef,
        src: currentSong.src,
        preload: "none",
        onEnded: () => setPlaying(false),
        onError: () => {
          setMode("melody");
        }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-center gap-2 font-cute text-sm text-blue-deep/80", children: [
      /* @__PURE__ */ jsx(Sparkle, { size: 14, className: "text-pink-deep" }),
      /* @__PURE__ */ jsxs("span", { children: [
        "replace files anytime in ",
        /* @__PURE__ */ jsx("code", { className: "rounded bg-white px-1.5 py-0.5", children: "public/assets/music/" })
      ] }),
      /* @__PURE__ */ jsx(Heart, { size: 14, color: "#E48BB0" })
    ] })
  ] }) });
}
function VideoGallery({ onComplete }) {
  const [active, setActive] = useState(null);
  const [fallback, setFallback] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const reduce = useReducedMotion();
  const videos = birthday.videos.slice(0, 2);
  const open = (video, index) => {
    setFallback(false);
    setIsPlaying(false);
    setActive({ ...video, index });
    sfx.pop();
    onComplete?.();
  };
  const close = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsPlaying(false);
    setActive(null);
  };
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };
  return /* @__PURE__ */ jsxs(Section, { id: "videos", number: 8, title: "Little Films", kicker: "press play, no autoplay, promise", palette: "#E48BB0", children: [
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-6 sm:grid-cols-2", children: videos.map((v, i) => /* @__PURE__ */ jsx(
      motion.button,
      {
        type: "button",
        onClick: () => open(v, i),
        initial: reduce ? false : { opacity: 0, y: 34, rotate: i % 2 ? 1.5 : -1.5 },
        whileInView: { opacity: 1, y: 0, rotate: i % 2 ? 1 : -1 },
        viewport: { once: true, amount: 0.25 },
        whileHover: { scale: 1.03, rotate: 0, zIndex: 4 },
        transition: { duration: 0.55, delay: i % 2 * 0.08 },
        className: "group relative text-left focus:outline-none",
        "aria-label": `play video: ${v.title}`,
        children: /* @__PURE__ */ jsxs("div", { className: "paper relative overflow-hidden p-3 shadow-scrap", children: [
          /* @__PURE__ */ jsx("span", { className: "tape absolute -top-2 left-1/2 z-10 h-6 w-24 -translate-x-1/2 -rotate-2 rounded-[2px]", "aria-hidden": "true" }),
          /* @__PURE__ */ jsxs("div", { className: "relative aspect-video w-full overflow-hidden rounded-xl bg-gradient-to-br from-blue-soft to-pink-soft", children: [
            v.poster ? /* @__PURE__ */ jsx("img", { src: v.poster, alt: v.title, loading: "lazy", className: "h-full w-full object-cover transition duration-500 group-hover:scale-105" }) : /* @__PURE__ */ jsx("div", { className: "grid h-full place-items-center font-cute text-blue-deep", children: "video thumbnail" }),
            /* @__PURE__ */ jsx("span", { className: "absolute inset-0 grid place-items-center", style: { backgroundColor: "rgba(74,90,106,.22)" }, children: /* @__PURE__ */ jsx("span", { className: "grid h-14 w-14 place-items-center rounded-full border-4 border-white bg-white/85 text-pink-deep transition group-hover:scale-110 shadow-scrap", children: /* @__PURE__ */ jsx(Play, { size: 22, className: "ml-0.5" }) }) }),
            /* @__PURE__ */ jsxs("span", { className: "absolute bottom-2 right-2 rounded-full bg-white/85 px-2.5 py-0.5 font-ui text-[10px] tracking-wide text-blue-ink shadow-sm", children: [
              "film ",
              i + 1
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-start justify-between gap-2 px-1", children: [
            /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsx("h4", { className: "truncate font-hand text-xl font-bold text-blue-ink", children: v.title }),
              /* @__PURE__ */ jsx("p", { className: "truncate font-body text-sm text-blue-ink/70", children: v.caption })
            ] }),
            /* @__PURE__ */ jsx(Film, { size: 18, className: "mt-1 shrink-0 text-blue-deep/70" })
          ] }),
          /* @__PURE__ */ jsx(Bow, { className: "absolute -bottom-3 right-4 rotate-6", size: 26, color: "#F9C8D9" })
        ] })
      },
      v.id
    )) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-7 flex flex-wrap items-center justify-center gap-2 text-blue-deep/70", children: [
      /* @__PURE__ */ jsx(Sparkle, { className: "anim-twinkle", size: 14, color: "#D9A94B" }),
      /* @__PURE__ */ jsxs("p", { className: "font-cute text-sm", children: [
        "exactly two video memories — configurable in ",
        /* @__PURE__ */ jsx("code", { className: "rounded bg-white px-1.5 py-0.5", children: "birthday.config.js" })
      ] }),
      /* @__PURE__ */ jsx(Heart, { size: 14, color: "#E48BB0" })
    ] }),
    /* @__PURE__ */ jsx(Modal, { open: !!active, onClose: close, label: active?.title || "video", maxWidth: "max-w-3xl", children: active && /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "relative overflow-hidden rounded-2xl border-2 border-white bg-blue-ink/95 shadow-scrap-lg", children: /* @__PURE__ */ jsx(
        "video",
        {
          ref: videoRef,
          className: "aspect-video w-full",
          controls: true,
          playsInline: true,
          preload: "none",
          autoPlay: false,
          poster: active.poster,
          src: fallback ? active.remoteSrc : active.src,
          onPlay: () => setIsPlaying(true),
          onPause: () => setIsPlaying(false),
          onError: () => setFallback(true),
          children: /* @__PURE__ */ jsx("track", { kind: "captions" })
        },
        `${active.id}-${fallback ? "remote" : "local"}`
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 flex flex-wrap items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-hand text-2xl font-bold text-blue-ink", children: active.title }),
          /* @__PURE__ */ jsx("p", { className: "font-body text-blue-ink/80", children: active.caption })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: togglePlay,
              className: "inline-flex items-center gap-1.5 rounded-full border-2 border-white bg-blue-deep px-4 py-1.5 font-cute text-xs font-bold text-white shadow-sm transition hover:scale-105",
              children: [
                isPlaying ? /* @__PURE__ */ jsx(Pause, { size: 13 }) : /* @__PURE__ */ jsx(Play, { size: 13 }),
                isPlaying ? "Pause" : "Play"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: close,
              className: "inline-flex items-center gap-1 rounded-full border-2 border-blue-deep/30 bg-white px-3 py-1.5 font-cute text-xs text-blue-ink transition hover:bg-pink-soft",
              children: [
                /* @__PURE__ */ jsx(X, { size: 13 }),
                " Close"
              ]
            }
          )
        ] })
      ] }),
      fallback && /* @__PURE__ */ jsxs("p", { className: "mt-3 inline-flex items-center gap-1.5 rounded-xl bg-pink-soft px-3 py-2 font-body text-sm text-pink-deep", children: [
        /* @__PURE__ */ jsx(AlertTriangle, { size: 15 }),
        "demo clip playing — drop your video at ",
        active.src,
        " to see your local video."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-center justify-center gap-2", "aria-hidden": "true", children: [
        /* @__PURE__ */ jsx(Flower, { size: 16, petal: "#F9C8D9", center: "#FFE9B8" }),
        /* @__PURE__ */ jsx(Heart, { size: 14, color: "#6FA8D6" }),
        /* @__PURE__ */ jsx(Flower, { size: 16, petal: "#DCD4F2", center: "#FFF7EC" })
      ] })
    ] }) })
  ] });
}
const PATH = "M40 300 C110 250 150 210 210 226 C270 242 290 268 350 258 C420 246 440 200 500 210 C540 216 560 250 585 262";
function MemoryMap({ onComplete }) {
  const [active, setActive] = useState(null);
  const reduce = useReducedMotion();
  const open = (loc, index) => {
    setActive({ ...loc, index });
    sfx.chime();
    onComplete?.();
  };
  return /* @__PURE__ */ jsxs(Section, { id: "map", number: 9, title: "Our Memory Map", kicker: "follow the dotted line", palette: "#A48FD0", children: [
    /* @__PURE__ */ jsx("div", { className: "relative mx-auto w-full max-w-3xl overflow-hidden rounded-[28px] border-2 border-white bg-gradient-to-b from-blue-soft via-mint/50 to-cream shadow-scrap-lg", children: /* @__PURE__ */ jsxs("div", { className: "relative aspect-[10/7] w-full", children: [
      /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 600 420", className: "absolute inset-0 h-full w-full", "aria-hidden": "true", children: [
        /* @__PURE__ */ jsxs("defs", { children: [
          /* @__PURE__ */ jsxs("linearGradient", { id: "hill1", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "#DDF3E8" }),
            /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "#C9EBDD" })
          ] }),
          /* @__PURE__ */ jsxs("linearGradient", { id: "hill2", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "#EFEAFF" }),
            /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "#DCD4F2" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("ellipse", { cx: "120", cy: "330", rx: "220", ry: "90", fill: "url(#hill1)" }),
        /* @__PURE__ */ jsx("ellipse", { cx: "500", cy: "300", rx: "230", ry: "110", fill: "url(#hill2)" }),
        /* @__PURE__ */ jsx("ellipse", { cx: "300", cy: "410", rx: "330", ry: "80", fill: "#DDF3E8", opacity: "0.75" }),
        /* @__PURE__ */ jsx("path", { d: "M0 250 C120 210 180 260 260 236 C360 208 460 250 600 220 L600 420 L0 420z", fill: "#C9EBDD", opacity: "0.5" }),
        /* @__PURE__ */ jsx("path", { d: "M20 380 C120 356 190 372 260 352 C340 330 430 356 590 336", fill: "none", stroke: "#BBDFF5", strokeWidth: "16", strokeLinecap: "round", opacity: "0.85" }),
        /* @__PURE__ */ jsx("path", { d: "M20 380 C120 356 190 372 260 352 C340 330 430 356 590 336", fill: "none", stroke: "#fff", strokeWidth: "4", strokeLinecap: "round", opacity: "0.6" }),
        [[70, 210], [110, 232], [470, 150], [520, 176], [560, 196], [250, 180]].map(([x, y], i) => /* @__PURE__ */ jsxs("g", { children: [
          /* @__PURE__ */ jsx("rect", { x: x - 2, y, width: "4", height: "14", fill: "#B98A62" }),
          /* @__PURE__ */ jsx("circle", { cx: x, cy: y - 6, r: "11", fill: "#A9DFC8" }),
          /* @__PURE__ */ jsx("circle", { cx: x - 6, cy: y - 2, r: "7", fill: "#C9EBDD" })
        ] }, i)),
        [[170, 262], [268, 268], [376, 292], [452, 246], [92, 292], [540, 286]].map(([x, y], i) => /* @__PURE__ */ jsxs("g", { children: [
          [0, 72, 144, 216, 288].map((a) => /* @__PURE__ */ jsx("ellipse", { cx: x, cy: y - 4.5, rx: "3", ry: "4.5", fill: i % 2 ? "#F9C8D9" : "#FFF7EC", transform: `rotate(${a} ${x} ${y})` }, a)),
          /* @__PURE__ */ jsx("circle", { cx: x, cy: y, r: "2.6", fill: "#FFE9B8" })
        ] }, `f${i}`)),
        /* @__PURE__ */ jsx("path", { d: PATH, fill: "none", stroke: "#fff", strokeWidth: "10", strokeLinecap: "round", opacity: "0.75" }),
        /* @__PURE__ */ jsx(
          motion.path,
          {
            d: PATH,
            fill: "none",
            stroke: "#A48FD0",
            strokeWidth: "4",
            strokeLinecap: "round",
            strokeDasharray: "2 16",
            initial: { strokeDashoffset: 0 },
            animate: reduce ? {} : { strokeDashoffset: -180 },
            transition: { duration: 9, repeat: Infinity, ease: "linear" }
          }
        ),
        /* @__PURE__ */ jsxs("g", { children: [
          /* @__PURE__ */ jsx("circle", { cx: "40", cy: "300", r: "9", fill: "#6FA8D6" }),
          /* @__PURE__ */ jsx("text", { x: "40", y: "330", textAnchor: "middle", fontSize: "15", className: "font-cute", fill: "#4A5A6A", children: "the beginning" })
        ] }),
        /* @__PURE__ */ jsxs("g", { children: [
          /* @__PURE__ */ jsx("circle", { cx: "585", cy: "262", r: "9", fill: "#E48BB0" }),
          /* @__PURE__ */ jsx("text", { x: "560", y: "240", textAnchor: "middle", fontSize: "15", className: "font-cute", fill: "#4A5A6A", children: "to be continued" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "pointer-events-none absolute inset-0", "aria-hidden": "true", children: [
        /* @__PURE__ */ jsx(Cloud, { className: "anim-float absolute left-[12%] top-[8%]", size: 62 }),
        /* @__PURE__ */ jsx(Cloud, { className: "anim-float absolute right-[14%] top-[14%]", size: 48, style: { animationDelay: "1.4s" } }),
        /* @__PURE__ */ jsx(Sun, { className: "anim-twinkle absolute right-[6%] top-[6%]", size: 40 }),
        /* @__PURE__ */ jsx(Butterfly, { className: "anim-sway absolute left-[46%] top-[18%]", size: 26, color: "#DCD4F2" }),
        /* @__PURE__ */ jsx(Leaf, { className: "anim-sway absolute left-[70%] top-[30%]", size: 20 })
      ] }),
      birthday.memoryMap.map((loc, i) => /* @__PURE__ */ jsxs(
        motion.button,
        {
          type: "button",
          onClick: () => open(loc, i),
          initial: reduce ? false : { opacity: 0, scale: 0.5, y: -10 },
          whileInView: { opacity: 1, scale: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: 0.15 + i * 0.1, type: "spring", stiffness: 220, damping: 15 },
          whileHover: { scale: 1.16, rotate: -3 },
          className: "absolute z-10 -translate-x-1/2 -translate-y-1/2",
          style: { left: `${loc.x}%`, top: `${loc.y}%` },
          "aria-label": `open memory: ${loc.name}`,
          children: [
            /* @__PURE__ */ jsxs("span", { className: "relative grid h-11 w-11 place-items-center rounded-full border-[3px] border-white bg-white text-xl shadow-scrap", children: [
              /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: loc.emoji }),
              /* @__PURE__ */ jsx("span", { className: "absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-pink-deep text-white", "aria-hidden": "true", children: /* @__PURE__ */ jsx(MapPin, { size: 11 }) })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "mt-1 block whitespace-nowrap rounded-full bg-white/90 px-2 py-0.5 font-cute text-[11px] text-blue-ink shadow-sm", children: loc.name })
          ]
        },
        loc.id
      ))
    ] }) }),
    /* @__PURE__ */ jsxs("p", { className: "mt-5 flex flex-wrap items-center justify-center gap-2 font-cute text-sm text-blue-deep/80", children: [
      /* @__PURE__ */ jsx(Navigation, { size: 14 }),
      " tap a marker to open that memory · ",
      birthday.memoryMap.length,
      " stops so far"
    ] }),
    /* @__PURE__ */ jsx(
      Lightbox,
      {
        open: !!active,
        onClose: () => setActive(null),
        src: active?.image,
        title: active?.name,
        caption: active?.caption,
        alt: active?.caption,
        note: active?.message
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 flex items-center justify-center gap-3", "aria-hidden": "true", children: [
      /* @__PURE__ */ jsx(Flower, { size: 22, petal: "#F9C8D9", center: "#FFE9B8" }),
      /* @__PURE__ */ jsx(Heart, { size: 18, color: "#E48BB0" }),
      /* @__PURE__ */ jsx(Sparkle, { className: "anim-twinkle", size: 16, color: "#A48FD0" }),
      /* @__PURE__ */ jsx(Flower, { size: 22, petal: "#DCD4F2", center: "#FFF7EC" })
    ] })
  ] });
}
function rand(seed) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}
function ScrapbookBackground({ variant = "blue", floaters = 16 }) {
  const cls = variant === "pink" ? "gingham-pink" : variant === "lavender" ? "gingham-lav" : "gingham";
  const items = useMemo(
    () => Array.from({ length: floaters }, (_, i) => {
      const r1 = rand(i + 1);
      const r2 = rand(i + 31);
      const r3 = rand(i + 77);
      const r4 = rand(i + 113);
      const kind = ["heart", "flower", "balloon", "sparkle", "star", "butterfly", "cloud"][Math.floor(r4 * 7)];
      return {
        kind,
        left: r1 * 96,
        top: 12 + r2 * 88,
        size: kind === "balloon" ? 26 + r3 * 26 : 16 + r3 * 22,
        delay: r3 * 6,
        duration: 6 + r2 * 7,
        dx: (r1 - 0.5) * 60,
        rot: (r3 - 0.5) * 90,
        color: ["#F9C8D9", "#BBDFF5", "#DCD4F2", "#FFE9B8", "#C9EBDD", "#ffffff"][Math.floor(r2 * 6)]
      };
    }),
    [floaters]
  );
  return /* @__PURE__ */ jsxs("div", { className: "pointer-events-none fixed inset-0 -z-10 overflow-hidden", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsx("div", { className: `absolute inset-0 ${cls}` }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0",
        style: {
          background: "radial-gradient(120% 80% at 50% 0%, rgba(255,255,255,.55), rgba(255,255,255,0) 60%), radial-gradient(90% 70% at 50% 100%, rgba(220,212,242,.45), rgba(255,255,255,0) 60%)"
        }
      }
    ),
    items.map((it, i) => {
      const style = {
        left: `${it.left}%`,
        top: `${it.top}%`,
        animationDelay: `${it.delay}s`,
        animationDuration: `${it.duration}s`,
        ["--dx"]: `${it.dx}px`,
        ["--rot"]: `${it.rot}deg`,
        opacity: 0.55
      };
      const wrap = /* @__PURE__ */ jsxs("div", { className: "anim-float absolute", style, children: [
        it.kind === "heart" && /* @__PURE__ */ jsx(Heart, { size: it.size, color: it.color }),
        it.kind === "flower" && /* @__PURE__ */ jsx(Flower, { size: it.size, petal: it.color, center: "#FFF7EC" }),
        it.kind === "balloon" && /* @__PURE__ */ jsx(Balloon, { size: it.size, color: it.color }),
        it.kind === "sparkle" && /* @__PURE__ */ jsx(Sparkle, { size: it.size * 0.8, color: "#ffffff" }),
        it.kind === "star" && /* @__PURE__ */ jsx(Star, { size: it.size * 0.8, color: it.color }),
        it.kind === "butterfly" && /* @__PURE__ */ jsx(Butterfly, { size: it.size, color: it.color }),
        it.kind === "cloud" && /* @__PURE__ */ jsx(Cloud, { size: it.size * 2.4, color: "#ffffff" })
      ] }, i);
      return wrap;
    })
  ] });
}
const SECTIONS = [
  { id: "candles", number: 1, label: "Candles" },
  { id: "celebration", number: 2, label: "Celebration" },
  { id: "collage", number: 3, label: "Polaroids" },
  { id: "surprises", number: 4, label: "Surprises" },
  { id: "letter", number: 5, label: "Letter" },
  { id: "gift", number: 6, label: "Gift" },
  { id: "music", number: 7, label: "Music" },
  { id: "videos", number: 8, label: "Films" },
  { id: "map", number: 9, label: "Map" }
];
function JourneyNav({ unlockedSections = ["candles"] }) {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(SECTIONS[0].id);
  const unlockedSet = new Set(unlockedSections);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    SECTIONS.forEach((s) => {
      if (unlockedSet.has(s.id)) {
        const el = document.getElementById(s.id);
        if (el) observer.observe(el);
      }
    });
    return () => observer.disconnect();
  }, [unlockedSections]);
  const scrollTo = (id) => {
    if (!unlockedSet.has(id)) return;
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "fixed inset-x-0 top-0 z-40 h-1.5 bg-white/50 backdrop-blur-xs", children: /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "h-full bg-gradient-to-r from-pink-deep via-lav-deep to-blue-deep",
        style: { width: `${progress * 100}%` },
        "aria-hidden": "true"
      }
    ) }),
    /* @__PURE__ */ jsxs(
      "nav",
      {
        "aria-label": "Journey chapters",
        className: "fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-1.5 rounded-2xl border-2 border-white/80 bg-white/80 p-2 shadow-scrap backdrop-blur-sm md:flex",
        children: [
          SECTIONS.map((s) => {
            const isUnlocked = unlockedSet.has(s.id);
            const isActive = active === s.id;
            return /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => scrollTo(s.id),
                disabled: !isUnlocked,
                "aria-label": isUnlocked ? `go to ${s.label}` : `chapter ${s.number} locked`,
                "aria-current": isActive ? "true" : void 0,
                className: `group relative grid h-8 w-8 place-items-center rounded-full text-[10px] font-bold transition ${!isUnlocked ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`,
                children: [
                  /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: `absolute inset-0 rounded-full transition ${isActive ? "bg-pink-deep text-white shadow-sm" : isUnlocked ? "bg-blue-soft text-blue-deep group-hover:bg-pink-pastel" : "bg-gray-100 text-gray-400"}`
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { className: `relative font-ui ${isActive ? "text-white" : isUnlocked ? "text-blue-deep" : "text-gray-400"}`, children: isUnlocked ? s.number : /* @__PURE__ */ jsx(Lock, { size: 11 }) }),
                  /* @__PURE__ */ jsx("span", { className: "pointer-events-none absolute right-full mr-2 whitespace-nowrap rounded-full bg-blue-ink px-2.5 py-0.5 font-cute text-xs text-white opacity-0 transition group-hover:opacity-100 shadow-sm", children: isUnlocked ? `${s.number}. ${s.label}` : `Locked · Complete earlier chapters` })
                ]
              },
              s.id
            );
          }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
              "aria-label": "back to top",
              className: "mt-1 grid h-8 w-8 place-items-center rounded-full bg-white text-blue-deep transition hover:bg-pink-pastel shadow-xs",
              children: /* @__PURE__ */ jsx(ArrowUp, { size: 14 })
            }
          )
        ]
      }
    )
  ] });
}
function LockedChapterCard({ number, label, hint, palette = "#6FA8D6" }) {
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5 },
      className: "mx-auto my-12 max-w-md px-4 text-center",
      children: /* @__PURE__ */ jsxs("div", { className: "paper paper-dashed relative overflow-hidden p-6 sm:p-8 shadow-sm", children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            className: "sticker mx-auto mb-3 grid h-10 w-10 place-items-center rounded-full border-2 border-white font-ui text-xs font-bold text-blue-ink shadow-xs",
            style: { backgroundColor: palette },
            children: String(number).padStart(2, "0")
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "mx-auto mb-2 grid h-12 w-12 place-items-center rounded-full bg-blue-soft text-blue-deep/70 anim-float", children: /* @__PURE__ */ jsx(Lock, { size: 20 }) }),
        /* @__PURE__ */ jsxs("h3", { className: "font-hand text-2xl font-bold text-blue-ink sm:text-3xl", children: [
          "Chapter ",
          number,
          ": ",
          label
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 font-cute text-base text-blue-deep/80", children: hint || "Complete the chapter above to reveal this surprise 🤍" }),
        /* @__PURE__ */ jsx("span", { className: "mt-4 inline-flex items-center gap-1.5 rounded-full border border-blue-deep/20 bg-white/70 px-3 py-1 font-cute text-xs text-blue-ink/70", children: "✨ locked secret" })
      ] })
    }
  );
}
function ScrollInvitation({ targetId, targetLabel, chapterNumber, onScrollClick }) {
  const handleScroll = () => {
    if (onScrollClick) {
      onScrollClick();
    } else {
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.9, y: 14 },
      animate: { opacity: 1, scale: 1, y: 0 },
      transition: { type: "spring", stiffness: 200, damping: 20 },
      className: "my-10 flex flex-col items-center justify-center gap-2 text-center",
      children: [
        /* @__PURE__ */ jsxs("span", { className: "sticker inline-flex items-center gap-2 rounded-full border-[3px] border-white bg-white/95 px-4 py-1.5 font-cute text-sm font-bold text-pink-deep shadow-sm", children: [
          /* @__PURE__ */ jsx(Sparkles, { size: 15 }),
          " Chapter ",
          chapterNumber,
          " Unlocked!"
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: handleScroll,
            className: "group inline-flex items-center gap-2.5 rounded-full border-[3px] border-white bg-blue-deep px-6 py-3 font-cute text-base font-bold text-white shadow-scrap transition hover:scale-105 hover:bg-blue-ink active:scale-95",
            children: [
              "Scroll down to ",
              targetLabel,
              /* @__PURE__ */ jsx(ArrowDown, { size: 16, className: "transition group-hover:translate-y-1" })
            ]
          }
        )
      ]
    }
  );
}
const CHAPTERS = [
  { id: "candles", number: 1, label: "The Candles", hint: "Blow out the candles above to unlock the celebration 🎂" },
  { id: "celebration", number: 2, label: "The Celebration", hint: "Celebrate with confetti above to open the photo album 📸" },
  { id: "collage", number: 3, label: "Polaroids & Paper", hint: "Explore your polaroid memories to discover the 12 surprises 🎁" },
  { id: "surprises", number: 4, label: "Twelve Surprises", hint: "Open at least 3 surprises to reveal the secret letter 💌" },
  { id: "letter", number: 5, label: "A Letter For You", hint: "Open the letter above to unveil the special gift box 🎀" },
  { id: "gift", number: 6, label: "The Surprise Gift", hint: "Unwrap the gift box to start our vinyl song 🎵" },
  { id: "music", number: 7, label: "Our Little Record", hint: "Listen to the melody to view our two video memories 📽️" },
  { id: "videos", number: 8, label: "Little Films", hint: "Reach the end of the videos to uncover our memory map 🗺️" },
  { id: "map", number: 9, label: "Our Memory Map", hint: "Follow the dotted path to reach the finale 🎉" }
];
const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};
function Scrapbook() {
  const confetti2 = useConfetti();
  const [unlocked, setUnlocked] = useLocalStorage("bs:unlocked-chapters", ["candles"]);
  const unlockedList = useMemo(() => {
    return Array.isArray(unlocked) && unlocked.length > 0 ? unlocked : ["candles"];
  }, [unlocked]);
  const unlockNext = useCallback(
    (currentId) => {
      const idx = CHAPTERS.findIndex((c) => c.id === currentId);
      if (idx !== -1 && idx < CHAPTERS.length - 1) {
        const nextId = CHAPTERS[idx + 1].id;
        setUnlocked((prev) => {
          const list = Array.isArray(prev) ? prev : ["candles"];
          if (list.includes(nextId)) return list;
          return [...list, nextId];
        });
      }
    },
    [setUnlocked]
  );
  const isUnlocked = useCallback((id) => unlockedList.includes(id), [unlockedList]);
  const nextLockedChapter = useMemo(() => {
    return CHAPTERS.find((c) => !unlockedList.includes(c.id)) || null;
  }, [unlockedList]);
  return /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.6 }, children: [
    /* @__PURE__ */ jsx(JourneyNav, { unlockedSections: unlockedList }),
    /* @__PURE__ */ jsxs("header", { className: "relative mx-auto w-full max-w-4xl px-4 pt-14 pb-4 text-center sm:pt-20", children: [
      /* @__PURE__ */ jsxs("div", { className: "pointer-events-none absolute inset-0", "aria-hidden": "true", children: [
        /* @__PURE__ */ jsx(Balloon, { className: "anim-float absolute left-[8%] top-[6%]", size: 30, color: "#F9C8D9" }),
        /* @__PURE__ */ jsx(Balloon, { className: "anim-float absolute right-[10%] top-[12%]", size: 26, color: "#BBDFF5", style: { animationDelay: "1.2s" } }),
        /* @__PURE__ */ jsx(Flower, { className: "anim-sway absolute left-[16%] bottom-[10%]", size: 24, petal: "#DCD4F2", center: "#FFE9B8" }),
        /* @__PURE__ */ jsx(Sparkle, { className: "anim-twinkle absolute right-[20%] bottom-[18%]", size: 16, color: "#fff" })
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "sticker inline-flex rotate-[-3deg] items-center gap-2 rounded-full border-[3px] border-white bg-white/85 px-4 py-1.5 font-cute text-sm text-pink-deep shadow-sm", children: [
        /* @__PURE__ */ jsx(Sparkles, { size: 15 }),
        " a hand-made scrapbook for ",
        birthday.recipient.name
      ] }),
      /* @__PURE__ */ jsxs("h1", { className: "mt-4 font-hand text-5xl leading-tight font-bold text-blue-ink sm:text-6xl md:text-7xl", children: [
        "Happy Birthday,",
        /* @__PURE__ */ jsx("br", {}),
        birthday.recipient.name,
        "!"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mx-auto mt-3 max-w-xl font-body text-base text-blue-ink/80 sm:text-lg", children: birthday.recipient.tagline }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 font-cute text-base text-blue-deep/80", children: "9 little chapters · scroll slowly 🤍" }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => scrollToId("candles"),
          className: "mt-6 inline-flex items-center gap-2 rounded-full border-[3px] border-white bg-blue-deep px-5 py-3 font-cute text-base font-bold text-white shadow-scrap transition hover:scale-105 active:scale-95",
          children: [
            /* @__PURE__ */ jsx(ArrowDown, { size: 16 }),
            " start with the candles"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      CandleCake,
      {
        onComplete: () => {
          unlockNext("candles");
          setTimeout(() => scrollToId("celebration"), 400);
        }
      }
    ),
    isUnlocked("celebration") && /* @__PURE__ */ jsx(
      ScrollInvitation,
      {
        targetId: "celebration",
        targetLabel: "The Celebration",
        chapterNumber: 2,
        onScrollClick: () => scrollToId("celebration")
      }
    ),
    isUnlocked("celebration") && /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, children: /* @__PURE__ */ jsx(
      BirthdayCelebration,
      {
        onComplete: () => {
          unlockNext("celebration");
        }
      }
    ) }),
    isUnlocked("celebration") && isUnlocked("collage") && /* @__PURE__ */ jsx(
      ScrollInvitation,
      {
        targetId: "collage",
        targetLabel: "Photo Memories",
        chapterNumber: 3,
        onScrollClick: () => scrollToId("collage")
      }
    ),
    isUnlocked("collage") && /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, children: /* @__PURE__ */ jsx(
      PhotoCollage,
      {
        onComplete: () => {
          unlockNext("collage");
        }
      }
    ) }),
    isUnlocked("collage") && isUnlocked("surprises") && /* @__PURE__ */ jsx(
      ScrollInvitation,
      {
        targetId: "surprises",
        targetLabel: "12 Surprises",
        chapterNumber: 4,
        onScrollClick: () => scrollToId("surprises")
      }
    ),
    isUnlocked("surprises") && /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, children: /* @__PURE__ */ jsx(
      SurpriseGrid,
      {
        onComplete: () => {
          unlockNext("surprises");
        }
      }
    ) }),
    isUnlocked("surprises") && isUnlocked("letter") && /* @__PURE__ */ jsx(
      ScrollInvitation,
      {
        targetId: "letter",
        targetLabel: "The Secret Letter",
        chapterNumber: 5,
        onScrollClick: () => scrollToId("letter")
      }
    ),
    isUnlocked("letter") && /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, children: /* @__PURE__ */ jsx(
      BirthdayLetter,
      {
        onComplete: () => {
          unlockNext("letter");
        }
      }
    ) }),
    isUnlocked("letter") && isUnlocked("gift") && /* @__PURE__ */ jsx(
      ScrollInvitation,
      {
        targetId: "gift",
        targetLabel: "The Special Gift",
        chapterNumber: 6,
        onScrollClick: () => scrollToId("gift")
      }
    ),
    isUnlocked("gift") && /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, children: /* @__PURE__ */ jsx(
      GiftBox,
      {
        onComplete: () => {
          unlockNext("gift");
        }
      }
    ) }),
    isUnlocked("gift") && isUnlocked("music") && /* @__PURE__ */ jsx(
      ScrollInvitation,
      {
        targetId: "music",
        targetLabel: "Our Melody Record",
        chapterNumber: 7,
        onScrollClick: () => scrollToId("music")
      }
    ),
    isUnlocked("music") && /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, children: /* @__PURE__ */ jsx(
      VinylPlayer,
      {
        onComplete: () => {
          unlockNext("music");
        }
      }
    ) }),
    isUnlocked("music") && isUnlocked("videos") && /* @__PURE__ */ jsx(
      ScrollInvitation,
      {
        targetId: "videos",
        targetLabel: "Two Little Films",
        chapterNumber: 8,
        onScrollClick: () => scrollToId("videos")
      }
    ),
    isUnlocked("videos") && /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, children: /* @__PURE__ */ jsx(
      VideoGallery,
      {
        onComplete: () => {
          unlockNext("videos");
        }
      }
    ) }),
    isUnlocked("videos") && isUnlocked("map") && /* @__PURE__ */ jsx(
      ScrollInvitation,
      {
        targetId: "map",
        targetLabel: "Our Memory Map",
        chapterNumber: 9,
        onScrollClick: () => scrollToId("map")
      }
    ),
    isUnlocked("map") && /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, children: /* @__PURE__ */ jsx(
      MemoryMap,
      {
        onComplete: () => {
        }
      }
    ) }),
    nextLockedChapter && /* @__PURE__ */ jsx(
      LockedChapterCard,
      {
        number: nextLockedChapter.number,
        label: nextLockedChapter.label,
        hint: nextLockedChapter.hint
      }
    ),
    /* @__PURE__ */ jsx("footer", { className: "relative mx-auto w-full max-w-3xl px-4 pt-10 pb-20 text-center", children: /* @__PURE__ */ jsxs("div", { className: "paper paper-dashed p-6 sm:p-8", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-3 flex items-center justify-center gap-2", "aria-hidden": "true", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsx(Heart, { className: "anim-float", size: 20, color: ["#E48BB0", "#6FA8D6", "#A48FD0"][i], style: { animationDelay: `${i * 0.25}s` } }, i)) }),
      /* @__PURE__ */ jsx("h2", { className: "font-hand text-3xl font-bold text-blue-ink sm:text-4xl", children: "the end of the scrapbook, the start of your year" }),
      /* @__PURE__ */ jsxs("p", { className: "mx-auto mt-3 max-w-lg font-body text-blue-ink/80", children: [
        "Made by hand, byte by byte, for ",
        birthday.recipient.name,
        ". Every name, photo, wish and surprise in here can be edited in one central file: ",
        /* @__PURE__ */ jsx("code", { className: "rounded bg-white px-1.5 py-0.5", children: "src/config/birthday.config.js" }),
        "."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-5 flex flex-wrap items-center justify-center gap-3", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => {
              confetti2.bigBang();
              sfx.party();
            },
            className: "inline-flex items-center gap-2 rounded-full border-[3px] border-white bg-pink-deep px-5 py-3 font-cute text-base font-bold text-white shadow-scrap transition hover:scale-105 active:scale-95",
            children: [
              /* @__PURE__ */ jsx(Sparkles, { size: 16 }),
              " one last confetti"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => {
              try {
                Object.keys(window.localStorage).filter((k) => k.startsWith("bs:")).forEach((k) => window.localStorage.removeItem(k));
              } catch {
              }
              window.location.reload();
            },
            className: "inline-flex items-center gap-2 rounded-full border-2 border-blue-deep/40 bg-white px-5 py-3 font-cute text-base text-blue-ink transition hover:bg-blue-soft active:scale-95",
            children: [
              /* @__PURE__ */ jsx(RotateCcw, { size: 15 }),
              " start the whole surprise over"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
            className: "inline-flex items-center gap-2 rounded-full border-2 border-blue-deep/40 bg-white px-5 py-3 font-cute text-base text-blue-ink transition hover:bg-pink-soft active:scale-95",
            children: [
              /* @__PURE__ */ jsx(ArrowDown, { size: 15, className: "rotate-180" }),
              " back to the top"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "mt-5 flex items-center justify-center gap-1.5 font-cute text-sm text-blue-deep/70", children: [
        "made with ",
        /* @__PURE__ */ jsx(Heart$1, { size: 13, color: "#E48BB0" }),
        " and far too much frosting"
      ] })
    ] }) })
  ] });
}
function App() {
  const [stage, setStage] = useLocalStorage("bs:stage", "countdown");
  const confetti2 = useConfetti();
  const unlock = useCallback(() => {
    confetti2.bigBang();
    setStage("scrapbook");
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [confetti2, setStage]);
  return /* @__PURE__ */ jsxs("div", { className: "relative min-h-[100svh] w-full overflow-x-clip", children: [
    /* @__PURE__ */ jsx(ScrapbookBackground, { variant: "blue", floaters: 18 }),
    /* @__PURE__ */ jsxs(AnimatePresence, { mode: "wait", children: [
      stage === "countdown" && /* @__PURE__ */ jsx(motion.div, { exit: { opacity: 0, scale: 0.96, filter: "blur(6px)" }, transition: { duration: 0.5 }, children: /* @__PURE__ */ jsx(
        Countdown,
        {
          onOpen: () => setStage("password"),
          onSkip: () => {
            try {
              localStorage.setItem("bs:countdown-bypassed", "true");
            } catch {
            }
            setStage("password");
          }
        }
      ) }, "countdown"),
      stage === "password" && /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, scale: 0.95, filter: "blur(6px)" },
          transition: { duration: 0.5 },
          children: /* @__PURE__ */ jsx(PasswordScreen, { onUnlock: unlock })
        },
        "password"
      ),
      stage === "scrapbook" && /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.6 }, children: /* @__PURE__ */ jsx(Scrapbook, {}) }, "scrapbook")
    ] }),
    /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Interactive birthday scrapbook with countdown, password, candles, celebration, photos, surprises, letter, gift, music, videos and memory map." })
  ] });
}
const r = (el) => () => renderToString(el);
const scenes = {
  Countdown: r(/* @__PURE__ */ jsx(Countdown, { onOpen: () => {
  } })),
  PasswordScreen: r(/* @__PURE__ */ jsx(PasswordScreen, { onUnlock: () => {
  } })),
  CandleCake: r(/* @__PURE__ */ jsx(CandleCake, { onComplete: () => {
  } })),
  BirthdayCelebration: r(/* @__PURE__ */ jsx(BirthdayCelebration, {})),
  PhotoCollage: r(/* @__PURE__ */ jsx(PhotoCollage, {})),
  SurpriseGrid: r(/* @__PURE__ */ jsx(SurpriseGrid, {})),
  BirthdayLetter: r(/* @__PURE__ */ jsx(BirthdayLetter, {})),
  GiftBox: r(/* @__PURE__ */ jsx(GiftBox, {})),
  VinylPlayer: r(/* @__PURE__ */ jsx(VinylPlayer, {})),
  VideoGallery: r(/* @__PURE__ */ jsx(VideoGallery, {})),
  MemoryMap: r(/* @__PURE__ */ jsx(MemoryMap, {})),
  ScrapbookBackground: r(/* @__PURE__ */ jsx(ScrapbookBackground, {})),
  JourneyNav: r(/* @__PURE__ */ jsx(JourneyNav, { unlockedSections: ["candles", "celebration", "collage", "surprises", "letter", "gift", "music", "videos", "map"] })),
  App: r(/* @__PURE__ */ jsx(App, {}))
};
export {
  birthday as config,
  scenes
};
