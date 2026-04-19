import React from 'react';
export default function MaskedView({ children }: { children: React.ReactNode }) {
  return children as React.ReactElement;
}
