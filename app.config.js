import "dotenv/config";

export default {
  expo: {
    name: "orcamentoVenda",
    slug: "orcamentoVenda",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    plugins: ["expo-build-properties"],
    extra: {
      APIKEY: process.env.EXPO_PUBLIC_APIKEY,
      AUTHDOMAIN: process.env.EXPO_PUBLIC_AUTHDOMAIN,
      PROJECTID: process.env.EXPO_PUBLIC_PROJECTID,
      STORAGEBUCKET: process.env.EXPO_PUBLIC_STORAGEBUCKET,
      MESSAGINGSENDERID: process.env.EXPO_PUBLIC_MESSAGINGSENDERID,
      APPID: process.env.EXPO_PUBLIC_APPID,
    },
  },
};
