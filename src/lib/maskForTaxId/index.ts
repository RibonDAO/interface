export const maskForTaxId = (originalString: string, usaFormat = true) => {
  let newString = originalString.replace(/\D/g, "");

  if (usaFormat) {
    newString = newString.replace(/(\d{3})(\d)/, "$1-$2");
    newString = newString.replace(/(\d{2})(\d{3,4})$/, "$1-$2");
  } else {
    newString = newString.replace(/(\d{3})(\d)/, "$1.$2");
    newString = newString.replace(/(\d{3})(\d)/, "$1.$2");
    newString = newString.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }

  return newString;
};
