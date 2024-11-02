import { createQuery } from 'react-query-kit';

import type { GeneralErrorResponse } from '@/core/api/types';

import { client } from '../common';

export type Bed = {
  roomNo: string;
  floorNo: number;
  status: string;
  icuMachineId: string;
};

export type HealthReport = {
  report: string;
  submittedBy: {
    id: string;
    name: string;
    phoneNumber: string;
    createdAt: string;
    updatedAt: string;
  };
};

export type Hospital = {
  name: string;
  location: string;
};

export type Nurse = {
  name: string;
  phoneNumber: string;
};

export type Patient = {
  id: string;
  name: string;
  age: number;
  gender: string;
  email: string;
  phoneNumber: string;
  healthStatus: string;
  doctorId: string;
  nurseId: string;
  hospitalId: string;
  assignedBedId: string;
  assignedAt: string; // ISO date string
  hasExited: boolean;
  exitedAt: string | null;
  nurse: Nurse;
  hospital: Hospital;
  assignedBed: Bed;
  icuMachineId: string;
  healthReports: HealthReport[];
};

type Variables = {
  id: string;
};

export const usePatient = createQuery<Patient, Variables, GeneralErrorResponse>(
  {
    queryKey: ['patient'],
    fetcher: (variables) => {
      return client
        .get(`patients/${variables.id}`)
        .then((response) => response.data);
    },
    staleTime: 0,
  },
);
