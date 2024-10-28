export function paramCase(str: string) {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

export function snakeCase(str: string) {
  return str
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]/g, '');
}

export function toFarsiNumber(n: number | string) {
  const farsiDigits: string[] = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

  return n
    .toString()
    .replace(/\d/g, (x: any) => farsiDigits[x]);
}

export function toEnglishNumber(value: string) {
  let persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
  let arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];

  function fixNumbers(str: string) {
    if (typeof str === 'string') {
      for (let i = 0; i < 10; i++) {
        str = str.replace(persianNumbers[i], i.toString()).replace(arabicNumbers[i], i.toString());
      }
    }
    return str;
  }

  return fixNumbers(value).split(" ").join("");
}

export function toPhoneNumberInputFormat(value: string) {
  return toFarsiNumber(value.slice(0, 2)) + " " + toFarsiNumber(value.slice(2, 5)) + " " + toFarsiNumber(value.slice(5, 8)) + " " + toFarsiNumber(value.slice(8, 12));
}