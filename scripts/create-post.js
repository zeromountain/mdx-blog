#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 카테고리 목록
const CATEGORIES = ['react', 'javascript', 'typescript', 'nextjs', 'etc'];

// 현재 날짜를 YYYY-MM-DD 형식으로 반환
const getFormattedDate = () => {
  const date = new Date();
  return date.toISOString().split('T')[0];
};

// 슬러그 생성 (영문 소문자, 숫자, 하이픈만 허용)
const createSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\s]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[가-힣]/g, (char) => {
      const jamoResult = [];
      for (const c of char) {
        jamoResult.push(c);
      }
      return jamoResult.join('-');
    });
};

// 현재 존재하는 폴더 목록 가져오기
const getExistingDirectories = () => {
  const postsDir = path.join(process.cwd(), 'content', 'posts');
  if (!fs.existsSync(postsDir)) {
    return [];
  }
  return fs
    .readdirSync(postsDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
};

// MDX 템플릿 생성
const createMDXTemplate = ({ title, description, date, categories, slug }) => {
  return `---
title: ${title}
description: ${description}
date: ${date}
tags: ${JSON.stringify(categories)}
status: Draft
slug: ${slug}
---

# ✅ ${title}

${description}

---

## 🔷 1. 소개

여기에 내용을 작성하세요.

---

## 🔷 2. 주요 내용

여기에 내용을 작성하세요.

---

## 📌 정리

- 첫 번째 요약
- 두 번째 요약
- 세 번째 요약
`;
};

// 사용자 입력 받기
const questions = [
  {
    question: '제목을 입력하세요: ',
    key: 'title',
  },
  {
    question: '설명을 입력하세요: ',
    key: 'description',
  },
  {
    question: `카테고리를 선택하세요 (${CATEGORIES.join(', ')})\n여러 개인 경우 쉼표로 구분하여 입력하세요: `,
    key: 'categories',
    validate: (input) => {
      const categories = input.split(',').map((cat) => cat.trim().toLowerCase());
      return categories.every((cat) => CATEGORIES.includes(cat));
    },
    transform: (input) => input.split(',').map((cat) => cat.trim().toLowerCase()),
    errorMessage: '올바른 카테고리를 선택해주세요.',
  },
];

const askQuestion = (question, validate, errorMessage, transform = (x) => x) => {
  return new Promise((resolve) => {
    const ask = () => {
      rl.question(question, (answer) => {
        if (validate && !validate(answer)) {
          console.log(errorMessage || '올바른 값을 입력해주세요.');
          ask();
        } else {
          resolve(transform(answer));
        }
      });
    };
    ask();
  });
};

// 저장 경로 선택 또는 생성
const selectSavePath = async () => {
  const existingDirs = getExistingDirectories();

  console.log('\n현재 존재하는 폴더:');
  existingDirs.forEach((dir, index) => {
    console.log(`${index + 1}. ${dir}`);
  });
  console.log('n. 새 폴더 생성');

  const answer = await askQuestion(
    '\n저장할 위치를 선택하세요 (숫자 또는 n): ',
    (input) => {
      if (input.toLowerCase() === 'n') return true;
      const num = parseInt(input);
      return !isNaN(num) && num > 0 && num <= existingDirs.length;
    },
    '올바른 선택지를 입력해주세요.',
  );

  if (answer.toLowerCase() === 'n') {
    const newDir = await askQuestion(
      '생성할 폴더 이름을 입력하세요: ',
      (input) => /^[a-z0-9-]+$/.test(input),
      '폴더 이름은 영문 소문자, 숫자, 하이픈만 사용할 수 있습니다.',
    );
    return newDir;
  }

  return existingDirs[parseInt(answer) - 1];
};

async function main() {
  const answers = {};

  // 질문하기
  for (const { question, key, validate, errorMessage, transform } of questions) {
    answers[key] = await askQuestion(question, validate, errorMessage, transform);
  }

  // 저장 경로 선택
  const saveDir = await selectSavePath();

  // 날짜와 슬러그 생성
  const date = getFormattedDate();
  const slug = createSlug(answers.title);

  // MDX 파일 생성
  const mdxContent = createMDXTemplate({
    ...answers,
    date,
    slug,
  });

  // 파일 저장
  const dir = path.join(process.cwd(), 'content', 'posts', saveDir);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const filePath = path.join(dir, `${slug}.mdx`);
  fs.writeFileSync(filePath, mdxContent);

  console.log(`\n✅ 포스트가 생성되었습니다: ${filePath}`);
  console.log(`카테고리: ${answers.categories.join(', ')}`);
  console.log(`저장 위치: ${saveDir}`);
  rl.close();
}

main().catch((error) => {
  console.error('오류가 발생했습니다:', error);
  rl.close();
});
