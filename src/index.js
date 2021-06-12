import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

function renderApp() {
    const baseUrl = document.getElementById('baseUrl').getAttribute('href');
    ReactDOM.render(
        <React.StrictMode>
            <App baseUrl={baseUrl} />
        </React.StrictMode>,
    document.getElementById('root')
    );
}

renderApp();