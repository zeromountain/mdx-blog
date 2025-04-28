'use client';

import { gsap } from 'gsap';
import { ExternalLink, Github } from 'lucide-react';

import Image from 'next/image';

import { useEffect, useRef } from 'react';

import { Button } from '@nextui-org/button';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoLink: string;
  githubLink: string;
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 카드 호버 효과
    if (cardRef.current) {
      cardRef.current.addEventListener('mouseenter', handleMouseEnter);
      cardRef.current.addEventListener('mouseleave', handleMouseLeave);
      cardRef.current.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (cardRef.current) {
        cardRef.current.removeEventListener('mouseenter', handleMouseEnter);
        cardRef.current.removeEventListener('mouseleave', handleMouseLeave);
        cardRef.current.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      scale: 1.03,
      boxShadow: '0 10px 30px rgba(0, 200, 0, 0.2)',
      duration: 0.3,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      scale: 1,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      rotationX: 0,
      rotationY: 0,
      duration: 0.3,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    gsap.to(card, {
      rotationX: rotateX,
      rotationY: rotateY,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  return (
    <div
      ref={cardRef}
      className="overflow-hidden rounded-xl border border-green-500/20 bg-black/30 transition-all duration-300 hover:border-green-500/50"
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.image || '/placeholder.svg'}
          alt={project.title}
          width={600}
          height={400}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </div>
      <div className="p-6">
        <h3 className="mb-2 text-xl font-bold">{project.title}</h3>
        <p className="mb-4 text-gray-300">{project.description}</p>
        <div className="mb-6 flex flex-wrap gap-2">
          {project.tags.map((tag, index) => (
            <span key={index} className="rounded-full bg-green-500/20 px-2 py-1 text-xs text-green-500">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-3">
          <Button size="sm" className="bg-green-500 text-white hover:bg-green-600">
            <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Demo
            </a>
          </Button>
          <Button size="sm" variant="bordered" className="border-green-500 text-green-500 hover:bg-green-500/10">
            <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              Code
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
