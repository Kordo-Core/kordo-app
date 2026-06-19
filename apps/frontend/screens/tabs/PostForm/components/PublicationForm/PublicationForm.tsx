import { Input } from 'kordo-ui';
import { PublicationFormProps } from './PublicationForm.types';
import { InteractionsSection } from '../InteractionsSection/InteractionsSection';
import { MediaSlider } from '../MediaSlider/MediaSlider';
import * as Styled from './PublicationForm.styles';

export function PublicationForm(props: PublicationFormProps) {
  return (
    <Styled.Container>
      <Input value={props.title} onChange={props.onTitleChange} placeholder="Nommer votre poste…" />
      <Input
        value={props.description}
        onChange={props.onDescriptionChange}
        placeholder="Ajoutez du contexte à votre poste à l'aide d'une description…"
        multiline
      />
      <MediaSlider media={props.photos} onAdd={props.onAdd} />
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
