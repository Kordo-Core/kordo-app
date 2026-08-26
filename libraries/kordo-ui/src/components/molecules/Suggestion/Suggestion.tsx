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
            color={theme.colors.neutral.gray.base}
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
            <Text size="lg" bold onPress={() => props.onPressUser(props.user)}>
              {props.user.username}
            </Text>
            {!!props.location && (
              <Text appearance="gray">
                {'met at '}
                <Text
                  appearance="primary"
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
          title="Follow"
          appearance="secondary"
          borderRadius="square"
          onPress={props.onPressFollow}
        />
      </Styled.Container>
    </Card>
  );
};
