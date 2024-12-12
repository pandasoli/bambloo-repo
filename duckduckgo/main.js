"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fn = exports.url = void 0;
exports.url = 'duckduckgo.com';
const fn = () => __awaiter(void 0, void 0, void 0, function* () {
    const presence = {
        assets: {
            large_image: 'https://duckduckgo.com/assets/logo_header_mobile.alt.v109.svg'
        },
        timestamps: { start: Date.now() },
        buttons: [{ label: 'Search it too', url: window.location.href }]
    };
    const update = (presence) => chrome.runtime.sendMessage({ target: 'background', type: 'presence', presence });
    const log = (...data) => chrome.runtime.sendMessage({ target: 'background', type: 'log', data });
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
});
exports.fn = fn;
