import { UserInfoProps } from './UserInfo.types';
import * as Styled from './UserInfo.styles';
import { Pressable } from 'react-native';
import { Text } from '../../atoms/Text/Text';

// Affiche les informations utilisateur (avatar, nom, textes secondaires) en mode colonne ou ligne selon le layout
export const UserInfo: React.FC<UserInfoProps> = (props) => {
  return (
    <>
      {/* Mode colonne : avatar au-dessus des informations textuelles */}
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

      {/* Mode ligne : avatar à gauche avec option de mise en avant (badge "Now") */}
      {props.layout !== 'column' && (
        <Styled.Row>
          <Pressable onPress={() => props.onPressUser(props.user)}>
            <Styled.AvatarWrapper highlightedAvatar={props.highlightedAvatar}>
              <Styled.CustomImage
                source={{
                  uri: props.user.avatarUrl,
                }}
              />
              {/* Badge "Now" affiché sur l'avatar quand l'utilisateur est actuellement actif */}
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
