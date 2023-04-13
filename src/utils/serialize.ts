export function encodeObject(obj: unknown) {
  const plaintext = JSON.stringify(obj);
  const buff = Buffer.from(plaintext, 'utf-8');
  const base64 = buff.toString('base64');

  return encodeURIComponent(base64);
}

export function decodeObject<T>(string: string) {
  const base64 = decodeURIComponent(string);
  if (!isBase64(base64)) return null;

  const buff = Buffer.from(base64, 'base64');
  const plaintext = buff.toString('utf-8');

  return JSON.parse(plaintext) as T;
}

export function isBase64(str: string) {
  const regex =
    /^([A-Za-z0-9+/]{4})*(([A-Za-z0-9+/]{2}==)|([A-Za-z0-9+/]{3}=))?$/;
  return regex.test(str);
}
