// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import css from "../css/app.css"

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import dependencies
//
import "phoenix_html"
import './alpine'

// Import local files
//
// Local files can be imported directly using relative paths, for example:
import {Socket} from "phoenix"
import LiveSocket from "phoenix_live_view"

let csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content");

let Hooks = {}
Hooks.initModal = {
  mounted() {
    const handleOpenCloseEvent = event => {
      if (event.detail.open === false) {
        this.el.removeEventListener("modal-change", handleOpenCloseEvent)
        this.pushEvent("close-modal", {id: this.el.id})
      }
    }
    this.el.addEventListener("modal-change", handleOpenCloseEvent)
  }
}

Hooks.closeModal = {
  mounted() {
    const modalId = this.el.dataset.modalId
    const el = document.getElementById(modalId)
    const event = new CustomEvent('close-modal');
    el.dispatchEvent(event)
  }
}
let liveSocket = new LiveSocket("/live", Socket, {hooks: Hooks, params: {_csrf_token: csrfToken}});

// connect if there are any LiveViews on the page
liveSocket.connect()

let alpineStarted = false;
let componentFactory = Alpine.component;

window.deferLoadingAlpine = function () {
  document.addEventListener("phx:update", function () {
    if (!alpineStarted) {
      alpineStarted = true;
      Alpine.discoverUninitializedComponents((el) => {
        Alpine.initializeComponent(el);
      });
    } else {
      Alpine.discoverComponents((el) => {
        if (el.__x) {
          let data = el.__x.getUnobservedData();
          let component = new componentFactory(el, data, true);
          el.__x = component;
        } else {
          Alpine.initializeComponent(el);
        }
      });
    }
  });
};

// expose liveSocket on window for web console debug logs and latency simulation:
// >> liveSocket.enableDebug()
// >> liveSocket.enableLatencySim(1000)
window.liveSocket = liveSocket;

window.deferLoadingAlpine(function () {
  window.Alpine.start();
});
