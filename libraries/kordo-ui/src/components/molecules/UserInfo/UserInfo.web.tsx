import { UserInfoProps } from './UserInfo.types';
import * as Styled from './UserInfo.styles';
import { Text } from '../../atoms/Text/Text';

export const UserInfo: React.FC<UserInfoProps> = (props) => {
  return (
    <>
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

      {props.layout !== 'column' && (
        <Styled.Row>
          <div onClick={() => props.onPressUser(props.user)} style={{ cursor: 'pointer' }}>
            <Styled.AvatarWrapper highlightedAvatar={props.highlightedAvatar}>
              <Styled.CustomImage src={props.user.avatarUrl} alt={props.user.username} />
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
