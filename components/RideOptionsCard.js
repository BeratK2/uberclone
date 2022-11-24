import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectTravelTimeInformation } from '../slices/navSlice'

const data = [
  {
    id: "Uber-X-123",
    title: "UberX",
    multiplier: 1.25,
    image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_537/v1568070387/assets/b5/0a5191-836e-42bf-ad5d-6cb3100ec425/original/UberX.png"
  },
  {
    id: "Uber-XL-123",
    title: "UberXL",
    multiplier: 1.5,
    image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_537/v1568134115/assets/6d/354919-18b0-45d0-a151-501ab4c4b114/original/XL.png"
  },
  {
    id: "Uber-LUX-123",
    title: "Uber Lux",
    multiplier: 1.75,
    image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_537/v1569352630/assets/4b/28f11e-c97b-495a-bac1-171ae9b29362/original/BlackSUV.png"
  }
]

const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  return (
    <SafeAreaView styles={tw`bg-white flex-grow `}>
      <View>
        <TouchableOpacity 
          onPress={() => navigation.navigate("NavigateCard")}
          style={tw`absolute top-3 z-50 left-5 p-3 rounded-full`}
        >
          <Icon name="chevron-left" type="fontawesome"/>
        </TouchableOpacity>
        <Text style={tw`text-center text-xl`}>Select a Ride - {travelTimeInformation?.distance.text} </Text>
      </View>
      <FlatList data={data}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <TouchableOpacity 
            style={tw`flex-row justify-between px-10 items-center ${item.id === selected?.id && "bg-gray-200"}`}
            onPress={() => setSelected(item)}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: "contain"
              }}
              source={{uri: item.image}}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}>{item.title}</Text>
              <Text>{travelTimeInformation?.duration.text} Travel Time</Text>
            </View>
            <Text style={tw`text-xl`}>
              {new Intl.NumberFormat('en-gb', {
                style: 'currency',
                currency: 'GBP'
              }).format(
                (travelTimeInformation?.duration.value * SURGE_CHARGE_RATE * item.multiplier / 100)
              )}
            </Text>
          </TouchableOpacity>
        )}
      />

      <View>
        <TouchableOpacity style={tw`bg-black m-3`}>
          <Text style={tw`text-center text-white text-xl`}>Choose {selected?.title}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default RideOptionsCard

const styles = StyleSheet.create({})