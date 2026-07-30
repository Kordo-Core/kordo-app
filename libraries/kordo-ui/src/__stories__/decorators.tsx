import type { Decorator } from '@storybook/react';
import styled from '@emotion/styled';
import { ViewportProvider } from '../__mocks__/rn-viewport';
import { Header } from '../components/organisms/Header/Header';
import { Section } from '../components/layouts/Section/Section';
import { ListRow } from '../components/layouts/ListRow/ListRow';
import { Text } from '../components/atoms/Text/Text';
import { Icon } from '../components/atoms/Icon/Icon';

// Dimensions d'un écran de téléphone courant (iPhone 14 / Pixel 7).
export const PHONE_WIDTH = 390;
export const PHONE_HEIGHT = 780;

// Taille annoncée aux composants qui interrogent `useWindowDimensions()` : pour eux, l'écran
// est le cadre, pas la fenêtre du navigateur.
const SCREEN = { width: PHONE_WIDTH, height: PHONE_HEIGHT };

// Habillage commun à tous les cadres : c'est lui qui garantit que deux stories différentes
// se lisent à la même échelle.
// Enveloppe extérieure : un padding, et non une marge sur le cadre, car la marge basse du
// dernier enfant se fait absorber par le conteneur de Storybook (margin collapsing).
const Canvas = styled.div({ padding: '24px 0' });

const frame: React.CSSProperties = {
  width: PHONE_WIDTH,
  maxWidth: '100%',
  margin: '0 auto',
  border: '1px solid #D9D9D9',
  borderRadius: 12,
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: '#FFFFFF',
  boxShadow: '0 6px 24px rgba(0, 0, 0, 0.12)',
};

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
export const phoneScreen: Decorator = (Story) => (
  <Canvas>
    <div data-phone-frame style={{ ...frame, height: PHONE_HEIGHT }}>
      <ViewportProvider size={SCREEN}>
        <Story />
      </ViewportProvider>
    </div>
  </Canvas>
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
export const phoneFrame: Decorator = (Story) => (
  <Canvas>
    <div
      data-phone-frame
      style={{
        ...frame,
        height: PHONE_HEIGHT,
        backgroundColor: '#F5F5F5',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <ViewportProvider size={SCREEN}>
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
      </ViewportProvider>
    </div>
  </Canvas>
);
