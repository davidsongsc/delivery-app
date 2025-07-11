declare module 'react-input-mask' {
  import * as React from 'react';

  export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    mask: string;
    alwaysShowMask?: boolean;
    maskChar?: string | null;
    formatChars?: { [key: string]: string };
    children?: (props: any) => React.ReactNode;
    beforeMaskedValueChange?: (
      newState: {
        value: string;
        selection: { start: number; end: number };
      },
      oldState: {
        value: string;
        selection: { start: number; end: number };
      },
      userInput: string,
      maskOptions: any
    ) => {
      value: string;
      selection: { start: number; end: number };
    };
  }

  const InputMask: React.FC<Props>;
  export default InputMask;
}
