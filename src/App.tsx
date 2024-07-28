import { registerRootComponent } from "expo";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import {
  Button,
  NativeSyntheticEvent,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface TodoList {
  todo: string;
  complete: boolean;
}

type TodoProps = Omit<TodoList, "todo">;

function App() {
  const [todo, setTodo] = useState<TodoList[]>([]);
  const [text, setText] = useState<string>("");

  const onTextChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setText(e.nativeEvent.text);
  };

  const onTextSubmit = () => {
    if (text.length) {
      setTodo((oldTodo) => [...oldTodo, { todo: text, complete: false }]);

      setText("");
    }
  };

  const onTodoTouch = (id: number) => {
    const todoCopy = [...todo];
    const matchTodo = todoCopy.find((_, i) => id == i);

    matchTodo!.complete = !matchTodo?.complete;
    setTodo(todoCopy);
  };

  return (
    <SafeAreaView>
      <View>
        <Text>Todo List</Text>
        <View>
          <TextInput onChange={onTextChange} value={text} />
          <Button title="send" onPress={onTextSubmit} />
        </View>
        <ScrollView>
          {todo.length == 0 && <Text>No todos yet, go create something!</Text>}
          {todo.map((item, i) => (
            <TouchableWithoutFeedback onPress={() => onTodoTouch(i)} key={i}>
              <View>
                <Text style={styles({ complete: item.complete }).todo}>
                  {item.todo}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = ({ complete }: TodoProps) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    todo: {
      textDecorationLine: complete ? "line-through" : "none",
    },
  });

registerRootComponent(App);
