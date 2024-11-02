import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import type { DoctorProfile } from '@/core/api/doctors';
import type { Patient } from '@/core/api/patients';
import { Text } from '@/ui';
import { formatDateToId } from '@/utils/date-formatter';

export type PatientInfoProps = {
  patient?: Patient;
  doctor?: DoctorProfile;
  showDetails?: boolean;
};

export const PatientInfo = ({
  patient,
  doctor,
  showDetails,
}: PatientInfoProps) => {
  const { theme, styles } = useStyles(stylesheet);

  return (
    <>
      <Text size="sm" text="Data Pasien" />
      <View style={styles.patientInfo}>
        <Text size="sm" style={styles.infoLabel} text="Nama" />
        <Text size="sm" text=":" />
        <Text size="sm" text={patient?.name} />
      </View>

      <View style={[styles.patientInfo, { marginBottom: theme.spacing.sm }]}>
        <Text size="sm" style={styles.infoLabel} text="Usia" />
        <Text size="sm" text=":" />
        <Text size="sm" text={patient?.age} />
      </View>

      {Boolean(showDetails) && (
        <>
          <View style={styles.patientInfo}>
            <Text size="sm" style={styles.infoLabel} text="Tanggal Masuk" />
            <Text size="sm" text=":" />
            <Text size="sm" text={formatDateToId(patient?.assignedAt)} />
          </View>
          <View style={styles.patientInfo}>
            <Text size="sm" style={styles.infoLabel} text="Dokter" />
            <Text size="sm" text=":" />
            <Text size="sm" text={doctor?.name ?? '-'} />
          </View>
          <View
            style={[styles.patientInfo, { marginBottom: theme.spacing.sm }]}
          >
            <Text size="sm" style={styles.infoLabel} text="Perawat" />
            <Text size="sm" text=":" />
            <Text size="sm" text={patient?.nurse.name} />
          </View>
        </>
      )}
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
}));
