import{a as S,u as y,b as G,L as I}from"./movie-6QG5fM87.js";import{_ as B,u as L,r as h,o as T,a as o,c as n,e as t,F as d,f as v,d as c,b as $,n as f,t as _,p as D,g as M}from"./index-qBIgT9SV.js";const V=r=>(D("data-v-2969204e"),r=r(),M(),r),b=V(()=>t("h1",null,"Televisão",-1)),x={class:"genre-list"},N=["onClick"],R={class:"movie-list"},F=["src","alt","onClick"],z={class:"movie-details"},A=["onClick"],E={class:"movie-release-date"},U={class:"movie-genres"},j=["onClick"],q={__name:"TvView",setup(r){const i=S(),k=y(),C=L(),l=h(!1),w=s=>new Date(s).toLocaleDateString("pt-BR"),m=h([]),p=async s=>{i.setCurrentGenreId(s),l.value=!0;const u=await G.get("discover/tv",{params:{with_genres:s,language:"pt-BR"}});m.value=u.data.results,l.value=!1},g=async s=>{await k.getTv(s),C.push("/filme")};return T(async()=>{l.value=!0,await i.getAllGenres(),p(10759),l.value=!1}),(s,u)=>(o(),n(d,null,[b,t("ul",x,[(o(!0),n(d,null,v(c(i).tv_genres,e=>(o(),n("li",{key:e.id,onClick:a=>p(e.id),class:f(["genre-item",{active:e.id===c(i).currentGenreId}])},_(e.name),11,N))),128))]),$(c(I),{active:l.value,"onUpdate:active":u[0]||(u[0]=e=>l.value=e),"is-full-page":""},null,8,["active"]),t("div",R,[(o(!0),n(d,null,v(m.value,e=>(o(),n("div",{key:e.id,class:"movie-card"},[t("img",{src:`https://image.tmdb.org/t/p/w500${e.poster_path}`,alt:e.name,onClick:a=>g(e.id)},null,8,F),t("div",z,[t("p",{class:"movie-title",onClick:a=>g(e.id)},_(e.name),9,A),t("p",E,_(w(e.first_air_date)),1),t("p",U,[(o(!0),n(d,null,v(e.genre_ids,a=>(o(),n("span",{key:a,onClick:H=>p(a),class:f({active:a===c(i).currentGenreId})},_(c(i).getTvGenreName(a)),11,j))),128))])])]))),128))])],64))}},O=B(q,[["__scopeId","data-v-2969204e"]]);export{O as default};