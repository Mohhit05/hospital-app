export default function ImageValidator(e) {
  let { name, files } = e.target;

  if (files.length === 0) {
    return name + "Field is mendatory";
  } else if (files.length === 1) {
    let file = files[0];
    if (file.size > 1048576) {
      return "File is too high. please upload a file upto 1MB";
    } else if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png" ||
      file.type === "image/webp" ||
      file.type === "image/gif"
    ) {
      return "";
    } else {
      return "Please upload .jpeg, .jpg, .png, .webp, .gif formet";
    }
  } else {
    return "";
  }
}
