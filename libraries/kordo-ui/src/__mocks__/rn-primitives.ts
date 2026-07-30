import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { toWebStyle } from './rn-style';

// Primitives React Native rendues en éléments DOM pour Storybook.
//
// Un élément DOM ne connaît ni `onPress`, ni `onLayout`, ni `onChangeText`, ni `measureInWindow`.
// Sans cette traduction : les cases à cocher ne réagissent pas au clic, les composants qui se
// positionnent d'après une mesure (Loader infini, SegmentedControl, Panel) restent à zéro, et
// les champs de saisie sont inutilisables.

type AnyProps = Record<string, unknown>;

export type PrimitiveKind = 'view' | 'text' | 'pressable' | 'input' | 'image';

// Props RN sans équivalent DOM, ni traduites ci-dessous : React les poserait en attribut
// inconnu sur l'élément en émettant un avertissement.
const IGNORED_PROPS = new Set([
  'theme',
  'as',
  'testID',
  'hitSlop',
  'activeOpacity',
  'allowFontScaling',
  'ellipsizeMode',
  'selectable',
  'underlineColorAndroid',
  'blurOnSubmit',
  'returnKeyType',
  'onSubmitEditing',
  'bounces',
  'keyboardShouldPersistTaps',
  'showsVerticalScrollIndicator',
  'showsHorizontalScrollIndicator',
  'contentContainerStyle',
  'keyboardType',
  'textContentType',
  'accessibilityRole',
  'accessibilityLabel',
  'intensity',
  'tint',
  'maskElement',
]);

// Attributs DOM que les composants transmettent directement. Emotion filtrait les props
// invalides tant que la cible était une balise ; la cible étant désormais ce composant, le
// tri se fait ici — sinon `bold`, `appearance` ou `layout` atterrissent sur l'élément et
// React proteste.
const DOM_ATTRIBUTES = new Set([
  'className',
  'style',
  'id',
  'title',
  'role',
  'tabIndex',
  'src',
  'alt',
  'type',
  'value',
  'name',
  'placeholder',
  'checked',
  'disabled',
  'readOnly',
  'autoFocus',
  'maxLength',
  'rows',
  'cols',
  'width',
  'height',
  'href',
  'target',
  'htmlFor',
]);

const isDomProp = (key: string): boolean =>
  DOM_ATTRIBUTES.has(key) || /^(data|aria)-/.test(key) || /^on[A-Z]/.test(key);

type LayoutEvent = {
  nativeEvent: { layout: { x: number; y: number; width: number; height: number } };
};

// `onLayout` est rejoué via un ResizeObserver. Le handler est gardé dans une ref : les stories
// passent des fonctions recréées à chaque rendu, et réabonner à chaque fois créerait une boucle
// (mesure → setState → rendu → mesure).
const useLayout = (onLayout: unknown, nodeRef: React.MutableRefObject<HTMLElement | null>) => {
  const handler = useRef(onLayout);
  handler.current = onLayout;

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const emit = () => {
      const fn = handler.current;
      if (typeof fn !== 'function') return;
      const rect = node.getBoundingClientRect();
      (fn as (event: LayoutEvent) => void)({
        nativeEvent: {
          layout: { x: node.offsetLeft, y: node.offsetTop, width: rect.width, height: rect.height },
        },
      });
    };

    emit();
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(emit);
    observer.observe(node);
    return () => observer.disconnect();
  }, [nodeRef]);
};

