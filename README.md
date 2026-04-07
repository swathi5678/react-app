# Product Sales Analytics Dashboard (React)

Responsive analytics dashboard built with React context + hooks and local JSON data.

## Features
- Sidebar category filter
- Topbar search + toggles (rating, bestseller, sponsored, coupon)
- Dynamic KPI cards (reduce/filter/map calculations)
- Recharts visualizations (bar/line/pie/doughnut)
- Paginated, responsive products table
- Product detail modal
- Filter persistence with localStorage

## Dataset
- JSON source: `src/data/products.json`
- CSV → JSON helper script: `scripts/csv_to_json.py`

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```
