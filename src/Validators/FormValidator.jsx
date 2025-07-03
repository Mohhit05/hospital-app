export default function FormValidator(e) {
  let { name, value } = e.target;

  switch (name) {
    case "name":
    case "color":
      if (value && value.length === 0) {
        return name + "Field is mendatory";
      } else if (value.length < 3 || value.length > 50) {
        return name + "Length must be 3-50 character";
      } else {
        return "";
      }

    case "size":
      if (value && value.length === 0) {
        return name + "Field is mendatory";
      } else if (value.length > 10) {
        return name + "Length must be upto 10 character";
      } else {
        return "";
      }

      case "basePrice":
      if (value && value.length === 0) {
        return "Base Price Field is mendatory";
      } else if (value < 1) {
        return name + "Base Price must be positive value";
      } else {
        return "";
      }

      case "stockQuantity":
      if (value && value.length === 0) {
        return "Stock Quantity Field is mendatory";
      } else if (value < 1) {
        return name + "Stock Quantity must be positive value";
      } else {
        return "";
      }

      case "discount":
      if (value && value.length === 0) {
        return "Discount Field is mendatory";
      } else if (value < 0 || value > 100) {
        return name + "Discount must be 0-99%";
      } else {
        return "";
      }

    case "message":
      if (value && value.length === 0) {
        return name + "Field is mendatory";
      } else if (value.length < 50) {
        return name + "Length must be 50 character OR more";
      } else {
        return "";
      }

    default:
      return "";
  }
}
