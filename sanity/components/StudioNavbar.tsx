import { Button, Flex } from '@sanity/ui';

import { LaunchIcon } from '@sanity/icons';
import { ToolMenuProps } from 'sanity';
import { getBaseUrl } from '@/lib/baseUrl';

function CustomToolMenu(props: ToolMenuProps) {
  const baseUrl = getBaseUrl();

  return (
    <Flex
      align="center"
      gap={2}
    >
      {props.renderDefault(props)}
      <Button
        as="a"
        href={baseUrl}
        icon={LaunchIcon}
        text="Obre Amics de Núria"
        tone="primary"
        target="_blank"
      />
    </Flex>
  );
}

export default CustomToolMenu;
