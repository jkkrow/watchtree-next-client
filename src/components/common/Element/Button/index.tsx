import { DetailedHTMLProps, ButtonHTMLAttributes, forwardRef } from 'react';

import Spinner from '../../UI/Spinner';

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { children, loading, disabled, ...rest },
  ref
) {
  return (
    <button
      className="relative flex justify-center items-center font-medium border-2 border-primary w-full h-14 rounded-md overflow-hidden bg-inversed text-inversed transition-colors hover:bg-tertiary disabled:pointer-events-none"
      ref={ref}
      disabled={disabled || loading}
      {...rest}
    >
      {children}
      <Spinner on={loading} size={30} overlay />
    </button>
  );
});

export default Button;
