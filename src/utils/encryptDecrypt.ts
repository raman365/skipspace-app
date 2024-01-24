import CryptoJS from 'react-native-crypto-js';

export const encryptDataFunc = (data: string, secretKey: string): any | null => {

    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();

    return encryptedData;
};
