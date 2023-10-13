import { StyleSheet, View } from 'react-native';
import React from 'react';
import { COLORS } from '../../../constants/theme';

interface IFooterProps {
	children: JSX.Element;
}

const Footer: React.FC<IFooterProps> = ({ children }) => {
	return (
		<View style={styles.bottomContainer}>
			<View
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				{children}
			</View>
		</View>
	);
};

export default Footer;

const styles = StyleSheet.create({
	bottomContainer: {
		borderTopColor: COLORS.bgGreen,
		backgroundColor: COLORS.white,
		borderTopWidth: 2,
		height: 90,
		paddingTop: 10,
		marginTop: 15,
	},
});
