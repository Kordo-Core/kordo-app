import { Card } from '../../layouts/Card/Card';
import { SuggestionProps } from './Suggestion.types';
import { Button } from '../../atoms/Button/Button';
import { Text } from '../../atoms/Text/Text';
import { Pressable } from 'react-native';
import { useTheme } from '@emotion/react';
import * as Styled from './Suggestion.styles';
import { Icon } from '../../atoms/Icon/Icon';

export const Suggestion: React.FC<SuggestionProps> = (props) => {
  const theme = useTheme();

  return (
    <Card>
      <Styled.Container>
        <Styled.ButtonWrapper>
          <Icon name="x" color="gray" size={theme.iconSizes.md} onPress={props.onPressClose} />
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
            <Text appearance="gray">
              {'croisé à '}
              {!!props.location && (
                <Text
                  appearance="primary"
                  bold
                  onPress={() => props.onPressLocation(props.location!)}
                >
                  {props.location}
                </Text>
              )}
            </Text>
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
