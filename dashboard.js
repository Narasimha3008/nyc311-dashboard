/* NYC 311 Executive Dashboard — dashboard.js */

const PAL = ['#185FA5','#E24B4A','#639922','#EF9F27','#7F77DD','#0F6E56','#D85A30','#5F5E5A'];
const BASE_BOROUGHS = ['Bronx','Brooklyn','Manhattan','Queens','Staten Isl.'];

const BOROUGH_DATA = {
  'Bronx':      {vol:5.6, res:11.4, top:'HEAT/HOT WATER',      color:'#A32D2D', sla:22.1, phone:52,online:28,app:14,other:6},
  'Brooklyn':   {vol:8.9, res:7.2,  top:'Noise – Residential', color:'#185FA5', sla:18.3, phone:44,online:32,app:18,other:6},
  'Manhattan':  {vol:6.8, res:6.3,  top:'Noise – Residential', color:'#854F0B', sla:14.2, phone:38,online:38,app:20,other:4},
  'Queens':     {vol:7.4, res:8.1,  top:'Blocked Driveway',    color:'#0F6E56', sla:16.8, phone:46,online:30,app:17,other:7},
  'Staten Isl.':{vol:1.2, res:9.8,  top:'Noise – Residential', color:'#7F77DD', sla:20.4, phone:58,online:24,app:11,other:7}
};

const AGENCY_BOROUGH = {
  NYPD:{share:{Bronx:.22,Brooklyn:.28,Manhattan:.24,Queens:.21,'Staten Isl.':.05},res:{Bronx:16.1,Brooklyn:14.8,Manhattan:13.2,Queens:13.9,'Staten Isl.':14.0},sla:{Bronx:38.2,Brooklyn:35.1,Manhattan:30.4,Queens:32.8,'Staten Isl.':34.0}},
  HPD: {share:{Bronx:.30,Brooklyn:.32,Manhattan:.24,Queens:.12,'Staten Isl.':.02},res:{Bronx:12.1,Brooklyn:10.4,Manhattan:8.6, Queens:9.2,'Staten Isl.':8.8}, sla:{Bronx:26.4,Brooklyn:22.8,Manhattan:17.2,Queens:19.6,'Staten Isl.':18.0}},
  DOT: {share:{Bronx:.20,Brooklyn:.28,Manhattan:.22,Queens:.24,'Staten Isl.':.06},res:{Bronx:6.2,Brooklyn:5.6,Manhattan:4.8,Queens:5.1,'Staten Isl.':5.4},  sla:{Bronx:11.2,Brooklyn:9.0,Manhattan:7.1,Queens:7.8,'Staten Isl.':8.2}},
  DSNY:{share:{Bronx:.20,Brooklyn:.29,Manhattan:.21,Queens:.23,'Staten Isl.':.07},res:{Bronx:2.4,Brooklyn:2.2,Manhattan:1.9,Queens:2.1,'Staten Isl.':2.2},  sla:{Bronx:3.8,Brooklyn:3.1,Manhattan:2.4,Queens:2.7,'Staten Isl.':2.8}},
  DEP: {share:{Bronx:.22,Brooklyn:.27,Manhattan:.20,Queens:.24,'Staten Isl.':.07},res:{Bronx:7.1,Brooklyn:6.2,Manhattan:5.0,Queens:5.6,'Staten Isl.':5.8},  sla:{Bronx:12.4,Brooklyn:9.8,Manhattan:7.2,Queens:8.6,'Staten Isl.':9.0}},
  DOB: {share:{Bronx:.24,Brooklyn:.30,Manhattan:.26,Queens:.17,'Staten Isl.':.03},res:{Bronx:21.2,Brooklyn:19.4,Manhattan:17.1,Queens:18.2,'Staten Isl.':17.8},sla:{Bronx:33.4,Brooklyn:29.8,Manhattan:25.1,Queens:27.4,'Staten Isl.':26.0}},
  DPR: {share:{Bronx:.22,Brooklyn:.28,Manhattan:.18,Queens:.24,'Staten Isl.':.08},res:{Bronx:13.4,Brooklyn:11.8,Manhattan:10.2,Queens:11.0,'Staten Isl.':11.4},sla:{Bronx:21.2,Brooklyn:18.4,Manhattan:14.6,Queens:16.8,'Staten Isl.':16.0}},
  DOHMH:{share:{Bronx:.26,Brooklyn:.29,Manhattan:.20,Queens:.20,'Staten Isl.':.05},res:{Bronx:9.2,Brooklyn:7.8,Manhattan:6.4,Queens:7.1,'Staten Isl.':7.4},  sla:{Bronx:16.4,Brooklyn:13.2,Manhattan:10.8,Queens:12.0,'Staten Isl.':12.4}}
};

