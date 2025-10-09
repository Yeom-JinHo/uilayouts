'use client';

import { cn } from '@/lib/utils';
import React, { forwardRef, useRef } from 'react';
import { AnimatedBeam } from '@/components/ui/animated-beam';
import { Icons } from '@/components/ui/animated-beam';

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]',
        className
      )}
    >
      {children}
    </div>
  );
});

export default function index() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className='relative flex w-full max-w-[500px] mx-auto items-center justify-center overflow-hidden rounded-lg border dark:bg-neutral-800 bg-neutral-50 lg:p-10 sm:p-4 p-2 md:shadow-xl'
      ref={containerRef}
    >
      <div className='flex h-full w-full flex-col items-stretch justify-between gap-10'>
        <div className='flex flex-row justify-between'>
          <Circle ref={div1Ref}>
            <Icons.user />
          </Circle>
          <Circle className='p-2' ref={div2Ref}>
            <Icons.claude />
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div2Ref}
        startYOffset={10}
        endYOffset={10}
        curvature={-20}
        dotted
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div2Ref}
        startYOffset={-10}
        endYOffset={-10}
        curvature={20}
        reverse
        dotted
        gradientStartColor='#CC9B7A'
        gradientStopColor='#f5c7a8'
      />
    </div>
  );
}
