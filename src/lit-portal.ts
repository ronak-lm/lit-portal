import { LitElement, html, render } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("lit-portal")
export class LitPortal extends LitElement {
  @property()
  to?: string;

  @property()
  containerClass = "";

  @property()
  body = html``;

  @state()
  uniqueID = `lit-portal-${Math.random().toString(36).substring(2)}`;

  // Returns the element to which the body should be "portaled"
  getDestination() {
    let destination: HTMLElement | null = null;
    if (this.to === undefined || this.to === null || this.to === "") {
      destination = document.body; // If no destination is specified, render in the document body
    } else {
      destination = document.getElementById(this.to); // Find the destination
      if (!destination) {
        destination = document.createElement("div"); // If the destination does not exist, create it
        destination.id = this.to;
        document.body.appendChild(destination);
      }
    }
    return destination;
  }

  // Returns the unique div inside the destination to which the body should be rendered
  getContainer() {
    // Return the container if it already exists
    let container = document.getElementById(this.uniqueID);
    if (container) return container;

    // Create the container if it does not exist
    container = document.createElement("div");
    container.id = this.uniqueID;
    container.className = "lit-portal__container";
    if (this.containerClass !== "") {
      container.className += ` ${this.containerClass}`;
    }
    this.getDestination().appendChild(container);
    return container;
  }

  // Render the body into the container
  render() {
    render(this.body, this.getContainer());
    return;
  }

  // Remove the container when the element is disconnected
  disconnectedCallback() {
    this.getContainer().remove();
    super.disconnectedCallback();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "lit-portal": LitPortal;
  }
}
