import * as Styled from './Message.styles';
import { MessageProps } from './Message.types';
import { Text } from '../../atoms/Text/Text';

// Bulle d'un message dans un fil de discussion. `direction` décide de tout : la couleur, le bord
// sur lequel la bulle s'aligne, et celui que suit l'horodatage — c'est pour ça que l'heure vit
// ici plutôt que dans l'écran, qui aurait à refaire ce calcul à chaque message.
// Un média se passe en `children` : la bulle retire alors son rembourrage et se contente du fond.
export const Message: React.FC<MessageProps> = ({ direction, content, time, children, style }) => {
  const Container = children ? Styled.MediaBubble : Styled.Bubble;

  return (
    <Styled.Row direction={direction}>
      <Container direction={direction} style={style}>
        {children ?? <Text appearance="black">{content}</Text>}
      </Container>

      {!!time && (
        <Text size="xs" appearance="gray">
          {time}
        </Text>
      )}
    </Styled.Row>
  );
};
