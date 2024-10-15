export const isImage = (file: File) => {
  const allowedExtensions = ["jpg", "jpeg", "png"];
  const extension = file.name.split(".").pop() ?? '';

  return file.type.startsWith("image") && allowedExtensions.includes(extension);
}

export const isLessThanThanFiveMB = (file: File) => {
  return file.size < (5 * 1024 * 1024);
}