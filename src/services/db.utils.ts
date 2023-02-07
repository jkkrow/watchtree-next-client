import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';

export function fastForward<T extends Record<string, any>>(
  token: string | null | undefined,
  idProp: string,
  otherCriteria?: (item: T) => boolean
) {
  const prevEntry = token ? parseToken<T>(token) : null;
  let fastForwardComplete = false;

  return (item: T) => {
    if (!prevEntry || fastForwardComplete) {
      return otherCriteria ? otherCriteria(item) : true;
    }

    if (item[idProp] === prevEntry[idProp]) {
      fastForwardComplete = true;
    }

    return false;
  };
}

export function generateToken<T extends Record<string, any>>(prevEntry: T) {
  const secret = process.env.NEXT_PUBLIC_DB_TOKEN_KEY as string;
  const iv = randomBytes(16);
  const cipher = createCipheriv('aes256', secret, iv);

  return (
    iv.toString('hex') +
    cipher.update(JSON.stringify(prevEntry), 'utf-8', 'hex') +
    cipher.final('hex')
  );
}

export function parseToken<T extends Record<string, any>>(token: string) {
  const secret = process.env.NEXT_PUBLIC_DB_TOKEN_KEY as string;
  const iv = Buffer.from(token.slice(0, 32), 'hex');
  const encrypted = token.slice(32);

  const decipher = createDecipheriv('aes256', secret, iv);
  const update = decipher.update(encrypted, 'hex', 'utf-8');
  const final = decipher.final('utf-8');

  return JSON.parse(update + final) as T;
}
