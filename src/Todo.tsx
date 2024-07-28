import { useState } from "react";
import {
  Button,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";

interface TodoList {
  todo: string;
  complete: boolean;
}

type TodoProps = Omit<TodoList, "todo">;

export function Todo() {
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
      <ContentArea>
        <AddTodo>
          <TodoInput onChange={onTextChange} value={text} />
          <TodoSubmit onPress={onTextSubmit}>
            <TodoSubmitText>send</TodoSubmitText>
          </TodoSubmit>
        </AddTodo>
        <TodoList>
          {todo.length == 0 && <Text>No todos yet, go create something!</Text>}
          {todo.length > 0 && <Text>Tap todo to mark it as done</Text>}
          {todo.map((item, i) => (
            <TouchableWithoutFeedback onPress={() => onTodoTouch(i)} key={i}>
              <View>
                <TodoText $complete={item.complete}>{item.todo}</TodoText>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </TodoList>
      </ContentArea>
    </SafeAreaView>
  );
}

const ContentArea = styled.View`
  margin: 20px 10% 0 10%;
`;
const AddTodo = styled.View`
  display: flex;
  flex-direction: row;
`;

const TodoInput = styled.TextInput`
  width: 80%;
  border: 1px solid ${(props) => props.theme.colors.secondary};
  border-radius: 2px 0 0 2px;
`;

const TodoSubmit = styled.Pressable`
  width: 20%;
  border-radius: 0 2px 2px 0;
  background: ${(props) => props.theme.colors.default};
  justify-content: center;
  align-items: center;
`;

const TodoSubmitText = styled.Text`
  color: white;
  font-weight: bold;
`;

const TodoList = styled.ScrollView`
  margin-top: 20px;
`;

const TodoText = styled.Text<{ $complete: boolean }>`
  text-decoration: ${(props) => (props.$complete ? "line-through" : "none")};
`;
