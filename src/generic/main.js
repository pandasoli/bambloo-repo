// src/generic/main.ts
var getFaviconUrl = () => {
  const linkElements = Array.from(document.head.querySelectorAll("link[rel*='icon']"));
  for (const link of linkElements)
    if (link.href)
      return link.href;
  return `${window.location.origin}/favicon.ico`;
};
var getPageDescription = () => {
  const metaDescription = document.querySelector("meta[name='description']");
  return metaDescription ? metaDescription.content : null;
};
var presence = {
  timestamps: { start: Date.now() }
};
bambloo.onMessage.addListener((msg) => {
  if (msg.type !== "start")
    return;
  presence.assets = {
    large_image: getFaviconUrl()
  };
  presence.state = document.title;
  presence.details = getPageDescription() || "";
  bambloo.update(presence);
});
