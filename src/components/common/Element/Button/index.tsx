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
  small?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { children, disabled, loading, inversed, invalid, small, ...rest },
  ref
) {
  return (
    <button
      className="relative flex justify-center items-center font-medium border-[1.5px] border-secondary w-full min-w-min h-14 px-6 gap-4 rounded-md overflow-hidden bg-primary text-primary transition hover:bg-hover data-[small=true]:w-fit disabled:cursor-not-allowed data-[loading=true]:pointer-events-none data-[inversed=true]:bg-inversed data-[inversed=true]:text-inversed data-[inversed=true]:[&:not(:disabled)]:selection:bg-primary data-[inversed=true]:[&:not(:disabled)]:selection:text-primary data-[inversed=true]:[&:not(:disabled)]:hover:bg-hover-inversed data-[disabled=true]:bg-secondary data-[disabled=true]:text-secondary data-[disabled=true]:border-0 data-[invalid=true]:[&:not(:disabled)]:border-invalid data-[invalid=true]:[&:not(:disabled)]:text-invalid data-[invalid=true]:data-[inversed=true]:[&:not(:disabled)]:bg-invalid data-[invalid=true]:data-[inversed=true]:[&:not(:disabled)]:text-primary data-[invalid=true]:data-[inversed=true]:[&:not(:disabled)]:hover:opacity-70 data-[invalid=true]:data-[inversed=true]:[&:not(:disabled)]:hover:bg-invalid"
      ref={ref}
      disabled={disabled || loading}
      data-loading={loading}
      data-disabled={disabled}
      data-inversed={inversed}
      data-invalid={invalid}
      data-small={small}
      {...rest}
    >
      {children}
      <Spinner on={loading} size={30} overlay />
    </button>
  );
});

export default Button;
