import type {
  HospitalPatient,
  HospitalPatientSection,
} from '@/core/api/patients/use-patients';

// flatten sections to a single array
// ref: https://shopify.github.io/flash-list/docs/guides/section-list
export const flattenSections = (
  sections: HospitalPatientSection[],
): (string | HospitalPatient)[] => {
  const result: (string | HospitalPatient)[] = [];

  sections.forEach((section) => {
    if (section.patients.length > 0) {
      result.push(section.name);
      result.push(...section.patients);
    }
  });

  return result;
};

// filter patients by query
export const filterPatients = (
  sections: HospitalPatientSection[],
  query: string,
): HospitalPatientSection[] => {
  if (!query) return sections;

  return sections
    .map((section) => ({
      name: section.name,
      patients: section.patients.filter((patient) =>
        patient.name.toLowerCase().includes(query.toLowerCase()),
      ),
    }))
    .filter((section) => section.patients.length > 0);
};
