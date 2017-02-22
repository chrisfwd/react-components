# react-components
A collection of custom React.JS components I've decided to share.

## ScrollWithViewport

- This component will make sure the content within will be fixed to the top of the viewport when the page is scrolled down beyond the top of the element.
- This is useful for menus or headers that you want to keep visible when the user scrolls

example implementation within render() method:
```javascript
<ScrollWithViewport>
  <div>any content you want to stay within the viewport when the page is scrolled</div>
</ScrollWithViewport>
```
