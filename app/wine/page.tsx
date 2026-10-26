"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { wines, type WineNote } from "../../data/wines";
import { SiteFooter, SiteHeader } from "../site-header";
import { foodShortcuts, matchesWine, type SearchMode } from "./search";

function parsedVintage(name:string){return name.match(/(?:19|20)\d{2}(?!.*\d)/)?.[0]||(/N\.V\./i.test(name)?"N.V.":null)}
function Scale({value}:{value:number}){return <span className="wine-scale" aria-label={`5점 중 ${value}점`}>{[1,2,3,4,5].map(n=><i className={n<=value?"filled":""} key={n}/>)}</span>}

const focusableSelector = 'a[href],button:not([disabled]),input,[tabindex]:not([tabindex="-1"])';

function WineDetail({wine,onClose,onPrevious,onNext,position,total}:{wine:WineNote,onClose:()=>void,onPrevious:()=>void,onNext:()=>void,position:number,total:number}){
  const vintage=wine.vintage||parsedVintage(wine.name);
  const subtitle=[vintage,wine.country,wine.region].filter(Boolean).join(" · ");
  const cardRef=useRef<HTMLDivElement>(null);
  const closeRef=useRef<HTMLButtonElement>(null);
  // Focus starts inside the dialog and the page behind it stops scrolling.
  useEffect(()=>{closeRef.current?.focus();const root=document.documentElement;root.classList.add("lock");return()=>{root.classList.remove("lock")}},[]);
  useEffect(()=>{const key=(e:KeyboardEvent)=>{
    if(e.key==="Escape"){e.preventDefault();onClose();return}
    if(total>1&&e.key==="ArrowLeft"){onPrevious();return}
    if(total>1&&e.key==="ArrowRight"){onNext();return}
    if(e.key!=="Tab")return;
    const nodes=Array.from(cardRef.current?.querySelectorAll<HTMLElement>(focusableSelector)??[]).filter(node=>node.offsetParent!==null||node===closeRef.current);
    if(!nodes.length)return;
    const first=nodes[0],last=nodes[nodes.length-1],active=document.activeElement;
    if(e.shiftKey&&(active===first||!cardRef.current?.contains(active))){e.preventDefault();last.focus()}
    else if(!e.shiftKey&&active===last){e.preventDefault();first.focus()}
  };document.addEventListener("keydown",key);return()=>document.removeEventListener("keydown",key)},[onClose,onNext,onPrevious,total]);
  return <div className="wine-modal" onClick={onClose}><div className="wd" role="dialog" aria-modal="true" aria-label={wine.name} ref={cardRef} onClick={e=>e.stopPropagation()}>
    <div className="wd-img"><img src={wine.image} alt={`${wine.name} 사진`}/></div>
    <div className="wd-body">
      <button className="wd-close" type="button" onClick={onClose} aria-label="닫기 (Esc)" ref={closeRef}>×</button>
      <p className="overline">TASTING NOTE</p><h2>{wine.name}</h2>
      {subtitle&&<p className="wd-sub">{subtitle}</p>}
      <dl>{vintage&&<><dt>빈티지</dt><dd>{vintage}</dd></>}{wine.producer&&<><dt>생산자</dt><dd>{wine.producer}</dd></>}{(wine.country||wine.region)&&<><dt>산지</dt><dd>{[wine.country,wine.region].filter(Boolean).join(" · ")}</dd></>}{wine.grapes&&<><dt>품종</dt><dd>{wine.grapes.join(", ")}</dd></>}{wine.price&&<><dt>가격</dt><dd>{wine.price}</dd></>}{wine.aromas&&<><dt>향</dt><dd>{wine.aromas.join(", ")}</dd></>}{wine.palate&&<><dt>맛</dt><dd>{wine.palate}</dd></>}{wine.body&&<><dt>바디</dt><dd><Scale value={wine.body}/></dd></>}{wine.acidity&&<><dt>산도</dt><dd><Scale value={wine.acidity}/></dd></>}{wine.tannin&&<><dt>타닌</dt><dd><Scale value={wine.tannin}/></dd></>}{wine.pairings?.length ? <><dt>추천 페어링</dt><dd>{wine.pairings.join(", ")}</dd></> : null}</dl>
      {wine.oneLine&&<blockquote>“{wine.oneLine}”</blockquote>}
      <div className="wd-nav" aria-label={`검색 결과 ${position} / ${total}`}><button type="button" onClick={onPrevious} disabled={total<2} aria-label="이전 와인">← 이전</button><span aria-live="polite">{position} / {total}</span><button type="button" onClick={onNext} disabled={total<2} aria-label="다음 와인">다음 →</button></div>
    </div>
  </div></div>
}

