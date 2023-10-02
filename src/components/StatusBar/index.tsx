// import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, StatusBar } from 'react-native';
import {
	SafeAreaView,
	SafeAreaProvider,
	useSafeAreaInsets,
} from 'react-native-safe-area-context';
import type { StatusBarStyle } from 'react-native';

interface ICustomStatusBarProps {
	backgroundColor: string;
	// barStyle: string;
}

const CustomStatusBar: React.FC<ICustomStatusBarProps> = ({
	backgroundColor,
	// barStyle = 'dark-content'
}) => {
	const insets = useSafeAreaInsets();

	return (
		<View style={{ height: insets.top, backgroundColor }}>
			{/* // <View style={[styles.statusBar, { backgroundColor }]}> */}
			{/* <SafeAreaView> */}
			<StatusBar
				translucent
				backgroundColor={backgroundColor}
				barStyle={'default'}
			/>
			{/* </SafeAreaView> */}
		</View>
	);
};

const styles = StyleSheet.create({});

export default CustomStatusBar;
