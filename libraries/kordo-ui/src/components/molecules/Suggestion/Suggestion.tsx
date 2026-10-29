import { Card } from '../../layouts/Card/Card';
import { SuggestionProps } from './Suggestion.types';
import { Button } from '../../atoms/Button/Button';
import { Text } from '../../atoms/Text/Text';
import { Pressable } from 'react-native';
import { useTheme } from '@emotion/react';
import * as Styled from './Suggestion.styles';
import { Icon } from '../../atoms/Icon/Icon';

// Carte de suggestion d'utilisateur avec avatar, nom, lieu de rencontre et bouton follow
export const Suggestion: React.FC<SuggestionProps> = (props) => {
  // Accès au thème pour dimensionner l'icône de fermeture selon les tailles définies
  const theme = useTheme();

  return (
    <Card>
      <Styled.Container>
        <Styled.ButtonWrapper>
          <Icon
            name="dismiss"
            color={theme.colors.textMuted}
            size={theme.iconSizes.md}
            onPress={props.onPressClose}
          />
        </Styled.ButtonWrapper>

        <Styled.Content>
          <Pressable onPress={() => props.onPressUser(props.user)}>
            <Styled.CustomImage
              source={{
                uri: 'https://res.cloudinary.com/dqmegz5dn/image/upload/v1763334248/avatar-kordo_rwvjw4.png',
              }}
            />
          </Pressable>

          <Styled.UserInfo>
            <Text size="sm" extraBold onPress={() => props.onPressUser(props.user)}>
              {props.user.username}
            </Text>
            {!!props.location && (
              <Text appearance="gray" size="xs">
                {'croisé·e à '}
                <Text
                  appearance="secondary"
                  bold
                  onPress={() => props.onPressLocation(props.location!)}
                >
                  {props.location}
                </Text>
              </Text>
            )}
          </Styled.UserInfo>
        </Styled.Content>

        <Button
          title="Suivre"
          appearance="secondary"
          borderRadius="square"
          fullWidth
          onPress={props.onPressFollow}
        />
      </Styled.Container>
    </Card>
  );
};
