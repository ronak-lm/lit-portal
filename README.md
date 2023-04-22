# Lit Portal

The `<lit-portal/>` component enables you to seamlessly _teleport_ your HTML to a different part of the DOM, while retaining all the benefits of [Lit](https://lit.dev) framework's state management, shadow DOM encapsulation, and other features. With this component, you can easily create dynamic UI elements such as modals, notifications, tooltips, and more.

## Install

#### npm

    npm i lit-portal

#### yarn

    yarn add lit-portal

## Usage

1. Write the import statement
2. Use **`<lit-portal />`** component with the **`to`** property to specify where you want the contents to be _portal-ed_ to.
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
    - If you do not specify this property, the contents will be portal-ed to the end (before the `</body>` tag)
    - If the ID provided is not present in the DOM, a div will be created with that ID and added to the end (before the `</body>` tag)

- **containerClass**

  - Type: `string`
  - Optional: Yes
  - Notes: This class name will be given to the container div that will contain your body.

- **.body**
  - Type: [`TemplateResult`](https://lit.dev/docs/api/templates/#TemplateResult)
  - Notes: Use the [`html`](https://lit.dev/docs/api/templates/#html) function to render.

## Quirks

- Multiple items can be portal-ed into a single div. So if you have multiple modals, tooltips, etc, they can be rendered into the same destination.
- But each item will be wrapped in it's own container div which will have a unique ID so they won't be siblings.
- If you want to style this container, you can use the `containerClass` attribute, give it a unique class name and add your CSS on that.

## License

MIT