const AGENCY_BASE = [
  {n:'NYPD', full:'Police Dept',       vol:8.2, res:14.3, br:34.1, op:312000},
  {n:'HPD',  full:'Housing Pres & Dev',vol:6.9, res:9.8,  br:21.4, op:188000},
  {n:'DOT',  full:'Transportation',    vol:4.1, res:5.2,  br:8.3,  op:42000},
  {n:'DSNY', full:'Sanitation',        vol:3.8, res:2.1,  br:2.9,  op:18000},
  {n:'DEP',  full:'Env Protection',    vol:3.2, res:5.8,  br:9.1,  op:31000},
  {n:'DOB',  full:'Buildings',         vol:2.4, res:18.7, br:28.6, op:97000},
  {n:'DPR',  full:'Parks & Rec',       vol:1.6, res:11.2, br:17.3, op:44000},
  {n:'DOHMH',full:'Health & MH',       vol:1.1, res:7.4,  br:12.8, op:22000}
];

const COMPLAINT_DATA = {
  'ALL':       [{n:'Noise – Residential',v:5.2,r:.91},{n:'HEAT/HOT WATER',v:4.1,r:.62},{n:'Blocked Driveway',v:3.3,r:.88},{n:'Illegal Parking',v:2.8,r:.79},{n:'Street Condition',v:2.4,r:.55},{n:'Noise – Street/Sidewalk',v:2.1,r:.93},{n:'PLUMBING',v:1.8,r:.58},{n:'Sanitation Condition',v:1.6,r:.72},{n:'Unsanitary Condition',v:1.4,r:.61},{n:'Derelict Vehicles',v:1.1,r:.44}],
  'Bronx':     [{n:'HEAT/HOT WATER',v:1.4,r:.55},{n:'Noise – Residential',v:1.1,r:.88},{n:'PLUMBING',v:.8,r:.52},{n:'Street Light Cond',v:.6,r:.71},{n:'Blocked Driveway',v:.5,r:.84},{n:'Boiler',v:.4,r:.60},{n:'Street Condition',v:.4,r:.49},{n:'Sanitation Cond',v:.35,r:.68},{n:'Unsanitary Cond',v:.3,r:.58},{n:'Rodent',v:.28,r:.42}],
  'Brooklyn':  [{n:'Noise – Residential',v:2.1,r:.92},{n:'HEAT/HOT WATER',v:1.6,r:.61},{n:'Blocked Driveway',v:1.2,r:.87},{n:'Illegal Parking',v:1.0,r:.78},{n:'Street Condition',v:.9,r:.54},{n:'Sanitation Cond',v:.7,r:.70},{n:'PLUMBING',v:.6,r:.57},{n:'Street Light Cond',v:.55,r:.73},{n:'Graffiti',v:.5,r:.80},{n:'Rodent',v:.4,r:.40}],
  'Manhattan': [{n:'Noise – Residential',v:1.8,r:.93},{n:'HEAT/HOT WATER',v:1.1,r:.65},{n:'Noise – Street/Sidewalk',v:.9,r:.94},{n:'Street Light Cond',v:.7,r:.72},{n:'Illegal Parking',v:.65,r:.80},{n:'Sanitation Cond',v:.6,r:.71},{n:'Street Condition',v:.55,r:.53},{n:'PLUMBING',v:.45,r:.60},{n:'Building/Use',v:.4,r:.45},{n:'Unsanitary Cond',v:.35,r:.62}],
  'Queens':    [{n:'Blocked Driveway',v:1.5,r:.89},{n:'Noise – Residential',v:1.4,r:.90},{n:'Illegal Parking',v:1.3,r:.78},{n:'Street Condition',v:.8,r:.56},{n:'HEAT/HOT WATER',v:.7,r:.60},{n:'Sanitation Cond',v:.55,r:.69},{n:'Street Light Cond',v:.5,r:.74},{n:'PLUMBING',v:.45,r:.55},{n:'Noise – Street/Sidewalk',v:.4,r:.91},{n:'Rodent',v:.35,r:.38}],
  'Staten Isl.':[{n:'Noise – Residential',v:.45,r:.91},{n:'Street Condition',v:.32,r:.57},{n:'Blocked Driveway',v:.28,r:.86},{n:'Sanitation Cond',v:.2,r:.68},{n:'Street Light Cond',v:.18,r:.75},{n:'Illegal Parking',v:.16,r:.77},{n:'HEAT/HOT WATER',v:.14,r:.64},{n:'Noise – Street/Sidewalk',v:.12,r:.92},{n:'Rodent',v:.1,r:.41},{n:'PLUMBING',v:.09,r:.58}]
};

