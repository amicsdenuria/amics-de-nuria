import { FormEvent, useState } from 'react';
import { NumberInputProps, set, unset } from 'sanity';

import { TextInput } from '@sanity/ui';

export function KmToMInput(props: NumberInputProps) {
  const { value, onChange } = props;

  const [localValue, setLocalValue] = useState(() =>
    typeof value === 'number' ? (value / 1000).toFixed(1) : '',
  );

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const input = e.currentTarget.value;
    setLocalValue(input);

    const parsed = parseFloat(input);

    if (isNaN(parsed)) {
      onChange(unset());
      return;
    }

    onChange(set(Math.round(parsed * 1000)));
  };

  return (
    <TextInput
      type="number"
      step={0.1}
      value={localValue}
      onChange={handleChange}
      placeholder="23.5"
    />
  );
}
