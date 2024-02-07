import { ThemeProvider } from "styled-components";
import { NavigationContainer } from "@react-navigation/native";
import { FlatList, View, Text, StyleSheet } from "react-native";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import WordsList from "./screens/WordsList";
import Home from "./screens/Home";

import { createStackNavigator } from "@react-navigation/stack";
import { Image } from "react-native";
import { HeaderBackButton } from "./comps/HeaderBackButton";
import { Word } from "./screens/Word";

export default function App() {
  const Stack = createStackNavigator();

  const theme = {
    colors: {
      milk: "#FFFBF5",
      purple1: "#EBE3FA",
      purple2: "#DDD0F6",
      purple3: "#D0BEF3",
      purple4: "#C2ABEF",
      purple5: "#B599EB",
      purple6: "#A786E8",
    },
    fonts: {
      main: "robotico",
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTintColor: "#A786E8",
            headerStyle: {
              ...styles.headerStyle,
            },

            headerTitleStyle: { ...styles.headerTitleStyle },
            headerRight: () => <HeaderImage />,
          }}
        >
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: "",
              headerLeft: () => (
                <Icon
                  name="menu"
                  style={{ marginLeft: 10 }}
                  size={30}
                  color="#B599EB"
                />
              ),
            }}
          />
          <Stack.Screen
            name="WordsList"
            component={WordsList}
            options={({ route: { params } }) => ({
              title: params.name,
            })}
          />
          <Stack.Screen
            name="Word"
            component={Word}
            options={({ route: { params } }) => ({
              title: params.item.word,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

const HeaderImage = () => (
  <StyledImage
    style={{ width: 25, height: 25 }}
    source={require("./assets/brand_symbol.png")}
  />
);

const StyledImage = styled.Image`
  object-fit: contain;
  margin-right: 10px;
`;

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: "#FFFBF5", // Change this to your desired background color
    // For iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    // For Android
    elevation: 5,
  },
  headerTitleStyle: {
    fontWeight: "bold", // Change this to your desired title style
    color: "#B599EB",
  },
});
