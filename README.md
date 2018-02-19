# PostCSS Layouts

[![NPM Version][npm-img]][npm-url]
[![Linux Build Status][cli-img]][cli-url]
[![Windows Build Status][win-img]][win-url]
[![Gitter Chat][git-img]][git-url]

A shorthand for applying sensible layout methods.

## Flex

```
layout: flex [options];
```

**options**
- `shrink` Makes container items shrink to width of its content
- `column` Changes direction of container items
- `nowrap` Prevents container items from wrapping
- `open`   Sets width of container items to full width of container

Example:
```css
.container {
    layout: flex column wrap;
}
```

By default flex automatically makes container items grow to available space and wrap if equal to bigger than the container's width.


## Inline Block

```
layout: inline-block;
```

Example:

```css
.container {
    layout: inline-block;
}
```

Uses `inline-block` technique to layout container items.


## Setup

```bash
npm install postcss-layouts --save-dev
```


[npm-url]: https://www.npmjs.com/package/postcss-layouts
[npm-img]: https://img.shields.io/npm/v/postcss-layouts.svg
[cli-url]: https://travis-ci.org/mindthetic/postcss-layouts
[cli-img]: https://img.shields.io/travis/mindthetic/postcss-layouts.svg
[win-url]: https://ci.appveyor.com/project/mindthetic/postcss-layouts
[win-img]: https://img.shields.io/appveyor/ci/mindthetic/postcss-layouts.svg
[git-url]: https://gitter.im/postcss/postcss
[git-img]: https://img.shields.io/badge/chat-gitter-blue.svg

[PostCSS]: https://github.com/postcss/postcss
