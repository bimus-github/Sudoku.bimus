import { StatusBar } from "expo-status-bar";
import React, { useState, useRef, useEffect } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import { Feather } from "@expo/vector-icons";

export default function App() {
  const format = (number) => `0${number}`.slice(-2);

  const getRemaining = (time) => {
    const min = Math.floor(time / 60);
    const sec = time - min * 60;
    return { min: format(min), sec: format(sec) };
  };

  const [count, setCount] = useState(0);
  const [active, setActive] = useState(false);
  const { min, sec } = getRemaining(count);

  const button = () => {
    setActive(!active);
  };

  useEffect(() => {
    let interval = null;
    if (active) {
      interval = setInterval(() => {
        setCount((count) => count + 1);
      }, 1000);
    } else if (!active && count !== 0) {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [active, count]);

  const FadeInView = (props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 4,

        duration: 1000,
      }).start();
    }, [fadeAnim]);

    return (
      <Animated.View
        style={{
          ...props.style,
          opacity: fadeAnim,
        }}
      >
        {props.children}
      </Animated.View>
    );
  };
  const [map, setMap] = useState([
    [
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
    ],
  ]);

  const setNumber = (rowIndex, columnIndex, number) => {
    if (rowIndex == 1 && columnIndex == 1) {
      Alert.alert(
        "Xato",
        "Ho'jeyin kechirasiz siz bu katakni o'zgartira olmaysiz"
      );
      return;
    }
    if (rowIndex == 0 && columnIndex == 5) {
      Alert.alert(
        "Xato",
        "Ho'jeyin kechirasiz siz bu katakni o'zgartira olmaysiz"
      );
      return;
    }
    if (rowIndex == 2 && columnIndex == 4) {
      Alert.alert(
        "Xato",
        "Ho'jeyin kechirasiz siz bu katakni o'zgartira olmaysiz"
      );
      return;
    }
    if (rowIndex == 3 && columnIndex == 0) {
      Alert.alert(
        "Xato",
        "Ho'jeyin kechirasiz siz bu katakni o'zgartira olmaysiz"
      );
      return;
    }
    if (rowIndex == 4 && columnIndex == 2) {
      Alert.alert(
        "Xato",
        "Ho'jeyin kechirasiz siz bu katakni o'zgartira olmaysiz"
      );
      return;
    }
    if (rowIndex == 5 && columnIndex == 3) {
      Alert.alert(
        "Xato",
        "Ho'jeyin kechirasiz siz bu katakni o'zgartira olmaysiz"
      );
      return;
    }
    if (number === "") {
      const arr = [...map];
      arr[rowIndex][columnIndex] = number;
      setMap(arr);
      return;
    }
    if (number == 0 || number > 6) {
      Alert.alert(
        "Xato",
        "Ho'jeyin siz faqat 1, 2, 3, 4, 5, 6 raqamlardan foydalanishingiz kerak!!!"
      );
    }

    const ha = () => {
      setActive(!active);
      const arr = [...map];
      arr[rowIndex][columnIndex] = number;
      setMap(arr);
    };
    if (active) {
      const arr = [...map];
      arr[rowIndex][columnIndex] = number;
      setMap(arr);
    } else {
      Alert.alert(
        "Xato, bu katta xato",
        "Ho'jeyin o'yinni davom etirasizmi?.",
        [
          {
            text: "Ha",
            onPress: ha,
          },
          {
            text: "Yo'q",
          },
        ]
      );
    }
    // console.warn(number);

    const sumX = {};
    const sumY = {};

    for (let i = 0; i < 6; i++) {
      sumX[i] =
        parseInt(map[i][0]) +
        parseInt(map[i][1]) +
        parseInt(map[i][2]) +
        parseInt(map[i][3]) +
        parseInt(map[i][4]) +
        parseInt(map[i][5]);
    }
    for (let i = 0; i < 6; i++) {
      sumY[i] =
        parseInt(map[0][i]) +
        parseInt(map[1][i]) +
        parseInt(map[2][i]) +
        parseInt(map[3][i]) +
        parseInt(map[4][i]) +
        parseInt(map[5][i]);
    }

    if (
      sumX[0] == 21 &&
      sumX[1] == 21 &&
      sumX[2] == 21 &&
      sumX[5] == 21 &&
      sumX[4] == 21 &&
      sumX[3] == 21 &&
      sumY[0] == 21 &&
      sumY[1] == 21 &&
      sumY[3] == 21 &&
      sumY[4] == 21 &&
      sumY[5] == 21 &&
      sumY[2] == 21
    ) {
      Alert.alert(
        `G'alaba ${min}:${sec}`,
        `Tabriklayman ho'jeyin siz yutdingiz :)`,
        [
          {
            text: "Restart",
            onPress: reset,
          },
        ]
      );
    }
  };

  const reset = () => {
    const HA = () => {
      function getRandomArbitrary(min, max) {
        const random = Math.random() * (max - min) + min;
        return Math.round(random);
      }
      const n1 = getRandomArbitrary(1, 6);
      const n2 = getRandomArbitrary(1, 6);
      const n3 = getRandomArbitrary(1, 6);
      const n4 = getRandomArbitrary(1, 6);
      const n5 = getRandomArbitrary(1, 6);
      const n6 = getRandomArbitrary(1, 6);

      const arr = [
        ...[
          ["", "", "", "", "", ""],
          ["", "", "", "", "", ""],
          ["", "", "", "", "", ""],
          ["", "", "", "", "", ""],
          ["", "", "", "", "", ""],
          ["", "", "", "", "", ""],
        ],
      ];
      arr[1][1] = `${n1}`;
      arr[2][4] = `${n2}`;
      arr[3][0] = `${n3}`;
      arr[0][5] = `${n4}`;
      arr[4][2] = `${n5}`;
      arr[5][3] = `${n6}`;

      setMap(arr);
      setCount(0);
    };
    Alert.alert("Eslatma", "Ho'jeyin o'yin yangitdan boshlanadi!", [
      {
        text: "Ho'p",
        onPress: HA,
      },
      {
        text: "Yo'q",
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText1}>Sudoku</Text>
      </View>
      <View>
        <View style={styles.time}>
          <Text style={{ fontSize: 18 }}>{`${min}:${sec}`}</Text>
        </View>
        {map.map((row, rowIndex) => (
          <View key={`${rowIndex}`} style={styles.row}>
            {row.map((column, columnIndex) => {
              const bgCollor =
                (rowIndex === 1 && columnIndex === 1) ||
                (rowIndex === 2 && columnIndex === 4) ||
                (rowIndex === 3 && columnIndex === 0) ||
                (rowIndex === 0 && columnIndex === 5) ||
                (rowIndex === 4 && columnIndex === 2) ||
                (rowIndex === 5 && columnIndex === 3)
                  ? "yellow"
                  : "white";
              return (
                <View style={{ ...styles.column, backgroundColor: bgCollor }}>
                  <TextInput
                    key={`${rowIndex}${columnIndex}`}
                    style={styles.input}
                    value={column}
                    onChangeText={(number) =>
                      setNumber(rowIndex, columnIndex, number)
                    }
                    keyboardType={"numeric"}
                    maxLength={1}
                  />
                </View>
              );
            })}
          </View>
        ))}
      </View>
      <View style={styles.bottom}>
        <View style={styles.btnView}>
          <TouchableOpacity
            style={styles.button}
            title="button"
            onPress={button}
          >
            <Text
              style={{
                fontSize: 24,
                color: "white",
              }}
            >
              {active ? "Pause" : "Start"}
            </Text>
          </TouchableOpacity>
        </View>

        <Feather
          style={styles.icon}
          name="refresh-ccw"
          size={30}
          color="black"
          onPress={reset}
        />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  time: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "black",
    width: 70,
    height: 30,
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#6bfaee",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginBottom: 30,
  },
  titleText: {
    fontSize: 18,
    color: "red",
  },
  titleText1: {
    color: "black",
    fontSize: 40,
    alignSelf: "center",
    marginBottom: 10,
  },
  row: {
    width: 350,
    height: 70,
    flexDirection: "row",
    borderRadius: 10,
  },
  column: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 5,
    margin: 1,
    borderRadius: 5,
    borderWidth: 4,
  },
  input: {
    flex: 1,
    fontSize: 40,
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btnView: {
    marginTop: 20,
    width: 250,
    borderWidth: 5,
    borderRadius: 10,
    height: 40,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  icon: {
    marginLeft: 40,
    marginTop: 20,
  },
});
