import { View } from 'react-native';
import { LineGraph } from 'react-native-graph';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text } from '@/ui';

export type VitalSignGraphProps = {
  title: string;
  currentValue?: string;
  points: { date: Date; value: number }[];
  color: string;
  fillColors: string[];
};

export const VitalSignGraph = ({
  title,
  currentValue,
  points,
  color,
  fillColors,
}: VitalSignGraphProps) => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.graphContainer}>
      <View style={styles.headerRow}>
        <Text preset="subheading" text={title} style={styles.graphTitle} />
        <Text preset="subheading" text={currentValue} />
      </View>
      <LineGraph
        points={points}
        color={color}
        animated
        enableFadeInMask
        gradientFillColors={fillColors}
        style={styles.graph}
      />
    </View>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  graphContainer: {
    marginBottom: theme.spacing.lg,
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.md,
    shadowColor: theme.colors.palette.neutral900,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  graphTitle: {
    marginBottom: theme.spacing.xs,
    color: theme.colors.palette.neutral700,
  },
  graph: {
    height: 100,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xs,
  },
}));
