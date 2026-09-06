import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Message } from './Message';
import { phoneChat } from '../../../../.storybook/decorators';

/**
 * Un message dans un fil de discussion.
 *
 * `direction` décide de tout : la couleur, le bord sur lequel la bulle s'aligne, et celui que
 * suit l'horodatage. L'heure vit dans le composant pour cette raison — un écran qui l'afficherait
 * à part aurait à refaire cet alignement à chaque message.
 *
 * Le composant ne porte que l'alignement : l'écart avec le bord de l'écran vient du rembourrage
 * de la liste qui l'entoure.
 *
 * Le décor est une conversation : le message de la story est le seul à pleine opacité, ses
 * voisins sont là pour situer sa couleur, son bord et sa largeur.
 *
 * Pour un média, passer `children` : la bulle retire alors son rembourrage et ne fournit plus
 * que le fond et l'alignement.
 */
export default {
  title: 'Molecules/Message',
  component: Message,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    direction: { control: 'inline-radio', options: ['in', 'out'] },
  },
  decorators: [phoneChat],
} satisfies Meta<typeof Message>;

type Story = StoryObj<typeof Message>;

const IMAGE = 'https://picsum.photos/seed/kordo-boulder/600/750';

/** Message reçu : gris, aligné à gauche. */
export const Incoming: Story = {
  args: {
    direction: 'in',
    content: 'Not yet! Free tomorrow morning?',
    time: '9:56',
  },
};

/** Message envoyé : coloré, aligné à droite. */
export const Outgoing: Story = {
  args: {
    direction: 'out',
    content: "Perfect, I'm heading there at 10am.",
    time: '9:58',
  },
};

/** Un message long revient à la ligne plutôt que de s'étirer d'un bord à l'autre. */
export const LongMessage: Story = {
  args: {
    direction: 'out',
    content:
      'That is the problem I was telling you about. The start is a sit down, and there is a dyno near the top that gave me a lot of trouble on my first few attempts.',
    time: '10:02',
  },
};

/** Un média : la bulle perd son rembourrage et l'image l'occupe entièrement. */
export const WithImage: Story = {
  args: { direction: 'in', time: '10:02' },
  render: (args) => (
    <Message {...args}>
      <img src={IMAGE} alt="" style={{ display: 'block', width: 220, height: 275 }} />
    </Message>
  ),
};
