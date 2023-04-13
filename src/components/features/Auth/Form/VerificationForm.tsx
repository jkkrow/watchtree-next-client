import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';

import Spinner from '@/components/common/UI/Spinner';
import { useCheckVerificationMutation } from '@/store/features/auth/auth.api';
import { AppBaseQueryError } from '@/store';
import { MessageResponse } from '@/store/common/api.type';

export default function VerificationForm() {
  const router = useRouter();
  const [checkVerification, { isLoading, data, error }] =
    useCheckVerificationMutation();

  const token = useMemo(() => {
    const { token } = router.query;
    return token instanceof Array ? token[0] : token;
  }, [router.query]);

  const response = useMemo(() => {
    let type: 'message' | 'error' = 'message';
    let subject = '';
    let content = '';

    if (!data && !error) {
      return null;
    }

    if (error) {
      const { data: err } = error as AppBaseQueryError;
      type = 'error';
      subject = 'Unknown Error';
      content = 'Please try again later';
      subject = typeof err === 'string' ? err : err?.error || subject;
      content = typeof err === 'string' ? content : err?.message || content;
    } else {
      const { message } = data as MessageResponse;
      subject = 'Verification Success';
      content = message;
    }

    return { type, subject, content };
  }, [data, error]);

  useEffect(() => {
    if (!token) return;
    checkVerification(token);
  }, [token, checkVerification]);

  return (
    <div className="relative">
      <Spinner on={isLoading} size={64} overlay position="top" />
      {response ? (
        <div
          className="p-4 shadow-md rounded-md bg-success data-[invalid=true]:bg-invalid"
          data-invalid={response.type === 'error'}
        >
          <h3 className="font-bold">{response.subject}</h3>
          <div>{response.content}</div>
        </div>
      ) : null}
    </div>
  );
}
