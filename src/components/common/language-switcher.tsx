'use client';

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
  const [selectedLanguage, setSelectedLanguage] = useState<string>('ko');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    // 현재 URL에서 언어 코드 추출
    const pathSegments = pathname.split('/');
    const langCode = pathSegments[1];

    if (languages.some((lang) => lang.code === langCode)) {
      setSelectedLanguage(langCode);
    }
  }, [pathname]);

  const handleLanguageChange = (languageCode: string) => {
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
    setIsOpen(false);
  };

  const currentLanguage = languages.find((lang) => lang.code === selectedLanguage) || languages[0];

  return (
    <div className="relative">
      <button
        className="flex items-center space-x-1 rounded-md px-3 py-2 hover:bg-gray-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{currentLanguage.flag}</span>
        <span>{currentLanguage.name}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
          <ul className="py-1">
            {languages.map((language) => (
              <li key={language.code}>
                <button
                  className={`flex w-full items-center space-x-2 px-4 py-2 text-left hover:bg-gray-100 ${
                    language.code === selectedLanguage ? 'bg-gray-50 font-medium' : ''
                  }`}
                  onClick={() => handleLanguageChange(language.code)}
                >
                  <span>{language.flag}</span>
                  <span>{language.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
