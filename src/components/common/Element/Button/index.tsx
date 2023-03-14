import { DetailedHTMLProps, ButtonHTMLAttributes, forwardRef } from 'react';

import Spinner from '../../UI/Spinner';

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  loading?: boolean;
  inversed?: boolean;
  invalid?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { children, disabled, loading, inversed, invalid, ...rest },
  ref
) {
  return (
    <button
      className="relative flex justify-center items-center font-medium border-[1px] border-secondary w-full h-14 px-6 rounded-md overflow-hidden bg-primary text-primary transition hover:bg-hover disabled:cursor-not-allowed data-[loading=true]:pointer-events-none data-[inversed=true]:bg-inversed data-[inversed=true]:text-inversed data-[inversed=true]:border-0 data-[inversed=true]:[&:not(:disabled)]:hover:bg-hover-inversed data-[disabled=true]:bg-secondary data-[disabled=true]:text-secondary data-[disabled=true]:border-0 data-[invalid=true]:[&:not(:disabled)]:border-invalid data-[invalid=true]:[&:not(:disabled)]:text-invalid data-[invalid=true]:data-[inversed=true]:[&:not(:disabled)]:bg-invalid data-[invalid=true]:data-[inversed=true]:[&:not(:disabled)]:text-primary data-[invalid=true]:data-[inversed=true]:[&:not(:disabled)]:hover:opacity-70 data-[invalid=true]:data-[inversed=true]:[&:not(:disabled)]:hover:bg-invalid"
      ref={ref}
      disabled={disabled || loading}
      data-loading={loading}
      data-disabled={disabled}
      data-inversed={inversed}
      data-invalid={invalid}
      {...rest}
    >
      {children}
      <Spinner on={loading} size={30} overlay />
    </button>
  );
});

export default Button;
