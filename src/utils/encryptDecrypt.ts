import CryptoES from 'crypto-es';


export const encryptData = (data: string, secretKey: string): string => {
    const encryptedData = CryptoES.AES.encrypt(data, secretKey).toString();
    return encryptedData;
};
