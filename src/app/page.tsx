"use client";

import { TimerProvider } from '@/context/TimerContext';
import CountdownApp from '@/components/CountdownApp';

export default function Home() {
  return (
    <TimerProvider>
      <CountdownApp />
    </TimerProvider>
  );
}
