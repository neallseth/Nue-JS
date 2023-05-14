# Nue-JS

Just for fun – a mini JavaScript "framework" with reactive state, conditional rendering, and event handling.

Run the demo with `npm i && npm run start`


## Initialization
Create a Nue instance, and define any properties you require (state data, methods, etc.):

```
const app = new Nue({
  count: 0,
  title: "",
  handleInc() {
    this.count++;
  },
  resetCount() {
    this.count = 0;
  },
});
```

Then, mount your application by passing a selector string to the `mount` method indicating your target element:
```
app.mount("#app");
```


## HTML attributes

### Conditional Rendering

`n-if` - Element remains in DOM only if value is _true_

`n-if-not` - Element remains in DOM only if value is _false_


Example: 
```
<p n-if-not="count">This will show only when 'count' property is falsy!</p>
```
### Data binding & reactive state

`n-update`- Input events from the associated element will update value accordingly

`n-reflect` - Text of associated element will be set to value

Example:
```
<input n-update="name" />

<p>Your name is: <span n-reflect="name"></span></p>
```

### Event handling
`n-click` - Triggers function from click on associated element

Example:
```
<button n-click="resetCount">Reset</button>
```

