# React Create Portal [![Build Status](https://travis-ci.org/levinqdl/react-aperture.svg?branch=master)](https://travis-ci.org/levinqdl/react-aperture)

Render elements through a Portal, give you more control over your UI, e.g. rendering a button into footer inside your deeply nested component

## Principles

- Declarative
- Start quickly
- Reasonable
- Test friendly

## Prerequisites

- New React Context API
- ReactDOM Portal

## Get Started

```bash
npm install react-create-portal
```

or

```bash
yarn add react-create-portal
```

## Examples

```javascript
// App.js
import React from "react"
import { PortalProvider, createPortal } from "react-create-portal"

const {
  Slot, // place Slot at where elements render
  Render, // Render's children will be portaled into Slot
} = createPortal()

const App = () => (
  <PortalProvider>
    <div>
      Hello <Slot />!
    </div>
    <Render>World</Render>
  </PortalProvider>
)

/** output dom
 * <div>Hello World!</div> // World renders between "Hello" and "!"
 */
```

## Todos

- [x] bundler
- [x] static type
- [x] test
- [x] PortalProvider
- [x] createPortal
- [x] CI
- [ ] Breadcrumbs
- [ ] docs
- [x] examples
- [ ] publish