const YEAR_MUL = {2020:.78,2021:.82,2022:.93,2023:1.0,2024:1.06,2025:1.08,2026:.32};
const STATUS_W  = {Open:.068,Closed:.851,Pending:.043,Assigned:.027,Cancelled:.011};
const CB_DATA   = [
  ['CB 01','Bronx',142000,18400,22.4,'HEAT/HOT WATER'],
  ['CB 16','Bronx',128000,15600,19.8,'HEAT/HOT WATER'],
  ['CB 05','Brooklyn',118000,14200,18.3,'Noise – Residential'],
  ['CB 17','Brooklyn',112000,13800,17.1,'Blocked Driveway'],
  ['CB 12','Manhattan',108000,12400,16.7,'Noise – Residential'],
  ['CB 04','Queens',104000,11900,15.9,'Illegal Parking'],
  ['CB 14','Queens',99000,11200,14.6,'Street Condition'],
  ['CB 03','Bronx',96000,10800,13.8,'PLUMBING'],
  ['CB 07','Brooklyn',92000,9600,13.1,'HEAT/HOT WATER'],
  ['CB 06','Manhattan',88000,8900,12.4,'Noise – Residential']
];

let filters = {
  borough: new Set(['ALL']),
  status:  new Set(['Open','Closed','Pending']),
  year:    new Set(['2020','2021','2022','2023','2024','2025','2026'])
};

/* ── NAV & FILTER CONTROLS ─────────────────────────────────── */
function goPage(idx, el) {
  document.querySelectorAll('.page').forEach((p,i) => p.classList.toggle('active', i===idx));
  document.querySelectorAll('.nav-btn').forEach((b,i) => b.classList.toggle('active', i===idx));
}

function toggleFilter(el) {
  const f = el.dataset.filter, v = el.dataset.val;
  if (f === 'borough') {
    if (v === 'ALL') {
      filters.borough = new Set(['ALL']);
      document.querySelectorAll('[data-filter="borough"]').forEach(p => p.classList.toggle('on', p.dataset.val==='ALL'));
    } else {
      filters.borough.delete('ALL');
      document.querySelector('[data-filter="borough"][data-val="ALL"]').classList.remove('on');
      if (filters.borough.has(v)) { filters.borough.delete(v); el.classList.remove('on'); }
      else { filters.borough.add(v); el.classList.add('on'); }
      if (filters.borough.size === 0) {
        filters.borough.add('ALL');
        document.querySelector('[data-filter="borough"][data-val="ALL"]').classList.add('on');
      }
    }
  } else {
    if (filters[f].has(v)) { filters[f].delete(v); el.classList.remove('on'); }
    else { filters[f].add(v); el.classList.add('on'); }
    if (filters[f].size === 0) { filters[f].add(v); el.classList.add('on'); }
  }
  applyFilters();
}

function resetAll() {
  filters = { borough:new Set(['ALL']), status:new Set(['Open','Closed','Pending']), year:new Set(['2020','2021','2022','2023','2024','2025','2026']) };
  document.querySelectorAll('.fpill').forEach(p => p.classList.add('on'));
  applyFilters();
}

/* ── DERIVED HELPERS ───────────────────────────────────────── */
function getActiveBoroughs() {
  return filters.borough.has('ALL') ? BASE_BOROUGHS : BASE_BOROUGHS.filter(b => filters.borough.has(b));
}
function getYearMul() {
  let s=0,c=0; filters.year.forEach(y => { if(YEAR_MUL[y]){s+=YEAR_MUL[y];c++;} }); return c>0?s/c:1;
}
function getStatusMul() {
  let w=0; filters.status.forEach(s => { if(STATUS_W[s]) w+=STATUS_W[s]; }); return Math.max(0.05,w);
}
function heatColor(d) {
  if(d<3)  return{bg:'#C0DD97',tx:'#173404'};
  if(d<6)  return{bg:'#97C459',tx:'#173404'};
  if(d<10) return{bg:'#639922',tx:'#fff'};
  if(d<15) return{bg:'#EF9F27',tx:'#412402'};
  if(d<20) return{bg:'#BA7517',tx:'#fff'};
  if(d<25) return{bg:'#E24B4A',tx:'#fff'};
  return{bg:'#A32D2D',tx:'#fff'};
}
function resColor(r) { return r>.82?'#639922':r>.65?'#97C459':r>.5?'#EF9F27':'#E24B4A'; }

