// import CryptoES from 'crypto-es'; // TODO REMOVE PACKAGE
import CryptoJS from 'react-native-crypto-js';


export const encryptDataFunc = (data: string, secretKey: string): string => {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
    return encryptedData;
};
