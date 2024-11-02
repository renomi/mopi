import type {
  BottomSheetBackdropProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useCallback, useRef } from 'react';

export const useModal = () => {
  const ref = useRef<BottomSheetModal>(null);

  const present = useCallback((data?: any) => {
    ref.current?.present(data);
  }, []);

  const dismiss = useCallback(() => {
    ref.current?.dismiss();
  }, []);

  return { ref, present, dismiss };
};

export const renderBackdrop = (props: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />
);
