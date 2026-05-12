# NYC 311 Executive Dashboard

A fully interactive, executive-grade dashboard built on the [NYC 311 Service Request dataset](https://data.cityofnewyork.us/Social-Services/311-Service-Requests-from-2010-to-Present/erm2-nwe9) (2020–present).

**Live demo → [View Dashboard](https://YOUR-USERNAME.github.io/nyc311-dashboard)**

---

## Overview

31 million service requests. 5 boroughs. 20+ agencies. One dashboard designed for CEO & CFO-level decision making — actionable insights in under 60 seconds.

### 4 Pages

| Page | Purpose |
|------|---------|
| Executive Summary | KPIs, monthly trend, top 10 complaints, borough volume, status breakdown |
| Agency Performance | Scatter quadrant, SLA compliance bars, age distribution, agency table |
| Geographic Deep Dive | Borough cards, small multiples, channel breakdown, community board rankings |
| SLA Intelligence | Breach rate trend, cohort analysis, resolution heatmap |

### Global Filters (all pages)
- Borough (Bronx, Brooklyn, Manhattan, Queens, Staten Island)
- Status (Open, Closed, Pending)
- Year (2020–2026)

All filters are cross-linked — selecting Bronx reshapes every visual including borough-weighted agency SLA rates and resolution times.

---

## Key Findings

- **NYPD** carries the highest SLA breach rate at **34.1%** citywide (38.2% in the Bronx)
- **DSNY** (Sanitation) is the standout performer — breach rate below 3%, avg resolution 2.1 days
- **Noise – Residential** is the #1 complaint type with 5.2M requests
- **ZIP 10456** (South Bronx) has 1,204+ cases unresolved for 90+ days
- **105,000** open requests are aged 1+ year — critical backlog
- Bronx & Staten Island submit 52–58% of requests by phone vs. 38% in Manhattan — a measurable digital equity gap

---

## Tech Stack

- Vanilla HTML / CSS / JavaScript (zero build step)
- [Chart.js 4.4.1](https://www.chartjs.org/) for line and donut charts
- [Tabler Icons](https://tabler-icons.io/) for UI icons
- Data source: [NYC Open Data SODA API](https://dev.socrata.com/foundry/data.cityofnewyork.us/erm2-nwe9)

---

## Run Locally

```bash
git clone https://github.com/YOUR-USERNAME/nyc311-dashboard.git
cd nyc311-dashboard
# Open index.html in your browser — no server needed
open index.html
```

---

## Deploy to GitHub Pages

1. Push to GitHub
2. Go to **Settings → Pages**
3. Set source to `main` branch, `/ (root)`
4. Your live URL: `https://YOUR-USERNAME.github.io/nyc311-dashboard`

---

## Power BI Version

A full Power BI `.pbix` package (DAX measures, Power Query M scripts, data model, theme JSON) is available in the [`/powerbi`](./powerbi) folder.

---

## Data Source

- **Dataset:** NYC 311 Service Requests 2020–Present
- **URL:** https://data.cityofnewyork.us/Social-Services/311-Service-Requests-from-2010-to-Present/erm2-nwe9
- **Updated:** Daily
- **Rows:** ~30M (2010–present)

---
## Author

**Narasimha Naidu Kilari** · Senior Data Analyst  
Power BI · Snowflake · SQL · Python · dbt · AWS  
[LinkedIn](https://linkedin.com/in/narasimhanaidu-kilari) · [GitHub](https://github.com/Narasimha3008)
*Built with NYC Open Data · Visualized with Chart.js*
