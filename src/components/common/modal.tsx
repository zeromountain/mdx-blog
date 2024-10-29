'use client';

import { PropsWithChildren } from 'react';

import { useRouter } from 'next/navigation';

import { Modal, ModalBody, ModalContent, ModalProps } from '@nextui-org/modal';

export default function CommonModal({ children, ...props }: PropsWithChildren<ModalProps>) {
  const router = useRouter();

  const onDismiss = () => router.back();

  return (
    <Modal {...props} placement="center" onClose={onDismiss}>
      <ModalContent className="h-[80vh] w-full max-w-screen-md overflow-auto scrollbar-hide">
        <ModalBody className="w-full">{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
}