export default function WinePage(){
  const [selected,setSelected]=useState<WineNote|null>(null);
  const [mode,setMode]=useState<SearchMode>("name");
  const [queries,setQueries]=useState({name:"",pairing:""});
  const openerRef=useRef<HTMLElement|null>(null);
  const query=queries[mode];
  const setQuery=(value:string)=>setQueries(previous=>({...previous,[mode]:value}));
  const visibleWines=wines.map((wine,index)=>({wine,index})).filter(({wine})=>matchesWine(wine,query,mode));
  const selectedIndex=selected?visibleWines.findIndex(({wine})=>wine.slug===selected.slug):-1;
  const modalTotal=selectedIndex>=0?visibleWines.length:1;
  const modalPosition=selectedIndex>=0?selectedIndex+1:1;
  useEffect(()=>{const sync=(state:unknown)=>{const slug=typeof state==="object"&&state!==null&&"wineModalSlug" in state?(state as {wineModalSlug?:string}).wineModalSlug:undefined;setSelected(slug?wines.find(wine=>wine.slug===slug)??null:null)};const pop=(event:PopStateEvent)=>sync(event.state);sync(window.history.state);window.addEventListener("popstate",pop);return()=>window.removeEventListener("popstate",pop)},[]);
  // Returning from the modal (tap, Esc, or Android back) puts focus back on the tile that opened it.
  useEffect(()=>{if(selected)return;const opener=openerRef.current;openerRef.current=null;if(opener&&document.contains(opener))opener.focus()},[selected]);
  const openWine=(wine:WineNote,trigger:HTMLElement)=>{openerRef.current=trigger;window.history.pushState({...window.history.state,wineModalSlug:wine.slug},"");setSelected(wine)};
  const closeWine=()=>{if(window.history.state?.wineModalSlug)window.history.back();else setSelected(null)};
  const moveWine=(step:number)=>{if(selectedIndex<0||visibleWines.length<2)return;const next=visibleWines[(selectedIndex+step+visibleWines.length)%visibleWines.length].wine;window.history.replaceState({...window.history.state,wineModalSlug:next.slug},"");setSelected(next)};
  return <main id="top"><SiteHeader />
  <div className="wrap" id="main-content" tabIndex={-1}>
    <header className="page-head">
      <p className="overline">WINE TASTING ARCHIVE</p>
      <h1>Wine Notes</h1>
      <p className="lead wine-intro">와인의 향과 맛, 인상 깊었던 순간을 담은 사진과 테이스팅 노트{" "}<Link href="/wine/beyond">그리고 약간의 일탈 →</Link></p>
    </header>

    <section aria-label="와인 검색과 목록">
      <div className="wine-tools">
        <div className="wine-modes" role="group" aria-label="검색 방식" data-mode={mode}>
          <button type="button" aria-pressed={mode==="name"} onClick={()=>setMode("name")}>와인으로 찾기</button>
          <button type="button" aria-pressed={mode==="pairing"} onClick={()=>setMode("pairing")}>음식과 맞추기</button>
        </div>
        <div className="field">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg>
          <input id="wine-name-search" aria-label={mode==="name"?"와인 이름 검색":"페어링 음식 검색"} type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder={mode==="name"?"와인 이름을 입력하세요":"어떤 음식과 함께 페어링할까요?"} autoComplete="off"/>
          {query&&<button className="clear" type="button" onClick={()=>setQuery("")} aria-label="검색어 지우기">×</button>}
        </div>
        {mode==="pairing"&&<div className="wine-shortcuts" role="group" aria-label="음식 빠른 검색">{foodShortcuts.map(food=><button key={food} type="button" aria-pressed={query===food} onClick={()=>setQuery(query===food?"":food)}>{food}</button>)}</div>}
        <p className="sr-only" aria-live="polite">{query?`${wines.length}개 중 ${visibleWines.length}개`:`전체 ${wines.length}개`}</p>
      </div>

      {visibleWines.length>0
        ? <ul className="wine-grid">{visibleWines.map(({wine,index})=>{const vintage=wine.vintage||parsedVintage(wine.name);const meta=[vintage,wine.country,wine.region].filter(Boolean).join(" · ");return <li key={wine.slug}>
            <button className="tile" type="button" aria-haspopup="dialog" onClick={event=>openWine(wine,event.currentTarget)} aria-label={`${wine.name} 정보 보기`}>
              <span className="tile-img"><img src={wine.image} alt="" loading="lazy" width={600} height={750}/></span>
              <span className="tile-no">{String(index+1).padStart(2,"0")}</span>
              <span className="tile-name">{wine.name}</span>
              {meta&&<span className="tile-meta">{meta}</span>}
            </button>
          </li>})}</ul>
        : <p className="empty">{mode==="name"?`“${query}”와 일치하는 와인 이름이 없습니다.`:`“${query}”와 어울리는 와인 기록이 없습니다.`}</p>}
    </section>
  </div>
  {selected&&<WineDetail wine={selected} onClose={closeWine} onPrevious={()=>moveWine(-1)} onNext={()=>moveWine(1)} position={modalPosition} total={modalTotal}/>}
  <SiteFooter label="Yongho Ko · Wine Notes" /></main>}
