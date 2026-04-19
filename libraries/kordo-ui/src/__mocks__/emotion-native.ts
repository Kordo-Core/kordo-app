import styled from '@emotion/styled';

const emotionNative = Object.assign(
  styled,
  {
    View: styled.div,
    Text: styled.span,
    TouchableOpacity: styled.button,
    TextInput: styled.input,
    ScrollView: styled.div,
    FlatList: styled.div,
    SafeAreaView: styled.div,
    Image: styled.img,
    Pressable: styled.button,
    ImageBackground: styled.div,
  },
);

export default emotionNative;
