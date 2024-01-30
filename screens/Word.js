import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { WordContainer } from '../comps/wordContainer';
import { Text, View } from 'react-native';

const Translation = styled.View`
  flex-direction: row;
  width: 358px;
  height: 50px;
  padding-top: 6px;
  padding-left: 0px;
  padding-right: 0px;
  padding-bottom: 8px;

  align-items: center;
  flex-shrink: 0;
  background-color: rgba(235, 227, 250, 1);
  shadow-color: rgba(0, 0, 0, 0.250980406999588);
  shadow-radius: 4px;
  shadow-offset: 0px 4px;
  margin-bottom: 5px;
`;

const Root = styled.View`
  flex: 1;
  background-color: white;
`;

const UnderlineView = styled.View`
  border-bottom-width: 2px;
  border-bottom-color: #ebe3fa;
`;

const Title = styled.Text`
  font-size: 45px;
  color: rgba(96, 101, 150, 0.43921568989753723);
  font-style: normal;
  font-weight: 400;
  margin-top: 20px;
  margin-left: 10px;
`;

const TRANSLATIONS = [
  {
    word: 'translation1',
    prep: 'prop',
    examples: [{ ger: 'Hallo', eng: 'hello' }],
  },
  {
    word: 'translation2',
    prep: 'prop',
    examples: [{ ger: 'Hallo', eng: 'hello' }],
  },
  {
    word: 'translation3',
    prep: 'prop',
    examples: [
      { ger: 'Hallo', eng: 'hello' },
      { ger: 'whatsup', eng: 'dshlfhsdj' },
    ],
  },
];

const Prep = styled.Text`
  /* color: rgba(96, 101, 150, 0.43921568989753723); */
  /* color: black; */
  text-align: right;
  /* margin-left: 10px; */

  font-size: 25px;
  font-style: normal;
  font-weight: 400;
`;

const StyledFlatList = styled.FlatList`
  padding-top: 20px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
`;

export function Word({ navigation, route }) {
  // const {word, part ,tranlations : { word, part, examples} } = route.props.words;
  console.log(route.params.item);
  return (
    <Root>
      <UnderlineView>
        <Title>
          {route.params.item.word}
          <Prep>{route.params.item.prep}</Prep>
        </Title>
      </UnderlineView>

      <StyledFlatList
        data={TRANSLATIONS}
        keyExtractor={(item) => item.word}
        renderItem={({ item }) => (
          <TouchableOpacity
          // onPress={() => {
          //   console.log(item.word);
          // }}
          >
            <WordContainer item={item} />
            <Examples examples={item.examples} />
          </TouchableOpacity>
        )}
      />
    </Root>
  );
}

const Examples = ({ examples }) => {
  return (
    <StyledFlatList
      data={examples}
      keyExtractor={(item) => item.ger}
      renderItem={({ item: { ger, eng } }) => (
        <View>
          <Text>{eng}</Text>
          <Text>{ger}</Text>
        </View>
      )}
    />
  );
};
