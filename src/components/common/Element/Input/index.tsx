import { forwardRef, DetailedHTMLProps, InputHTMLAttributes } from 'react';

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  invalid?: boolean;
  message?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { id, name, invalid, disabled, message, ...rest },
  ref
) {
  return (
    <div
      className="relative flex flex-col w-full my-2 data-[invalid=true]:text-invalid data-[disabled=true]:text-secondary"
      data-invalid={invalid}
      data-disabled={disabled}
    >
      <input
        className="peer w-full py-2 outline-none bg-transparent text-current border-current border-b-[1.5px] placeholder:invisible placeholder:opacity-0 disabled:cursor-not-allowed"
        ref={ref}
        id={id || name}
        name={name}
        placeholder={name}
        disabled={disabled}
        {...rest}
      />
      {name ? (
        <label
          className="absolute capitalize mt-2 -translate-y-6 text-sm peer-focus:-translate-y-6 peer-focus:text-sm peer-placeholder-shown:text-base peer-placeholder-shown:-translate-y-0 cursor-text data-[disabled=true]:cursor-not-allowed transition-all"
          htmlFor={id || name}
          data-disabled={disabled}
        >
          {name.replace(/([A-Z])/g, ' $1').trim()}
        </label>
      ) : null}
      {message ? <p className="text-xs py-2">{message}</p> : null}
    </div>
  );
});

export default Input;
