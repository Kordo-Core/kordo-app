import type { Decorator } from '@storybook/react-native-web-vite';
import { Global } from '@emotion/react';
import styled from '@emotion/styled';
import { Header } from '../src/components/organisms/Header/Header';
import { Section } from '../src/components/layouts/Section/Section';
import { ListRow } from '../src/components/layouts/ListRow/ListRow';
import { Text } from '../src/components/atoms/Text/Text';
import { Icon } from '../src/components/atoms/Icon/Icon';
import { PhoneFrame, isNestedRender } from './PhoneFrame';

// Les deux décorateurs ci-dessous jouent deux rôles selon le contexte de rendu :
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
    <PhoneFrame storyId={context.id} />
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
    <PhoneFrame storyId={context.id} />
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