function getFilteredAgencies() {
  const boros = getActiveBoroughs();
  const ym = getYearMul(), sm = getStatusMul()/0.922;
  return AGENCY_BASE.map(a => {
    const ab = AGENCY_BOROUGH[a.n];
    if (!ab) return {...a, filteredVol:a.vol*ym*sm, filteredRes:a.res, filteredBr:a.br, filteredOp:Math.round(a.op*sm)};
    let shareSum=0, resWt=0, slaWt=0;
    boros.forEach(b => { const sh=ab.share[b]||0; shareSum+=sh; resWt+=sh*(ab.res[b]||a.res); slaWt+=sh*(ab.sla[b]||a.br); });
    if (shareSum===0) shareSum=0.0001;
    return { ...a, filteredVol: a.vol*shareSum*ym*sm, filteredRes: resWt/shareSum, filteredBr: slaWt/shareSum, filteredOp: Math.round(a.op*shareSum*sm) };
  });
}

/* ── CHART INSTANCES ───────────────────────────────────────── */
let trendChart=null, donutChart=null, slaChart=null;

function buildTrendChart() {
  const ctx = document.getElementById('c_trend').getContext('2d');
  if (trendChart) trendChart.destroy();
  const ayrs = Array.from(filters.year).sort();
  const labels=[], data=[], rolling=[];
  [2020,2021,2022,2023,2024,2025,2026].forEach(y => {
    if (!ayrs.includes(String(y))) return;
    const months = y===2026?5:12;
    for (let m=0;m<months;m++) {
      labels.push(`${['J','F','M','A','M','J','J','A','S','O','N','D'][m]}'${String(y).slice(2)}`);
      const cov = (y===2020&&m>=2)||(y===2021)?1.28:1;
      const bm = getActiveBoroughs().reduce((s,b)=>s+BOROUGH_DATA[b].vol,0)/29.9;
      data.push(Math.round((430000+Math.random()*80000-40000)*cov*bm*(getStatusMul()/0.922)));
    }
  });
  for (let i=0;i<data.length;i++) { const sl=data.slice(Math.max(0,i-2),i+1); rolling.push(Math.round(sl.reduce((a,b)=>a+b,0)/sl.length)); }
  trendChart = new Chart(ctx, { type:'line', data:{labels, datasets:[
    {data, borderColor:'#378ADD', backgroundColor:'rgba(55,138,221,0.12)', fill:true, borderWidth:1.5, pointRadius:0, tension:0.35},
    {data:rolling, borderColor:'#EF9F27', fill:false, borderWidth:1.5, borderDash:[4,3], pointRadius:0, tension:0.35}
  ]}, options:{responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}, tooltip:{mode:'index',intersect:false,callbacks:{label:c=>`${Math.round(c.raw/1000)}K`}}}, scales:{x:{ticks:{maxTicksLimit:10,color:'#7090B0',font:{size:9}},grid:{color:'rgba(36,53,82,0.8)'}},y:{ticks:{color:'#7090B0',font:{size:9},callback:v=>`${Math.round(v/1000)}K`},grid:{color:'rgba(36,53,82,0.8)'}}}}});
}

function buildDonut() {
  const ctx = document.getElementById('c_donut').getContext('2d');
  if (donutChart) donutChart.destroy();
  const base = {Closed:85.1,Open:6.8,Pending:4.3,Assigned:2.7,Cancelled:1.1};
  const colors = {Closed:'#639922',Open:'#E24B4A',Pending:'#EF9F27',Assigned:'#378ADD',Cancelled:'#888780'};
  const active = Object.keys(base).filter(s=>filters.status.has(s));
  const vals = active.map(s=>base[s]);
  const total = vals.reduce((a,b)=>a+b,0);
  const pcts = vals.map(v=>+(v/total*100).toFixed(1));
  donutChart = new Chart(ctx, {type:'doughnut', data:{labels:active, datasets:[{data:pcts, backgroundColor:active.map(l=>colors[l]), borderWidth:0}]}, options:{responsive:false, plugins:{legend:{display:false}}, cutout:'62%'}});
  document.getElementById('donut_legend').innerHTML = active.map((l,i)=>`<div class="leg-item"><div class="leg-dot" style="background:${colors[l]}"></div><span>${l} — ${pcts[i]}%</span></div>`).join('');
}

