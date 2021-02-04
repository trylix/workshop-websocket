class EventBuilder {
  constructor() {
    this.onFormSubmit = () => {};
  }

  setOnFormSubmit(fn) {
    this.onFormSubmit = fn;
    return this;
  }

  build() {
    window.addEventListener('submit', this.onFormSubmit);
  }
}
