export const LINKS = {
  nextjs: [
    {
      title: `Next.js 까보기: "쓸 줄 아는 개발자"에서 "알고 쓰는 개발자"로`,
      desc: `함께 소스코드를 까보며 기술면접부터 실무 설계까지, AI 시대에 필요한 깊은 이해와 자신만의 관점을 갖출 수 있도록 도와드릴게요. Next.js를 단순히 "써본" 개발자에서, 왜 그렇게 쓰는지 "이해하는" 전문가로 성장하세요.`,
      url: 'https://inf.run/Vscte',
      image: 'https://cdn.inflearn.com/public/files/courses/336349/cover/01jqgkn5hy8trrjypgxj114b0k?f=avif&w=420',
    },
  ],
};

export const getRandomLink = (key: keyof typeof LINKS) => {
  const links = LINKS[key];
  return links[Math.floor(Math.random() * links.length)];
};
