import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Animated } from 'react-native';
import styled from 'styled-components/native';

const Accordion = ({ title, children }) => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => setExpanded(!expanded);

  const Title = styled.TouchableOpacity`
    background-color: green;
  `;

  return (
    <View>
      <Title onPress={toggleExpanded}>
        <Text>{title}</Text>
      </Title>
      {expanded && children}
    </View>
  );
};

export default Accordion;
