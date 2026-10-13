import React, { Component, ErrorInfo, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center font-sans">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-xl border border-slate-200 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center mx-auto text-2xl font-bold">
              🦷
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 font-heading">
              Amazing Smile Dental Care
            </h2>
            <p className="text-sm text-slate-600">
              An unexpected display issue occurred. Click below to refresh the clinic view.
            </p>
            {this.state.error && (
              <div className="p-3 rounded-xl bg-slate-100 text-xs text-slate-700 font-mono text-left overflow-x-auto max-h-24">
                {this.state.error.message}
              </div>
            )}
            <button
              onClick={() => {
                try {
                  localStorage.clear();
                } catch (e) {}
                window.location.reload();
              }}
              className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md transition-all"
            >
              Reset & Reload Application
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
}
