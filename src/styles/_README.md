# CSS Styleguide

This guide contains our best practices and suggestions that fit our work environment.

## Contents

- [Class naming convention](#class-naming-convention)
- [Coding style](#coding-style)
- [Colors](#colors)
- [Css for JavaScript](#css-for-javascript)
- [Designing for different sized plataforms](#designing-for-different-sized-plataforms)
- [Tools](#tools)
- [Typography](#typograph)
- [Units](#units)
- [Z-index](#z-index)
- [Stylelint](#stylelint)

## Class naming convention

In simple terms, we'll have classes for components and for elements inside the components. Components will be named with at least two words, separated by a dash, and elements shall have no dashes, only lowercase letters.

**Right**

```scss
.menu-nav {
  > .item {
  }
}
```

**Wrong**

```scss
.menu_nav {
  > .menu_nav-item {
  }
}
```

## Coding style

**You should:**

- Use soft-tabs with a two space indent
- Put spaces before `{` in rule declarations (right: `.foo {}`; wrong: `.foo{}`)
- Use `//` for comment blocks (instead of `/* */`)

**Would be nice if you:**

- Avoid using `margin-top` and prefer the use of only `margin-bottom`. With all your elements having margin only below them it is easier to organize the overall structure.

### Order of properties declarations

In order for us to have a standard way of writing CSS we should always try to declare the properties in a specific order. This is not a "frozen" thing, and it is flexible, but the main guideline here is to group some properties together and have these blocks in a specific order.

The declarations groups are the following (and should follow this order):

1. **Mixins' includes**: these should be the first instructions to be declared. It is not a property, and it should be declared before so it can be overridden by properties declared below it.

2. **Box model properties**: The CSS box model is essentially a box that wraps around every HTML element. These are `width`, `height`, `padding`, `margin`, and `border`.

3. **Other layout/positioning properties**: properties with the function of positioning elements such as `display`, `position`, `top`, `right`, `bottom`, and `left`.

4. **Typography**: properties such as the `font` properties (i.e.: `font-size`, `font-family`, etc.), `text` properties (i.e.: `text-transform`, `text-decoration`, etc.) and `line-height`.

5. **Aesthetic/cosmetic properties**: properties that change the elements visual aspects without changing its size or positioning, such as `background`, `color`, `box-shadow`, `opacity`, `cursor`, etc.

6. **Transition**: `transition` properties (i.e.: `transition-delay`, `transition-duration`, `transition-property`, and `transition-timing-function`).

These groups should be separated by a blank line.

**Example**

```scss
.button {
  @include btn;

  width: 240px;
  margin-top: 2rem;
  margin-bottom: 4rem;

  position: absolute;
  top: 8rem;

  font-size: $font-size-body;
  text-transform: uppercase;
  text-decoration: underline;

  color: $color-highlight;
  background-color: $color-dark;
  opacity: 0.6;
  box-shadow: 0 2px 4px rgba(#000, 0.2);

  transition: opacity 0.2s ease-in;
}
```

Another relevant pattern to be followed is declaring abscissa properties before ordinate properties if both exists. For example, `transformX` should come before `transformY`; and `width` should come before `height`.

Properties should also be spread when possible to avoid conflicts of overriding when not wanted.

**Avoid**

```scss
.bg {
  background: fixed $color-main url(../assets/bg.png) center top no-repeat;
}
```

**Prefer**

```scss
.bg {
  background-attachment: fixed;
  background-color: $color-main;
  background-image: url(../assets/bg.png);
  background-position: center top;
  background-repeat: no-repeat;
}
```

## Colors

Prefer hexadecimal color codes `#f7931e` with lowercase letters and abbreviate them to three characters when possible `#f36`.

### Color variables

We recommend using variables to set project's color palette with names beginning with `color-`. So when using it in any part of project it's implicit that is a color variable and we can take advantage of text auto complete listing only color variables.

When defining the color variables for a project, you can approach it in two different ways.

The first way is to set variables for every hexadecimal that will be used in the project. Some of these colors will be shades of another color, so you can name them with the suffix `-light`, `-dark`, `xlight`, `x-dark`, `xx-dark`, and so on, like this:

```scss
$color-action: #2aaafe;
$color-action-hover: #018fec;

$color-error: #de4163;

$color-coolgray: #c4ced9;
$color-coolgray-light: #f0f2f5;
$color-coolgray-xlight: #f8f9fa;
$color-coolgray-dark: #8d969b;
$color-coolgray-xdark: #51565b;
```

Also, when using color variables, create them for colors and then create a different variable with a name that specify its use, the following way.

```scss
$color-blue: #2aaafe;
$color-pink: #de4163;
$color-coolgray: #c4ced9;

$color-action: $color-blue;
$color-error: $color-pink;
```

### Grays

When using shades of gray on your project, set the values using the HSL format (e.g.: `hsl(0, 0%, 30%)`).

HSL stands for hue, saturation, and lightness - and represents a cylindrical-coordinate representation of colors.

An HSL color value is specified with: `hsl(hue, saturation, lightness)`. This format makes it easy to see how dark or light the shade of gray is, and easy to change it by only changing the `lightness` value.

**Right**

```scss
color: hsl(0, 0%, 25%); // dark gray
color: hsl(0, 0%, 40%); // medium gray
color: hsl(0, 0%, 80%); // light gray
```

**Wrong**

```scss
color: #404040; // dark gray
color: $color-gray-40; // medium gray
color: #ccc; // light gray
```

It is also important to avoid many different shades of gray in the project. It is not common for a project to have more than 5 different grays, and in such case the project should be optimized to use only the grays necessary in order to improve the overall UX.

In order to a better management of the amount of grays and the use of them, we suggest you start the css file for colors with the color palette documented right away.

```scss
// light gray for background: hsl(0, 0%, 90%)
// light gray for font: hsl(0, 0%, 70%)
// dark gray for background: hsl(0, 0%, 40%)
// dark gray for font: hsl(0, 0%, 30%)
```

### Color Names

It should never be used in a project. Use it only for fast prototyping and testing specific components.

```scss
color: red;
color: gold;
color: fuchsia;
```

## Css for JavaScript

### Controlling DOM elements with Javascript

Don't use CSS classes to query DOM elements on JavaScript.

Set `role` attribute to your components and leave CSS classes for styling purposes only because it isn't obvious which class names are for styles and which have JS behaviors bound to them.

_Need to include a study about perfomance when querying through role attribute._

_Need to include a reference on not using classes to query DOM elements._

**Wrong**

```html
<div class="user-info">...</div>
```

```javascript
$('.user-info').on('hover', function() { ... });
```

**Right**

```html
<div class="user-info" role="avatar-popup">...</div>
```

```javascript
$('[role~="avatar-popup"]').on('hover', function() { ... });
```

### Add or remove classes for styling components

Use `role` attributes only to query elements. If your Javascript needs to change a style add/remove classes. Don't set/unset other element attributes.

## Designing for different sized plataforms

Responsive web design is not only the adaptation of the user experience to mobile devices, but designing and developing for every possible resolution and ratio of screen.

Therefore, one very useful strategy to responsive design and development is use a fluid structure to your layout. Container dimensions with values set in percentage or relative units (`vw`, `vh`) are often useful to make sure the sizes will adapt according to available space.

However, breakpoints are useful for adapting specificities and they should be used to better adapt the layout in specific circumstances. Also, break points should be set in variables so it is easier to change them when needed.

**Right**

```scss
// Defining values
$small-range:   (0em, 40em);       /* 0, 640px */
$medium-range:  (40.063em, 64em);  /* 641px, 1024px */
$large-range:   (64.063em, 90em);  /* 1025px, 1440px */
$xlarge-range:  (90.063em, 120em); /* 1441px, 1920px */
$xxlarge-range: (120.063em);       /* 1921px */

// Defining media queries
$small-only:   "only screen and (max-width: #{upper-bound($small-range)})" !default;
$medium-up:    "only screen and (min-width:#{lower-bound($medium-range)})" !default;
$medium-only:  "only screen and (min-width:#{lower-bound($medium-range)}) and (max-width:#{upper-bound($medium-range)})" !default;
$large-up:     "only screen and (min-width:#{lower-bound($large-range)})" !default;
$large-only:   "only screen and (min-width:#{lower-bound($large-range)}) and (max-width:#{upper-bound($large-range)})" !default;
$xlarge-up:    "only screen and (min-width:#{lower-bound($xlarge-range)})" !default;
$xlarge-only:  "only screen and (min-width:#{lower-bound($xlarge-range)}) and (max-width:#{upper-bound($xlarge-range)})" !default;
$xxlarge-up:   "only screen and (min-width:#{lower-bound($xxlarge-range)})" !default;

// Usage
@media #{$small-only}   { … }
@media #{$medium-up}    { … }
@media #{$medium-only}  { … }
@media #{$large-up}     { … }
@media #{$large-only}   { … }
@media #{$xlarge-up}    { … }
@media #{$xlarge-only}  { … }
@media #{$xxlarge-up}   { … }
```

Also, when setting dimensions for containers and main structural components, try using both fixed values and relative values so you can control how much it will vary according to the viewport, for example:

**Avoid**

```scss
.container {
  width: calc(50% + 20em);
  max-width: calc(100% - 2em);
}
```

**Prefer**

```scss
.container {
  width: 960px;
  max-width: 90%;
}
```

## Tools

### Sass

We recommend the use of SCSS syntax when using Sass.

**SCSS (Sassy CSS)**

```scss
h1 {
  font-size: $font-size-h1;
}

h2 {
  font-size: $font-size-h2;
}

.item {
  box-shadow: 0 2px 0px #dcffa6, 0 2px 5px #000;
}
```

**Sass**

```sass
h1
  font-size: $font-size-h1

h2
  font-size: $font-size-h2

.item
  box-shadow: 0 2px 0px #dcffa6, 0 2px 5px #000
```

Comparing both syntaxes, SCSS allows you to write selectors and attributes on the same line so you can simplify your code. At the same time you need to be careful not to code in a way it's hard to read and understand.

You can write plain CSS in SCSS (or reuse CSS code from elsewhere). Also, for the same reason, the learning curve is smoother for people who already know CSS.

## Typography

In a project, the rules for typography should be pre-defined and systematic. By doing this it makes sure the overall look and feel is consistent and also prevents problems in the user experience.

### Font families

A project can have as many font families as you like, but each one of them must have a "reason to be". There should not be an extra font family for no reason, if there is no specific need or advantage for using it.

These font families should always be assigned to variables so they can be re-used in the project. The names of the variables should have a direct link with its "reason to be", as presented below.

**Right**

```scss
$font-family-body: "Tiempos Text", Georgia, Times, serif;
$font-family-headings: "Gotham", "Montserrat", Helvetica, serif;
$font-family-button: "FF DIN", "Roboto", sans-serif;
```

**Wrong**

```scss
$font-family-serif: "Tiempos Text", Georgia, Times, serif;
$font-family-gotham: "Gotham", "Montserrat", Helvetica, serif;
$button-font-family: "FF DIN", "Roboto", sans-serif;
```

Then, when assigning font families to selectors, you should assign it as few times as possible so the css code is easier to maintain.

**Right**

```scss
p {
  font-family: "Tiempos Text", Georgia, Times, serif;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Gotham", "Montserrat", Helvetica, serif;
}

.action-button {
  font-family: "FF DIN", "Roboto", sans-serif;
}
```

**Wrong**

```scss
.sidebar-component {
  > .description {
    font-family: "Tiempos Text", Georgia, Times, serif;
  }
}
```

### Font size & line height variables

For font size and line height values, the variables should be set using the metric prefixes. The variable names should refer to its size in relation to the "base size" (the size used in most of the body text in the project). This way we understand how big or small the text is directly from reading the variable name.

> Harry Roberts suggests the greek alphabet notation (`alpha`, `beta`, `gama`, etc) for setting font sizes names, but we prefere a way that makes more explicit the size in relation to each other (also, his example differs from our due to our use of mixins). You can find more interesting content on font sizing in CSS reading his article ["Pragmatic, practical font sizing in CSS"](http://csswizardry.com/2012/02/pragmatic-practical-font-sizing-in-css/).

**Right**

```scss
$font-size-mega: 4em;
$font-size-kilo: 3em;
$font-size-hecto: 2em;
$font-size-deca: 1.5em;
$font-size-base: 1em;
$font-size-deci: 0.75em;
$font-size-centi: 0.625em;

$line-height-mega: 3.5rem;
$line-height-kilo: 3rem;
$line-height-hecto: 2.5rem;
$line-height-deca: 2rem;
$line-height-base: 1.5rem;
$line-height-deci: 1rem;
$line-height-centi: 0.5rem;
```

**Wrong**

```scss
$font-size-extralarge: 4em;
$font-size-large: 3em;
$font-size-medium: 2em;
$font-size-small: 1em;
$font-size-extrasmall: 0.5em;
```

**Also Wrong**

```scss
$font-size-colossal: 4.5em;
$font-size-giant: 4em;
$font-size-huge: 3em;
$font-size-large: 2em;
$font-size-medium: 1em;
$font-size-small: 1em;
$font-size-tiny: 0.8em;
$font-size-minuscule: 0.6em;
```

Use the font size attribute on html tag selectors (h1, h2, p, etc) so you won't have to do so on specific situations unless it is an exception.

**Right**

```scss
p {
  font-size: $font-size-base;
  line-height: $line-height-base;
}

h1 {
  font-size: $font-size-mega;
  line-height: $line-height-mega;
}

h2 {
  font-size: $font-size-kilo;
  line-height: $line-height-kilo;
}

h3 {
  font-size: $font-size-hecto;
  line-height: $line-height-hecto;
}

h4 {
  font-size: $font-size-deca;
  line-height: $line-height-deca;
}

h5 {
  font-size: $font-size-centi;
  line-height: $line-height-centi;
}

h6 {
  font-size: $font-size-mili;
  line-height: $line-height-mili;
}

.news-item {
  > .caption {
    font-size: $font-size-centi;
    line-height: $line-height-centi;
  }
}
```

Avoid the need for repeating a font size variable in your code. Preferably, it should be set only twice: in the html tag selectors (e.g.: `h2`) or in a mixin (e.g.: `@mixin caption`).

**Right**

```scss
@mixin btn {
  font-size: $font-size-centi;
  // You would also want to add other "btn" styles here…
}

.action-button {
  @mixin btn;
}

.confirmation-popup {
  > .button {
    @mixin btn;
  }
}
```

**Wrong**

```scss
.action-button {
  font-size: $font-size-centi;
}

.confirmation-popup {
  > .button {
    font-size: $font-size-centi;
  }
}
```

### Font weight

The font weight value should be declared in numbers (e.g.: `100`), the only valid number ins CSS are multiples of 100, from 100 to 900.

**Right**

```scss
.title {
  font-weight: 700;
}
```

Each weight (hairline, thin, light, regular, medium, semibold, bold, heavy, black) should have its own number value (from 100 to 900). If there are any weights not mention before (such as “extra light”, “demibold” or “ultra black”) this framework can be adatped to fit them as log as thin is always 300, regular is always 400 and bold is always 700.

**Right**

```scss
@font-face {
  font-family: "Greta Sans";
  src: url("fonts/GretaSans-.wotf");
  font-weight: 100;
}

@font-face {
  font-family: "Greta Sans";
  src: url("fonts/GretaSans-.wotf");
  font-weight: 200;
}

@font-face {
  font-family: "Greta Sans";
  src: url("fonts/GretaSans-Light.wotf");
  font-weight: 300;
}

@font-face {
  font-family: "Greta Sans";
  src: url("fonts/GretaSans-Regular.wotf");
  font-weight: 400;
}

@font-face {
  font-family: "Greta Sans";
  src: url("fonts/GretaSans-Medium.wotf");
  font-weight: 500;
}

@font-face {
  font-family: "Greta Sans";
  src: url("fonts/GretaSans-Semibold.wotf");
  font-weight: 600;
}

@font-face {
  font-family: "Greta Sans";
  src: url("fonts/GretaSans-Bold.wotf");
  font-weight: 700;
}

@font-face {
  font-family: "Greta Sans";
  src: url("fonts/GretaSans-Heavy.wotf");
  font-weight: 800;
}

@font-face {
  font-family: "Greta Sans";
  src: url("fonts/GretaSans-Black.wotf");
  font-weight: 900;
}
```

## Units

### Units for `font-size`

The `font-size` property should also have a value in either `em` or `rem`. The default unit in this case should be `em`, but if there's need to used the font size in `rem` it is fine :)

**Right**

```scss
h1 {
  font-size: 2em;
}

h2 {
  font-size: 1.6em;
}

p {
  font-size: 1em;
}
```

**Wrong**

```scss
h1 {
  font-size: 32px;
}

h2 {
  font-size: 10vw;
}

p {
  font-size: 16pt;
}
```

### Units for `line-height`

If the project have a consistent vertical rhythm, the `line-height` property should have a value multiple of the vertical grid module in the project.

**Project WITH consistent vertical rhythm**

```scss
html {
  font-size: 16px;
}

h1 {
  line-height: 2rem;
}

h2 {
  line-height: 1.5rem;
}

p {
  line-height: 1rem;
}
```

**Project WITHOUT consistent vertical rhythm**

```scss
h1 {
  line-height: 34px;
}

h2 {
  line-height: 26px;
}

p {
  line-height: 16px;
}
```

### Units for vertical margins and paddings

In general, vertical margins and paddings (top and bottom) are used as typographical tools to organize, group and arrange text. In order to maintain the vertical rhythm they should follow the same rules of the [Units for `line-height`](#units-for-line-height).

This means those values should always be multiple of `0.5rem` (if the project have a consistent vertical rhythm).

**Project WITH consistent vertical rhythm**

```scss
h3 {
  margin-bottom: 2rem;
}
```

**Project WITHOUT consistent vertical rhythm**

```scss
h3 {
  margin-bottom: 32px;
}

.sidebar > h3 {
  margin-bottom: 30px;
}

.article > h3 {
  margin-bottom: 34px;
}
```

## Z-index

This is a property that requires attention, as if not used correctly it will cause a lot of problems when the project is advanced. There are a few ways to avoid these problems and the most common is to set variables with z-index values for the most used components:

```
$base: 0;
$above: 1;
$below: -1;
$dropdown: 2;
$navbar: 3;
$modal: 4;
$toast: 5;
$loading: 6;
```

So, if a new component needs a z-index the ideal is to add it to this list according to its proper position.

## Stylelint

Stylelint is a great linter to help with css standards and make sure the styleguide is being followed. So first of all, stylelint works with styled components, but the --fix function doesn't, and because of that, any problems found will have to be fixed manually. Another point of attention is that stylelint doesn't read the attributes inside a block function and therefore doesn't apply the rules in that part of the code. To ensure that stylelint checks all code, it's best to avoid setting attributes inside these functions. If some of the rules are not clear, this [doc](https://stylelint.io/user-guide/rules/list/) will help to understand.

**Wrong**

```
export const HighlightedText = styled.p`
  ${({ theme }) => css`
  	margin-top: 16px;
    font-weight: 700;
    font-size: 16px;
    text-align: center;
    color: ${theme.colors.neutral[800]};
  `}
`;

export const ProgressBar = styled.div`
  ${() => css`
    margin-bottom: 28px;
  	display: flex;
  `}
`;
```

**Right**

```
export const HighlightedText = styled.p`
  margin-top: 16px;
  font-weight: 700;
  font-size: 16px;
  text-align: center;
  color: ${({ theme }) => theme.colors.neutral[800]};
`;
export const RowsModalRow = styled.div`
  margin-bottom: 28px;
  display: flex;
`;

```
