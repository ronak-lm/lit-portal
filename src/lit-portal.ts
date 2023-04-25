import { LitElement, html, render } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("lit-portal")
export class LitPortal extends LitElement {
  // 1 - PROPERTIES & STATE

  @property() to?: string;
  @property() containerClass = "";
  @property() body = html``;

  @state() uniqueID = `lit-portal-${Math.random().toString(36).substring(2)}`;

  // 2 - HELPERS

  // Returns the element to which the body should be "portal-ed"
  private getOrCreateDestination() {
    let destination: HTMLElement | null = null;
    if (typeof this.to !== "string" || this.to === "") {
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

  // Returns the unique div inside the destination within which the body should be rendered
  private getOrCreateContainer() {
    // Return the container if it already exists
    let container = document.getElementById(this.uniqueID);
    if (container) return container;

    // Create the container if it does not exist
    container = document.createElement("div");
    container.id = this.uniqueID;
    container.className = this.containerClass;
    this.getOrCreateDestination().appendChild(container);
    return container;
  }

  private removeContainer() {
    document.getElementById(this.uniqueID)?.remove();
  }

  // 3 - LIFECYCLE METHODS

  // React to changes in to, containerClass and body
  updated(changedProperties: Map<string, unknown>) {
    // If the destination has changed, remove the old container and create a new one
    if (changedProperties.has("to")) {
      this.removeContainer();
    }
    render(this.body, this.getOrCreateContainer()); // Re-render the body

    // If the containerClass has changed, update the class of the container
    if (changedProperties.has("containerClass")) {
      this.getOrCreateContainer().className = this.containerClass;
    }
  }

  // Remove the container when the element is unmounted
  disconnectedCallback() {
    this.removeContainer();
    super.disconnectedCallback();
  }

  // Render function returns nothing since we don't want to render anything inline
  render() {
    return;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "lit-portal": LitPortal;
  }
}
