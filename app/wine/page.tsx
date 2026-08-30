"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { wines, type WineNote } from "../../data/wines";
import { SiteHeader } from "../site-header";

function parsedVintage(name:string){return name.match(/(?:19|20)\d{2}(?!.*\d)/)?.[0]||(/N\.V\./i.test(name)?"N.V.":null)}
function normalizedName(name:string){return name.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLocaleLowerCase()}
function Scale({value}:{value:number}){return <span className="wine-scale" aria-label={`5점 중 ${value}점`}>{[1,2,3,4,5].map(n=><i className={n<=value?"filled":""} key={n}/>)}</span>}

function WineDetail({wine,onClose,onPrevious,onNext,position,total}:{wine:WineNote,onClose:()=>void,onPrevious:()=>void,onNext:()=>void,position:number,total:number}){
  const vintage=wine.vintage||parsedVintage(wine.name);
  useEffect(()=>{const key=(e:KeyboardEvent)=>{if(e.key==="Escape")onClose();if(total>1&&e.key==="ArrowLeft")onPrevious();if(total>1&&e.key==="ArrowRight")onNext()};document.addEventListener("keydown",key);return()=>document.removeEventListener("keydown",key)},[onClose,onNext,onPrevious,total]);
  return <div className="wine-modal" role="dialog" aria-modal="true" aria-label={wine.name} onClick={onClose}><div className="wine-modal-card" onClick={e=>e.stopPropagation()}>
    <button className="wine-close" onClick={onClose} aria-label="닫기">×</button><img src={wine.image} alt={wine.name}/>
    <div className="wine-modal-copy"><p className="overline">TASTING NOTE</p><h2>{wine.name}</h2>
      <div className="wine-modal-nav" aria-label={`검색 결과 ${position} / ${total}`}><button type="button" onClick={onPrevious} disabled={total<2} aria-label="이전 와인">← 이전</button><span><b>{position}</b> / {total}</span><button type="button" onClick={onNext} disabled={total<2} aria-label="다음 와인">다음 →</button></div>
      <dl>{vintage&&<div><dt>빈티지</dt><dd>{vintage}</dd></div>}{wine.producer&&<div><dt>생산자</dt><dd>{wine.producer}</dd></div>}{(wine.country||wine.region)&&<div><dt>산지</dt><dd>{[wine.country,wine.region].filter(Boolean).join(" · ")}</dd></div>}{wine.grapes&&<div><dt>품종</dt><dd>{wine.grapes.join(", ")}</dd></div>}{wine.price&&<div><dt>가격</dt><dd>{wine.price}</dd></div>}{wine.aromas&&<div><dt>향</dt><dd>{wine.aromas.join(", ")}</dd></div>}{wine.palate&&<div><dt>맛</dt><dd>{wine.palate}</dd></div>}{wine.body&&<div><dt>바디</dt><dd><Scale value={wine.body}/></dd></div>}{wine.acidity&&<div><dt>산도</dt><dd><Scale value={wine.acidity}/></dd></div>}{wine.tannin&&<div><dt>타닌</dt><dd><Scale value={wine.tannin}/></dd></div>}</dl>
      {wine.oneLine&&<blockquote>“{wine.oneLine}”</blockquote>}
    </div></div></div>
}

export default function WinePage(){
  const [selected,setSelected]=useState<WineNote|null>(null);
  const [query,setQuery]=useState("");
  const search=normalizedName(query.trim());
  const visibleWines=wines.map((wine,index)=>({wine,index})).filter(({wine})=>!search||normalizedName(wine.name).includes(search));
  const selectedIndex=selected?visibleWines.findIndex(({wine})=>wine.slug===selected.slug):-1;
  const modalTotal=selectedIndex>=0?visibleWines.length:1;
  const modalPosition=selectedIndex>=0?selectedIndex+1:1;
  useEffect(()=>{const sync=(state:unknown)=>{const slug=typeof state==="object"&&state!==null&&"wineModalSlug" in state?(state as {wineModalSlug?:string}).wineModalSlug:undefined;setSelected(slug?wines.find(wine=>wine.slug===slug)??null:null)};const pop=(event:PopStateEvent)=>sync(event.state);sync(window.history.state);window.addEventListener("popstate",pop);return()=>window.removeEventListener("popstate",pop)},[]);
  const openWine=(wine:WineNote)=>{window.history.pushState({...window.history.state,wineModalSlug:wine.slug},"");setSelected(wine)};
  const closeWine=()=>{if(window.history.state?.wineModalSlug)window.history.back();else setSelected(null)};
  const moveWine=(step:number)=>{if(selectedIndex<0||visibleWines.length<2)return;const next=visibleWines[(selectedIndex+step+visibleWines.length)%visibleWines.length].wine;window.history.replaceState({...window.history.state,wineModalSlug:next.slug},"");setSelected(next)};
  return <main className="wine-page" id="top"><SiteHeader />
  <section className="wine-head"><p className="overline">WINE TASTING ARCHIVE</p><h1>Wine Notes</h1><p className="wine-intro-row">와인의 향과 맛, 인상 깊었던 순간을 담은 사진과 테이스팅 노트{" "}<Link href="/wine/beyond">그리고 약간의 일탈 →</Link></p></section>
  <section className="wine-search" aria-label="와인 이름 검색">
    <div className="wine-search-field"><label htmlFor="wine-name-search">Wine Search</label><div className="wine-search-control">
      <input id="wine-name-search" type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="와인 이름으로 검색" autoComplete="off"/>
      {query&&<button className="wine-search-clear" type="button" onClick={()=>setQuery("")} aria-label="검색어 지우기">×</button>}
    </div></div>
    <p className="wine-search-count" aria-live="polite">{query.trim()?`${visibleWines.length}개 검색 결과`:`전체 ${wines.length}개`}</p>
  </section>
  <section className="wine-gallery">{visibleWines.length?visibleWines.map(({wine,index})=><button className="wine-tile" key={wine.slug} onClick={()=>openWine(wine)} aria-label={`${wine.name} 정보 보기`}><img src={wine.image} alt="" loading="lazy"/><span><b>{String(index+1).padStart(2,"0")}</b>{wine.name}</span></button>):<p className="wine-search-empty">일치하는 와인 이름이 없습니다.</p>}</section>
  {selected&&<WineDetail wine={selected} onClose={closeWine} onPrevious={()=>moveWine(-1)} onNext={()=>moveWine(1)} position={modalPosition} total={modalTotal}/>}
  <footer><span>Yongho Ko · Wine Notes</span><a href="#top">Back to top ↑</a></footer></main>}
