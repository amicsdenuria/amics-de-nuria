'use client';

import { Flex, TextInput } from '@sanity/ui';
import { set, unset, useFormValue, type StringInputProps } from 'sanity';
import { scheduleDateParts, scheduleInstant } from '../../../domain/activity/activity.schedule';

export function ScheduleModeInput(props: StringInputProps) {
  // Documents created before modes were introduced have confirmed timestamps.
  return props.renderDefault({ ...props, value: props.value ?? 'timed' });
}

export function ScheduleDateInput({ value, onChange, elementProps, readOnly, path }: StringInputProps) {
  const mode = useFormValue([...path.slice(0, -1), 'mode']) ?? 'timed';
  const { day, clock } = scheduleDateParts(value);
  const isStart = path.at(-1) === 'startDate';
  function update(nextDay: string, nextClock: string) {
    if (!nextDay) return onChange(unset());
    if (mode !== 'timed' || !nextClock) return onChange(set(nextDay));
    const local = nextDay + 'T' + nextClock;
    // Keep an invalid DST gap editable so Studio can explain the error.
    onChange(set(scheduleInstant(local, 'timed')?.toISOString() ?? local));
  }
  return (
    <Flex gap={2} wrap="wrap">
      <TextInput {...elementProps} type="date" value={day} readOnly={readOnly}
        aria-label={isStart ? 'Data d’inici' : 'Data de fi'}
        onChange={(event) => update(event.currentTarget.value, clock)} />
      {mode === 'timed' && (
        <TextInput type="time" value={clock} readOnly={readOnly} disabled={!day}
          aria-label={isStart ? 'Hora d’inici' : 'Hora de fi (opcional)'}
          onChange={(event) => update(day, event.currentTarget.value)} />
      )}
    </Flex>
  );
}
