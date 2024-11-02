import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import type { HealthReport } from '@/core/api/patients';
import { Text } from '@/ui';
import { formatDateToId } from '@/utils/date-formatter';

type HealthReportsProps = {
  healthReports: HealthReport[] | undefined;
};

export const HealthReports = ({ healthReports }: HealthReportsProps) => {
  const { styles } = useStyles(stylesheet);

  return (
    <>
      {healthReports?.map((item) => (
        <View key={item.report} style={styles.healthReportContainer}>
          <Text
            size="sm"
            numberOfLines={5}
            style={styles.noteContent}
            text={item.report}
          />
          <View style={styles.patientInfo}>
            <Text size="sm" style={styles.infoLabel} text="Perawat"></Text>
            <Text size="sm" text=":" />
            <Text size="sm" text={item?.submittedBy?.name} />
          </View>
          <View style={styles.patientInfo}>
            <Text size="sm" style={styles.infoLabel} text="Terakhir di cek" />
            <Text size="sm" text=":" />
            <Text
              size="sm"
              text={formatDateToId(
                item?.submittedBy?.updatedAt,
                'dd MMMM yyyy HH:mm:ss',
              )}
            />
          </View>
        </View>
      ))}
    </>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  patientInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    columnGap: theme.spacing.xs,
  },
  infoLabel: {
    width: 120,
  },
  noteContent: {
    marginBottom: theme.spacing.sm,
  },
  healthReportContainer: {
    backgroundColor: 'transparent',
    paddingBottom: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
    borderBottomWidth: 1.5,
    borderColor: theme.colors.palette.neutral700,
  },
}));
