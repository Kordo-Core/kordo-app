import { TagProps } from './Tag.types';
import * as Styled from './Tag.styles';
import { Text } from '../Text/Text';
import { Icon } from '../Icon/Icon';
import { useTheme } from '@emotion/react';
import { getOnColor } from '../../../utils/getColors';

export const Tag: React.FC<TagProps> = (props) => {
  const theme = useTheme();
  const contentColor = getOnColor(theme, props.appearance ?? 'primary');

  return (
    <Styled.Tag appearance={props.appearance}>
      {props.icon && (
        <Icon name={props.icon.name} size={props.icon.size ?? 'sm'} color={contentColor} />
      )}
      <Text size="xs" extraBold style={{ color: contentColor }}>
        {props.title}
      </Text>
    </Styled.Tag>
  );
};
