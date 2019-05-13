// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"scss/product-styles.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./..\\fonts\\open-sans-v16-cyrillic_cyrillic-ext_latin-regular.eot":[["open-sans-v16-cyrillic_cyrillic-ext_latin-regular.2e643340.eot","fonts/open-sans-v16-cyrillic_cyrillic-ext_latin-regular.eot"],"fonts/open-sans-v16-cyrillic_cyrillic-ext_latin-regular.eot"],"./..\\fonts\\open-sans-v16-cyrillic_cyrillic-ext_latin-regular.woff2":[["open-sans-v16-cyrillic_cyrillic-ext_latin-regular.6049d29b.woff2","fonts/open-sans-v16-cyrillic_cyrillic-ext_latin-regular.woff2"],"fonts/open-sans-v16-cyrillic_cyrillic-ext_latin-regular.woff2"],"./..\\fonts\\open-sans-v16-cyrillic_cyrillic-ext_latin-regular.woff":[["open-sans-v16-cyrillic_cyrillic-ext_latin-regular.e196c079.woff","fonts/open-sans-v16-cyrillic_cyrillic-ext_latin-regular.woff"],"fonts/open-sans-v16-cyrillic_cyrillic-ext_latin-regular.woff"],"./..\\fonts\\open-sans-v16-cyrillic_cyrillic-ext_latin-regular.ttf":[["open-sans-v16-cyrillic_cyrillic-ext_latin-regular.7b0ea896.ttf","fonts/open-sans-v16-cyrillic_cyrillic-ext_latin-regular.ttf"],"fonts/open-sans-v16-cyrillic_cyrillic-ext_latin-regular.ttf"],"./..\\fonts\\open-sans-v16-cyrillic_cyrillic-ext_latin-regular.svg":[["open-sans-v16-cyrillic_cyrillic-ext_latin-regular.4f10a9c2.svg","fonts/open-sans-v16-cyrillic_cyrillic-ext_latin-regular.svg"],"fonts/open-sans-v16-cyrillic_cyrillic-ext_latin-regular.svg"],"./..\\fonts\\open-sans-v16-cyrillic_cyrillic-ext_latin-700.eot":[["open-sans-v16-cyrillic_cyrillic-ext_latin-700.36c77f4a.eot","fonts/open-sans-v16-cyrillic_cyrillic-ext_latin-700.eot"],"fonts/open-sans-v16-cyrillic_cyrillic-ext_latin-700.eot"],"./..\\fonts\\open-sans-v16-cyrillic_cyrillic-ext_latin-700.woff2":[["open-sans-v16-cyrillic_cyrillic-ext_latin-700.22fc9f23.woff2","fonts/open-sans-v16-cyrillic_cyrillic-ext_latin-700.woff2"],"fonts/open-sans-v16-cyrillic_cyrillic-ext_latin-700.woff2"],"./..\\fonts\\open-sans-v16-cyrillic_cyrillic-ext_latin-700.woff":[["open-sans-v16-cyrillic_cyrillic-ext_latin-700.945f3d6e.woff","fonts/open-sans-v16-cyrillic_cyrillic-ext_latin-700.woff"],"fonts/open-sans-v16-cyrillic_cyrillic-ext_latin-700.woff"],"./..\\fonts\\open-sans-v16-cyrillic_cyrillic-ext_latin-700.ttf":[["open-sans-v16-cyrillic_cyrillic-ext_latin-700.246ff39c.ttf","fonts/open-sans-v16-cyrillic_cyrillic-ext_latin-700.ttf"],"fonts/open-sans-v16-cyrillic_cyrillic-ext_latin-700.ttf"],"./..\\fonts\\open-sans-v16-cyrillic_cyrillic-ext_latin-700.svg":[["open-sans-v16-cyrillic_cyrillic-ext_latin-700.d3c908f3.svg","fonts/open-sans-v16-cyrillic_cyrillic-ext_latin-700.svg"],"fonts/open-sans-v16-cyrillic_cyrillic-ext_latin-700.svg"],"./..\\fonts\\open-sans-v16-cyrillic_cyrillic-ext_latin-800.eot":[["open-sans-v16-cyrillic_cyrillic-ext_latin-800.b002957f.eot","fonts/open-sans-v16-cyrillic_cyrillic-ext_latin-800.eot"],"fonts/open-sans-v16-cyrillic_cyrillic-ext_latin-800.eot"],"./..\\fonts\\open-sans-v16-cyrillic_cyrillic-ext_latin-800.woff2":[["open-sans-v16-cyrillic_cyrillic-ext_latin-800.ae2d6028.woff2","fonts/open-sans-v16-cyrillic_cyrillic-ext_latin-800.woff2"],"fonts/open-sans-v16-cyrillic_cyrillic-ext_latin-800.woff2"],"./..\\fonts\\open-sans-v16-cyrillic_cyrillic-ext_latin-800.woff":[["open-sans-v16-cyrillic_cyrillic-ext_latin-800.6b3a60fd.woff","fonts/open-sans-v16-cyrillic_cyrillic-ext_latin-800.woff"],"fonts/open-sans-v16-cyrillic_cyrillic-ext_latin-800.woff"],"./..\\fonts\\open-sans-v16-cyrillic_cyrillic-ext_latin-800.ttf":[["open-sans-v16-cyrillic_cyrillic-ext_latin-800.8d676e4c.ttf","fonts/open-sans-v16-cyrillic_cyrillic-ext_latin-800.ttf"],"fonts/open-sans-v16-cyrillic_cyrillic-ext_latin-800.ttf"],"./..\\fonts\\open-sans-v16-cyrillic_cyrillic-ext_latin-800.svg":[["open-sans-v16-cyrillic_cyrillic-ext_latin-800.8009bff2.svg","fonts/open-sans-v16-cyrillic_cyrillic-ext_latin-800.svg"],"fonts/open-sans-v16-cyrillic_cyrillic-ext_latin-800.svg"],"./..\\fonts\\roboto-v19-cyrillic_cyrillic-ext_latin-300.eot":[["roboto-v19-cyrillic_cyrillic-ext_latin-300.5d70ca1d.eot","fonts/roboto-v19-cyrillic_cyrillic-ext_latin-300.eot"],"fonts/roboto-v19-cyrillic_cyrillic-ext_latin-300.eot"],"./..\\fonts\\roboto-v19-cyrillic_cyrillic-ext_latin-300.woff2":[["roboto-v19-cyrillic_cyrillic-ext_latin-300.764f1edf.woff2","fonts/roboto-v19-cyrillic_cyrillic-ext_latin-300.woff2"],"fonts/roboto-v19-cyrillic_cyrillic-ext_latin-300.woff2"],"./..\\fonts\\roboto-v19-cyrillic_cyrillic-ext_latin-300.woff":[["roboto-v19-cyrillic_cyrillic-ext_latin-300.762093cd.woff","fonts/roboto-v19-cyrillic_cyrillic-ext_latin-300.woff"],"fonts/roboto-v19-cyrillic_cyrillic-ext_latin-300.woff"],"./..\\fonts\\roboto-v19-cyrillic_cyrillic-ext_latin-300.ttf":[["roboto-v19-cyrillic_cyrillic-ext_latin-300.56b6ec10.ttf","fonts/roboto-v19-cyrillic_cyrillic-ext_latin-300.ttf"],"fonts/roboto-v19-cyrillic_cyrillic-ext_latin-300.ttf"],"./..\\fonts\\roboto-v19-cyrillic_cyrillic-ext_latin-300.svg":[["roboto-v19-cyrillic_cyrillic-ext_latin-300.a8d4d2b3.svg","fonts/roboto-v19-cyrillic_cyrillic-ext_latin-300.svg"],"fonts/roboto-v19-cyrillic_cyrillic-ext_latin-300.svg"],"./..\\fonts\\roboto-v19-cyrillic_cyrillic-ext_latin-regular.eot":[["roboto-v19-cyrillic_cyrillic-ext_latin-regular.00f9f1da.eot","fonts/roboto-v19-cyrillic_cyrillic-ext_latin-regular.eot"],"fonts/roboto-v19-cyrillic_cyrillic-ext_latin-regular.eot"],"./..\\fonts\\roboto-v19-cyrillic_cyrillic-ext_latin-regular.woff2":[["roboto-v19-cyrillic_cyrillic-ext_latin-regular.aca53ebf.woff2","fonts/roboto-v19-cyrillic_cyrillic-ext_latin-regular.woff2"],"fonts/roboto-v19-cyrillic_cyrillic-ext_latin-regular.woff2"],"./..\\fonts\\roboto-v19-cyrillic_cyrillic-ext_latin-regular.woff":[["roboto-v19-cyrillic_cyrillic-ext_latin-regular.58dffa9d.woff","fonts/roboto-v19-cyrillic_cyrillic-ext_latin-regular.woff"],"fonts/roboto-v19-cyrillic_cyrillic-ext_latin-regular.woff"],"./..\\fonts\\roboto-v19-cyrillic_cyrillic-ext_latin-regular.ttf":[["roboto-v19-cyrillic_cyrillic-ext_latin-regular.6c9490a1.ttf","fonts/roboto-v19-cyrillic_cyrillic-ext_latin-regular.ttf"],"fonts/roboto-v19-cyrillic_cyrillic-ext_latin-regular.ttf"],"./..\\fonts\\roboto-v19-cyrillic_cyrillic-ext_latin-regular.svg":[["roboto-v19-cyrillic_cyrillic-ext_latin-regular.3ea8f8d9.svg","fonts/roboto-v19-cyrillic_cyrillic-ext_latin-regular.svg"],"fonts/roboto-v19-cyrillic_cyrillic-ext_latin-regular.svg"],"./..\\fonts\\roboto-v19-cyrillic_cyrillic-ext_latin-900.eot":[["roboto-v19-cyrillic_cyrillic-ext_latin-900.36b7de8d.eot","fonts/roboto-v19-cyrillic_cyrillic-ext_latin-900.eot"],"fonts/roboto-v19-cyrillic_cyrillic-ext_latin-900.eot"],"./..\\fonts\\roboto-v19-cyrillic_cyrillic-ext_latin-900.woff2":[["roboto-v19-cyrillic_cyrillic-ext_latin-900.54cafda5.woff2","fonts/roboto-v19-cyrillic_cyrillic-ext_latin-900.woff2"],"fonts/roboto-v19-cyrillic_cyrillic-ext_latin-900.woff2"],"./..\\fonts\\roboto-v19-cyrillic_cyrillic-ext_latin-900.woff":[["roboto-v19-cyrillic_cyrillic-ext_latin-900.49776890.woff","fonts/roboto-v19-cyrillic_cyrillic-ext_latin-900.woff"],"fonts/roboto-v19-cyrillic_cyrillic-ext_latin-900.woff"],"./..\\fonts\\roboto-v19-cyrillic_cyrillic-ext_latin-900.ttf":[["roboto-v19-cyrillic_cyrillic-ext_latin-900.368af77c.ttf","fonts/roboto-v19-cyrillic_cyrillic-ext_latin-900.ttf"],"fonts/roboto-v19-cyrillic_cyrillic-ext_latin-900.ttf"],"./..\\fonts\\roboto-v19-cyrillic_cyrillic-ext_latin-900.svg":[["roboto-v19-cyrillic_cyrillic-ext_latin-900.5f927c7f.svg","fonts/roboto-v19-cyrillic_cyrillic-ext_latin-900.svg"],"fonts/roboto-v19-cyrillic_cyrillic-ext_latin-900.svg"],"./..\\images\\about-products\\background.jpg":[["background.803e8979.jpg","images/about-products/background.jpg"],"images/about-products/background.jpg"],"./..\\images\\main-screen\\raspberrie.png":[["raspberrie.d36cb90b.png","images/main-screen/raspberrie.png"],"images/main-screen/raspberrie.png"],"./..\\images\\main-screen\\blackberry.png":[["blackberry.3c7b47bb.png","images/main-screen/blackberry.png"],"images/main-screen/blackberry.png"],"./..\\images\\main-screen\\strawberry.png":[["strawberry.2b05899a.png","images/main-screen/strawberry.png"],"images/main-screen/strawberry.png"],"./..\\images\\main-screen\\lemon.png":[["lemon.b1759aba.png","images/main-screen/lemon.png"],"images/main-screen/lemon.png"],"./..\\images\\main-screen\\background.png":[["background.dacad9f3.png","images/main-screen/background.png"],"images/main-screen/background.png"],"./..\\images\\products-screens\\omega\\planet.svg":[["planet.00e35f3e.svg","images/products-screens/omega/planet.svg"],"images/products-screens/omega/planet.svg"],"./..\\images\\products-screens\\calcivit\\vitamins.png":[["vitamins.9fbd7cd6.png","images/products-screens/calcivit/vitamins.png"],"images/products-screens/calcivit/vitamins.png"],"./..\\images\\products-screens\\calcivit\\vitamins@2x.png":[["vitamins@2x.bd55263e.png","images/products-screens/calcivit/vitamins@2x.png"],"images/products-screens/calcivit/vitamins@2x.png"],"./..\\images\\products-screens\\multivit\\vitamins.png":[["vitamins.8cdc16da.png","images/products-screens/multivit/vitamins.png"],"images/products-screens/multivit/vitamins.png"],"./..\\images\\products-screens\\multivit\\vitamins@2x.png":[["vitamins@2x.18ab7b2a.png","images/products-screens/multivit/vitamins@2x.png"],"images/products-screens/multivit/vitamins@2x.png"],"./..\\images\\products-screens\\immunovit\\vitamins.png":[["vitamins.9d0891b4.png","images/products-screens/immunovit/vitamins.png"],"images/products-screens/immunovit/vitamins.png"],"./..\\images\\products-screens\\immunovit\\vitamins@2x.png":[["vitamins@2x.f7fb62b1.png","images/products-screens/immunovit/vitamins@2x.png"],"images/products-screens/immunovit/vitamins@2x.png"],"./..\\images\\products-screens\\smartvit\\vitamins.png":[["vitamins.29343a80.png","images/products-screens/smartvit/vitamins.png"],"images/products-screens/smartvit/vitamins.png"],"./..\\images\\products-screens\\smartvit\\vitamins@2x.png":[["vitamins@2x.939adca2.png","images/products-screens/smartvit/vitamins@2x.png"],"images/products-screens/smartvit/vitamins@2x.png"],"./..\\images\\products-screens\\omega\\vitamins.png":[["vitamins.bb2de1c9.png","images/products-screens/omega/vitamins.png"],"images/products-screens/omega/vitamins.png"],"./..\\images\\products-screens\\omega\\vitamins@2x.png":[["vitamins@2x.7bb84292.png","images/products-screens/omega/vitamins@2x.png"],"images/products-screens/omega/vitamins@2x.png"],"./..\\images\\products-screens\\calcivit\\btn-icon.png":[["btn-icon.936ebf52.png","images/products-screens/calcivit/btn-icon.png"],"images/products-screens/calcivit/btn-icon.png"],"./..\\images\\products-screens\\multivit\\btn-icon.png":[["btn-icon.4691924e.png","images/products-screens/multivit/btn-icon.png"],"images/products-screens/multivit/btn-icon.png"],"./..\\images\\products-screens\\immunovit\\btn-icon.png":[["btn-icon.39ea3320.png","images/products-screens/immunovit/btn-icon.png"],"images/products-screens/immunovit/btn-icon.png"],"./..\\images\\products-screens\\smartvit\\btn-icon.png":[["btn-icon.94704e3e.png","images/products-screens/smartvit/btn-icon.png"],"images/products-screens/smartvit/btn-icon.png"],"./..\\images\\products-screens\\hello-kitty\\btn-icon.png":[["btn-icon.f8c3ce69.png","images/products-screens/hello-kitty/btn-icon.png"],"images/products-screens/hello-kitty/btn-icon.png"],"./..\\images\\product-page\\light-481.png":[["light-481.565bd15b.png","images/product-page/light-481.png"],"images/product-page/light-481.png"],"./..\\images\\product-page\\light.png":[["light.898f3c68.png","images/product-page/light.png"],"images/product-page/light.png"],"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63034" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js"], null)
//# sourceMappingURL=/product-styles.976f11ce.js.map