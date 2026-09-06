import type { Decorator } from '@storybook/react-native-web-vite';
import { Global } from '@emotion/react';
import styled from '@emotion/styled';
import { Header } from '../src/components/organisms/Header/Header';
import { Section } from '../src/components/layouts/Section/Section';
import { ListRow } from '../src/components/layouts/ListRow/ListRow';
import { Text } from '../src/components/atoms/Text/Text';
import { Icon } from '../src/components/atoms/Icon/Icon';
import { Input } from '../src/components/molecules/Input/Input';
import { Message } from '../src/components/molecules/Message/Message';
import { PhoneFrame, chrome, isNestedRender } from './PhoneFrame';

// Les décorateurs ci-dessous jouent deux rôles selon le contexte de rendu :
//
// - dans la prévisualisation normale, ils ne dessinent que le cadre du téléphone, qui recharge
//   la story dans une iframe à ses dimensions ;
// - dans cette iframe, ils rendent la story pour de bon, en occupant tout l'écran.
//
// C'est ce dédoublement qui rend le cadre honnête : la story vit dans une fenêtre qui fait
// réellement la taille d'un téléphone, plutôt que dans une boîte qui en a l'air.
const Screen = styled.div({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  backgroundColor: '#FFFFFF',
});

// Dans l'iframe du cadre, l'écran occupe toute la fenêtre : les marges par défaut du document
// la débordent alors de quelques pixels et y font apparaître une barre de défilement, qui n'a
// pas lieu d'être sur un téléphone.
const ScreenReset = () => (
  <Global
    styles={{
      'html, body, #storybook-root': { height: '100%', margin: 0, overflow: 'hidden' },
    }}
  />
);

// Le décor est estompé et non cliquable : il situe le composant sans lui voler l'attention.
// `flex-shrink: 0` pour que le contenu trop long déborde et soit rogné, plutôt qu'écrasé.
const Dimmed = styled.div({ opacity: 0.5, pointerEvents: 'none', flexShrink: 0 });

const Target = styled.div({ flexShrink: 0 });

// Le contenu défile dans le cadre, mais sans barre visible : celui-ci doit se lire comme
// une capture d'écran de téléphone. La règle webkit impose une vraie classe CSS, d'où emotion.
const ContentArea = styled.div({
  flex: 1,
  minHeight: 0,
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  paddingTop: 8,
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': { display: 'none' },
});

const FillerSection = ({ title, rows }: { title: string; rows: string[] }) => (
  <Section>
    <Text bold>{title}</Text>
    {rows.map((row) => (
      <ListRow
        key={row}
        left={<Icon name="location" color="primary" />}
        primaryText={<Text>{row}</Text>}
        right={<Icon name="chevron-right" size="sm" color="gray" />}
      />
    ))}
  </Section>
);

/**
 * Écran de téléphone complet : fond blanc, hauteur fixe, sans décor.
 * Pour les composants qui occupent l'écran ou s'y ancrent (header collant, barre de
 * navigation, conteneur de toasts) — ils sont eux-mêmes le décor.
 */
export const phoneScreen: Decorator = (Story, context) =>
  isNestedRender() ? (
    <>
      <ScreenReset />
      <Screen>
        <Story />
      </Screen>
    </>
  ) : (
    <PhoneFrame storyId={context.id} initialArgs={context.initialArgs} args={context.args} />
  );

/**
 * Écran de téléphone garni : un header et des sections voisines à 50 % d'opacité, avec la
 * story au premier plan entre eux. Pour tout ce qui s'insère dans le flux d'un écran
 * (sections, lignes de liste, posts) : seul, un tel composant flotte dans le vide et ne dit
 * rien de son rendu réel.
 *
 * Le header est laissé dans le flux normal (il n'est en absolu qu'en mode `smart`), ce qui
 * évite d'avoir à réserver sa hauteur à la main sous forme de marge.
 */
export const phoneFrame: Decorator = (Story, context) =>
  !isNestedRender() ? (
    <PhoneFrame storyId={context.id} initialArgs={context.initialArgs} args={context.args} />
  ) : (
    <>
      <ScreenReset />
      <Screen style={{ backgroundColor: '#F5F5F5' }}>
        <Dimmed>
          <Header
            centerChildren
            left={<Icon name="navigation" size="md" />}
            right={<Icon name="alert" size="md" />}
          >
            <Text size="lg" bold appearance="primary">
              Kordo
            </Text>
          </Header>
        </Dimmed>

        <ContentArea>
          <Dimmed>
            <FillerSection title="Recent activity" rows={['Climb Up Paris', 'Arkose Nation']} />
          </Dimmed>

          <Target>
            <Story />
          </Target>

          <Dimmed>
            <FillerSection
              title="Suggested gyms"
              rows={['Les Petites Pierres', 'Arkose Montreuil']}
            />
          </Dimmed>
        </ContentArea>
      </Screen>
    </>
  );

