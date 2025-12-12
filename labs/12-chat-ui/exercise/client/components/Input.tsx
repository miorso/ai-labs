import type { ChangeEvent, FormEvent } from 'react';

export const Input = ({
  input,
  onChange,
  onSubmit,
}: {
  input: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent) => void;
}) => {
  // TODO: Return a <form> with onSubmit handler containing an <input> element
};
