import { createTheme } from '@rneui/themed';


export const theme = createTheme({
    lightColors: {
        // green: '#7acc00',
        primary: '#003b49', // blue
        secondary: '#7acc00', // green
        background: '#d0e6e8',
        black: '#000',
        white: '#fff'
    },
    // },
});

export const COLORS = {
    bgBlue: '#003b49',
    bgGreen: '#7acc00',
    lightBlue: '#d0e6e8',
    primaryRed: '#ff0000',
    softRed: '#fb596d',
    lightGrey: '#b6bdc7',
    black: '#000',
    white: '#fff',

    alpha: {
        bgBlue: 'rgba(0,59,73, 0.5)',
        bgGreen: 'rgba(122,204,0, 0.5)',
        lightBlue: 'rgba(208,230,232, 0.3)',
        primaryRed: 'rgba(255,0,0 0.5)',
        softRed: 'rgba(251,89,109, 0.5)',
        lightGrey: 'rgba(251,89,109, 0.5)',
        white: 'rgba(255,255,255, 0.5)',
        black: 'rgba(0,0,0, 0.5)',

    }


}

export const FONTSIZES = {
    '5xl': 30,
    '4xl': 26,
    '3xl': 22,
    xxl: 20,
    xl: 18,
    large: 14,
    medium: 12,
    small: 10,
    xsmall: 8

}

// export const HEADINGS = {
//     h4Style: {
//         fontWeight: 'bold',
//         textAlign: 'center',
//         color: COLORS.bgBlue,
//         fontSize: 30,

//     }
// }