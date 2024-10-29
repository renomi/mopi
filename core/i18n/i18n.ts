import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';
import 'intl-pluralrules';

import type { RecursiveKeyOf } from '@/core/i18n/types';
import type { DefaultLocale } from '@/translations/en';
import en from '@/translations/en';

export type TxKeyPath = RecursiveKeyOf<DefaultLocale>;

const fallbackLocale = 'en-US';

const systemLocales = Localization.getLocales();

const resources = { en };
const supportedTags = Object.keys(resources);

// Checks to see if the device locale matches any of the supported locales
// Device locale may be more specific and still match (e.g., en-US matches en)
const systemTagMatchesSupportedTags = (deviceTag: string) => {
  const primaryTag = deviceTag.split('-')[0];
  return supportedTags.includes(primaryTag);
};

const pickSupportedLocale: () => Localization.Locale | undefined = () => {
  return systemLocales.find((locale) =>
    systemTagMatchesSupportedTags(locale.languageTag),
  );
};

const locale = pickSupportedLocale();

export const initI18n = async () => {
  i18n.use(initReactI18next);

  await i18n.init({
    resources,
    lng: locale?.languageTag ?? fallbackLocale,
    fallbackLng: fallbackLocale,
    interpolation: {
      escapeValue: false,
    },
  });

  return i18n;
};

// Is it a RTL language?
export const isRTL: boolean = i18n.dir() === 'rtl';

I18nManager.allowRTL(isRTL);
I18nManager.forceRTL(isRTL);
