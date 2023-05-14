class Nue {
  constructor(data) {
    this.data = data;
  }

  mount(rootElementID) {
    this.appRoot = document.querySelector(rootElementID);
    this.setInitialVisibility();
    this.updateUIFromModel();
    this.bindEvents();
  }

  // coerceValueToBoolean(modelKey) {
  //   console.log(modelKey);
  //   if (modelKey && typeof modelKey === "string") {
  //     let inversionCount = 0;
  //     for (let i = 0; i < modelKey.length; i++) {
  //       if (modelKey[i] === "!") {
  //         inversionCount++;
  //       } else {
  //         break;
  //       }
  //     }
  //     if (inversionCount % 2 === 1) {
  //       return !this.data[modelKey];
  //     } else {
  //       return this.data[modelKey];
  //     }
  //   }
  // }

  setInitialVisibility() {
    const vifElements = this.appRoot.querySelectorAll("[v-if]");
    const vifNotElements = this.appRoot.querySelectorAll("[v-if-not]");
    vifElements.forEach((el) => {
      const modelKey = el.getAttribute("v-if");
      el.style.visibility = this.data[modelKey] ? "visible" : "hidden";
    });
    vifNotElements.forEach((el) => {
      const modelKey = el.getAttribute("v-if-not");
      el.style.visibility = !this.data[modelKey] ? "visible" : "hidden";
    });
  }

  bindEvents() {
    const inputEls = this.appRoot.querySelectorAll("[v-update]");
    inputEls.forEach((el) => {
      if (el.tagName === "INPUT") {
        const modelName = el.getAttribute("v-update");
        el.addEventListener("input", (e) => {
          this.data[modelName] = e.target.value;
          this.updateUIFromModel(modelName);
        });
      }
    });

    const clickEls = this.appRoot.querySelectorAll("[v-click]");
    clickEls.forEach((el) => {
      const clickHandlerKey = el.getAttribute("v-click");
      const targetMethod = this.data[clickHandlerKey].bind(this.data);
      if (typeof targetMethod === "function") {
        el.addEventListener("click", () => {
          targetMethod();
          this.updateUIFromModel();
        });
      }
    });
  }

  updateUIFromModel(modelName) {
    if (!modelName) {
      for (const modelKey in this.data) {
        this.updateUIFromModel(modelKey);
      }
    }
    const modelValue = this.data[modelName];
    if (modelValue === "undefined" || typeof modelValue === "function") {
      return;
    }
    const contentElements = this.appRoot.querySelectorAll(
      `[v-reflect=${modelName}]`
    );
    const vifElements = this.appRoot.querySelectorAll(`[v-if=${modelName}]`);

    const vifNotElements = this.appRoot.querySelectorAll(
      `[v-if-not=${modelName}]`
    );

    contentElements.forEach((el) => {
      el.innerText = modelValue;
    });
    vifElements.forEach((el) => {
      el.style.visibility = modelValue ? "visible" : "hidden";
    });
    vifNotElements.forEach((el) => {
      el.style.visibility = !modelValue ? "visible" : "hidden";
    });
  }
}
