"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { wines, type WineNote } from "../../data/wines";

function parsedVintage(name:string){return name.match(/(?:19|20)\d{2}(?!.*\d)/)?.[0]||(/N\.V\./i.test(name)?"N.V.":null)}
function Scale({value}:{value:number}){return <span className="wine-scale" aria-label={`5점 중 ${value}점`}>{[1,2,3,4,5].map(n=><i className={n<=value?"filled":""} key={n}/>)}</span>}

function WineDetail({wine,onClose}:{wine:WineNote,onClose:()=>void}){
  const vintage=wine.vintage||parsedVintage(wine.name);
  useEffect(()=>{const key=(e:KeyboardEvent)=>e.key==="Escape"&&onClose();document.addEventListener("keydown",key);return()=>document.removeEventListener("keydown",key)},[onClose]);
  return <div className="wine-modal" role="dialog" aria-modal="true" aria-label={wine.name} onClick={onClose}><div className="wine-modal-card" onClick={e=>e.stopPropagation()}>
    <button className="wine-close" onClick={onClose} aria-label="닫기">×</button><img src={wine.image} alt={wine.name}/>
    <div className="wine-modal-copy"><p className="overline">TASTING NOTE</p><h2>{wine.name}</h2>
      <dl>{vintage&&<div><dt>빈티지</dt><dd>{vintage}</dd></div>}{wine.producer&&<div><dt>생산자</dt><dd>{wine.producer}</dd></div>}{(wine.country||wine.region)&&<div><dt>산지</dt><dd>{[wine.country,wine.region].filter(Boolean).join(" · ")}</dd></div>}{wine.grapes&&<div><dt>품종</dt><dd>{wine.grapes.join(", ")}</dd></div>}{wine.price&&<div><dt>가격</dt><dd>{wine.price}</dd></div>}{wine.aromas&&<div><dt>향</dt><dd>{wine.aromas.join(", ")}</dd></div>}{wine.palate&&<div><dt>맛</dt><dd>{wine.palate}</dd></div>}{wine.body&&<div><dt>바디</dt><dd><Scale value={wine.body}/></dd></div>}{wine.acidity&&<div><dt>산도</dt><dd><Scale value={wine.acidity}/></dd></div>}{wine.tannin&&<div><dt>타닌</dt><dd><Scale value={wine.tannin}/></dd></div>}</dl>
      {wine.oneLine&&<blockquote>“{wine.oneLine}”</blockquote>}
    </div></div></div>
}

export default function WinePage(){const [selected,setSelected]=useState<WineNote|null>(null);return <main className="wine-page" id="top"><header className="topbar"><Link className="wordmark" href="/"><strong>Yong9</strong><small>MOBILE SECURITY RESEARCHER</small></Link><nav aria-label="Main navigation"><Link href="/">Home</Link><Link href="/cv">Academic CV</Link><Link href="/projects">Projects</Link><Link href="/wine">Wine Notes</Link></nav></header>
  <section className="wine-head"><p className="overline">WINE TASTING ARCHIVE</p><h1>Wine Notes</h1><p>마신 와인의 사진과 테이스팅 노트를 모았습니다. 사진을 선택하면 상세 기록을 볼 수 있습니다.</p></section>
  <section className="wine-gallery">{wines.map((w,i)=><button className="wine-tile" key={w.slug} onClick={()=>setSelected(w)} aria-label={`${w.name} 정보 보기`}><img src={w.image} alt="" loading="lazy"/><span><b>{String(i+1).padStart(2,"0")}</b>{w.name}</span></button>)}</section>
  {selected&&<WineDetail wine={selected} onClose={()=>setSelected(null)}/>}
  <footer><span>Yongho Ko · Wine Notes</span><a href="#top">Back to top ↑</a></footer></main>}
