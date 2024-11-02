import {
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useCallback } from 'react';
import { Linking, RefreshControl, ScrollView, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { HealthReports, PatientInfo, VitalSigns } from '@/components/patient';
import { useProfile } from '@/core/api/doctors';
import { usePatient } from '@/core/api/patients';
import { useICUData, useRefreshOnFocus } from '@/hooks';
import { Button, renderBackdrop, Skeleton, Text, useModal } from '@/ui';

export default function PatientDetailScreen() {
  const { patientId } = useLocalSearchParams();
  const { ref, present, dismiss } = useModal();
  const { theme, styles } = useStyles(stylesheet);

  const { data: doctor } = useProfile();
  const {
    data: patientData,
    isLoading: isLoadingPatientData,
    refetch: refetchPatient,
    isRefetching: isRefetchPatient,
  } = usePatient({
    variables: { id: patientId as string },
    enabled: !!patientId,
  });

  const { data: icuData, isConnected } = useICUData({
    patientId: patientData?.icuMachineId,
  });

  const onCallNurse = useCallback(() => {
    const payload = `tel:${patientData?.nurse?.phoneNumber}`;
    Linking.openURL(payload);
  }, [patientData?.nurse?.phoneNumber]);

  useRefreshOnFocus(refetchPatient);

  if (isLoadingPatientData) {
    return (
      <View style={styles.screen}>
        <Stack.Screen
          options={{
            title: 'Monitoring',
            headerTitleStyle: {
              fontFamily: 'Onest-Bold',
            },
            headerRight: () => (
              <View
                style={[
                  styles.onlineIndicator,
                  {
                    backgroundColor: theme.colors[isConnected ? 'ecg' : 'hr'],
                  },
                ]}
              />
            ),
            headerShadowVisible: false,
          }}
        />
        <Skeleton height={100} style={styles.placeholderHeader} />
        <View style={styles.placeholderContainer}>
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton height={140} key={i} />
          ))}
        </View>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Monitoring',
          headerTitleStyle: {
            fontFamily: 'Onest-Bold',
          },
          headerRight: () => (
            <View
              style={[
                styles.onlineIndicator,
                {
                  backgroundColor: theme.colors[isConnected ? 'ecg' : 'hr'],
                },
              ]}
            />
          ),
          headerShadowVisible: false,
        }}
      />

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isRefetchPatient}
            onRefresh={refetchPatient}
          />
        }
        contentContainerStyle={styles.scrollContainer}
      >
        <PatientInfo patient={patientData} doctor={doctor} showDetails />
        <VitalSigns data={icuData} />
      </ScrollView>

      {Boolean(patientData) && (
        <View style={styles.footerContainer}>
          <Button onPress={present} variant="brand" text="Lihat Perkembangan" />
          <Button
            onPress={onCallNurse}
            variant="angry"
            text="Hubungi Perawat"
          />
        </View>
      )}

      <BottomSheetModal
        index={1}
        ref={ref}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
      >
        {/* Section: Modal Header*/}
        <BottomSheetView style={styles.modalContainer}>
          <PatientInfo patient={patientData} doctor={doctor} />
          <Text
            preset="subheading"
            style={styles.noteLabel}
            text={'Catatan :'}
          />
        </BottomSheetView>
        {/* Section: End Modal Header*/}

        <BottomSheetScrollView
          contentContainerStyle={styles.modalScrollableContainer}
        >
          <HealthReports healthReports={patientData?.healthReports} />
          <Button
            onPress={dismiss}
            variant="brand"
            text="Tutup"
            style={styles.modalButton}
          />
        </BottomSheetScrollView>
      </BottomSheetModal>
    </>
  );
}

// snapPoints for the bottom sheet
const snapPoints = ['50%', '80%'];

const stylesheet = createStyleSheet((theme) => ({
  screen: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingTop: theme.spacing.xs,
    paddingHorizontal: theme.spacing.xs,
    backgroundColor: theme.colors.background,
  },
  onlineIndicator: {
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  footerContainer: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.sm,
    rowGap: theme.spacing.md,
  },
  modalContainer: {
    paddingTop: theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
    backgroundColor: theme.colors.background,
  },
  noteLabel: {
    marginVertical: theme.spacing.sm,
  },
  modalScrollableContainer: {
    paddingHorizontal: theme.spacing.sm,
  },
  modalButton: {
    marginTop: theme.spacing.lg,
  },
  placeholderContainer: {
    paddingHorizontal: theme.spacing.sm,
    rowGap: theme.spacing.sm,
  },
  placeholderHeader: {
    marginBottom: theme.spacing.lg,
  },
}));
