import { StyleSheet, Text, View } from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const MenuScreen = () => {

    //extra code removed for brevity.
//create a Hook to store our region data.
const [region, setRegion] = useState({
    latitude: 41.881832,
    longitude: -87.623177,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
});
const ref = useRef();
//   useEffect(() => {
//     ref.current?.getAddressText();
//     console.log("REF" + ref.current?.getAddressText())
//   }, []);
  useEffect(() => {
    ref.current?.setAddressText('coffee');
  }, []);
const [coordinates] = useState([
    {
        latitude: 41.835331,
        longitude: -87.832168,
    },
    {
        latitude: 41.787663516,
        longitude: -87.576331028,
    },
  ]);

    const GetLocation  =  (<View></View>

    )

    return (
       
        <View style={styles.container}>
        {/* <GetLocation></GetLocation> */}
        <GooglePlacesAutocomplete
        ref={ref}
        placeholder='Search'
        onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
        }}
        fetchDetails={true}
        placeholder='Enter Location'
        renderDescription={row => row.description} // custom description render
        query={{
        key: 'AIzaSyBguqWA5348wmrzNBjBdsYAknB1njPhIB4',
        language: 'en',
        region: "Chicago",
        radius:50
        }}
        nearbyPlacesAPI='GoogleMapsPlacesSearch'
        GoogleMapsPlacesSearchQuery={{
            // available options for GoogleMapsPlacesSearch API : https://developers.google.com/places/web-service/search
            rankby: 'distance',
            type: 'restaurant'
          }}
    >    
    </GooglePlacesAutocomplete>
        <MapView
            style={styles.map}
            provider="google"
            initialRegion={{
            latitude: 41.881832,
            longitude: -87.623177,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421}}
            onRegionChange={this.onRegionChange}>
        <MapViewDirections
          origin={ref.current?.getAddressText()}
          destination={coordinates[1]}
          apikey='AIzaSyBguqWA5348wmrzNBjBdsYAknB1njPhIB4' // insert your API Key here
          strokeWidth={4}
          onRegionChangeComplete={(region) => setRegion(region)}
          lineDashPattern={[0]}
          strokeColor="#FF9180"
        />
        <MapView.Marker coordinate={{
        latitude: region.latitude,
        longitude: region.longitude,
    }}  title={"title"}
                    description={"description"} />
        <MapView.Marker coordinate={coordinates[1]}  title={"title"}
                    description={"description"}/> 
          {/* {this.state.markers.map((marker, index) => (
    <Marker
      key={index}
      coordinate={region.latlng}
      title={region.title}
      description={region.description}
    />
  ))} */}
        
        </MapView>
         
        <Text style={styles.text}>Current latitude: {ref.current?.getAddressText()} {region.latitude}</Text>
        <Text style={styles.text}>Current longitude: {region.longitude}</Text>
    </View>
  
    );
};

export default MenuScreen;
//create our styling code:
const styles = StyleSheet.create({
    container: {
    ...StyleSheet.absoluteFillObject,
      flex: 1, //the container will fill the whole screen.
    justifyContent: "flex-end",
    alignItems: "center",
    },
    map: {
    ...StyleSheet.absoluteFillObject,
    },
});