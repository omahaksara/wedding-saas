import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css' // Jika index.css masih di dalam folder src
// ATAU 
// import '../index.css' // Jika index.css pindah ke luar/root

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