// Expose le nœud DOM augmenté des méthodes de mesure RN (utilisées par Dropdown pour ancrer
// sa liste). Sans ça `triggerRef.current` reste null et la liste ne s'ouvre jamais.
const useMeasurableRef = (forwarded: React.Ref<unknown>) => {
  const nodeRef = useRef<HTMLElement | null>(null);

  useImperativeHandle(forwarded, () => {
    const node = nodeRef.current;
    if (!node) return null;
    return Object.assign(node, {
      measureInWindow: (callback: (x: number, y: number, w: number, h: number) => void) => {
        const rect = node.getBoundingClientRect();
        callback(rect.left, rect.top, rect.width, rect.height);
      },
      measure: (
        callback: (x: number, y: number, w: number, h: number, px: number, py: number) => void,
      ) => {
        const rect = node.getBoundingClientRect();
        callback(node.offsetLeft, node.offsetTop, rect.width, rect.height, rect.left, rect.top);
      },
    });
  });

  return nodeRef;
};

const toDomProps = (props: AnyProps, kind: PrimitiveKind): AnyProps => {
  const {
    onPress,
    onPressIn,
    onPressOut,
    onLongPress,
    onLayout: _onLayout,
    style,
    pointerEvents,
    source,
    resizeMode,
    onChangeText,
    secureTextEntry,
    editable,
    multiline,
    placeholderTextColor: _placeholderTextColor,
    numberOfLines,
    disabled,
    children: _children,
    ...rest
  } = props;

  const dom: AnyProps = {};
  for (const [key, value] of Object.entries(rest)) {
    if (!IGNORED_PROPS.has(key) && isDomProp(key)) dom[key] = value;
  }

  const webStyle = toWebStyle(style as never);
  if (pointerEvents) webStyle.pointerEvents = pointerEvents;
  if (resizeMode) webStyle.objectFit = resizeMode;
  // `numberOfLines={1}` (Dropdown) : équivalent CSS de la troncature RN.
  if (numberOfLines === 1) {
    webStyle.whiteSpace = 'nowrap';
    webStyle.overflow = 'hidden';
    webStyle.textOverflow = 'ellipsis';
  }
  dom.style = webStyle;

  // Seuls Pressable/Touchable et Text réagissent à `onPress` en React Native ; une View
  // l'ignore. Le câbler partout ferait réagir deux fois les composants qui diffusent leurs
  // props sur un conteneur interne (`Button` fait `{...props}` sur sa View).
  const isPressTarget = kind === 'pressable' || kind === 'text';
  if (isPressTarget) {
    if (typeof onPress === 'function') dom.onClick = onPress;
    if (typeof onLongPress === 'function') dom.onContextMenu = onLongPress;
    if (typeof onPressIn === 'function') dom.onMouseDown = onPressIn;
    if (typeof onPressOut === 'function') {
      dom.onMouseUp = onPressOut;
      dom.onMouseLeave = onPressOut;
    }
  }

  if (kind === 'pressable') {
    dom.type = 'button';
    if (disabled) dom.disabled = true;
  }

  if (kind === 'image') {
    const uri = (source as { uri?: string } | string | undefined) ?? undefined;
    dom.src = typeof uri === 'string' ? uri : uri?.uri;
    dom.alt = dom.alt ?? '';
  }

  if (kind === 'input') {
    dom.value = props.value ?? '';
    dom.onChange = (event: { target: { value: string } }) =>
      (onChangeText as ((text: string) => void) | undefined)?.(event.target.value);
    if (editable === false) dom.readOnly = true;
    if (!multiline) dom.type = secureTextEntry ? 'password' : 'text';
  }

  return dom;
};

export const createRNPrimitive = (element: string, kind: PrimitiveKind) => {
  const Primitive = forwardRef<unknown, AnyProps>((props, ref) => {
    const nodeRef = useMeasurableRef(ref);
    useLayout(props.onLayout, nodeRef);

    // Un champ multiligne devient un <textarea>, qui n'accepte pas d'attribut `type`.
    const tag = kind === 'input' && props.multiline ? 'textarea' : element;
    const selfClosing = kind === 'input' || kind === 'image';

    return React.createElement(
      tag,
      { ...toDomProps(props, kind), ref: nodeRef },
      selfClosing ? undefined : (props.children as React.ReactNode),
    );
  });

  Primitive.displayName = `RN.${element}`;
  return Primitive;
};
