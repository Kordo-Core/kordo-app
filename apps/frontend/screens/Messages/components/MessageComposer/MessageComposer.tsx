import { useTheme } from '@emotion/react';
import { Icon, Input } from 'kordo-ui';
import * as Styled from './MessageComposer.styles';
import { MessageComposerProps } from './MessageComposer.types';

// Barre de saisie du fil : appareil photo à gauche, champ au centre, et à droite la galerie
// tant que rien n'est saisi, l'envoi dès qu'il y a du texte — comme sur la maquette.
export const MessageComposer: React.FC<MessageComposerProps> = ({
  value,
  onChange,
  onSend,
  onPressCamera,
  onPressGallery,
}) => {
  const theme = useTheme();
  const hasText = value.trim().length > 0;

  return (
    <Styled.Bar>
      <Styled.CameraButton onPress={onPressCamera} accessibilityLabel="Prendre une photo">
        <Icon name="camera" size="md" color={theme.colors.neutral.white} />
      </Styled.CameraButton>

      <Styled.InputWrapper>
        <Input
          value={value}
          onChange={onChange}
          placeholder="Envoyer un message..."
          rightIcon={
            hasText
              ? { name: 'send', color: theme.colors.secondary.base, onPress: onSend }
              : { name: 'image', color: theme.colors.neutral.gray.base, onPress: onPressGallery }
          }
        />
      </Styled.InputWrapper>
    </Styled.Bar>
  );
};
