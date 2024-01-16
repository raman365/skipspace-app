import CryptoJS from 'react-native-crypto-js';

export const KEY =
    '4b3c5420783c8e8fdad383619d2f6a0a6e4535c223e87b8485bd181d333187f9';
export const encryptDataFunc = (data: string, secretKey: string): string => {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
    return encryptedData;
};
