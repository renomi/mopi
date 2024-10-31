import { ScrollView } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { toast } from 'sonner-native';

import { VitalSignGraph } from '@/app/components/VitalSignGraph';
import { useICUData } from '@/hooks/use-icu-data';

export default function HomeScreen() {
  const { theme, styles } = useStyles(stylesheet);
  const { data, isConnected } = useICUData({
    onConnectionLost: (error) => {
      toast.error(`Connection lost: ${error.errorMessage}`);
    },
    onMessageArrived: (rawData) => {
      console.log('New data received:', rawData);
    },
  });

  console.log('🧐 ~ HomeScreen ~ isConnected:', isConnected);

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
      <VitalSignGraph
        title="NIBP"
        points={data.nibp}
        currentValue={data.currentValues?.nibp}
        color={theme.colors.nibp}
        fillColors={theme.colors.nibpFillColor}
      />
    </ScrollView>
  );
}

const stylesheet = createStyleSheet((theme, runtime) => ({
  container: {
    flexGrow: 1,
    paddingTop: runtime.insets.top,
    paddingHorizontal: theme.spacing.xs,
    backgroundColor: theme.colors.background,
  },
}));
