'use client';

import { PropsWithChildren } from 'react';

import { useRouter } from 'next/navigation';

import { Modal, ModalBody, ModalContent } from '@nextui-org/modal';

export default function AboutModal({ children }: PropsWithChildren) {
  const router = useRouter();

  const onDismiss = () => router.back();

  return (
    <Modal isOpen onClose={onDismiss}>
      <ModalContent>
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
}
