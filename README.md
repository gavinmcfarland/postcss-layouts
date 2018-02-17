# PostCSS Layouts

[![NPM Version][npm-img]][npm-url]
[![Linux Build Status][cli-img]][cli-url]
[![Windows Build Status][win-img]][win-url]
[![Gitter Chat][git-img]][git-url]

A shorthand to apply sensible default layout characteristics using a preferred method.

```
layout: flex | [grow, shrink] | [wrap, nowrap] | [open, closed] | [row, column]
```

Flex layout:

```css
.container {
    layout: flex;
}
```

Using flex alone will automatically make all container items flex to the containers width and wrap if equal to bigger than the containers width.


Inline-block:

```css
.container {
    layout: inline-block;
}
```

This uses `display: inline-block` to give layout to the container's child elements.


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
