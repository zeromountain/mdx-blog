'use client';

import { Select, SelectItem } from '@heroui/react';

import { usePathname, useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';

type Language = {
  code: string;
  name: string;
  flag: string;
};

const languages: Language[] = [
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set(['ko']));

  useEffect(() => {
    // 현재 URL에서 언어 코드 추출
    const pathSegments = pathname.split('/');
    const langCode = pathSegments[1];

    if (languages.some((lang) => lang.code === langCode)) {
      setSelectedKeys(new Set([langCode]));
    }
  }, [pathname]);

  const handleSelectionChange = (keys: any) => {
    const keysArray = Array.from(keys);
    const languageCode = keysArray[0];
    if (!languageCode || typeof languageCode !== 'string') return;

    // 현재 경로에서 언어 부분만 변경
    const pathSegments = pathname.split('/');

    if (languages.some((lang) => lang.code === pathSegments[1])) {
      // 경로의 첫 부분이 언어 코드면 교체
      pathSegments[1] = languageCode;
    } else {
      // 언어 코드가 없으면 추가
      pathSegments.splice(1, 0, languageCode);
    }

    const newPath = pathSegments.join('/');
    router.push(newPath);
  };

  const currentLanguage = languages.find((lang) => lang.code === Array.from(selectedKeys)[0]) || languages[0];

  return (
    <Select
      selectedKeys={selectedKeys}
      onSelectionChange={handleSelectionChange}
      startContent={currentLanguage.flag}
      aria-label="언어 선택"
      classNames={{
        base: 'w-16 md:w-32',
        trigger: 'min-h-unit-10',
        value: 'text-sm',
      }}
      size="sm"
      variant="flat"
      popoverProps={{
        placement: 'bottom-end',
        offset: 10,
        shouldFlip: true,
        shouldCloseOnBlur: true,
      }}
    >
      {languages.map((language) => (
        <SelectItem
          key={language.code}
          startContent={language.flag}
          classNames={{
            base: 'text-sm',
            selectedIcon: 'hidden md:block',
          }}
        >
          {language.name}
        </SelectItem>
      ))}
    </Select>
  );
}
