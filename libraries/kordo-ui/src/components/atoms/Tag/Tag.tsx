import { TagProps } from './Tag.types';
import * as Styled from './Tag.styles';
import { Text } from '../Text/Text';
import { Icon } from '../Icon/Icon';
import { useTheme } from '@emotion/react';
import { getColor, getOnColor } from '../../../utils/getColors';
import { getToneColors, isSurfaceTone } from '../../../utils/surfaceTones';
import { CENTERED_TEXT } from '../../../utils/centeredText';

// Étiquette (design D) : niveau, franchise, statut, compteur. Quatre hauteurs, couleurs pleines
// du thème ou fonds doux ; le texte est centré sur ses lettres.
export const Tag: React.FC<TagProps> = (props) => {
  const theme = useTheme();
  const appearance = props.appearance ?? 'primary';
  const size = props.size ?? 'md';
  const { background, content } = isSurfaceTone(appearance)
    ? getToneColors(theme, appearance)
    : { background: getColor(theme, appearance), content: getOnColor(theme, appearance) };

  return (
    <Styled.Tag size={size} background={background} style={props.style}>
      {props.icon && <Icon name={props.icon.name} size={props.icon.size ?? 'sm'} color={content} />}
      <Text
        size={Styled.TAG_SIZES[size].fontSize}
        extraBold
        numberOfLines={1}
        style={[{ color: content }, CENTERED_TEXT]}
      >
        {props.title}
      </Text>
    </Styled.Tag>
  );
};
