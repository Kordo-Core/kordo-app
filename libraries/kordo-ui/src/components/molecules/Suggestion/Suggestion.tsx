import { Card } from '../../layouts/Card/Card';
import { SuggestionProps } from './Suggestion.types';
import { Button } from '../../atoms/Button/Button';
import { Text } from '../../atoms/Text/Text';
import { Pressable } from 'react-native';
import { useTheme } from '@emotion/react';
import * as Styled from './Suggestion.styles';
import { Icon } from '../../atoms/Icon/Icon';
import { UserInfo } from '../UserInfo/UserInfo';

export const Suggestion: React.FC<SuggestionProps> = (props) => {
  const theme = useTheme();

  return (
    <Card>
      <Styled.Container>
        <Styled.ButtonWrapper>
          <Icon name="x" color="gray" size={theme.iconSizes.md} onPress={props.onPressClose} />
        </Styled.ButtonWrapper>

        <UserInfo
          user={props.user}
          secondaryText={
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
          }
          layout="column"
          onPressUser={props.onPressUser}
        />

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
