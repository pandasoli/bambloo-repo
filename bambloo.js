// bambloo.ts
var bambloo;
(function(bambloo) {
  bambloo.update = (activity) => chrome.runtime.sendMessage({ type: "activity", activity });
  bambloo.log = (data) => chrome.runtime.sendMessage({ type: "log", data });
  bambloo.onMessage = {
    listeners: [],
    addListener: function(callback) {
      const fn = (e) => callback(e.detail);
      addEventListener("message", fn);
      this.listeners.push(callback);
    },
    removeListener: function(callback) {
      const fn = this.listeners.find((e) => e === callback);
      if (fn) {
        removeEventListener("message", fn);
        this.listeners = this.listeners.filter((e) => e !== callback);
      }
    }
  };
})(bambloo || (bambloo = {}));
