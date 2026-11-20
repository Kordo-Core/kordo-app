import { Input } from 'kordo-ui';
import { PublicationFormProps } from './PublicationForm.types';
import { InteractionsSection } from '../InteractionsSection/InteractionsSection';
import { MediaSlider } from '../MediaSlider/MediaSlider';
import * as Styled from './PublicationForm.styles';

export function PublicationForm(props: PublicationFormProps) {
  return (
    <Styled.Container>
      <Input
        label="TITRE"
        variant="form"
        emphasis
        value={props.title}
        onChange={props.onTitleChange}
        placeholder="Nomme ton poste…"
      />
      <Input
        value={props.description}
        onChange={props.onDescriptionChange}
        label="DESCRIPTION"
        variant="form"
        counter={500}
        placeholder="Ajoute du contexte à ton poste avec une description…"
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
