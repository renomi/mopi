import type { TOptions } from 'i18next';
import type { ReactNode } from 'react';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text as RNText } from 'react-native';
import type {
  TextProps as RNTextProps,
  StyleProp,
  TextStyle,
} from 'react-native/types';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import type { UnistylesVariants } from 'react-native-unistyles';

import type { TxKeyPath } from '@/core/i18n';

type Variants = UnistylesVariants<typeof stylesheet>;

export type TextProps = RNTextProps &
  Variants & {
    tx?: TxKeyPath;
    txOptions?: TOptions;
    text?: string;
    children?: ReactNode;
    style?: StyleProp<TextStyle>;
  };

export const Text = memo(function Text(props: TextProps) {
  const {
    weight,
    size,
    tx,
    txOptions,
    text,
    children,
    style: $styleOverride,
    preset,
    ...rest
  } = props;

  const { styles } = useStyles(stylesheet, { preset, weight, size });
  const { t } = useTranslation();

  const content = useMemo(() => {
    if (tx) return t(tx, txOptions);
    if (text) return text;
    return children;
  }, [tx, txOptions, text, children, t]);

  return (
    <RNText {...rest} style={[styles.text, $styleOverride]}>
      {content}
    </RNText>
  );
});

Text.displayName = 'Text';

const stylesheet = createStyleSheet((theme) => ({
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: theme.colors.text,
    variants: {
      size: {
        xxl: { fontSize: 36, lineHeight: 44 },
        xl: { fontSize: 24, lineHeight: 34 },
        lg: { fontSize: 20, lineHeight: 32 },
        md: { fontSize: 18, lineHeight: 26 },
        sm: { fontSize: 16, lineHeight: 24 },
        xs: { fontSize: 14, lineHeight: 21 },
        xxs: { fontSize: 12, lineHeight: 18 },
      },
      weight: {
        bold: { fontFamily: theme.typography.bold },
        normal: { fontFamily: theme.typography.normal },
      },
      preset: {
        bold: {
          fontFamily: theme.typography.bold,
        },
        heading: {
          fontSize: 24,
          lineHeight: 42,
          fontFamily: theme.typography.bold,
        },
        subheading: {
          fontSize: 20,
          lineHeight: 32,
          fontFamily: theme.typography.medium,
        },
        formLabel: {
          fontFamily: theme.typography.medium,
        },
        formHelper: {
          fontSize: 16,
          lineHeight: 24,
          fontFamily: theme.typography.normal,
        },
      },
    },
  },
}));
