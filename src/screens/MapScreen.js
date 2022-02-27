import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Icon, MenuItem, OverflowMenu, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';



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

const MapScreen = ({ navigation }) => {
    const [menuVisible, setMenuVisible] = React.useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const renderMenuAction = () => (
        <TopNavigationAction icon={MenuIcon} onPress={toggleMenu}/>
    );

    const renderRightActions = () => (
    <React.Fragment>
        <OverflowMenu
            anchor={renderMenuAction}
            visible={menuVisible}
            onBackdropPress={toggleMenu}>
            <MenuItem onPress={() => navigation.navigate('Profile')} accessoryLeft={ProfileIcon} title='Profile'/>
            <MenuItem onPress={() => navigation.navigate('Map')} accessoryLeft={MapIcon} title='Map'/>
            <MenuItem accessoryLeft={LogoutIcon} title='Logout'/>
        </OverflowMenu>
    </React.Fragment>
);


    
    return (
        <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
            <View style={styles.container} level='1'>
                <TopNavigation
                alignment='center'
                // title='Menu Navigation'    
                accessoryRight={renderRightActions}
                />
            </View>
    </ApplicationProvider>
    </>
    );
};

export default MapScreen;

const styles = StyleSheet.create({
    container: {
        minHeight: 128,
    },
});