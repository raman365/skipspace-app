import {
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  Text,
  Alert,
  Platform,
  Animated,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { COLORS } from "../../../constants/theme";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HeaderComponent from "../../components/Header";
import { Icon } from "@rneui/themed";
import { DrawerActions } from "@react-navigation/native";
import StandardButton from "../../components/Button/StandardBtn";
import MapView, { PROVIDER_DEFAULT, PROVIDER_GOOGLE } from "react-native-maps";

import * as Location from "expo-location";
import useAuth from "../../hooks/useAuth";
import ClearBtn from "../../components/Button/ClearBtn";
import SmlStandardBtn from "../../components/Button/SmallStandardBtn";
import ScreenTitle from "../../components/ScreenTitle";
import StandardBtn from "../../components/Button/StandardBtn";

const SignedInDashboard = ({ navigation }: any) => {
  const [isEmailVerified, setIsEmailVerified] = useState<boolean | null>(null);
  const { user, sendVerifyEmail, checkEmailVerificationStatus } = useAuth();
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const handleToggle = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };
  const handleGoSearch = () => {
    navigation.navigate("searchSelectCouncil");
  };
  const handleGoVouchers = () => {
    navigation.navigate("vouchers");
  };

  const handleCheckEmail = async () => {
    await checkEmailVerificationStatus();
    user?.emailVerified ? setIsEmailVerified(true) : setIsEmailVerified(false);
  };

  const handleSendAgain = () => {
    console.log("sent sent");
    sendVerifyEmail();

    setIsButtonVisible(false);
    setTimeout(() => {
      setIsButtonVisible(true);
    }, 65000);
  };

  const [location, setLocation] = useState<Object>("");
  const [errorMsg, setErrorMsg] = useState<String>("");

  const getLocationPermissions = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg(
        "Permission to access location was denied, your lcoation is needed for functional uses in this app"
      );
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);
  };

  useEffect(() => {
    const checkEmailVerificationStatus = async (): Promise<void> => {
      if (user) {
        try {
          await user.reload();

          setIsEmailVerified(user.emailVerified);
        } catch (error: any) {
          console.error("Error reloading: ", error.message);
          Alert.alert("Error: ", error.message);
        }
      }
    };
    checkEmailVerificationStatus();
  }, [user]);

  useEffect(() => {
    getLocationPermissions();
  }, []);

  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      { iterations: -1 }
    ).start();
  }, [bounceAnim]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsButtonVisible(true);
    }, 65000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaProvider>
      {isEmailVerified === null ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={"large"} color={COLORS.bgBlue} />
        </View>
      ) : isEmailVerified ? (
        <>
          <HeaderComponent
            authorised={true}
            icon={
              <Icon
                style={{ marginRight: 30 }}
                name="menu"
                type="feather"
                color={COLORS.bgGreen}
                size={30}
              />
            }
            onPress={handleToggle}
          />

          <View>
            <View>
              <MapView
                // provider={MapView.PROVIDER_GOOGLE}
                provider={
                  Platform.OS === "android" ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
                }
                style={styles.map}
                showsUserLocation
                minZoomLevel={2}
                initialRegion={{
                  latitude: 51.76965576470866,
                  latitudeDelta: 14.44648580599754,
                  longitude: -4.374094986649737,
                  longitudeDelta: 11.222589999999997,
                }}
              />
            </View>
            <View style={styles.dashboardBottom}>
              <StandardButton
                bgGreen
                fontBlue
                buttonLabel={"Search for SkipSpace"}
                onPress={handleGoSearch}
              />
              <StandardButton
                bgGreen
                fontBlue
                buttonLabel={"View Vouchers"}
                onPress={handleGoVouchers}
              />
            </View>
          </View>
        </>
      ) : (
        <View style={{ flex: 1 }}>
          <View
            style={{
              alignItems: "center",
              paddingBottom: 30,
              paddingTop: 60,
            }}
          >
            <Image
              style={styles.logoImage}
              source={require("../../components/Header/image/sslogo1.png")}
              resizeMode="contain"
            />
          </View>

          <View style={{ justifyContent: "center" }}>
            <ScreenTitle title={"We've sent you a verification email! "} />

            <View style={{ padding: 20 }}>
              <Text style={{ textAlign: "center" }}>
                Check your inbox or junk mail and return here once you have
                verified your email to click the button below to proceed
              </Text>
            </View>
            <View style={{ paddingVertical: 20 }}>
              <Animated.View
                style={{
                  transform: [
                    {
                      translateY: bounceAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 10], // Adjust the bounce height as needed
                      }),
                    },
                  ],
                }}
              >
                <Icon
                  name="arrow-downward"
                  type="material"
                  size={40}
                  color={COLORS.bgBlue}
                />
              </Animated.View>
            </View>
            <View style={{ alignItems: "center", paddingBottom: 20 }}>
              <StandardBtn
                buttonLabel={`I've verified my email`}
                onPress={handleCheckEmail}
                bgGreen={false}
                fontBlue={false}
              />
            </View>

            {isButtonVisible && (
              <View style={{ alignItems: "center" }}>
                <Text>
                  Taking too long?...
                </Text>
                <ClearBtn
                  buttonLabel={"Send Email Again"}
                  onPress={handleSendAgain}
                />
              </View>
            )}
          </View>
        </View>
      )}
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  map: {
    height: "100%",
    width: "100%",
  },
  dashboardBottom: {
    height: 350,
    width: "100%",
    backgroundColor: COLORS.bgBlue,
    position: "absolute",
    bottom: 0,
    left: 0,
    paddingTop: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  logoImage: {
    width: 150,
    height: 150,
  },
});

export default SignedInDashboard;
