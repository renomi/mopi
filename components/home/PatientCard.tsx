import Entypo from '@expo/vector-icons/Entypo';
import * as Haptics from 'expo-haptics';
import { Image, Platform, Pressable, View } from 'react-native';
import type { GestureResponderEvent } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Skeleton, Text } from '@/ui';

const AnimatedPress = Animated.createAnimatedComponent(Pressable);

type PatientCardProps = {
  name: string;
  healthStatus: string;
  onPress?: VoidFunction;
};

const avatarImg = require('@/assets/images/patient-avatar.png');

export const PatientCard = ({
  name,
  healthStatus,
  onPress,
}: PatientCardProps) => {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  const { styles } = useStyles(stylesheet);

  const handlePress = (e: GestureResponderEvent) => {
    if (Platform.OS !== 'web') {
      Haptics.selectionAsync();
    }
    onPress?.();
  };

  const handleScale = (type: 'in' | 'out') => () => {
    scale.value = withSpring(type === 'in' ? 0.97 : 1);
  };

  return (
    <AnimatedPress
      onPress={handlePress}
      onPressIn={handleScale('in')}
      onPressOut={handleScale('out')}
      style={[styles.cardContainer, animatedStyle]}
    >
      <Image source={avatarImg} resizeMode="contain" style={styles.avatar} />
      <View style={styles.cardContent}>
        <Text size="md" text={name} />
        <Text size="xs" weight="bold" text={healthStatus} />
      </View>
      <Entypo name="chevron-small-right" size={36} color="black" />
    </AnimatedPress>
  );
};

export const PatientCardPlaceholder = () => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.cardContainer}>
      <Skeleton height={65} width={65} style={styles.placeholderImg} />
      <View style={styles.placeholderContainer}>
        <Skeleton height={20} width={'87%'} />
        <Skeleton height={15} width={'87%'} />
      </View>
    </View>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  avatar: {
    width: 65,
    height: 65,
  },
  cardContainer: {
    marginHorizontal: theme.spacing.xxs,
    marginVertical: theme.spacing.xs,
    borderWidth: 1,
    borderColor: theme.colors.white,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.xs,
    columnGap: theme.spacing.md,
    shadowColor: theme.colors.palette.neutral900,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardContent: {
    flex: 1,
  },
  placeholderImg: {
    borderRadius: 32.5,
  },
  placeholderContainer: {
    flex: 1,
    rowGap: theme.spacing.md,
  },
}));