function buildSLAChart() {
  const ctx = document.getElementById('c_sla').getContext('2d');
  if (slaChart) slaChart.destroy();
  const ayrs = Array.from(filters.year).sort();
  const labels=[], rates=[];
  const avgSLA = getActiveBoroughs().reduce((s,b)=>s+BOROUGH_DATA[b].sla,0)/getActiveBoroughs().length;
  [2020,2021,2022,2023,2024,2025,2026].forEach(y => {
    if (!ayrs.includes(String(y))) return;
    const months = y===2026?5:12;
    for (let m=0;m<months;m++) {
      labels.push(`${['J','F','M','A','M','J','J','A','S','O','N','D'][m]}'${String(y).slice(2)}`);
      rates.push(+(avgSLA*(0.65+Math.random()*0.75)).toFixed(1));
    }
  });
  slaChart = new Chart(ctx, {type:'line', data:{labels, datasets:[
    {data:rates, borderColor:'#E24B4A', backgroundColor:'rgba(226,75,74,0.12)', fill:true, borderWidth:1.5, pointRadius:0, tension:0.35},
    {data:rates.map(()=>5), borderColor:'#639922', fill:false, borderWidth:1, borderDash:[4,3], pointRadius:0}
  ]}, options:{responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}, scales:{x:{ticks:{maxTicksLimit:10,color:'#7090B0',font:{size:9}},grid:{color:'rgba(36,53,82,0.8)'}},y:{ticks:{color:'#7090B0',font:{size:9},callback:v=>`${v}%`},grid:{color:'rgba(36,53,82,0.8)'}}}}});
}

/* ── HTML BUILDERS ─────────────────────────────────────────── */
function buildKPIs() {
  const boros=getActiveBoroughs(), ym=getYearMul(), sm=getStatusMul()/0.922;
  const totalVol=boros.reduce((s,b)=>s+BOROUGH_DATA[b].vol,0)*ym*sm;
  const openW=filters.status.has('Open')?STATUS_W['Open']:0;
  const openVol=totalVol*(openW/Math.max(getStatusMul(),0.01));
  const avgRes=boros.reduce((s,b)=>s+BOROUGH_DATA[b].res,0)/boros.length*(filters.status.has('Closed')?1:1.4);
  const avgSLA=boros.reduce((s,b)=>s+BOROUGH_DATA[b].sla,0)/boros.length;
  const key=boros.length===1?boros[0]:'ALL';
  const topC=(COMPLAINT_DATA[key]||COMPLAINT_DATA['ALL'])[0].n;
  const topVol=(COMPLAINT_DATA[key]||COMPLAINT_DATA['ALL'])[0].v*ym*sm;
  document.getElementById('k_total').textContent=totalVol>=1?`${totalVol.toFixed(1)}M`:`${Math.round(totalVol*1000)}K`;
  document.getElementById('k_open').textContent=filters.status.has('Open')?(openVol>=1?`${openVol.toFixed(1)}M`:`${Math.round(openVol*1000)}K`):'—';
  document.getElementById('k_res').textContent=`${avgRes.toFixed(1)}d`;
  document.getElementById('k_sla').textContent=`${avgSLA.toFixed(1)}%`;
  document.getElementById('k_sla').style.color=avgSLA>15?'#E24B4A':avgSLA>5?'#EF9F27':'#639922';
  document.getElementById('k_top').textContent=topC;
  document.getElementById('k_top_d').textContent=`${topVol.toFixed(1)}M total`;
}

function buildInsights() {
  const boros=getActiveBoroughs();
  const agencies=getFilteredAgencies();
  const worst=[...agencies].sort((a,b)=>b.filteredBr-a.filteredBr)[0];
  const best=[...agencies].sort((a,b)=>a.filteredBr-b.filteredBr)[0];
  const worstB=[...boros].sort((a,b)=>BOROUGH_DATA[b].sla-BOROUGH_DATA[a].sla)[0];
  document.getElementById('ins0a').innerHTML=`<i class="ti ti-alert-triangle"></i> <strong>Worst borough:</strong> ${worstB} — ${BOROUGH_DATA[worstB].sla}% SLA breach rate over the selected period.`;
  document.getElementById('ins0b').innerHTML=`<i class="ti ti-trending-up"></i> Noise complaints in Brooklyn rose 22% YoY. ZIP 10456 has 1,204 cases unresolved for 90+ days.`;
  document.getElementById('ins1a').innerHTML=`<i class="ti ti-alert-triangle"></i> <strong>${worst.n}</strong> has the highest SLA breach rate in selected borough(s) at <strong>${worst.filteredBr.toFixed(1)}%</strong> — avg resolution ${worst.filteredRes.toFixed(1)} days.`;
  document.getElementById('ins1b').innerHTML=`<i class="ti ti-circle-check"></i> <strong>${best.n}</strong> leads efficiency — ${best.filteredBr.toFixed(1)}% breach rate, avg resolution ${best.filteredRes.toFixed(1)} days.`;
  document.getElementById('ins2a').innerHTML=`<i class="ti ti-map-pin"></i> ZIP 10456 (South Bronx): 1,204 requests unresolved 90+ days. Avg resolution 22.4d — 2.7× citywide average.`;
  document.getElementById('ins2b').innerHTML=`<i class="ti ti-chart-bar"></i> Brooklyn leads volume (8.9M). Bronx has worst avg resolution at 11.4d; Manhattan best at 6.3d.`;
  document.getElementById('ins3a').innerHTML=`<i class="ti ti-trending-down"></i> SLA breach rate peaked at 24.3% in Jan 2024 — nearly 5× the 5% target. NYPD + HPD + DOB = 78% of breaches.`;
  document.getElementById('ins3b').innerHTML=`<i class="ti ti-circle-check"></i> DSNY standout — breach rate below 3% since 2022, avg resolution just 2.1 days.`;
  const label=filters.borough.has('ALL')?'All boroughs':boros.join(', ');
  document.getElementById('agency_context').innerHTML=`<i class="ti ti-filter"></i> Showing: <strong>${label}</strong> &nbsp;·&nbsp; Years: <strong>${Array.from(filters.year).sort().join(', ')}</strong> &nbsp;·&nbsp; Status: <strong>${Array.from(filters.status).join(', ')}</strong>`;
}

