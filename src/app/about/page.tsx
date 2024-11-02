import Image from 'next/image';
import Link from 'next/link';

import EmailIcon from '@/assets/icon/email-icon';
import GithubIcon from '@/assets/icon/github-icon';
import LinkedinIcon from '@/assets/icon/linkedin-icon';

export default function AboutPage() {
  return (
    <div className="mx-auto flex min-h-0 w-full max-w-2xl flex-col gap-y-3 space-y-8 print:space-y-4">
      <section className="flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
        <div className="flex flex-1 flex-col gap-2">
          <h2 className="text-2xl font-bold">손영산</h2>
          <p className="text-sm text-gray-500">FE DEVELOPER</p>
          <div className="flex gap-2">
            <Link
              href="https://github.com/zeromountain"
              target="_blank"
              className="rounded-md border border-gray-100 p-2 transition-colors hover:bg-gray-100"
            >
              <GithubIcon />
            </Link>
            <Link
              href="https://www.linkedin.com/in/yeongsan-son-b289551b0/"
              target="_blank"
              className="rounded-md border border-gray-100 p-2 transition-colors hover:bg-gray-100"
            >
              <LinkedinIcon />
            </Link>
            <button className="rounded-md border border-gray-100 p-2 transition-colors hover:bg-gray-100">
              <EmailIcon />
            </button>
          </div>
        </div>
        <div className="relative flex size-28 shrink-0 overflow-hidden rounded-xl">
          <Image src="/profile.jpeg" alt="profile" width={100} height={100} className="aspect-square h-full w-full" />
        </div>
      </section>
      <section>
        <h3 className="text-lg font-bold">ABOUT</h3>
      </section>
      <section>
        <h3 className="text-lg font-bold">SKILLS</h3>
      </section>
      <section>
        <h3 className="text-lg font-bold">WORK EXPERIENCE</h3>
      </section>
      <section>
        <h3 className="text-lg font-bold">PROJECTS</h3>
      </section>
    </div>
  );
}
