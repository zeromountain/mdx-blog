'use client';

import Link from 'next/link';

import { Chip } from '@nextui-org/chip';
import { useDisclosure } from '@nextui-org/modal';
import { Divider } from '@nextui-org/react';

import CommonModal from '@/components/common/modal';
import { PROJECTS } from '@/constants/project';

interface ProjectItemProps {
  name: string;
  description: string;
}

export default function ProjectItem({ name, description }: ProjectItemProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const project = PROJECTS[name as keyof typeof PROJECTS];

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
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            {project?.url ? (
              <Link href={project.url} target="_blank">
                <h4 className="text-xl font-bold">{project?.name}</h4>
              </Link>
            ) : (
              <h4 className="text-xl font-bold">{project?.name}</h4>
            )}
            <p className="whitespace-pre-line text-sm">{project?.description}</p>
          </div>
          <Divider />
          <div className="flex flex-col gap-2">
            <h5 className="text-lg font-bold">Skills</h5>
            <div className="flex gap-2">{project?.skills.map((skill) => <Chip key={skill}>{skill}</Chip>)}</div>
          </div>
          <Divider />
          <div className="flex flex-col gap-2">
            <h5 className="text-lg font-bold">프로젝트 성과</h5>
            {project?.distribution.map((item) => (
              <div key={item.title}>
                <h6 className="text-sm font-bold">{item.title}</h6>
                <p className="rounded-md bg-red-100 p-2 text-sm">{item.action}</p>
                <p className="rounded-md bg-green-100 p-2 text-sm">{item.result}</p>
              </div>
            ))}
          </div>
        </div>
      </CommonModal>
    </>
  );
}
