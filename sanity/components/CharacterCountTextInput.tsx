import { Stack, Text } from '@sanity/ui';

import { TextInputProps } from 'sanity';

interface CharacterCountTextInputProps extends TextInputProps {
  max: number;
}

const CharacterCountTextInput = (props: CharacterCountTextInputProps) => {
  const { value, renderDefault, max } = props;
  const count = value?.length ?? 0;

  return (
    <Stack space={2}>
      {renderDefault(props)}
      <Text
        size={1}
        muted
      >
        <span className={count > max ? 'text-rose-500' : ''}>
          {count}/{max}
        </span>
      </Text>
    </Stack>
  );
};

export default CharacterCountTextInput;
