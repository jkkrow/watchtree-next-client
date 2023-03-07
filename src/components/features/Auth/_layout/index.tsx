import { PropsWithChildren } from 'react';

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col justify-center items-center w-96 m-auto p-6 g-2 [&>*]:w-full [&_form]:flex [&_form]:flex-col [&_form]:w-full [&_form]:gap-2 [&_button]:mt-2 [&_a]:font-medium [&_a:hover]:text-secondary [&_a]:transition-colors">
      {children}
    </div>
  );
}
