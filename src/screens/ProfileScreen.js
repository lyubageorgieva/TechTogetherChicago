import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import {
  Button,
  Icon,
  Input,
  Layout,
  MenuItem,
  OverflowMenu,
  Select,
  SelectItem,
  Tooltip,
  View,
  Text
} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import Tags from "react-native-tags";
import { borderColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

const StarIcon = (props) => (
  <Icon {...props} name='star'/>
);

const HeartIcon = (props) => (
  <Icon {...props} name='heart'/>
);

const ForwardIcon = (props) => (
  <Icon {...props} name='arrow-ios-forward'/>
);

export default ProfileScreen = () => {

  const [value, setValue] = React.useState('');
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const [selectIndex, setSelectIndex] = React.useState(undefined);
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [tooltipVisible, setTooltipVisible] = React.useState(false);

  const saveButton = () => (
    <Button
      style={styles.button}
      accessoryLeft={HeartIcon}>
      SAVE
    </Button>
  );

  return (
      
    <React.Fragment>

    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
        
    <Text style={styles.title} category='h6'>Please choose your favorite attractions</Text>
    
    <Layout style={styles.inputContainer} level='1'>
    
     
    

<Tags
    initialText="monkey"
    textInputProps={{
      placeholder: "Any type of animal"
    }}
    initialTags={["dog", "cat", "chicken"]}
    onChangeTags={tags => console.log(tags)}
    onTagPress={(index, tagLabel, event, deleted) =>
      console.log(index, tagLabel, event, deleted ? "deleted" : "not deleted")
    }
    containerStyle={styles.container}
    inputStyle={{ backgroundColor: "white" }}
    renderTag={({ tag, index, onPress, deleteTagOnPress, readonly }) => (
      <TouchableOpacity key={`${tag}-${index}`} onPress={onPress}>
        {/* <Text>{tag}</Text> */}
        <Button style={styles.tag} size='tiny'>
      {tag}
    </Button>
      </TouchableOpacity>
    )}
  />
 

</Layout>

    <Button
      style={styles.button}
      accessoryLeft={HeartIcon}>
      SAVE
    </Button>
  
    </ApplicationProvider>


    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  title: {
    padding: 10,
    marginTop: 50
  },
  button: {
    margin: 2,
    backgroundColor: '#FF9180',
    borderColor: '#FF9180'
  },
  screen: {
    flex: 1,
    backgroundColor: '#D6D6D6',
  },
  tag: {
    backgroundColor: '#FFCB87',
    borderColor: '#FFCB87',
    borderRadius: 10,
    padding: 10,
    margin: 5,
  },
  textTag: {
    color: '#EBEBEB',
    fontWeight: 'bold',
  },
  input: {
    color: '#606060',
    fontWeight: 'bold',
  },
  container: {
    marginTop: 10,
    marginBottom: 50,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-start',
  }
  
});