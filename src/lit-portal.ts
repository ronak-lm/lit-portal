import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("lit-portal")
export class LitPortal extends LitElement {
  render() {
    return html` <div>Hello World</div> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "lit-portal": LitPortal;
  }
}
