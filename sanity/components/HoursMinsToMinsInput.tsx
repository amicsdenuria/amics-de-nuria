import { Flex, Stack, Text, TextInput } from '@sanity/ui';
import { FormEvent, useState } from 'react';
import { NumberInputProps, set, unset } from 'sanity';

export function HoursMinsToMinsInput(props: NumberInputProps) {
  const { value, onChange } = props;

  // inicialización segura (solo en mount)
  const [hours, setHours] = useState(() => {
    if (typeof value === 'number') {
      return String(Math.floor(value / 60));
    }
    return '';
  });

  const [minutes, setMinutes] = useState(() => {
    if (typeof value === 'number') {
      return String(value % 60).padStart(2, '0');
    }
    return '';
  });

  const updateValue = (h: string, m: string) => {
    const hh = parseInt(h);
    const mm = parseInt(m);

    if (isNaN(hh) && isNaN(mm)) {
      onChange(unset());
      return;
    }

    if (!isNaN(mm) && mm >= 60) return;

    const total = (hh || 0) * 60 + (mm || 0);

    if (total > 0) {
      onChange(set(total));
    } else {
      onChange(unset());
    }
  };

  const handleHours = (e: FormEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;

    if (val === '' || Number(val) >= 0) {
      setHours(val);
      updateValue(val, minutes);
    }
  };

  const handleMinutes = (e: FormEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;

    if (val === '' || (Number(val) >= 0 && Number(val) < 60)) {
      setMinutes(val);
      updateValue(hours, val);
    }
  };

  // 👉 formateo visual (sin tocar estado)
  const displayMinutes =
    minutes === '' ? '' : String(Number(minutes)).padStart(2, '0');

  return (
    <Flex gap={2}>
      <Stack
        space={2}
        className="max-w-24 flex-1"
      >
        <Text
          size={1}
          muted
        >
          hores
        </Text>
        <TextInput
          type="number"
          value={hours}
          onChange={handleHours}
          min={0}
          placeholder="0"
        />
      </Stack>

      <Stack
        space={2}
        className="max-w-24 flex-1"
      >
        <Text
          size={1}
          muted
        >
          minuts
        </Text>
        <TextInput
          type="number"
          value={displayMinutes}
          onChange={handleMinutes}
          min={0}
          max={59}
          placeholder="00"
        />
      </Stack>
    </Flex>
  );
}
