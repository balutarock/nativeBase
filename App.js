import React from "react";
import { Component } from "react";
import {
  Text,
  Link,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Box,
  Flex,
  Input,
  Image,
  Progress,
  Button,
} from "native-base";
import NativeBaseIcon from "./components/NativeBaseIcon";
import { Platform } from "react-native";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });

const apiStatusListOfFirst = {
  initial: "INITIAL",
  in_progress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

// const moviesData = [];

// export default function App() {
class App extends Component {
  state = {
    apiStatusOfFirst: apiStatusListOfFirst.initial,
    moviesData: [],
    search: "",
  };

  componentDidMount() {
    this.getTheMovieData();
  }

  getTheMovieData = async () => {
    this.setState({ apiStatusOfFirst: apiStatusListOfFirst.in_progress });
    console.log("balu");
    const originalApiUrl =
      "https://api.themoviedb.org/3/discover/tv?api_key=639ba2e19fa297642eec1cefb28ef177";

    // ('https://api.themoviedb.org/3/discover/tv?api_key=639ba2e19fa297642eec1cefb28ef177') //
    // 'https://api.themoviedb.org/3/movie/popular?api_key=639ba2e19fa297642eec1cefb28ef177&language=en-US&' //

    const options = {
      method: "GET",
    };
    const response = await fetch(originalApiUrl, options);
    if (response.ok === true) {
      const data = await response.json();
      console.log("data >>> ", data);
      // const arrayLength = data.results.length;
      // const randomItem =
      //   data.results[Math.floor(Math.random() * (arrayLength - 1))];
      // const updatedData = {
      //   id: randomItem.id,
      //   title: randomItem.name,
      //   backdropPath: randomItem.backdrop_path,
      //   overview: randomItem.overview,
      // };
      this.setState({
        moviesData: [...data.results],
        apiStatusOfFirst: apiStatusListOfFirst.success,
      });
      // return data.results;
    } else {
      this.setState({ apiStatusOfFirst: apiStatusListOfFirst.failure });
    }
  };

  renderTheNoResults = () => (
    <Flex
      direction="column"
      w="100%"
      justifyContent="center"
      align="center"
      h="500"
    >
      <Image
        source={{
          uri: "https://res.cloudinary.com/dxnhvq8pl/image/upload/v1643303783/movie%20app%20mini%20project/alert-triangle_eeuzgc.png",
        }}
        alt="failure view"
        w="50"
        h="50"
      />
      <Text fontWeight="bold">No serach results</Text>
    </Flex>
  );

  renderTheSuccess = () => {
    const { moviesData, search } = this.state;
    const filteredData = moviesData.filter((each) =>
      each.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
      <>
        {filteredData.length == 0 ? (
          this.renderTheNoResults()
        ) : (
          <Flex
            direction="row"
            flexWrap="wrap"
            gap="10"
            w="100%"
            justify="center"
          >
            {filteredData.map((each) => {
              console.log("  ", each.poster_path);
              return (
                <Box key={each.id} shadow={"9"} w={["270", "300"]} rounded="5">
                  <Image
                    source={{
                      uri: `https://image.tmdb.org/t/p/original${each.poster_path}`,
                    }}
                    alt="Alternate Text"
                    h="400"
                    w="300"
                  />
                  <Center>
                    <Text
                      fontFamily="Bree serif"
                      fontWeight={600}
                      fontSize="25"
                    >
                      {each.name}
                    </Text>
                  </Center>
                </Box>
              );
            })}
          </Flex>
        )}
      </>
    );
  };

  renderTheFailure = () => (
    <Box w="100%" h="500">
      <Flex direction="column" justifyContent="center" align="center" h="500">
        <Image
          source={{
            uri: "https://res.cloudinary.com/dxnhvq8pl/image/upload/v1643303783/movie%20app%20mini%20project/alert-triangle_eeuzgc.png",
          }}
          alt="failure view"
          w="50"
          h="50"
        />
        <Text fontWeight="light">Something went wrong. Please try again</Text>
        <Button small primary>
          <Text fontWeight="bold">Try Again</Text>
        </Button>
      </Flex>
    </Box>
  );
  renderTheLoader = () => (
    <Box w="100%" h="500">
      <Flex direction="row" justify="center" align="center" h="500">
        <Progress w="300" shadow={2} value={45} mx="4" />
      </Flex>
    </Box>
  );

  renderTheHomePageStatus = () => {
    const { apiStatusOfFirst } = this.state;
    switch (apiStatusOfFirst) {
      case apiStatusListOfFirst.success:
        return this.renderTheSuccess();
      case apiStatusListOfFirst.failure:
        return this.renderTheFailure();
      case apiStatusListOfFirst.in_progress:
        return this.renderTheLoader();

      default:
        return null;
    }
  };

  onChangeSearch = (event) => {
    console.log("onChange", event.target.value);
    this.setState({
      search: event.target.value,
    });
  };

  render() {
    const { moviesData, search } = this.state;
    console.log("mvo >>> ", moviesData);
    console.log("search ", search);
    return (
      <NativeBaseProvider>
        <VStack space={5} mb="50" positon="fixed-top">
          <Box w="100%" py="10" px="10" shadow={"4"}>
            <Flex
              direction="row"
              justifyContent="start"
              align="center"
              w="400px"
            >
              <Flex direction="row" align="center" pr="10">
                <NativeBaseIcon fontSize="md" />
                <Heading size="lg" fontSize={["20", "30"]}>
                  NativeBase
                </Heading>
              </Flex>
              <Flex direction="row">
                <Text pr="4">Home</Text>
                <Text>production</Text>
              </Flex>
              <Input
                mx="3"
                placeholder="Search"
                w={["100", "200", "300"]}
                onChange={this.onChangeSearch}
              />
            </Flex>
          </Box>
        </VStack>
        <Box pl="20" pr="20">
          {this.renderTheHomePageStatus()}
        </Box>
      </NativeBaseProvider>
    );
  }
}

export default App;

// const renderThePage = () => {
//   setData = [getMoviesData()];
// };

// getMoviesData();
// // Color Switch Component
// function ToggleDarkMode() {
//   const { colorMode, toggleColorMode } = useColorMode();
//   return (
//     <HStack space={2} alignItems="center">
//       <Text>Dark</Text>
//       <Switch
//         isChecked={colorMode === "light"}
//         onToggle={toggleColorMode}
//         aria-label={
//           colorMode === "light" ? "switch to dark mode" : "switch to light mode"
//         }
//       />
//       <Text>Light</Text>
//     </HStack>
//   );
// }
