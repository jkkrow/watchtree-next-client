import { ReactNode } from 'react';

import Button from '@/components/common/Element/Button';

interface PromptModalProps {
  title: string;
  action: string;
  header?: ReactNode;
  body?: ReactNode;
  field?: ReactNode;
  warning?: boolean;
  danger?: boolean;
  loading?: boolean;
  disabled?: boolean;
  onCancel: () => void;
  onClick?: React.MouseEventHandler;
  onSubmit?: React.FormEventHandler;
}

export default function PromptModal({
  title,
  header,
  action,
  body,
  field,
  warning,
  danger,
  loading,
  disabled,
  onCancel,
  onClick,
  onSubmit,
}: PromptModalProps) {
  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit && onSubmit(event);
  };

  return (
    <div className="flex flex-col min-w-[min(60vw,25rem)] max-w-xl p-6 gap-6">
      <h3 className="text-xl font-bold">{title}</h3>
      {header ? <div className="font-medium">{header}</div> : null}
      {warning || danger || body ? (
        <div className="flex flex-col gap-2">
          {warning || danger ? (
            <h4
              className="text-warning font-bold data-[danger=true]:text-invalid"
              data-danger={danger}
            >
              &#9888; WARNING!
            </h4>
          ) : null}
          {body}
        </div>
      ) : null}
      <form className="flex flex-col" onSubmit={submitHandler}>
        {field}
        <div className="flex mt-4 ml-auto gap-2">
          <Button type="button" small onClick={onCancel}>
            Cancel
          </Button>
          <Button
            inversed
            small
            invalid={danger}
            loading={loading}
            disabled={disabled}
            onClick={onClick}
          >
            {action}
          </Button>
        </div>
      </form>
    </div>
  );
}
