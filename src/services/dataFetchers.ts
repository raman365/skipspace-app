// // import { getDocs, collection, doc, getDoc, DocumentData, db } from ''

// import { DocumentData, collection, doc, getDocs } from "firebase/firestore";
// import { db } from "../../config/firebase";
// import { Route } from "@react-navigation/native";

// // const route = Route
// const { mainItemId, council_name } = route.params as {
//     mainItemId: string;
//     council_name: string;
// };
// const councilDocRef = doc(db, 'councils', mainItemId);

// const linkedSkipCompaniesCollectionRef = collection(
//     councilDocRef,
//     'linkedSkipCompanies'
// );


// const getSkipSitesDataForCompany = async (companyId: string) => {
//     try {
//         const companyDocRef = doc(linkedSkipCompaniesCollectionRef, companyId);
//         const skipSitesCollectionRef = collection(companyDocRef, 'skipSites');

//         const skipSiteSnapShot = await getDocs(skipSitesCollectionRef);
//         const skipSitesData: DocumentData[] = [];

//         skipSiteSnapShot.forEach((doc: { data: () => any; }) => {
//             skipSitesData.push(doc.data());
//         });

//         return skipSitesData;
//     } catch (error: any) {
//         console.error('Err: ', error);
//         return [];
//     }
// };

// export const getLinkedSkipCompaniesData = async () => {
//     try {
//         const linkedSkipCompaniesSnapShot = await getDocs(
//             linkedSkipCompaniesCollectionRef
//         );

//         const linkedSkipCompaniesData: any[] = [];

//         linkedSkipCompaniesSnapShot.forEach(async (doc) => {
//             const companyId = doc.id;
//             const companyName = doc.data().skip_company_name;

//             const skipSitesData = await getSkipSitesDataForCompany(companyId);

//             linkedSkipCompaniesData.push({
//                 companyId,
//                 companyName,
//                 skipSitesData,
//             });
//         });

//         return linkedSkipCompaniesData;
//     } catch (error: any) {
//         console.error('Error fetching linkedSkipCompanies subcollection:', error);
//         return [];
//     }
// };