'use client';

// import { unstableSetRender } from "antd";
import type React from 'react';
import { useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { type AppStore, makeStore } from './store_config';

// unstableSetRender((node, container: any) => {
//   container._reactRoot ||= createRoot(container);
//   const root = container._reactRoot;
//   root.render(node);
//   return async () => {
//     await new Promise((resolve) => setTimeout(resolve, 0));
//     root.unmount();
//   };
// });

export function StoreProviders({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
