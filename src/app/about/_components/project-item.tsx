'use client';

import { useDisclosure } from '@nextui-org/modal';

import CommonModal from '@/components/common/modal';

interface ProjectItemProps {
  name: string;
  description: string;
}

export default function ProjectItem({ name, description }: ProjectItemProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div
        className="flex cursor-pointer flex-col gap-2 rounded-xl border border-gray-100 p-4 hover:bg-gray-100"
        onClick={onOpen}
      >
        <h4 className="text-sm font-bold">{name}</h4>
        <p className="text-sm">{description}</p>
      </div>
      <CommonModal isOpen={isOpen} onClose={onClose} backdrop="blur">
        <div>
          <h4 className="text-sm font-bold">{name}</h4>
          <p className="text-sm">{description}</p>
        </div>
      </CommonModal>
    </>
  );
}
