import { Card } from '../../layouts/Card/Card';
import { SuggestionProps } from './Suggestion.types';
import { Button } from '../../atoms/Button/Button';
import { Text } from '../../atoms/Text/Text';
import { View } from 'react-native';
import { Icon } from '../../atoms/Icon/Icon';

export const Suggestion: React.FC<SuggestionProps> = (props) => {
  return (
    <Card>
      <View
        style={{
          width: 200,
          height: 230,
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-evenly',
        }}
      >
        <Icon
          name="x"
          color="#bebebeff"
          size={24}
          style={{ position: 'absolute', top: 8, right: 8 }}
        />
        <View
          style={{
            alignItems: 'center',
            display: 'flex',
            gap: 4,
          }}
        >
          <View style={{ width: 80, height: 80, backgroundColor: 'grey', borderRadius: 100 }} />
          <Text size="lg" bold>
            {props.user.username}
          </Text>
          <Text appearance="gray">
            {'croisé à '}
            <Text appearance="primary" bold>
              {props.location}
            </Text>
          </Text>
        </View>

        <Button appearance="secondary" title="Follow" borderRadius="square" />
      </View>
    </Card>
  );
};
