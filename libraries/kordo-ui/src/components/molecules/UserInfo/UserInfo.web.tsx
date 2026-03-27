import { UserInfoProps } from './UserInfo.types';
import * as Styled from './UserInfo.styles';
import { Text } from '../../atoms/Text/Text';

// Affiche les informations utilisateur (avatar, nom, textes secondaires) en mode colonne ou ligne selon le layout
export const UserInfo: React.FC<UserInfoProps> = (props) => {
  return (
    <>
      {/* Mode colonne : avatar au-dessus des informations textuelles */}
      {props.layout === 'column' && (
        <Styled.Column>
          <div onClick={() => props.onPressUser(props.user)} style={{ cursor: 'pointer' }}>
            <Styled.CustomImage layout={props.layout} src={props.user.avatarUrl} alt={props.user.username} />
          </div>

          <Styled.UserData layout={props.layout}>
            <Text size="lg" bold>
              <span onClick={() => props.onPressUser(props.user)} style={{ cursor: 'pointer' }}>
                {props.user.username}
              </span>
            </Text>
            {props.secondaryText}
            {props.tertiaryText}
          </Styled.UserData>
        </Styled.Column>
      )}

      {/* Mode ligne : avatar à gauche avec option de mise en avant (badge "Now") */}
      {props.layout !== 'column' && (
        <Styled.Row>
          <div onClick={() => props.onPressUser(props.user)} style={{ cursor: 'pointer' }}>
            <Styled.AvatarWrapper highlightedAvatar={props.highlightedAvatar}>
              <Styled.CustomImage src={props.user.avatarUrl} alt={props.user.username} />
              {/* Badge "Now" affiché sur l'avatar quand l'utilisateur est actuellement actif */}
              {props.highlightedAvatar && (
                <Styled.Now>
                  <Text size="xs" appearance="white" bold>
                    Now
                  </Text>
                </Styled.Now>
              )}
            </Styled.AvatarWrapper>
          </div>

          <Styled.UserData layout={props.layout}>
            <Text size="lg" bold>
              <span onClick={() => props.onPressUser(props.user)} style={{ cursor: 'pointer' }}>
                {props.user.username}
              </span>
            </Text>
            {props.secondaryText}
            {props.tertiaryText}
          </Styled.UserData>
        </Styled.Row>
      )}
    </>
  );
};
