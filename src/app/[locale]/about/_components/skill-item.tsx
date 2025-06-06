import { Tooltip } from '@heroui/tooltip';

interface SkillItemProps {
  name: string;
  icon: React.ReactNode;
}

export default function SkillItem({ name, icon }: SkillItemProps) {
  return (
    <Tooltip placement="bottom" content={name}>
      {icon}
    </Tooltip>
  );
}
