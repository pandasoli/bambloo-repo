System.register([], function (exports_1, context_1) {
    "use strict";
    var update, log, presence, params, paths, state, details;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            update = (presence) => chrome.runtime.sendMessage({ target: 'background', type: 'presence', presence });
            log = (...data) => chrome.runtime.sendMessage({ target: 'background', type: 'log', data });
            presence = {
                assets: {
                    large_image: 'https://duckduckgo.com/assets/logo_header_mobile.alt.v109.svg'
                },
                timestamps: { start: Date.now() },
                buttons: [{ label: 'Search it too', url: window.location.href }]
            };
            params = new URLSearchParams(window.location.search);
            paths = window.location.pathname
                .replace(/^\/|\/$/, '')
                .split('/')
                .filter(e => e);
            state = () => params.get('q')
                ? `Searching for ${params.get('q')}`
                : 'In the home page';
            details = () => params.get('iaxm') === 'maps' ?
                'Looking for places in the map'
                : params.get('ia') && params.get('ia') !== 'web' ?
                    `Looking for ${params.get('ia')}`
                    : '';
            presence.state = state();
            presence.details = details();
            update(presence);
        }
    };
});
