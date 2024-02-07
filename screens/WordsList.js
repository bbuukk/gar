import { FlatList, View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { WordContainer } from "../comps/wordContainer";

const StyledFlatList = styled.FlatList`
  padding-top: 20px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
`;

const StyledView = styled.View`
  flex: 1;
  background-color: white;
`;

const Title = styled.Text`
  font-size: 45px;
  color: rgba(96, 101, 150, 0.43921568989753723);
  font-style: normal;
  font-weight: 400;
  margin-top: 20px;
  margin-left: 10px;
`;

const UnderlineView = styled.View`
  border-bottom-width: 2px;
  border-bottom-color: #ebe3fa;
`;

const CenteredView = styled.View`
  justify-content: center;
  align-items: center;
`;

const MarginView = styled.View`
  margin-bottom: 5px;
`;

const WORDS = [
  { word: "ahsdfl", prep: "prop" },
  { word: "A2", prep: "adjective" },
  { word: "B1", prep: "noun" },
  { word: "2B1", prep: "noun" },
];

export default function WordsList({ navigation, route }) {
  return (
    <StyledView>
      <UnderlineView>
        <Title>{route.params.name}</Title>
      </UnderlineView>

      <CenteredView>
        <StyledFlatList
          data={WORDS}
          keyExtractor={(item) => item.word}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Word", { item });
              }}
            >
              <MarginView>
                <WordContainer item={item} />
              </MarginView>
            </TouchableOpacity>
          )}
        />
      </CenteredView>
    </StyledView>
  );
}
