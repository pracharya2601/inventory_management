import crypto from 'crypto';
const algorithm = 'aes-256-ctr';
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
const iv = crypto.randomBytes(16);

export const encrypt = <T>(data: T): string => {
    const text = JSON.stringify(data);
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return `${iv.toString('hex')}-${encrypted.toString('hex')}`;
};

export const decrypt = <T>(hash: string): T => {
    const [iv, content] = hash.split('-');
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'));
    const decrypted = Buffer.concat([decipher.update(Buffer.from(content, 'hex')), decipher.final()]);
    return JSON.parse(decrypted.toString());
};
