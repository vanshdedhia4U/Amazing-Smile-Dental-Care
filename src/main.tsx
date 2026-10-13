import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  try {
    const createRoot = (ReactDOM as any).createRoot || (ReactDOM as any).default?.createRoot || (ReactDOM as any);
    const root = createRoot(rootElement);
    root.render(<App />);
  } catch (err: any) {
    console.error('Fatal mount error in main.tsx:', err);
    rootElement.innerHTML = `
      <div style="padding: 28px; max-width: 540px; margin: 40px auto; background: white; border-radius: 16px; border: 1px solid #e2e8f0; font-family: system-ui, sans-serif; text-align: center; box-shadow: 0 10px 25px rgba(0,0,0,0.08);">
        <h2 style="color: #0f766e; margin-top: 0;">Amazing Smile Dental Care</h2>
        <p style="color: #64748b; font-size: 14px;">An issue occurred while mounting the application:</p>
        <div style="background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; padding: 12px; border-radius: 10px; font-size: 12px; text-align: left; font-family: monospace; margin-bottom: 16px; overflow-x: auto;">
          ${err?.message || err}
        </div>
        <button onclick="try { localStorage.clear(); } catch(e) {} location.reload();" style="background: #0f766e; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer;">
          Reset Storage & Reload
        </button>
      </div>
    `;
  }
}
