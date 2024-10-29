import Feather from '@expo/vector-icons/Feather';
import { Stack } from 'expo-router';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Button, Input, Text } from '@/ui';

const DEFAULT_OFFSET = 50;

export default function Index() {
  const { styles } = useStyles(stylesheet);

  return (
    <>
      <Stack.Screen options={{ title: 'UI References' }} />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        bottomOffset={DEFAULT_OFFSET}
      >
        <Text
          preset="heading"
          text="References for UI components"
          style={styles.header}
        />
        <View style={styles.section}>
          <Input label="Default" placeholder="default" />
          <Input label="Error" error="This is a message error" />
          <Input label="Disabled" disabled />
          <Input
            label="Default with LeftAccessory"
            placeholder="default"
            LeftAccessory={() => <Feather name="eye" size={24} color="black" />}
          />
          <Input
            label="Default with RightAccessory"
            placeholder="default"
            RightAccessory={() => (
              <Feather name="eye" size={24} color="black" />
            )}
          />
        </View>
        <View style={styles.section}>
          <Button
            tx="demoScreen:button.variant"
            txOptions={{ variant: 'default' }}
          />
          <Button
            tx="demoScreen:button.variantWithOpts"
            txOptions={{ variant: 'default', opts: 'loading' }}
            loading
          />
          <Button
            tx="demoScreen:button.variantWithOpts"
            txOptions={{ variant: 'default', opts: 'disabled' }}
            disabled
          />
          <Button
            tx="demoScreen:button.variant"
            txOptions={{ variant: 'ghost' }}
            variant="ghost"
          />
          <Button
            tx="demoScreen:button.variantWithOpts"
            txOptions={{ variant: 'ghost', opts: 'loading' }}
            variant="ghost"
            loading
          />
          <Button
            tx="demoScreen:button.variantWithOpts"
            txOptions={{ variant: 'ghost', opts: 'disabled' }}
            variant="ghost"
            disabled
          />
          <Button
            tx="demoScreen:button.variant"
            txOptions={{ variant: 'brand' }}
            variant="brand"
          />
          <Button
            tx="demoScreen:button.variantWithOpts"
            txOptions={{ variant: 'brand', opts: 'loading' }}
            variant="brand"
            loading
          />
          <Button
            tx="demoScreen:button.variantWithOpts"
            txOptions={{ variant: 'brand', opts: 'disabled' }}
            variant="brand"
            disabled
          />
          <Button
            tx="demoScreen:button.variant"
            txOptions={{ variant: 'blu' }}
            variant="blu"
          />
          <Button
            tx="demoScreen:button.variantWithOpts"
            txOptions={{ variant: 'blu', opts: 'loading' }}
            variant="blu"
            loading
          />
          <Button
            tx="demoScreen:button.variantWithOpts"
            txOptions={{ variant: 'blu', opts: 'disabled' }}
            variant="blu"
            disabled
          />
          <Button
            tx="demoScreen:button.variant"
            txOptions={{ variant: 'angry' }}
            variant="angry"
          />
          <Button
            tx="demoScreen:button.variantWithOpts"
            txOptions={{ variant: 'angry', opts: 'loading' }}
            variant="angry"
            loading
          />
          <Button
            tx="demoScreen:button.variantWithOpts"
            txOptions={{ variant: 'angry', opts: 'disabled' }}
            variant="angry"
            disabled
          />
          <Button
            text="Left Accessory"
            LeftAccessory={() => (
              <Feather name="chevron-left" size={24} color="black" />
            )}
          />
          <Button
            text="Right Accessory"
            RightAccessory={() => (
              <Feather name="chevron-right" size={24} color="black" />
            )}
          />
          <Button
            text="Left & Right Accessory"
            LeftAccessory={() => (
              <Feather name="chevron-left" size={24} color="black" />
            )}
            RightAccessory={() => (
              <Feather name="chevron-right" size={24} color="black" />
            )}
          />
        </View>
        <View style={styles.section}>
          <Input label="Default" placeholder="default" />
          <Input label="Error" error="This is a message error" />
          <Input label="Disabled" disabled />
          <Input
            label="Default with LeftAccessory"
            placeholder="default"
            LeftAccessory={() => <Feather name="eye" size={24} color="black" />}
          />
          <Input
            label="Default with RightAccessory"
            placeholder="default"
            RightAccessory={() => (
              <Feather name="eye" size={24} color="black" />
            )}
          />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}

const stylesheet = createStyleSheet((theme, runtime) => ({
  container: {
    flexGrow: 1,
    paddingTop: runtime.insets.top,
    paddingHorizontal: theme.spacing.xs,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingBottom: theme.spacing.md,
  },
  section: {
    padding: theme.spacing.md,
  },
}));