function buildTop10() {
  const boros=getActiveBoroughs(), ym=getYearMul(), sm=getStatusMul()/0.922;
  const key=boros.length===1?boros[0]:'ALL';
  const list=COMPLAINT_DATA[key]||COMPLAINT_DATA['ALL'];
  const maxV=list[0].v;
  document.getElementById('top10').innerHTML=list.map(c=>`<div class="bar-row"><div class="bar-lbl" style="width:128px" title="${c.n}">${c.n}</div><div class="bar-track"><div class="bar-fill" style="width:${Math.round(c.v/maxV*100)}%;background:${resColor(c.r)}">${Math.round(c.r*100)}%</div></div><div class="bar-val">${(c.v*ym*sm).toFixed(1)}M</div></div>`).join('');
}

function buildBoroBars() {
  const boros=getActiveBoroughs(), ym=getYearMul(), sm=getStatusMul()/0.922;
  const maxV=Math.max(...boros.map(b=>BOROUGH_DATA[b].vol));
  document.getElementById('boro_bars').innerHTML=boros.map(b=>{const d=BOROUGH_DATA[b];return`<div class="bar-row"><div class="bar-lbl" style="width:72px">${b}</div><div class="bar-track"><div class="bar-fill" style="width:${Math.round(d.vol/maxV*100)}%;background:${d.color}">${(d.vol*ym*sm).toFixed(1)}M</div></div><div class="bar-val">${d.res}d</div></div>`;}).join('');
}

function buildScatter() {
  const area=document.getElementById('scatterEl');
  area.querySelectorAll('.sdot').forEach(d=>d.remove());
  const agencies=getFilteredAgencies();
  const maxVol=Math.max(...agencies.map(a=>a.filteredVol));
  const maxRes=Math.max(...agencies.map(a=>a.filteredRes));
  agencies.forEach((a,i)=>{
    const x=Math.min(92,Math.max(6,Math.round((1-a.filteredVol/maxVol)*82+6)));
    const y=Math.min(92,Math.max(6,Math.round(a.filteredRes/maxRes*82+6)));
    const sz=Math.max(22,Math.min(38,Math.round(a.filteredBr/38*38)));
    const dot=document.createElement('div');
    dot.className='sdot';
    dot.style.cssText=`left:${x}%;bottom:${100-y}%;width:${sz}px;height:${sz}px;background:${PAL[i]}`;
    dot.innerHTML=`<div class="stt">${a.n}: ${a.filteredVol.toFixed(1)}M | ${a.filteredRes.toFixed(1)}d | ${a.filteredBr.toFixed(1)}% breach</div>${a.n}`;
    area.appendChild(dot);
  });
}

function buildSLAAgency() {
  const agencies=getFilteredAgencies().sort((a,b)=>b.filteredBr-a.filteredBr);
  document.getElementById('sla_agency').innerHTML=agencies.map((a,i)=>`<div class="sla-row-wrap"><div class="sla-lbl-row"><span style="font-weight:500;color:${i<3?'#E24B4A':'var(--muted)'}">${a.n} <span style="font-weight:400;color:var(--muted)">${a.full}</span></span><span><span style="color:#639922">${(100-a.filteredBr).toFixed(1)}%</span> on-time · <span style="color:#E24B4A">${a.filteredBr.toFixed(1)}%</span> breach</span></div><div class="sla-bar"><div style="width:${100-a.filteredBr}%;background:#639922;transition:width .35s"></div><div style="width:${a.filteredBr}%;background:#E24B4A;transition:width .35s"></div></div></div>`).join('');
}

