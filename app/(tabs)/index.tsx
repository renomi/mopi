import Ionicons from '@expo/vector-icons/Ionicons';
import { FlashList } from '@shopify/flash-list';
import { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { PatientCard, PatientCardPlaceholder } from '@/components/home';
import { useProfile } from '@/core/api/doctors';
import { usePatients } from '@/core/api/patients';
import type { HospitalPatient } from '@/core/api/patients';
import { useDebouncedValue, useRefreshOnFocus } from '@/hooks';
import { Input, Text } from '@/ui';
import { Skeleton } from '@/ui/skeleton';
import { filterPatients, flattenSections } from '@/utils/sorting';

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebouncedValue(query, 300);
  const { styles } = useStyles(stylesheet);

  const {
    isLoading: isLoadingPatients,
    data: patients,
    refetch: refetchPatients,
    isRefetching: isRefetchingPatients,
  } = usePatients();
  const { isLoading: isLoadingProfile, data: profile } = useProfile();

  const list = useMemo(() => {
    if (!patients) return [];

    const filteredData = filterPatients(patients, debouncedQuery);
    return flattenSections(filteredData);
  }, [patients, debouncedQuery]);

  const renderItem = useCallback(
    ({ item }: { item: HospitalPatient | string }) => {
      if (typeof item === 'string') {
        // Rendering header
        return (
          <Text
            size="md"
            weight="bold"
            text={item}
            style={styles.sectionHeader}
          />
        );
      } else {
        // Render item
        return (
          <PatientCard name={item.name} healthStatus={item.healthStatus} />
        );
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const renderEmptyList = useCallback(() => {
    return (
      <Animated.View entering={FadeInRight} style={styles.emptyContainer}>
        <Ionicons name="search-outline" size={80} color="black" />
        <Text size="md" weight="bold" text="Tidak ada data" />
        <Text size="xs" text="Coba masukkan kata kunci lain" />
      </Animated.View>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getItemType = useCallback((item: HospitalPatient | string) => {
    // To achieve better performance, specify the type based on the item
    return typeof item === 'string' ? 'sectionHeader' : 'row';
  }, []);

  useRefreshOnFocus(refetchPatients);

  if (isLoadingPatients) {
    return (
      <>
        <Skeleton height={80} width={'100%'} style={styles.placeholderHeader} />
        <View style={styles.placeholderScreen}>
          {Array.from({ length: 5 }).map((_, i) => (
            <PatientCardPlaceholder key={i} />
          ))}
        </View>
      </>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.headerContainer}>
        <Text size="xxl" weight="bold" text="Beranda" />
        {isLoadingProfile ? (
          <Skeleton height={20} width={'50%'} />
        ) : (
          <Text preset="subheading" text={`Hi ${profile?.name ?? 'Dokter'}`} />
        )}
      </View>

      <FlashList
        refreshing={isRefetchingPatients}
        onRefresh={refetchPatients}
        ListHeaderComponent={
          <>
            <Text size="md" weight="bold" text="Daftar Pasien" />
            <Input
              placeholder="Cari berdasarkan nama"
              style={styles.inputContainer}
              value={query}
              onChangeText={setQuery}
              RightAccessory={() =>
                query.length > 0 && (
                  <Ionicons
                    onPress={() => setQuery('')}
                    name="close"
                    size={24}
                  />
                )
              }
            />
          </>
        }
        data={list}
        renderItem={renderItem}
        getItemType={getItemType}
        estimatedItemSize={89}
        ListEmptyComponent={renderEmptyList}
      />
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  screen: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.xs,
    backgroundColor: theme.colors.background,
  },
  placeholderScreen: {
    flexGrow: 1,
    alignItems: 'flex-start',
    paddingHorizontal: theme.spacing.xs,
    backgroundColor: theme.colors.background,
  },
  placeholderHeader: {
    marginBottom: theme.spacing.lg,
  },
  headerContainer: {
    backgroundColor: theme.colors.background,
    paddingBottom: theme.spacing.md,
  },
  inputContainer: {
    marginTop: theme.spacing.xs,
    borderRadius: theme.radius.lg,
  },
  sectionHeader: {
    paddingLeft: theme.spacing.xxs,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.xs,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
}));
