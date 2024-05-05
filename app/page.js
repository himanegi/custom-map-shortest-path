"use client";
import Map from "./map/page.js";

export default function Home() {
  const myPoints = [
    [25.495888259522516, 81.86993608590821], //Uptron
    [25.49861488542562, 81.86312708481141], //Teliyarganj Chauraha
    [25.494318289237118, 81.86126713666609], //Yamuna Gate
    [25.492486990625462, 81.85701173913526], // APS Old Cantt
    [25.492657811815377, 81.8610579644117], //Ganga Gate
    [25.494318289237118, 81.86126713666609], //Yamuna Gate
    [25.492657811815377, 81.8610579644117], //Ganga Gate
    [25.480122171991997, 81.8624741883314], //Army Canteen
    [25.495888259522516, 81.86993608590821], //Uptron
    [25.480122171991997, 81.8624741883314], //Army Canteen
    [25.47257897045846, 81.85668489287013], //Old Katra
    [25.474033767581517, 81.8477323741156], //Belly Gaon
    [25.492486990625462, 81.85701173913526], // APS Old Cantt
    [25.474033767581517, 81.8477323741156], //Belly Gaon
    [25.47257897045846, 81.85668489287013], //Old Katra
    [25.470262035007487, 81.86253387178975], //Allahabad Uni
    [25.480122171991997, 81.8624741883314], //Army Canteen
    [25.470262035007487, 81.86253387178975], //Allahabad Uni
    [25.456736707332805, 81.8593706484965], //Tagore Town
    [25.464765870097402, 81.85191021620103], //Katra
    [25.46158660125893, 81.84427073353051], //Police Line
    [25.474033767581517, 81.8477323741156], //Belly Gaon
    [25.47257897045846, 81.85668489287013], //Old Katra
    [25.464765870097402, 81.85191021620103], //Katra
    [25.456736707332805, 81.8593706484965], //Tagore Town
    [25.442679868982705, 81.86735496207731], //Chungi
    [25.445581209458688, 81.85746077782231], //CMP Degree College
    [25.449623175857198, 81.85125369815248], //RamnathPur
    [25.456736707332805, 81.8593706484965], //Tagore Town
    [25.458088766131926, 81.85187816003692], //CA Park
    [25.46158660125893, 81.84427073353051], //Police Line
    [25.4544052785852, 81.82523194476462], //Allahabad High Court
    [25.45295982867542, 81.83494025578001], //Civil Lines
    [25.449623175857198, 81.85125369815248], //RamnathPur
  ];
  return <Map myPoints={myPoints} />;
}
