import { forwardRef, useState } from 'react';
import type { ComponentType } from 'react';
import type {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form';
import { useController } from 'react-hook-form';
import { TextInput, View } from 'react-native';
import type { TextInputProps } from 'react-native/types';
import Animated, { FadeInLeft, FadeOut } from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text } from './text';
import type { TextProps } from './text';

export type InputAccessoryProps = {
  disabled?: boolean;
};

export type InputProps = TextInputProps & {
  label?: TextProps['text'];
  labelTx?: TextProps['tx'];
  labelTxOptions?: TextProps['txOptions'];
  helperText?: string;
  helperTx?: TextProps['tx'];
  helperTxOptions?: TextProps['txOptions'];
  RightAccessory?: ComponentType<InputAccessoryProps>;
  LeftAccessory?: ComponentType<InputAccessoryProps>;
  error?: string;
  disabled?: boolean;
};

type TRule<T extends FieldValues> =
  | Omit<
      RegisterOptions<T>,
      'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
    >
  | undefined;

export type RuleType<T extends FieldValues> = { [name in keyof T]: TRule<T> };
export type InputControllerType<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  rules?: RuleType<T>;
};

type ControlledInputProps<T extends FieldValues> = InputProps &
  InputControllerType<T>;

export const Input = forwardRef<TextInput, InputProps>((props, ref) => {
  const {
    label,
    labelTx,
    labelTxOptions,
    helperText,
    helperTx,
    helperTxOptions,
    disabled,
    error,
    RightAccessory,
    LeftAccessory,
    testID,
    ...inputProps
  } = props;
  const [isFocussed, setIsFocussed] = useState<boolean>();
  const helper = error ?? helperText;

  const handleFocus = (type: 'blur' | 'focus') => () =>
    setIsFocussed(type === 'focus');

  const { styles } = useStyles(stylesheet, {
    focused: isFocussed,
    error: Boolean(error),
    disabled: Boolean(disabled),
  });

  return (
    <View style={styles.container}>
      {label && (
        <Text
          preset="formLabel"
          text={label}
          tx={labelTx}
          txOptions={labelTxOptions}
          testID={testID ? `${testID}-label` : undefined}
          style={styles.label}
        />
      )}
      <View style={styles.inputWrapper}>
        {!!LeftAccessory && <LeftAccessory disabled={disabled} />}
        <TextInput
          {...inputProps}
          editable={!disabled}
          onFocus={handleFocus('focus')}
          onBlur={handleFocus('blur')}
          ref={ref}
          placeholderTextColor={styles.placeholder.color}
          style={[styles.input, inputProps.style]}
          testID={testID}
        />
        {!!RightAccessory && <RightAccessory disabled={disabled} />}
      </View>

      {(helper ?? helperTx) && (
        <Animated.View
          entering={error ? FadeInLeft : undefined}
          exiting={error ? FadeOut : undefined}
        >
          <Text
            preset="formLabel"
            text={helper}
            tx={helperTx}
            txOptions={helperTxOptions}
            testID={testID ? `${testID}-error` : undefined}
            style={styles.helper}
          />
        </Animated.View>
      )}
    </View>
  );
});

Input.displayName = 'Input';

// only used with react-hook-form
export function ControlledInput<T extends FieldValues>(
  props: ControlledInputProps<T>,
) {
  const { name, control, rules, ...inputProps } = props;
  const { field, fieldState } = useController({ control, name, rules });

  return (
    <Input
      {...inputProps}
      ref={field.ref}
      autoCapitalize="none"
      onChangeText={field.onChange}
      value={field.value || ''}
      error={fieldState.error?.message}
    />
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    marginBottom: theme.spacing.sm,
  },
  label: {
    marginBottom: theme.spacing.xxs,
    variants: {
      focused: {
        true: {
          color: theme.colors.palette.brand700,
        },
      },
      error: {
        true: {
          color: theme.colors.palette.angry500,
        },
      },
    },
  },
  // eslint-disable-next-line react-native-unistyles/no-unused-styles -- consume the color directly
  placeholder: {
    color: theme.colors.palette.neutral500,
  },
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xs,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.palette.neutral400,
    backgroundColor: theme.colors.white,
    variants: {
      focused: {
        true: {
          backgroundColor: theme.colors.palette.brand50,
          borderColor: theme.colors.palette.brand700,
        },
      },
      error: {
        true: {
          backgroundColor: theme.colors.palette.angry50,
          borderColor: theme.colors.palette.angry500,
        },
      },
      disabled: {
        true: {
          borderColor: theme.colors.palette.neutral500,
          backgroundColor: theme.colors.palette.neutral200,
        },
      },
    },
  },
  input: {
    flex: 1,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: theme.spacing.sm,
    fontFamily: theme.typography.normal,
    fontSize: 16,
    lineHeight: 24,
  },
  helper: {
    color: theme.colors.palette.blu700,
    variants: {
      error: {
        true: {
          color: theme.colors.palette.angry500,
        },
      },
    },
  },
}));
