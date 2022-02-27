import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Image, View, } from 'react-native';
import {
  Button,
  Icon,
  Layout,
  Divider,
  OverflowMenu,
  MenuItem,
  TopNavigationAction,
  TopNavigation,
  Text,
} from '@ui-kitten/components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import Tags from "react-native-tags";

import { signOut, getAuth } from 'firebase/auth';

const HeartIcon = (props) => (
  <Icon {...props} name='heart'/>
);

const MenuIcon = (props) => (
    <Icon {...props} name='menu-outline' width={48} height={48}/>
);

const ProfileIcon = (props) => (
    <Icon {...props} name='person-outline'/>
);

const MapIcon = (props) => (
    <Icon {...props} name='map-outline'/>
);

const LogoutIcon = (props) => (
    <Icon {...props} name='log-out'/>
);

export default ProfileScreen = ({ navigation }) => {

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
  

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const renderMenuAction = () => (
        <TopNavigationAction style={styles.navigation} icon={MenuIcon} onPress={toggleMenu}/>
    );

    const renderRightActions = () => (
    <React.Fragment>
        <OverflowMenu
            anchor={renderMenuAction}
            visible={menuVisible}
            onBackdropPress={toggleMenu}>
            <MenuItem onPress={() => navigation.navigate('Profile')} accessoryLeft={ProfileIcon} title='Profile'/>
            <MenuItem onPress={() => navigation.navigate('Map')} accessoryLeft={MapIcon} title='Map'/>
            <MenuItem accessoryLeft={LogoutIcon} onPress={() => signOut(getAuth())} title='Logout'/>
        </OverflowMenu>
    </React.Fragment>
);


  return (
    <KeyboardAwareScrollView style={styles.page}>
    <React.Fragment>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
      <TopNavigation alignment='center' accessoryRight={renderRightActions}/>

      <View style={styles.content}>
          <Text style={styles.logoName}  category='h1'>Profile</Text>
          <Image style={styles.logo} source={require('../../assets/Exploro.png')}/>
        </View>
        <Text style={styles.title} category='h6'>Please choose your favorite attractions</Text>

        <Text style={styles.title} appearance='hint'>Enter you favorite places to visit (separate by spaces)</Text>
      
      <Layout style={styles.inputContainer} level='1'>
    
      <Tags 
          initialText="monkey"
          textInputProps={styles.tag, {
          placeholder: "Any type of animal"
          }}
          initialTags={["dog", "cat", "chicken"]}
          onChangeTags={tags => console.log(tags)}
          onTagPress={(index, tagLabel, event, deleted) =>
          console.log(index, tagLabel, event, deleted ? "deleted" : "not deleted")
          }
          createTagOnString={[",", ".", " ", "\r"]}
          inputStyle={styles.inputContainer, { backgroundColor: '#fff' }}
          inputContainerStyle={styles.inputContainer}
          containerStyle={styles.container}
          renderTag={({ tag, index, onPress, deleteTagOnPress, readonly }) => (
          <TouchableOpacity style={{borderRadius: 10, margin: 5, backgroundColor: "#FFCB87"}} key={`${tag}-${index}`} onPress={onPress}>
              <Text style={styles.tag}>{tag} x</Text>
          </TouchableOpacity>
          )}
      />
      


      </Layout>
      <Divider/>
      <Button
        style={styles.button}
        accessoryLeft={HeartIcon}>
        SAVE
      </Button>
      
    </ApplicationProvider>
    </React.Fragment>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  logoName: {
    fontFamily: "Verdana",
    paddingTop: 5,
    paddingBottom: 10,
  },
  logo: {
    height: 100, 
    width: 100,
    paddingTop: 10,
  },
  inputContainer: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  title: {
    padding: 10,
    marginTop: 10
  },
  button: {
    margin: 2,
    backgroundColor: '#FF9180',
    borderColor: '#FF9180',
    marginTop: 20,
  },
  screen: {
    flex: 1,
    backgroundColor: '#D6D6D6',
  },
  tag: {
    padding: 10,
    margin: 5,
    fontFamily: "Verdana",
    color: "#FFFFFF"
  },
  input: {
    color: '#606060',
    fontWeight: 'bold',
  },
  container: {
    marginTop: 10,
    marginBottom: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  page: {
    fontFamily: "Verdana"
  },
  navigation: {
    marginTop: 40,
  },
  
});