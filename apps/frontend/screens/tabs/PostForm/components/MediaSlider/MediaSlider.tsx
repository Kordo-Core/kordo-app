import { useState } from 'react';
import { Image, Modal, useWindowDimensions } from 'react-native';
import { Icon, Slider, Text, VideoStories, theme } from 'kordo-ui';
import { MediaSliderProps } from './MediaSlider.types';
import * as Styled from './MediaSlider.styles';

export function MediaSlider({ media, onAdd }: MediaSliderProps) {
  const { width: screenWidth } = useWindowDimensions();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [videoIndex, setVideoIndex] = useState<number | null>(null);

  const videos = media.filter((m) => m.kind === 'video');

  if (media.length === 0 && !onAdd) return null;

  const openItem = (item: (typeof media)[0]) => {
    if (item.kind === 'image') {
      setPreviewImage(item.uri);
    } else {
      setVideoIndex(videos.findIndex((v) => v.id === item.id));
    }
  };

  return (
    <>
      {media.length > 0 ? (
        <Slider
          height={Styled.TILE_H}
          gap={theme.spacing.sm}
          style={{ width: screenWidth, marginLeft: -Styled.SIDE_PADDING }}
        >
          {onAdd && (
            <Styled.AddTile onPress={onAdd} $media>
              <Icon name="ImageRegular" size="lg" color={theme.colors.primary.base} />
              <Text size="xs" appearance="primary">
                Ajouter
              </Text>
            </Styled.AddTile>
          )}

          {media.map((item) => (
            <Styled.MediaTile key={item.id} onPress={() => openItem(item)}>
              {item.kind === 'image' && (
                <Image
                  source={{ uri: item.uri }}
                  style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                  resizeMode="cover"
                />
              )}
              {item.kind === 'video' && (
                <Styled.VideoOverlay>
                  <Icon name="play" size="md" color={theme.colors.neutral.white} />
                </Styled.VideoOverlay>
              )}
            </Styled.MediaTile>
          ))}
        </Slider>
      ) : (
        onAdd && (
          <Styled.AddTile onPress={onAdd} $media={false}>
            <Icon name="ImageRegular" size="lg" color={theme.colors.primary.base} />
            <Text size="xs" appearance="primary">
              Ajouter
            </Text>
          </Styled.AddTile>
        )
      )}

      {videoIndex !== null && (
        <VideoStories
          videos={videos.map((v) => ({ id: v.id, url: v.uri }))}
          initialIndex={videoIndex}
          onClose={() => setVideoIndex(null)}
        />
      )}

      <Modal
        visible={previewImage !== null}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setPreviewImage(null)}
      >
        <Styled.FullscreenBackdrop onPress={() => setPreviewImage(null)}>
          {previewImage && (
            <Image
              source={{ uri: previewImage }}
              style={{ width: '100%', height: '100%' }}
              resizeMode="contain"
            />
          )}
        </Styled.FullscreenBackdrop>
      </Modal>
    </>
  );
}
