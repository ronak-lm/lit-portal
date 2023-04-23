# Lit Portal

The `<lit-portal/>` component enables you to seamlessly _teleport_ your HTML to a different part of the DOM, while retaining all the benefits of [Lit](https://lit.dev) framework's state management, shadow DOM encapsulation, and other features. With this component, you can easily create dynamic UI elements such as modals, notifications, tooltips, and more.

## Install

#### npm

    npm i lit-portal

#### yarn

    yarn add lit-portal

## Usage

1. Write the import statement
2. Use **`<lit-portal />`** component with the **`to`** property to specify where you want the contents to be _portaled_ to.
3. Use **`.body`** property to specify the contents.

```javascript
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

import "lit-portal";

@customElement("my-page")
export class MyPage extends LitElement {
  render() {
    return html`
      <p>This Renders Inline</p>

      <lit-portal
        to="portal-root"
        .body=${html`<p>This renders in a div with the ID "portal-root"</p>`}
      ></lit-portal>
    `;
  }
}
```

### Props

- **to**

  - Type: `string`
  - Optional: Yes
  - Notes:
    - If you do not specify this property, the contents will be portaled to the end (before the `</body>` tag)
    - If the ID provided is not present in the DOM, a div will be created with that ID and added to the end (before the `</body>` tag)
    - If this property is changed dynamically, the elements will be unmounted / removed from the old destination and remounted into the new destination. _Any state within them will be lost_ and life cycle methods like `disconnectedCallback` will be run on the old instance and `connectedCallback` will be run on the new instance.

- **containerClass**

  - Type: `string`
  - Optional: Yes
  - Notes: This class name will be given to the container div that will contain your body.

- **.body**
  - Type: [`TemplateResult`](https://lit.dev/docs/api/templates/#TemplateResult)
  - Notes:
    - Use the [`html`](https://lit.dev/docs/api/templates/#html) function to render.
    - Make sure to add `.` before body otherwise you'll just see `[object Object]` as the output.

## Limitations & Quirks

- **Shadow DOM Issues**

  - This component uses `document.getElementById()` to find the destination (`to`) element and render the body within it.
  - BUT if your destination is within a shadow root, `getElementById()` returns `null`. There is no feasible work around to this. Your destination MUST be in `document` and not within a shadow root.
  - The `body` itself can have a shadow DOM. So you won't need to make any changes within your existing components that are being portaled.

- **Use Arrow Functions For Events**

  - For any event listeners attached within the `.body`, make sure they are arrow functions otherwise `this` doesn't work. A sample code below for your reference:
  - ![Sample Code](/docs/event-listener.png)

- **Container Wrapped**
  - You can use the `<lit-portal />` multiple times in your layout. Each instance of it can also be portaled to the same destination element.
  - BUT each instance creates one div (with a unique ID) inside the destination element within which the body is rendered. This is done to keep track and clean up the elements as and when required.
  - If you want to style this container, you can use the `containerClass` attribute, give it a unique class name and add your CSS on that.

**If you come across any other limiations OR know fixes to any of the above, feel free to create a PR!**

## License

MIT
