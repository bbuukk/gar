import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { WordContainer } from "../comps/wordContainer";
import { Text, View } from "react-native";

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
  flex-direction: row;
  align-items: flex-end;

  border-bottom-width: 2px;
  border-bottom-color: #ebe3fa;
`;

const Title = styled.Text`
  font-size: 45px;
  color: rgba(96, 101, 150, 0.43921568989753723);
  /* color: ${(props) => props.theme.colors.purple3}; */

  margin-top: 20px;
  margin-left: 10px;
`;

const Prep = styled(Title)`
  font-size: 25px;
`;

const StyledFlatList = styled.FlatList`
  /* background-color: magenta; */
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
`;

const TRANSLATIONS = [
  {
    word: "translation1",
    prep: "prop",
    examples: [{ ger: "Hallo", eng: "hello" }],
  },
  {
    word: "translation2",
    prep: "prop",
    examples: [{ ger: "Hallo", eng: "hello" }],
  },
  {
    word: "translation3",
    prep: "prop",
    examples: [
      { ger: "Hallo", eng: "hello" },
      { ger: "whatsup", eng: "dshlfhsdj" },
    ],
  },
];

export function Word({ navigation, route }) {
  // const {word, part ,tranlations : { word, part, examples} } = route.props.words;
  console.log(route.params.item);
  return (
    <Root>
      <UnderlineView>
        <Title>{route.params.item.word}</Title>
        <Prep>{route.params.item.prep}</Prep>
      </UnderlineView>

      <StyledFlatList
        data={TRANSLATIONS}
        keyExtractor={(item) => item.word}
        renderItem={({ item }) => (
          <>
            <WordContainer item={item} />
            <Examples examples={item.examples} />
          </>
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
        <Example>
          <Text>{eng}</Text>
          <Ger>{ger}</Ger>
        </Example>
      )}
    />
  );
};

const Example = styled.View`
  padding: 5px;
`;
const Eng = styled.Text`
  /* padding: 5px; */
`;
const Ger = styled.Text`
  margin-left: 5px;
`;
