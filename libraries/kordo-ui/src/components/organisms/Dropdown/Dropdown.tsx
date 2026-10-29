import React, { useRef, useState } from 'react';
import { Modal, ScrollView, useWindowDimensions, View } from 'react-native';
import { useTheme } from '@emotion/react';
import * as Styled from './Dropdown.styles';
import { DropdownItem, DropdownProps } from './Dropdown.types';
import { Icon } from '../../atoms/Icon/Icon';

// Espace (px) entre le trigger et la liste flottante
const GAP = 4;

// Position/taille mesurées du trigger + sens d'ouverture de la liste
interface Anchor {
  x: number;
  y: number;
  width: number;
  height: number;
  openUp: boolean;
}

export const Dropdown: React.FC<DropdownProps> = (props) => {
  const theme = useTheme();
  const { height: screenHeight } = useWindowDimensions();
  // Référence vers le trigger pour mesurer sa position à l'écran avant ouverture
  const triggerRef = useRef<View>(null);
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState<Anchor>({ x: 0, y: 0, width: 0, height: 0, openUp: false });

  const maxHeight = props.maxHeight ?? 240;

  // Sélection courante normalisée en tableau de clés, quel que soit le mode
  const selectedKeys =
    props.mode === 'multi' ? props.value : props.value != null ? [props.value] : [];

  // Texte du trigger : concatène les `text` des items sélectionnés
  const displayText = props.items
    .filter((item) => selectedKeys.includes(item.key))
    .map((item) => item.text)
    .join(', ');

  // Mesure le trigger puis décide d'ouvrir vers le haut ou vers le bas selon la place disponible
  const openMenu = () => {
    if (props.disabled) return;
    triggerRef.current?.measureInWindow((x, y, width, height) => {
      const spaceBelow = screenHeight - (y + height);
      const spaceAbove = y;
      const openUp = spaceBelow < maxHeight + GAP && spaceAbove > spaceBelow;
      setAnchor({ x, y, width, height, openUp });
      setOpen(true);
    });
  };

  const handleSelect = (item: DropdownItem) => {
    if (props.mode === 'multi') {
      // Multi : toggle la clé dans le tableau, la liste reste ouverte
      const next = props.value.includes(item.key)
        ? props.value.filter((key) => key !== item.key)
        : [...props.value, item.key];
      props.onChange(next);
    } else {
      // Single : remplace la valeur et ferme la liste
      props.onChange(item.key);
      setOpen(false);
    }
  };

  // Hauteur réellement disponible dans le sens choisi, bornée par maxHeight
  const availableSpace = anchor.openUp
    ? anchor.y - GAP
    : screenHeight - (anchor.y + anchor.height) - GAP;
  const listMaxHeight = Math.min(maxHeight, availableSpace);

  return (
    <>
      <Styled.Trigger ref={triggerRef} disabled={props.disabled} onPress={openMenu}>
        {props.icon && (
          <Icon name={props.icon.name} size={props.icon.size ?? 20} color={props.icon.color} />
        )}
        <Styled.TriggerText numberOfLines={1} appearance={displayText ? 'black' : 'gray'}>
          {displayText || props.placeholder || ''}
        </Styled.TriggerText>
        <Icon
          name={open ? 'ChevronUpRegular' : 'ChevronDownRegular'}
          size={20}
          color={theme.colors.neutral.gray.base}
        />
      </Styled.Trigger>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Styled.Backdrop onPress={() => setOpen(false)} />
        <Styled.ListContainer
          style={{
            left: anchor.x,
            width: anchor.width,
            maxHeight: listMaxHeight,
            // Ouverture vers le haut : on ancre le bas de la liste juste au-dessus du trigger
            ...(anchor.openUp
              ? { bottom: screenHeight - anchor.y + GAP }
              : { top: anchor.y + anchor.height + GAP }),
          }}
        >
          <ScrollView bounces={false} keyboardShouldPersistTaps="handled">
            {props.items.map((item) => (
              <Styled.ItemRow
                key={item.key}
                selected={selectedKeys.includes(item.key)}
                onPress={() => handleSelect(item)}
              >
                <Styled.ItemLeft>{item.left}</Styled.ItemLeft>
                {item.right != null && <View>{item.right}</View>}
              </Styled.ItemRow>
            ))}
          </ScrollView>
        </Styled.ListContainer>
      </Modal>
    </>
  );
};
