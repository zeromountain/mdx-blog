import { Chip } from '@heroui/chip';

interface WorkingHistoryItemProps {
  company: string;
  period: string;
  job: string;
  projects: any[];
  description: string;
}

export default function WorkingHistoryItem({ company, period, job, projects, description }: WorkingHistoryItemProps) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-gray-300 p-4">
      <div className="flex flex-col gap-2">
        <div>
          <b className="text-lg font-bold">{company}</b>
          <div className="flex items-center gap-4">
            <p className="text-sm">{period}</p>
            <Chip variant="faded" className="border-blue-100 bg-blue-500 text-sm font-bold text-white">
              {job}
            </Chip>
          </div>
        </div>
        <p className="whitespace-pre-line text-sm">{description}</p>
      </div>
      {/* 프로젝트 리스트 */}
      <ul className="list-disc px-4">
        {projects.map((project) => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
    </div>
  );
}