function buildAgencyTable() {
  document.getElementById('ag_tbl').innerHTML=getFilteredAgencies().sort((a,b)=>b.filteredVol-a.filteredVol).map(a=>{
    const bc=a.filteredBr>25?'bad':a.filteredBr>15?'warn':'ok';
    const rc=a.filteredRes>15?'bad':a.filteredRes>10?'warn':'ok';
    return`<tr><td style="color:var(--text);font-weight:500">${a.n}<br><span style="font-weight:400;font-size:9px;color:var(--muted)">${a.full}</span></td><td>${(a.filteredVol*1e6).toLocaleString('en',{maximumFractionDigits:0})}</td><td class="${rc}">${a.filteredRes.toFixed(1)}d</td><td class="${bc}">${a.filteredBr.toFixed(1)}%</td><td>${a.filteredOp.toLocaleString()}</td><td class="${bc}">${a.filteredBr>25?'⚠ At risk':a.filteredBr>15?'Monitor':'✓ Good'}</td></tr>`;
  }).join('');
}

function buildAgeDist() {
  const hasOpen=filters.status.has('Open')||filters.status.has('Pending');
  const boros=getActiveBoroughs();
  const rm=boros.reduce((s,b)=>s+BOROUGH_DATA[b].res,0)/boros.length/8.3;
  const d=[{l:'< 7 days',v:Math.round(38/rm),c:'#639922'},{l:'7–30 days',v:Math.round(27*Math.min(rm,1.3)),c:'#97C459'},{l:'30–90 days',v:Math.round(18*rm),c:'#EF9F27'},{l:'90–365 days',v:Math.round(12*rm),c:'#E24B4A'},{l:'1+ year ⚠',v:Math.round(5*rm),c:'#A32D2D'}];
  const total=d.reduce((s,r)=>s+r.v,0), maxV=Math.max(...d.map(r=>r.v));
  document.getElementById('age_dist').innerHTML=hasOpen?d.map(r=>`<div class="bar-row"><div class="bar-lbl" style="width:76px">${r.l}</div><div class="bar-track"><div class="bar-fill" style="width:${Math.round(r.v/maxV*100)}%;background:${r.c}">${Math.round(r.v/total*100)}%</div></div></div>`).join(''):`<div style="padding:20px;text-align:center;color:var(--muted);font-size:11px">No open requests in current filter</div>`;
  document.getElementById('age_note').textContent=hasOpen?`${d[4].v}% of open requests aged 1+ year — critical escalation needed`:'';
}

function buildBoroCards() {
  const boros=getActiveBoroughs(), ym=getYearMul(), sm=getStatusMul()/0.922;
  document.getElementById('boro_cards').innerHTML=boros.map(b=>{const d=BOROUGH_DATA[b];return`<div class="bcard"><div style="font-size:9px;font-weight:500;color:var(--muted);text-transform:uppercase;letter-spacing:.04em;margin-bottom:3px">${b}</div><div style="font-size:17px;font-weight:500;color:${d.color};margin-bottom:2px">${(d.vol*ym*sm).toFixed(1)}M</div><div style="font-size:9px;color:var(--muted)">Avg: ${d.res}d</div><div style="font-size:9px;color:var(--muted);margin-top:4px;border-top:1px solid var(--border);padding-top:4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${d.top}</div></div>`;}).join('');
}

function buildSmallMult() {
  const boros=getActiveBoroughs(), ym=getYearMul(), sm=getStatusMul()/0.922;
  const cols={'Bronx':'#A32D2D','Brooklyn':'#185FA5','Manhattan':'#854F0B','Queens':'#0F6E56','Staten Isl.':'#7F77DD'};
  document.getElementById('small_mult').innerHTML=boros.map(b=>{const list=(COMPLAINT_DATA[b]||COMPLAINT_DATA['ALL']).slice(0,5);const maxV=list[0].v;return`<div style="margin-bottom:9px"><div style="font-size:9px;font-weight:500;color:${cols[b]||'#378ADD'};text-transform:uppercase;letter-spacing:.04em;margin-bottom:4px">${b}</div>${list.map(c=>`<div class="bar-row" style="margin-bottom:2px"><div class="bar-lbl" style="width:102px;font-size:9px">${c.n}</div><div class="bar-track" style="height:12px"><div class="bar-fill" style="width:${Math.round(c.v/maxV*100)}%;background:${cols[b]||'#378ADD'};font-size:0"></div></div><div class="bar-val" style="font-size:9px">${(c.v*ym*sm).toFixed(1)}M</div></div>`).join('')}</div>`;}).join('');
}

function buildChannels() {
  const boros=getActiveBoroughs();
  const cols={phone:'#185FA5',online:'#0F6E56',app:'#854F0B',other:'#5F5E5A'};
  document.getElementById('channels').innerHTML=boros.map(b=>{const d=BOROUGH_DATA[b];return`<div style="display:flex;align-items:center;gap:7px;margin-bottom:5px"><div style="font-size:9px;color:var(--muted);width:68px;flex-shrink:0">${b}</div><div class="ch-seg-wrap">${Object.keys(cols).map(ch=>`<div class="ch-seg" style="width:${d[ch]||0}%;background:${cols[ch]}" title="${ch}: ${d[ch]||0}%">${(d[ch]||0)>14?(d[ch]||0)+'%':''}</div>`).join('')}</div></div>`;}).join('');
}

