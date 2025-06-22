// components/RouterButton.tsx
'use client';

import { Button, ButtonProps } from 'antd';
import { useRouter } from 'next/navigation';

interface RouterButtonProps extends ButtonProps {
  href: string;
  className?: string;
}

export default function RouterButton({ href,className, ...props }: RouterButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(href);
  };

  return <Button className={className}  {...props} onClick={handleClick} />;
}
