import ValidatableObject from '~/BaseClasses/ValidatableObject';

export default class ColumnObject extends ValidatableObject {
  constructor({ name = "", type = "String", index = null }) {

    if (!name) {
      console.log("Column objects must have name.")
      // throw new console.error({ error: "Column objects must have name." });
    }
    if (index === null) {
      console.log("Column Objects must have a valid index")
      // throw new console.error({ error: "Column Objects must have a valid index value" });
    }

    super({ type });
    this.name = name;
    this.type = type;
    this.index = index;
  }

  getColumnIndex() {
    return this.index;
  }
}
