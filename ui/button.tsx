import * as Haptics from 'expo-haptics';
import type { TOptions } from 'i18next';
import type { ComponentType } from 'react';
import { ActivityIndicator, Platform, Pressable } from 'react-native';
import type {
  GestureResponderEvent,
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native/types';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import type { UnistylesVariants } from 'react-native-unistyles';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import type { TxKeyPath } from '@/core/i18n';

import { Text } from './text';
import type { TextProps } from './text';

export type ButtonAccessoryProps = {
  style: StyleProp<ViewStyle>;
  pressableState: PressableStateCallbackType;
  disabled?: boolean;
};

type Variants = UnistylesVariants<typeof stylesheet>;

export type ButtonProps = PressableProps &
  Variants & {
    tx?: TxKeyPath;
    txOptions?: TOptions;
    text?: TextProps['text'];
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    RightAccessory?: ComponentType<ButtonAccessoryProps>;
    LeftAccessory?: ComponentType<ButtonAccessoryProps>;
    disabled?: boolean;
    disabledStyle?: StyleProp<ViewStyle>;
    loading?: boolean;
    fullWidth?: boolean;
    children?: React.ReactNode;
  };

export function Button(props: ButtonProps) {
  const {
    tx,
    txOptions,
    text,
    style: $viewStyleOverride,
    textStyle: $textStyleOverride,
    children,
    RightAccessory,
    LeftAccessory,
    fullWidth,
    variant,
    loading,
    disabled,
    disabledStyle: $disabledViewStyleOverride,
    testID,
    onPress,
    ...rest
  } = props;

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = (e: GestureResponderEvent) => {
    if (Platform.OS !== 'web') {
      Haptics.selectionAsync();
    }
    onPress?.(e);
  };

  const handleScale = (type: 'in' | 'out') => () => {
    scale.value = withSpring(type === 'in' ? 0.98 : 1);
  };

  const { styles } = useStyles(stylesheet, {
    fullWidth: fullWidth,
    variant: variant,
    disabled: !!disabled || !!loading,
  });

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        {...rest}
        onPress={handlePress}
        onPressIn={handleScale('in')}
        onPressOut={handleScale('out')}
        style={({ pressed }) => [
          styles.container,
          $viewStyleOverride,
          pressed && styles.pressedContainer,
          (!!disabled || !!loading) && $disabledViewStyleOverride,
        ]}
        accessibilityRole="button"
        accessibilityState={{ disabled: !!disabled, busy: !!loading }}
        disabled={disabled || loading}
        testID={testID}
      >
        {(state) => (
          <>
            {!!LeftAccessory && (
              <LeftAccessory
                style={styles.leftAccessory}
                pressableState={state}
                disabled={disabled}
              />
            )}

            {loading ? (
              <ActivityIndicator
                size="small"
                color={styles.loadingIndicator.color}
                testID={testID ? `${testID}-activity-indicator` : undefined}
              />
            ) : (
              <Text
                tx={tx}
                text={text}
                txOptions={txOptions}
                style={[styles.text, $textStyleOverride]}
              >
                {children}
              </Text>
            )}

            {!!RightAccessory && (
              <RightAccessory
                style={styles.rightAccessory}
                pressableState={state}
                disabled={disabled}
              />
            )}
          </>
        )}
      </Pressable>
    </Animated.View>
  );
}

Button.displayName = 'Button';

const stylesheet = createStyleSheet((theme) => ({
  container: {
    minHeight: 56,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    flexDirection: 'row',
    backgroundColor: theme.colors.palette.neutral100,
    variants: {
      fullWidth: {
        false: {
          alignSelf: 'center',
        },
        default: {
          alignSelf: 'stretch',
        },
      },
      variant: {
        brand: {
          backgroundColor: theme.colors.palette.brand500,
        },
        blu: {
          backgroundColor: theme.colors.palette.blu500,
        },
        angry: {
          backgroundColor: theme.colors.palette.angry500,
        },
        ghost: {
          backgroundColor: 'transparent',
        },
        default: {
          borderWidth: 1,
          borderColor: theme.colors.palette.neutral400,
        },
      },
      disabled: {
        true: {
          opacity: 0.75,
        },
      },
    },
  },
  pressedContainer: {
    variants: {
      variant: {
        brand: {
          backgroundColor: theme.colors.palette.brand700,
        },
        blu: {
          backgroundColor: theme.colors.palette.blu700,
        },
        angry: {
          backgroundColor: theme.colors.palette.angry700,
        },
        ghost: {
          backgroundColor: 'transparent',
        },
        default: {
          backgroundColor: theme.colors.palette.neutral200,
        },
      },
    },
  },
  text: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: theme.typography.medium,
    textAlign: 'center',
    flexShrink: 1,
    flexGrow: 0,
    zIndex: 2,
    variants: {
      variant: {
        brand: {
          color: theme.colors.white,
        },
        blu: {
          color: theme.colors.white,
        },
        angry: {
          color: theme.colors.white,
        },
        default: {
          color: theme.colors.text,
        },
      },
      disabled: {
        true: {
          opacity: 0.75,
        },
      },
    },
  },
  // eslint-disable-next-line react-native-unistyles/no-unused-styles -- consume the color directly
  loadingIndicator: {
    variants: {
      variant: {
        brand: {
          color: theme.colors.white,
        },
        angry: {
          color: theme.colors.white,
        },
        default: {
          color: theme.colors.palette.neutral700,
        },
      },
    },
  },
  leftAccessory: {
    marginEnd: theme.spacing.xs,
    zIndex: 1,
  },
  rightAccessory: {
    marginStart: theme.spacing.xs,
    zIndex: 1,
  },
}));
