// authorised stack
export type DrawerStackParamsList = {


    signedInDashboard: undefined;
    verifyEmail: undefined;
    confirmDelete: undefined;
    searchSelectCouncil: undefined;
    skipSpaceResults?: { mainItemId?: string }; // Define mainItemId as a parameter
    selectedSkipSpace: undefined;
    userAccount: undefined;
    vouchers: undefined;
    voucherConfirmation: undefined;
    createNewPassword: undefined;
    help: undefined;
};

export type UnauthorisedStackParamsLists = {
    welcome: undefined;
    signUp: undefined;
    authDashboard: undefined;
    forgotDetails: undefined;
    verifyEmail: undefined;
};


export type NavProps = {
    navigation: StackNavigationProp<UnauthorisedStackParamsList>;
};