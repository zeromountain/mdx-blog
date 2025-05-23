'use client';

import { useRouter } from 'next/navigation';

import { Button } from "@heroui/button";

export const BackButton = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <Button variant="faded" radius="full" size="sm" className="" onClick={handleBack}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 6L9 12L15 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Button>
  );
};
