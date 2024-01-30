import styled from 'styled-components/native';

const Root = styled.View`
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
  border-radius: 4px;
`;

const Word = styled.Text`
  /* color: rgba(96, 101, 150, 0.43921568989753723); */
  color: black;
  text-align: right;
  margin-left: 10px;

  font-size: 25px;
  font-style: normal;
  font-weight: 400;
`;

export function WordContainer({ item }) {
  return (
    <Root>
      <Word>{item.word}</Word>
    </Root>
  );
}
