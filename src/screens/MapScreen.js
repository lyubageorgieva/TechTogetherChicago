import { StyleSheet, Text, View, Dimensions  } from 'react-native';
import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Icon, MenuItem, OverflowMenu, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import scriptLoader from 'react-async-script-loader';
import { Loader } from '@googlemaps/js-api-loader';
import MapView from 'react-native-maps';

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

const loader = new Loader({
    apiKey: "AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg",
    version: "weekly",
    libraries: ["places"]
});

// Promise
loader.load().then((google) => {
    new google.maps.Map(document.getElementById("map"), mapOptions);
}).catch(e => {
    // do something
});


const mapOptions = {
    center: {
        lat: 0,
        lng: 0
    },
    zoom: 4
};

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

    componentDidMount = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                console.warn(position.coords.latitude);
                console.warn(position.coords.longitude);
                this.setState({
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.02,
                        longitudeDelta: 0,
                    }
                });
            },
            (error) => {
                console.warn(error.code, error.message);
            },
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );
    }

    onRegionChangeComplete = (region) => {
        this.setState({
            region: region
        });
    }



    
    return (
        <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
            <View>
                <TopNavigation
                alignment='center'
                // title='Menu Navigation'    
                accessoryRight={renderRightActions}
                />
            </View>
            <View style={styles.container}>
                <MapView style={styles.map}
                initialRegion={{
                    latitude: 41.881832,
                    longitude: -87.623177,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }} >
                <MapView.Marker
                    coordinate={{latitude: 41.881832,
                    longitude: -87.623177}}
                    title={"title"}
                    description={"description"}
                />
                </MapView>
            </View>
        </ApplicationProvider>
    </>
    );
};


let map;
let service;
let infowindow;

function initMap() {

    loader
    .load()
    .then((google) => {  
    const chicago = new google.maps.LatLng(41.881832, -87.623177);

    infowindow = new google.maps.InfoWindow();
    map = new google.maps.Map(document.getElementById("map"), {
        center: chicago,
        zoom: 15,
    });

    const request = {
        query: "Tour Chicago",
        fields: ["name", "geometry"],
    };

    service = new google.maps.places.PlacesService(map);
    service.findPlaceFromQuery(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        for (let i = 0; i < results.length; i++) {
            createMarker(google, results[i]);
        }

        map.setCenter(results[0].geometry.location);
        }
    });

    })
}


function createMarker(google, place) {
    if (!place.geometry || !place.geometry.location) return;

    const marker = new google.maps.Marker({
        map,
        position: place.geometry.location,
    });

    google.maps.event.addListener(marker, "click", () => {
        infowindow.setContent(place.name || "");
        infowindow.open(map);
    });
}

const styles = StyleSheet.create({

    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
});

export default MapScreen;