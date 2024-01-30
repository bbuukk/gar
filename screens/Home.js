import { FlatList, View, Text, TouchableOpacity, Image } from 'react-native';

import styled from 'styled-components/native';
import Accordion from '../comps/accordion';

const Root = styled.View`
  flex-direction: row;
  width: 358px;
  height: 62px;
  padding-top: 6px;
  padding-left: 0px;
  padding-right: 0px;
  padding-bottom: 8px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  background-color: ${(props) => props.colorHex};
  margin-bottom: 5px;
  border-radius: 10px;

  elevation: 2;
`;

const StyledText = styled.Text`
  color: rgba(96, 101, 150, 0.43921568989753723);
  text-align: center;
  font-size: 40px;
  font-style: normal;
  font-weight: 400;
`;

const StyledFlatList = styled.FlatList`
  padding-top: 50px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
`;

const StyledView = styled.View`
  flex: 1;
  background-color: white;
  justify-content: center;
  align-items: center;
`;

const CATEGORIES = [
  { title: 'A1', colorHex: '#EBE3FA' },
  { title: 'A2', colorHex: '#DDD0F6' },
  { title: 'B1', colorHex: '#D0BEF3' },
  { title: 'B2', colorHex: '#C2ABEF' },
  { title: 'C1', colorHex: '#B599EB' },
  { title: 'C2', colorHex: '#A786E8' },
];

function Home({ navigation }) {
  return (
    <StyledView>
      <Accordion title="acc">
        <Text>Hello, it's our accordion, is it somewhat good?</Text>
      </Accordion>
      <StyledFlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('WordsList', { name: item.title });
            }}
          >
            <CategoryContainer text={item.title} colorHex={item.colorHex} />
          </TouchableOpacity>
        )}
      />
    </StyledView>
  );
}
export default Home;

function CategoryContainer({ text, colorHex }) {
  return (
    <Root colorHex={colorHex}>
      <StyledText>{text}</StyledText>
    </Root>
  );
}
