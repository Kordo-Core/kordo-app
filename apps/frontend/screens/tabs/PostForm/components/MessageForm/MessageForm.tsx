import { Input } from 'kordo-ui';
import { MessageFormProps } from './MessageForm.types';
import { InteractionsSection } from '../InteractionsSection/InteractionsSection';
import * as Styled from './MessageForm.styles';

export function MessageForm(props: MessageFormProps) {
  return (
    <Styled.Container>
      <Input
        value={props.message}
        onChange={props.onMessageChange}
        placeholder="Écrivez votre message…"
        multiline
      />
      <InteractionsSection
        visibility={props.visibility}
        onVisibilityChange={props.onVisibilityChange}
        likesEnabled={props.likesEnabled}
        onLikesChange={props.onLikesChange}
        commentsEnabled={props.commentsEnabled}
        onCommentsChange={props.onCommentsChange}
      />
    </Styled.Container>
  );
}
