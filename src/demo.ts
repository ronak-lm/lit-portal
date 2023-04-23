import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";

import "./lit-portal.js";

@customElement("demo-page")
export class DemoPage extends LitElement {
  @state()
  location = "top-left";

  render() {
    return html`
      <div
        style="display: flex; align-items: center; justify-content: center; postion: relative; width: 100%; height: 100%; background: black; color: white;"
      >
        <!-- Destinations -->
        <div
          id="top-left"
          style="position: absolute; top: 0; left: 0; width: 150px; height: 150px; border: 1px solid white;"
        ></div>
        <div
          id="top-right"
          style="position: absolute; top: 0; right: 0; width: 150px; height: 150px; border: 1px solid white;"
        ></div>
        <div
          id="bottom-right"
          style="position: absolute; bottom: 0; right: 0; width: 150px; height: 150px; border: 1px solid white;"
        ></div>
        <div
          id="bottom-left"
          style="position: absolute; bottom: 0; left: 0; width: 150px; height: 150px; border: 1px solid white;"
        ></div>

        <!-- Control Panel -->
        <div id="main" style="display: flex; flex-direction: column;">
          Where do you want to send the button?
          <button @click=${() => (this.location = "top-left")}>Top Left</button>
          <button @click=${() => (this.location = "top-right")}>Top Right</button>
          <button @click=${() => (this.location = "bottom-left")}>Bottom Left</button>
          <button @click=${() => (this.location = "bottom-right")}>Bottom Right</button>
        </div>

        <!-- The Portal Component -->
        <lit-portal to=${this.location} .body=${html`<test-btn></test-btn>`}></lit-portal>
      </div>
    `;
  }

  // Disabling the shadow root
  protected createRenderRoot(): Element | ShadowRoot {
    return this;
  }
}

@customElement("test-btn")
export class TestBtn extends LitElement {
  connectedCallback() {
    super.connectedCallback();
    console.log("<test-btn/> Connected");
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    console.log("<test-btn/> Disconnected");
  }

  render() {
    return html`<button>Portaled Button</button>`;
  }
}
