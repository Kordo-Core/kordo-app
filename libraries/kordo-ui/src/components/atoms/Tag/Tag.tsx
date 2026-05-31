import { TagProps } from './Tag.types';
import * as Styled from './Tag.styles';
import { Text } from '../Text/Text';
import { Icon } from '../Icon/Icon';
import { useTheme } from '@emotion/react';

export const Tag: React.FC<TagProps> = (props) => {
  const theme = useTheme();
  const iconColor =
    props.appearance === 'white' ? theme.colors.neutral.black : theme.colors.neutral.white;

  return (
    <Styled.Tag appearance={props.appearance}>
      {props.icon && (
        <Icon
          name={props.icon.name}
          size={props.icon.size ?? 'sm'}
          color={iconColor}
        />
      )}
      <Text size="md" appearance={props.appearance === 'white' ? 'black' : 'white'}>
        {props.title}
      </Text>
    </Styled.Tag>
  );
};
