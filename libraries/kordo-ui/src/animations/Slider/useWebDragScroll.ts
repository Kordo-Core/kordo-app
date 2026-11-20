import { RefObject, useEffect, useRef } from 'react';
import { Platform } from 'react-native';

// Seuil (px) au-delà duquel un appui devient un glissement : le clic qui suit est alors ignoré,
// pour ne pas ouvrir l'élément sur lequel le glissement s'est terminé.
const DRAG_THRESHOLD = 5;
// Durée (ms) du glissement final vers la position retenue
const SETTLE_MS = 320;

type ScrollableRef = RefObject<{ getScrollableNode?: () => unknown } | null>;

/**
 * Web : permet de faire glisser un ScrollView horizontal à la souris, comme au doigt.
 * Un ScrollView web ne défile qu'à la molette ou au pavé tactile ; ici l'appui-glisser de la
 * souris fait défiler le contenu, puis `settle` choisit la position finale (page, item centré…).
 * Sans effet sur mobile, où le défilement natif suit déjà le doigt. `ready` signale que le
 * ScrollView est monté, quand il n'apparaît qu'après une mesure.
 */
export function useWebDragScroll(
  ref: ScrollableRef,
  settle: (scrollLeft: number, velocity: number) => number,
  ready = true,
) {
  // Toujours la dernière version de `settle` (elle dépend des mesures), sans réabonner les écouteurs
  const settleRef = useRef(settle);
  settleRef.current = settle;

  useEffect(() => {
    if (Platform.OS !== 'web' || !ready) return;
    const instance = ref.current;
    const node = (instance?.getScrollableNode?.() ?? instance) as HTMLElement | null;
    if (!node?.addEventListener) return;

    let startX = 0;
    let startScroll = 0;
    let lastX = 0;
    let lastT = 0;
    let velocity = 0;
    let dragging = false;
    let moved = false;
    let snapType = '';

    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      dragging = true;
      moved = false;
      startX = lastX = e.clientX;
      lastT = performance.now();
      startScroll = node.scrollLeft;
      velocity = 0;
      // L'aimantation CSS reprendrait la main à chaque déplacement : coupée le temps du geste
      snapType = node.style.scrollSnapType;
      node.style.scrollSnapType = 'none';
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > DRAG_THRESHOLD) moved = true;
      const now = performance.now();
      velocity = (e.clientX - lastX) / Math.max(1, now - lastT);
      lastX = e.clientX;
      lastT = now;
      node.scrollLeft = startScroll - dx;
      if (moved) e.preventDefault();
    };
    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      // Vitesse en px/ms, positive vers la droite : on la convertit dans le sens du défilement
      const target = settleRef.current(node.scrollLeft, -velocity);
      // Glisse jusqu'à la cible image par image (le défilement « smooth » natif est annulé
      // quand on vient de modifier scrollLeft à la main), puis rend l'aimantation
      const from = node.scrollLeft;
      const t0 = performance.now();
      const step = (now: number) => {
        const p = Math.min(1, (now - t0) / SETTLE_MS);
        node.scrollLeft = from + (target - from) * (1 - Math.pow(1 - p, 3));
        if (p < 1) requestAnimationFrame(step);
        else node.style.scrollSnapType = snapType;
      };
      requestAnimationFrame(step);
    };
    const onClick = (e: MouseEvent) => {
      if (!moved) return;
      e.stopPropagation();
      e.preventDefault();
      moved = false;
    };
    const stopNativeDrag = (e: DragEvent) => e.preventDefault();

    node.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    node.addEventListener('click', onClick, true);
    node.addEventListener('dragstart', stopNativeDrag);
    node.style.cursor = 'grab';
    return () => {
      node.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      node.removeEventListener('click', onClick, true);
      node.removeEventListener('dragstart', stopNativeDrag);
    };
  }, [ref, ready]);
}
