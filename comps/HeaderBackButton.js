import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View } from 'react-native';

// const Root = styled.View`
//   flex-direction: row;
//   width: 358px;

// `;

export function HeaderBackButton() {
  return (
    <View>
      <Icon name="arrow-left-top-bold" size={30} color="#000" />
      {/* <Icon name="arrow-left-bottom-bold" size={30} color="#900" />
      <Icon name="arrow-u-left-top" size={30} color="#900" />
      <Icon name="subdirectory-arrow-left" size={30} color="#900" /> */}
    </View>
  );
}
