export default class ValidatableObject {
  constructor({ type, expression }) {
    this.type = type || null;
    this.expression = expression || null;
  }

  validate(value) {
    if (this.type) {
      switch(this.type) {
        case "String": {
          return /^[a-zA-Z0-9_]*$/.test(value);
          break;
        }
        case "Number": {
          break;  
        }
        case "Date": {
          break;
        }
        case "Link": {
          break;
        }

      }
    }
    if (this.expression) {
      
    }
  }
}
