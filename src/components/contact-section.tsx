'use client';

import { gsap } from 'gsap';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

import type React from 'react';
import { useEffect, useRef, useState } from 'react';

import { Button, Input, Textarea } from '@nextui-org/react';

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    // 스크롤 트리거 애니메이션
    if (sectionRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'bottom 20%',
          toggleActions: 'play none none none',
        },
      });

      tl.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.6,
      })
        .from(
          formRef.current,
          {
            x: -50,
            opacity: 0,
            duration: 0.6,
          },
          '-=0.3',
        )
        .from(
          infoRef.current,
          {
            x: 50,
            opacity: 0,
            duration: 0.6,
          },
          '-=0.3',
        );
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 여기에 폼 제출 로직 추가
    console.log('Form submitted:', formData);

    // 폼 제출 애니메이션
    gsap.to(formRef.current, {
      y: -10,
      opacity: 0.5,
      duration: 0.3,
      onComplete: () => {
        gsap.to(formRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.3,
        });
        // 폼 초기화
        setFormData({ name: '', email: '', message: '' });
      },
    });
  };

  return (
    <section id="contact" ref={sectionRef} className="bg-gradient-to-b from-[#0a0a0a] to-[#111] py-20 md:py-32">
      <div className="container mx-auto px-4">
        <h2 ref={titleRef} className="mb-16 text-center text-3xl font-bold md:text-5xl">
          <span className="text-green-500">연락</span>하기
        </h2>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 md:grid-cols-2">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium">
                이름
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="홍길동"
                className="border-green-500/30 bg-black/50 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                이메일
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                className="border-green-500/30 bg-black/50 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium">
                메시지
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="메시지를 입력해주세요..."
                className="min-h-[150px] border-green-500/30 bg-black/50 focus:border-green-500"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-green-500 text-white hover:bg-green-600">
              메시지 보내기
              <Send className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <div ref={infoRef} className="space-y-8">
            <div className="rounded-xl border border-green-500/20 bg-black/30 p-6">
              <h3 className="mb-6 text-xl font-bold">연락처 정보</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="mr-4 h-5 w-5 text-green-500" />
                  <span>contact@example.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="mr-4 h-5 w-5 text-green-500" />
                  <span>+82 10-1234-5678</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-4 h-5 w-5 text-green-500" />
                  <span>서울특별시 강남구</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-green-500/20 bg-black/30 p-6">
              <h3 className="mb-4 text-xl font-bold">풋살 팀 모집 중!</h3>
              <p className="mb-4 text-gray-300">
                매주 토요일 오후에 진행되는 풋살 경기에 함께할 팀원을 모집하고 있습니다. 관심 있으시면 연락주세요!
              </p>
              <div className="flex items-center justify-center rounded-lg bg-green-500/20 p-3">
                <span className="font-medium text-green-500">⚽ 함께 뛰어요!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
