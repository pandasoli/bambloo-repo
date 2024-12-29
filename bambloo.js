// bambloo.ts
globalThis.bambloo = {
  repo: "<!-- repo -->",
  path: "<!-- path -->",
  update: (activity) => chrome.runtime.sendMessage({ type: "activity", activity }),
  log: (data) => chrome.runtime.sendMessage({ type: "log", data }),
  onMessage: {
    __listeners__: [],
    addListener: function(callback) {
      const fn = (e) => callback(e.detail);
      addEventListener("message", fn);
      this.__listeners__.push(callback);
    },
    removeListener: function(callback) {
      const fn = this.__listeners__.find((e) => e === callback);
      if (fn) {
        removeEventListener("message", fn);
        this.__listeners__ = this.__listeners__.filter((e) => e !== callback);
      }
    }
  }
};
