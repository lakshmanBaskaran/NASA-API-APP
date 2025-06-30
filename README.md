# NASA Data Explorer 🌌

An interactive dashboard built with React, Express, and NASA APIs (APOD, EONET). This project fetches and displays Earth event data, space imagery.

---

##  Project Structure

```
nasa-data/
├── backend/                 # Express backend for handling NASA API proxies
│   ├── index.js             # API server
│   └── package.json         # Backend dependencies
├── frontend2/               # React frontend with MUI and TanStack Query
│   ├── src/
│   │   ├── api/             # Custom hooks & axios config
│   │   ├── components/
│   │   │   └── dashboard/   # Dashboard components: EonetEvents, Timeline, Map
│   │   ├── pages/           # React pages
│   │   └── App.jsx          # Main app router
│   └── vite.config.js       # Vite dev server config with proxy
└── README.md                # This file
```

---

##  Features

- NASA APOD (Astronomy Picture of the Day)
- EONET Earth events (wildfires, storms)
- Interactive visualization with tabs (Card, Timeline, Map)

---

##  Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/yourname/NASA-API-APP.git
cd nasa-data
```

---

##  Backend Setup

### Step into backend folder:
```bash
cd backend
```

### Install dependencies:
```bash
pnpm install

pmpn run dev
```

### Start the server:
```bash

```

The backend will run on [http://localhost:8080](http://localhost:8080)

---

##  Frontend Setup

### Step into frontend folder:
```bash
cd ../frontend2
```

### Install dependencies using pnpm:
```bash
pnpm install
```

### Start the development server:
```bash
pnpm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Proxy Configuration

`vite.config.js` in frontend is set to proxy all `/api/*` calls to the backend at `localhost:8080`.

---

## Sample Endpoints Used

- `/api/apod?date=YYYY-MM-DD`
- `/api/eonet?days=X`


---

## Testing

Check requests in DevTools → Network tab. API calls should return 200 and show fetched data in cards, maps, and timelines.

---

## Notes

- Make sure both frontend (`5173`) and backend (`8080`) are running simultaneously.
- Frontend uses React Query for efficient caching and refetching.
- Uses Material UI (MUI) for modern components and layout.

---

## Credits

- [NASA APIs](https://api.nasa.gov)