function buildCBTable() {
  const boros=getActiveBoroughs(), ym=getYearMul(), sm=getStatusMul()/0.922;
  const rows=boros.length===5?CB_DATA:CB_DATA.filter(r=>boros.includes(r[1]));
  const show=rows.length?rows:CB_DATA;
  document.getElementById('cb_tbl').innerHTML=show.map(r=>{const rc=r[4]>18?'bad':r[4]>15?'warn':'ok';const oc=r[3]>15000?'bad':r[3]>12000?'warn':'';return`<tr><td style="font-weight:500;color:var(--text)">${r[0]}</td><td>${r[1]}</td><td>${Math.round(r[2]*ym*sm).toLocaleString()}</td><td class="${oc}">${Math.round(r[3]*ym*sm).toLocaleString()}</td><td class="${rc}">${r[4]}d</td><td style="font-size:9px">${r[5]}</td></tr>`;}).join('');
}

function buildCohort() {
  const ayrs=Array.from(filters.year).sort();
  const qs=['2020 Q1','2020 Q3','2021 Q1','2021 Q3','2022 Q1','2022 Q3','2023 Q1','2023 Q3','2024 Q1','2024 Q3','2025 Q1'];
  const ym2={'2020 Q1':'2020','2020 Q3':'2020','2021 Q1':'2021','2021 Q3':'2021','2022 Q1':'2022','2022 Q3':'2022','2023 Q1':'2023','2023 Q3':'2023','2024 Q1':'2024','2024 Q3':'2024','2025 Q1':'2025'};
  const base=[[98,1,1],[96,2,2],[95,3,2],[94,4,2],[93,5,2],[92,6,2],[91,7,2],[90,8,2],[88,9,3],[85,12,3],[72,24,4]];
  const visible=qs.filter(q=>ayrs.includes(ym2[q]));
  document.getElementById('cohort').innerHTML=(visible.length?visible:qs).map(q=>{const i=qs.indexOf(q),row=base[i]||base[base.length-1];return`<div class="cohort-row"><div class="cohort-lbl">${q}</div><div class="cohort-bar"><div style="width:${row[0]}%;background:#639922"></div><div style="width:${row[1]}%;background:#E24B4A"></div><div style="width:${row[2]}%;background:#5F5E5A"></div></div><div style="font-size:9px;color:var(--muted);width:46px;text-align:right">${row[1]}% open</div></div>`;}).join('');
}

function buildHeatmap() {
  const complaints=['Noise – Residential','HEAT/HOT WATER','Blocked Driveway','Illegal Parking','Street Condition','Noise – Street','PLUMBING','Sanitation Cond','Unsanitary Cond','Derelict Vehicles','Street Light Cond','DOOR/WINDOW','Building/Use','Graffiti','Elevator'];
  const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const base=[1,8,18,12,7,1,28,6,24,14,5,3,12,2,19];
  const boros=getActiveBoroughs();
  const rm=boros.reduce((s,b)=>s+BOROUGH_DATA[b].res,0)/boros.length/8.3;
  let html=`<table class="hm-table"><thead><tr><th style="text-align:left;min-width:118px"></th>${months.map(m=>`<th>${m}</th>`).join('')}</tr></thead><tbody>`;
  complaints.forEach((c,ci)=>{
    html+=`<tr><td style="font-size:9px;color:var(--muted);padding:1px 6px 1px 0;white-space:nowrap;text-align:left">${c}</td>`;
    months.forEach((_,mi)=>{const v=Math.max(1,Math.round(base[ci]*(0.75+Math.random()*0.7)*rm));const{bg,tx}=heatColor(v);html+=`<td style="background:${bg};color:${tx}" title="${c}: ${v}d">${v}</td>`;});
    html+=`</tr>`;
  });
  document.getElementById('heatmap').innerHTML=html+`</tbody></table>`;
}

/* ── MASTER RENDER ─────────────────────────────────────────── */
function applyFilters() {
  buildKPIs(); buildInsights(); buildTop10(); buildBoroBars();
  buildTrendChart(); buildDonut();
  buildScatter(); buildSLAAgency(); buildAgencyTable(); buildAgeDist();
  buildBoroCards(); buildSmallMult(); buildChannels(); buildCBTable();
  buildCohort(); buildSLAChart(); buildHeatmap();
}

applyFilters();
