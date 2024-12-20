System.register([], function (exports_1, context_1) {
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
    var update, log, presence, get_topmost, fn, scrolling;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            update = (presence) => chrome.runtime.sendMessage({ target: 'background', type: 'presence', presence });
            log = (...data) => chrome.runtime.sendMessage({ target: 'background', type: 'log', data });
            presence = {
                assets: {
                    large_image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/1200px-Wikipedia-logo-v2.svg.png'
                },
                timestamps: { start: Date.now() },
                buttons: [{ label: 'Search it too', url: window.location.href }]
            };
            get_topmost = (query) => __awaiter(void 0, void 0, void 0, function* () {
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
            fn = () => __awaiter(void 0, void 0, void 0, function* () {
                var _a, _b;
                const title = (_a = document.querySelector('#firstHeading')) === null || _a === void 0 ? void 0 : _a.textContent;
                const subtitle = (_b = (yield get_topmost('h2'))) === null || _b === void 0 ? void 0 : _b.textContent;
                presence.details = `Reading about ${title}`;
                if (subtitle)
                    presence.state = `inside ${subtitle}`;
                update(presence);
            });
            fn();
            window.addEventListener('scroll', () => {
                clearTimeout(scrolling);
                scrolling = setTimeout(fn, 1000);
            });
        }
    };
});
