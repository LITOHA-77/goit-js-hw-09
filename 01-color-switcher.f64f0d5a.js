!function(){var t={start:document.querySelector("[data-start]"),stop:document.querySelector("[data-stop]"),body:document.querySelector("body")};t.start.addEventListener("click",(function(){e=setInterval((function(){t.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3),t.start.disabled=!0})),t.stop.addEventListener("click",(function(){clearInterval(e),t.start.disabled=!1}));var e=null}();
//# sourceMappingURL=01-color-switcher.f64f0d5a.js.map