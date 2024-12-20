"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const update = (presence) => chrome.runtime.sendMessage({ target: 'background', type: 'presence', presence });
const log = (...data) => chrome.runtime.sendMessage({ target: 'background', type: 'log', data });
const presence = {
    assets: {
        large_image: 'https://duckduckgo.com/assets/logo_header_mobile.alt.v109.svg'
    },
    timestamps: { start: Date.now() },
    buttons: [{ label: 'Search it too', url: window.location.href }]
};
const params = new URLSearchParams(window.location.search);
const paths = window.location.pathname
    .replace(/^\/|\/$/, '')
    .split('/')
    .filter(e => e);
const state = () => params.get('q')
    ? `Searching for ${params.get('q')}`
    : 'In the home page';
const details = () => params.get('iaxm') === 'maps' ?
    'Looking for places in the map'
    : params.get('ia') && params.get('ia') !== 'web' ?
        `Looking for ${params.get('ia')}`
        : '';
presence.state = state();
presence.details = details();
update(presence);
