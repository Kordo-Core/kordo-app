import { useEffect, useState } from 'react';
import { Image, Modal, Pressable, Share, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useTheme } from '@emotion/react';
import { PostOptionsPanelProps } from './PostOptionsPanel.types';
import { Text } from '../../atoms/Text/Text';
import { Icon } from '../../atoms/Icon/Icon';
import { Radio } from '../../atoms/Radio/Radio';
import { Button } from '../../atoms/Button/Button';
import { Input } from '../../molecules/Input/Input';
import { Panel } from '../../layouts/Panel/Panel';
import { motion } from '../../../animations/motion';

export const REPORT_REASONS = [
  'Spam ou publicité',
  'Contenu inapproprié',
  'Harcèlement ou insulte',
  'Fausse information sur un bloc',
  'Autre chose',
];

type View_ = 'menu' | 'report' | 'confirmDelete' | 'confirmBlock';

// Panneau du bouton « ⋯ » d'un post (design D) : options de sa propre publication (modifier,
// commentaires, partager, supprimer) ou de celle d'un autre (partager, masquer, ne plus suivre,
// signaler, bloquer). Le signalement et les confirmations s'affichent dans le même panneau.
export const PostOptionsPanel: React.FC<PostOptionsPanelProps> = (props) => {
  const theme = useTheme();
  const [view, setView] = useState<View_>('menu');
  const [reason, setReason] = useState(1);
  const [details, setDetails] = useState('');
  // Le Modal reste monté pendant l'animation de fermeture du panneau
  const [mounted, setMounted] = useState(props.isOpen);

  useEffect(() => {
    if (props.isOpen) {
      setView('menu');
      setReason(1);
      setDetails('');
      setMounted(true);
    } else {
      const t = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(t);
    }
  }, [props.isOpen]);

  const name =
    [props.author.firstName, props.author.lastName].filter(Boolean).join(' ') ||
    props.author.username;
  const firstName = props.author.firstName || name;

  // Ferme le panneau puis lance l'action (les toasts s'affichent une fois le panneau parti)
  const run = (action?: () => void) => () => {
    props.onClose();
    action?.();
  };

  const Row = ({
    icon,
    label,
    onPress,
    danger,
  }: {
    icon: string;
    label: string;
    onPress: () => void;
    danger?: boolean;
  }) => (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        paddingVertical: 14,
        paddingHorizontal: 4,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        transform: [{ scale: pressed ? motion.pressScale : 1 }],
      })}
    >
      <Icon name={icon} size={22} color={danger ? theme.colors.error.base : theme.colors.text} />
      <Text bold appearance={danger ? 'error' : 'black'}>
        {label}
      </Text>
    </Pressable>
  );

  const header = (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingBottom: 14 }}>
      <Image
        source={{ uri: props.author.avatarUrl }}
        style={{
          width: theme.avatarSizes.sm,
          height: theme.avatarSizes.sm,
          borderRadius: theme.borderRadius.square,
          backgroundColor: theme.colors.surfaceAlt,
        }}
      />
      <View style={{ flex: 1, gap: 2 }}>
        <Text extraBold numberOfLines={1}>
          {props.isMine ? 'Ta publication' : name}
        </Text>
        <Text size="xs" appearance="gray" numberOfLines={1}>
          {props.meta}
        </Text>
      </View>
    </View>
  );

  const share = () => Share.share({ message: props.shareMessage }).catch(() => {});

  const menu = (
    <View>
      {header}
      {props.isMine ? (
        <>
          <Row icon="EditRegular" label="Modifier la publication" onPress={run(props.onEdit)} />
          <Row
            icon={props.commentsEnabled ? 'CommentOffRegular' : 'ChatRegular'}
            label={
              props.commentsEnabled ? 'Désactiver les commentaires' : 'Réactiver les commentaires'
            }
            onPress={run(props.onToggleComments)}
          />
          <Row icon="ShareRegular" label="Partager" onPress={run(share)} />
          <Row
            icon="DeleteRegular"
            label="Supprimer la publication"
            danger
            onPress={() => setView('confirmDelete')}
          />
        </>
      ) : (
        <>
          <Row icon="ShareRegular" label="Partager" onPress={run(share)} />
          <Row icon="EyeOffRegular" label="Masquer cette publication" onPress={run(props.onHide)} />
          <Row
            icon="PersonDeleteRegular"
            label={`Ne plus suivre ${firstName}`}
            onPress={run(props.onUnfollow)}
          />
          <Row
            icon="FlagRegular"
            label="Signaler la publication"
            onPress={() => setView('report')}
          />
          <Row
            icon="ProhibitedRegular"
            label={`Bloquer ${firstName}`}
            danger
            onPress={() => setView('confirmBlock')}
          />
        </>
      )}
    </View>
  );

  const report = (
    <View style={{ gap: 12 }}>
      <Text appearance="gray" style={{ lineHeight: 20 }}>
        Ton signalement est anonyme. {name} ne saura pas que c’est toi.
      </Text>
      <View
        accessibilityRole="radiogroup"
        style={{
          borderRadius: theme.borderRadius.card,
          borderWidth: 1,
          borderColor: theme.colors.border,
          overflow: 'hidden',
        }}
      >
        {REPORT_REASONS.map((label, i) => (
          <Pressable
            key={label}
            onPress={() => setReason(i)}
            accessibilityRole="radio"
            accessibilityState={{ selected: reason === i }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
              paddingVertical: 13,
              paddingHorizontal: 14,
              borderTopWidth: i ? 1 : 0,
              borderTopColor: theme.colors.border,
            }}
          >
            <Text bold style={{ flex: 1 }}>
              {label}
            </Text>
            <Radio selected={reason === i} onSelect={() => setReason(i)} />
          </Pressable>
        ))}
      </View>
      <Input
        value={details}
        onChange={setDetails}
        label="Précisions (facultatif)"
        placeholder="Dis-nous ce qui ne va pas"
        multiline
        maxLength={300}
      />
      <Button
        title="Envoyer le signalement"
        appearance="error"
        size="lg"
        fullWidth
        onPress={run(() => props.onReport?.(REPORT_REASONS[reason], details.trim()))}
      />
      <Button
        title={`Bloquer ${firstName}`}
        appearance="error"
        inverted
        size="md"
        fullWidth
        onPress={() => setView('confirmBlock')}
      />
    </View>
  );

  const confirm = (text: string, label: string, action?: () => void) => (
    <View style={{ gap: 18 }}>
      <Text appearance="gray" style={{ lineHeight: 20 }}>
        {text}
      </Text>
      <View style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
        <Button
          title="Annuler"
          appearance="gray"
          inverted
          size="md"
          fullWidth
          style={{ flex: 1 }}
          onPress={() => setView('menu')}
        />
        <Button
          title={label}
          appearance="error"
          size="md"
          fullWidth
          style={{ flex: 1 }}
          onPress={run(action)}
        />
      </View>
    </View>
  );

  const titles: Record<View_, string | undefined> = {
    menu: undefined,
    report: 'Signaler la publication',
    confirmDelete: 'Supprimer la publication ?',
    confirmBlock: `Bloquer ${firstName} ?`,
  };

  return (
    <Modal
      visible={mounted}
      transparent
      statusBarTranslucent
      animationType="none"
      onRequestClose={props.onClose}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Panel isOpen={props.isOpen} onClose={props.onClose} title={titles[view]}>
          {view === 'menu' && menu}
          {view === 'report' && report}
          {view === 'confirmDelete' &&
            confirm(
              'Elle disparaîtra du fil et de ton profil, avec ses j’aime et ses commentaires.',
              'Supprimer',
              props.onDelete,
            )}
          {view === 'confirmBlock' &&
            confirm(
              `${firstName} ne pourra plus voir ton profil ni t’écrire, et ses publications disparaîtront de ton fil.`,
              'Bloquer',
              props.onBlock,
            )}
        </Panel>
      </GestureHandlerRootView>
    </Modal>
  );
};
