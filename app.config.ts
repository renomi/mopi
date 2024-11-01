import type { ConfigContext, ExpoConfig } from 'expo/config';

const packageJSON = require('./package.json');

// Update this value to something unique in order to be able to build for a
// physical iOS device.
const APP_ID_PREFIX = 'com.geram.mopi';

// These values are tied to EAS. If you would like to use EAS Build or Update
// on this project while playing with it, then remove these values and run
// `eas init` and `eas update:configure` to get new values for your account.
const EAS_PROJECT_ID = '89c696c3-50dd-4682-b651-a9e9e245d223';
const EAS_APP_OWNER = 'renomi';

// If you change this value, run `npx expo prebuild --clean` afterwards if you
// are building the project locally.
const IS_NEW_ARCH_ENABLED = false;

const IS_DEV = process.env.APP_VARIANT === 'development';
const IS_PREVIEW = process.env.APP_VARIANT === 'preview';

const VERSION = packageJSON.version;
const SCHEME = packageJSON.name;

const getName = () => {
  const APP_NAME = SCHEME.charAt(0).toUpperCase() + SCHEME.slice(1);

  if (IS_DEV) return `${APP_NAME} (Dev)`;

  if (IS_PREVIEW) return `${APP_NAME} (Prev)`;

  return APP_NAME;
};

const getAppId = () => {
  if (IS_DEV) return `${APP_ID_PREFIX}.dev`;

  if (IS_PREVIEW) return `${APP_ID_PREFIX}.preview`;

  return `${APP_ID_PREFIX}.app`;
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: getName(),
  slug: SCHEME,
  scheme: SCHEME,
  version: VERSION,
  orientation: 'portrait',
  icon: './assets/images//icon.png',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: getAppId(),
    // googleServicesFile: './GoogleService-Info.plist',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: getAppId(),
    googleServicesFile: './google-services.json',
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    [
      'expo-build-properties',
      {
        ios: {
          newArchEnabled: IS_NEW_ARCH_ENABLED,
        },
        android: {
          newArchEnabled: IS_NEW_ARCH_ENABLED,
        },
      },
    ],
    'expo-router',
    [
      'expo-font',
      {
        fonts: [
          './assets/fonts/Onest-Regular.ttf',
          './assets/fonts/Onest-Medium.ttf',
          './assets/fonts/Onest-Bold.ttf',
        ],
      },
    ],
    "@react-native-firebase/app",
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    eas: {
      projectId: EAS_PROJECT_ID,
    },
  },
  owner: EAS_APP_OWNER,
});
