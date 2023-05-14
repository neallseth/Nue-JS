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

app.mount("#app");
