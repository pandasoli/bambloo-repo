var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const presence = {
    assets: {
        large_image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/1200px-Wikipedia-logo-v2.svg.png'
    },
    timestamps: { start: Date.now() },
    buttons: [{ label: 'Search it too', url: window.location.href }]
};
const get_topmost = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const eles = document.querySelectorAll(query);
    let topmost = null;
    let topmost_top = 0;
    eles.forEach(ele => {
        const top = ele.getBoundingClientRect().top;
        if (top <= 0)
            if (topmost ? top > topmost_top : true) {
                topmost = ele;
                topmost_top = top;
            }
    });
    return topmost;
});
const fn = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const title = (_a = document.querySelector('#firstHeading')) === null || _a === void 0 ? void 0 : _a.textContent;
    const subtitle = (_b = (yield get_topmost('h2'))) === null || _b === void 0 ? void 0 : _b.textContent;
    presence.details = `Reading about ${title}`;
    if (subtitle)
        presence.state = `inside ${subtitle}`;
    update(presence);
});
let scrolling;
const loop = () => {
    clearTimeout(scrolling);
    scrolling = setTimeout(fn, 1000);
};
window.addEventListener('message', e => {
    const data = e.detail;
    switch (data.type) {
        case 'stop':
            clearTimeout(scrolling);
            window.removeEventListener('scroll', loop);
            break;
        case 'restart':
        case 'input':
            fn();
            window.addEventListener('scroll', loop);
    }
});
export {};
