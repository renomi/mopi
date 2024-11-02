import { View } from 'react-native';
import { LineGraph } from 'react-native-graph';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text } from '@/ui';
import type { ProcessedICUData, VitalSign } from '@/utils/icu-helper';

export type VitalSignGraphProps = {
  title: string;
  currentValue?: string;
  points: VitalSign[];
  color: string;
  fillColors: string[];
};

export const VitalSignGraph = ({
  title,
  currentValue,
  points,
  color,
  fillColors,
}: VitalSignGraphProps & { points: VitalSign[] }) => {
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

export type VitalSignsProps = {
  data: ProcessedICUData;
};

export const VitalSigns = ({ data }: VitalSignsProps) => {
  const { theme, styles } = useStyles(stylesheet);

  return (
    <>
      <View style={styles.timeContainer}>
        <Text size="sm" text="Data Terakhir" />
        <Text size="sm" text={' : '} />
        <Text size="sm" text={data.currentValues?.updatedTime ?? '-'} />
      </View>
      <VitalSignGraph
        title="ECG"
        points={data.ecg}
        currentValue={data.currentValues?.ecg}
        color={theme.colors.ecg}
        fillColors={theme.colors.ecgFillColor}
      />
      <VitalSignGraph
        title="SpO2"
        points={data.sp02}
        currentValue={data.currentValues?.sp02}
        color={theme.colors.sp02}
        fillColors={theme.colors.sp02FillColor}
      />
      <VitalSignGraph
        title="Heart Rate"
        points={data.hr}
        currentValue={data.currentValues?.hr}
        color={theme.colors.hr}
        fillColors={theme.colors.hrFillColor}
      />
      <VitalSignGraph
        title="Respiratory Rate"
        points={data.rr}
        currentValue={data.currentValues?.rr}
        color={theme.colors.rr}
        fillColors={theme.colors.rrFillColor}
      />
      <VitalSignGraph
        title="Body Temperature"
        points={data.bt}
        currentValue={data.currentValues?.bt}
        color={theme.colors.bt}
        fillColors={theme.colors.btFillColor}
      />
      <View style={styles.nibpContainer}>
        <Text preset="subheading" text="NIBP" />
        <Text
          size="xxl"
          weight="bold"
          style={styles.textCenter}
          text={data.currentValues?.nibp ?? '-'}
        />
        <Text preset="subheading" style={styles.textRight} text="mmHg" />
      </View>
    </>
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
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: theme.spacing.sm,
  },
  nibpContainer: {
    minHeight: 130,
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
  textCenter: {
    textAlign: 'center',
  },
  textRight: {
    textAlign: 'right',
  },
}));