// ---------------------------------------------------------------------------------------------
// Fil de discussion
// ---------------------------------------------------------------------------------------------

// Le fil défile comme dans l'écran réel : rembourrage sur les quatre bords — c'est lui qui donne
// à la bulle son écart avec le bord de l'écran, le composant ne portant que l'alignement.
const Thread = styled.div((props) => ({
  flex: 1,
  minHeight: 0,
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: props.theme.spacing.md,
  padding: props.theme.spacing.md,
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': { display: 'none' },
}));

const ChatIdentity = styled.div((props) => ({
  display: 'flex',
  alignItems: 'center',
  gap: props.theme.spacing.sm,
}));

const ChatAvatar = styled.img((props) => ({
  width: props.theme.avatarSizes.sm,
  height: props.theme.avatarSizes.sm,
  borderRadius: props.theme.borderRadius.rounded,
  objectFit: 'cover',
}));

const Presence = styled.div((props) => ({
  display: 'flex',
  alignItems: 'center',
  gap: props.theme.spacing.xs,
}));

const PresenceDot = styled.div((props) => ({
  width: 8,
  height: 8,
  borderRadius: props.theme.borderRadius.rounded,
  backgroundColor: props.theme.colors.secondary.base,
}));

// Barre de saisie, reprise de celle de l'application : pastille appareil photo puis le champ.
const Composer = styled.div((props) => ({
  display: 'flex',
  alignItems: 'center',
  gap: props.theme.spacing.sm,
  padding: props.theme.spacing.md,
  backgroundColor: props.theme.colors.neutral.white,
  boxShadow: props.theme.shadows.up,
}));

const CameraButton = styled.div((props) => ({
  flexShrink: 0,
  width: 40,
  height: 40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: props.theme.borderRadius.rounded,
  backgroundColor: props.theme.colors.primary.base,
}));

const AVATAR = 'https://picsum.photos/seed/kordo-adam/80/80';

// Ce décor-ci se passe de l'iframe : une bulle de message ne consulte ni les dimensions de la
// fenêtre ni `Modal`, un cadre dessiné dans la page lui suffit donc. Et il faut qu'il s'en passe :
// le passage d'args par l'URL n'accepte que `[a-zA-Z0-9 _-]` et laisserait tomber en silence
// toute retouche de `content` ou de `time` contenant une ponctuation ou un accent — or c'est
// exactement ce que l'on vient régler ici.
const InlineFrame = styled.div({
  ...(chrome as Record<string, string | number>),
  display: 'flex',
  flexDirection: 'column',
});

/**
 * Conversation complète, avec la story posée au milieu du fil : seul le message de la story est
 * à pleine opacité, les autres sont là pour le situer. C'est le décor de `Message` — un composant
 * dont l'alignement, la couleur et la largeur ne se lisent que par comparaison avec ses voisins.
 */
export const phoneChat: Decorator = (Story) => (
  <InlineFrame>
    <Dimmed>
      <Header left={<Icon name="chevron-left" size="md" />} right={<Icon name="phone" size="md" />}>
        <ChatIdentity>
          <ChatAvatar src={AVATAR} alt="" />
          <div>
            <Text size="lg" bold>
              Adam Ondra
            </Text>
            <Presence>
              <PresenceDot />
              <Text size="sm" appearance="gray">
                en ligne
              </Text>
            </Presence>
          </div>
        </ChatIdentity>
      </Header>
    </Dimmed>

    <Thread>
      <Dimmed>
        <Message
          direction="in"
          content="Have you seen the new problems in the yellow sector?"
          time="9:54"
        />
      </Dimmed>
      <Dimmed>
        <Message direction="in" content="There is one you would like." time="9:54" />
      </Dimmed>

      <Target>
        <Story />
      </Target>

      <Dimmed>
        <Message direction="out" content="Nice, I'll bring the brush." time="10:05" />
      </Dimmed>
      <Dimmed>
        <Message
          direction="in"
          content="The start is a sit down and there is a dyno near the top that gave me a lot of trouble."
          time="10:07"
        />
      </Dimmed>
    </Thread>

    <Dimmed>
      <Composer>
        <CameraButton>
          <Icon name="camera" size="md" color="white" />
        </CameraButton>
        <div style={{ flex: 1 }}>
          <Input value="" onChange={() => {}} placeholder="Envoyer un message..." />
        </div>
      </Composer>
    </Dimmed>
  </InlineFrame>
);
