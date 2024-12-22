const presence = {
    assets: {
        large_image: 'https://duckduckgo.com/assets/logo_header_mobile.alt.v109.svg'
    },
    timestamps: { start: Date.now() },
    buttons: [{ label: 'Search it too', url: window.location.href }]
};
window.addEventListener('message', e => {
    const type = e.detail.type;
    if (type !== 'input' && type !== 'restart')
        return;
    const params = new URLSearchParams(window.location.search);
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
});
export {};
