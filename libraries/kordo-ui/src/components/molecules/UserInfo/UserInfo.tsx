import { UserInfoProps } from './UserInfo.types';
import * as Styled from './UserInfo.styles';
import { Pressable } from 'react-native';
import { Text } from '../../atoms/Text/Text';

export const UserInfo: React.FC<UserInfoProps> = (props) => {
  return (
    <>
      {props.layout === 'column' && (
        <Styled.Column>
          <Pressable onPress={() => props.onPressUser(props.user)}>
            <Styled.CustomImage
              layout={props.layout}
              source={{
                uri: props.user.avatarUrl,
              }}
            />
          </Pressable>

          <Styled.UserData layout={props.layout}>
            <Text size="lg" bold onPress={() => props.onPressUser(props.user)}>
              {props.user.username}
            </Text>
            {props.secondaryText}
            {props.tertiaryText}
          </Styled.UserData>
        </Styled.Column>
      )}

      {props.layout !== 'column' && (
        <Styled.Row>
          <Pressable onPress={() => props.onPressUser(props.user)}>
            <Styled.AvatarWrapper highlightedAvatar={props.highlightedAvatar}>
              <Styled.CustomImage
                source={{
                  uri: props.user.avatarUrl,
                }}
              />
              {props.highlightedAvatar && (
                <Styled.Now>
                  <Text size="xs" appearance="white" bold>
                    Now
                  </Text>
                </Styled.Now>
              )}
            </Styled.AvatarWrapper>
          </Pressable>

          <Styled.UserData layout={props.layout}>
            <Text size="lg" bold onPress={() => props.onPressUser(props.user)}>
              {props.user.username}
            </Text>
            {props.secondaryText}
            {props.tertiaryText}
          </Styled.UserData>
        </Styled.Row>
      )}
    </>
  );
};
