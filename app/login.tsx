import Ionicons from '@expo/vector-icons/Ionicons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useReducer } from 'react';
import { useForm } from 'react-hook-form';
import { Image, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { toast } from 'sonner-native';

import { getErrorMessage } from '@/core/api';
import { useLogin } from '@/core/api/auth';
import { signIn } from '@/core/auth';
import { Button, ControlledInput } from '@/ui';
import { loginSchema, LoginSchema } from '@/utils/validation';

const DEFAULT_OFFSET = 50;

export default function LogInScreen() {
  const { styles, theme } = useStyles(stylesheet);
  const router = useRouter();
  const [isPeek, toggleIsPeek] = useReducer((state) => !state, true);
  const { control, handleSubmit } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const { mutate: login, isPending } = useLogin();

  const onSubmit = (data: LoginSchema) => {
    login(data, {
      onSuccess: (response) => {
        const authToken = response?.access_token;

        if (authToken) {
          signIn({ access: authToken });
          router.replace('/');
        }
      },
      onError: (err) => {
        const message = getErrorMessage(err);

        toast.error(message);
      },
    });
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.screen}
      bottomOffset={DEFAULT_OFFSET}
    >
      <Image
        source={require('@/assets/images/logo-bpjsk.png')}
        resizeMode="contain"
        style={styles.logo}
      />
      <View style={styles.formContainer}>
        <ControlledInput
          name="email"
          control={control}
          label="Email"
          placeholder="email"
          keyboardType="email-address"
        />
        <ControlledInput
          name="password"
          control={control}
          label="Password"
          placeholder="password"
          secureTextEntry={isPeek}
          RightAccessory={() => (
            <Ionicons
              onPress={toggleIsPeek}
              name={isPeek ? 'eye-off' : 'eye'}
              size={24}
              color={theme.colors.palette.neutral500}
            />
          )}
        />
      </View>
      <Button
        onPress={handleSubmit(onSubmit)}
        loading={isPending}
        variant="brand"
        text="Submit"
      />
    </KeyboardAwareScrollView>
  );
}

const stylesheet = createStyleSheet((theme, runtime) => ({
  screen: {
    flexGrow: 1,
    paddingTop: runtime.insets.top,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
  logo: {
    width: 140,
    height: 140,
    marginVertical: theme.spacing.lg,
    alignSelf: 'center',
  },
  formContainer: {
    rowGap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
}));
