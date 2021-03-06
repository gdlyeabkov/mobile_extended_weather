import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, StyleSheet, Text, View, DrawerLayoutAndroid, Button, Dimensions, TextInput } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MaterialIcons, Ionicons, AntDesign, Feather, Fontisto, MaterialCommunityIcons, Entypo, FontAwesome } from '@expo/vector-icons'
import MapView from 'react-native-maps'
import * as Location from 'expo-location'
import Geocoder from 'react-native-geocoder'

const Stack = createNativeStackNavigator()

export default function App() {
  
  const testActivity = 'MainActivity'

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={testActivity}>
        <Stack.Screen
          name="MainActivity"
          component={MainActivity}
          options={{
            title: ''
          }}
        />
        <Stack.Screen
          name="SearchActivity"
          component={SearchActivity}
          options={{
            title: ''
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export function SearchActivity({ navigation }) {

  const [searchContent, setSearchContent] = useState('')

  useEffect(() => {
    navigation.setOptions({
      title: () => (
        <TextInput
          value={searchContent}
          onChangeText={(value) => setSearchContent(value)}
        />
      )
    })
  }, [])

  return (
    <View>

    </View>
  )

}

export function MainActivity({ navigation }) {
  
  const asideDrawer = useRef(null)
  
  const [asideDrawerPosition, setAsideDrawerPosition] = useState('left')
  
  const [isInit, setIsInit] = useState(false)

  const [location, setLocation] = useState(null)

  const [errorMsg, setErrorMsg] = useState(null)

  const [cityName, setCityName] = useState('')

  const [cityTemp, setCityTemp] = useState('')

  const dayOfWeekLabels = [
    'вс',
    'пн',
    'вт',
    'ср',
    'чт',
    'пт',
    'сб'
  ]

  const monthLabels = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря'
  ]

  const [cityHumidity, setCityHumidity] = useState('0')

  const [cityWindSpeed, setCityWindSpeed] = useState('0')

  const [citySunRise, setCitySunRise] = useState(0)

  const [citySunSet, setCitySunSet] = useState(0)

  const [cityLat, setCityLat] = useState(0)

  const [cityLon, setCityLon] = useState(0)

  const [cityAqi, setCityAqi] = useState(0)

  const [cityUvi, setCityUvi] = useState(0)

  const asideNavigationView = () => (
    <View
      style={styles.window}
    >
      <View
        style={styles.rowEnd}
      >
        <Ionicons
          name="settings-sharp"
          size={24}
          color="black"
        />
      </View>
      
      <View
        style={styles.rowBetween}
      >
        <View
          style={styles.rowBetween}
        >
          <AntDesign
            name="star"
            size={24}
            color="black"
          />
          <Text
            style={styles.marginedElement}
          >
            Избранное место
          </Text>
        </View>
        <AntDesign
          name="infocirlceo"
          size={24}
          color="black"
        />
      </View>
      <View
        style={styles.rowBetween}
      >
        <Text>
          {
            cityName
          }
        </Text>
        <View
          style={styles.rowCenter}
        >
          <Ionicons
            name="sunny"
            size={24}
            color="black"
          />
          <Text
            style={styles.marginedElement}
          >
            11°
          </Text>
        </View>
      </View>
      <View style={{borderBottomWidth: StyleSheet.hairlineWidth}}></View>
      <View
        style={styles.rowBetween}
      >
        <MaterialIcons
          name="add-location"
          size={24}
          color="black"
        />
        <Text>
          Другие места
        </Text>
      </View>
      <View>
        <Button
          title="Управление местами"
          onPress={() => {

          }}
        />
      </View>
      <View style={{borderBottomWidth: StyleSheet.hairlineWidth}}></View>
      <View
        style={styles.rowBetween}
      >
        <Feather
          name="speaker"
          size={24}
          color="black"
        />
        <Text>
          Неправильное место
        </Text>
      </View>
      <View
        style={styles.rowBetween}
      >
        <MaterialIcons
          name="support-agent"
          size={24}
          color="black"
        />
        <Text>
          Свяжитесь с нами
        </Text>
      </View>
      <View
        style={styles.rowBetween}
      >
        <Ionicons
          name="ios-help-circle"
          size={24}
          color="black"
        />
        <Text>
          Использование
        </Text>
      </View>

    </View>
  )

  const goToActivity = (navigation, activityName, params = {}) => {
    navigation.navigate(activityName, params)
  }


  const getCitySunSet = () => {
    const date = new Date()
    date.setMilliseconds(citySunSet)
    let isAddPrefix = false
    let hours = date.getHours()
    isAddPrefix = hours < 10
    if (isAddPrefix) {
      hours = `0${hours}`
    }
    let minutes = date.getMinutes()
    isAddPrefix = minutes < 10
    if (isAddPrefix) {
      minutes = `0${minutes}`
    }
    return `${hours}:${minutes}`
  }

  const getCitySunRise = () => {
    const date = new Date()
    date.setMilliseconds(citySunRise)
    let isAddPrefix = false
    let hours = date.getHours()
    isAddPrefix = hours < 10
    if (isAddPrefix) {
      hours = `0${hours}`
    }
    let minutes = date.getMinutes()
    isAddPrefix = minutes < 10
    if (isAddPrefix) {
      minutes = `0${minutes}`
    }
    return `${hours}:${minutes}`
  }

  const getCurrentDateTime = () => {
    // пн, 21 марта 17:27
    const currentDateTime = new Date()
    const dayOfWeek = currentDateTime.getDay()
    const dayOfWeekLabel = dayOfWeekLabels[dayOfWeek]
    const monthIndex = currentDateTime.getMonth()
    const monthLabel = monthLabels[monthIndex]
    let day = currentDateTime.getDate()
    let isAddPrefix = false
    isAddPrefix = day < 10
    if (isAddPrefix) {
      day = `0${day}`
    }
    let hours = currentDateTime.getHours()
    isAddPrefix = hours < 10
    if (isAddPrefix) {
      hours = `0${hours}`
    }
    let minutes = currentDateTime.getMinutes()
    isAddPrefix = minutes < 10
    if (isAddPrefix) {
      minutes = `0${minutes}`
    }
    return `${dayOfWeekLabel}, ${day} ${monthLabel} ${hours}:${minutes}`
  }

  useEffect(async () => {
    const isNotInit = !isInit
    if (isNotInit) {
      setIsInit(true)
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied')
        return
      }
      let location = await Location.getCurrentPositionAsync({})
      setLocation(location)
      const addresses = await Location.reverseGeocodeAsync(location.coords)
      const countAdresses = addresses.length
      const isHaveAdresses = countAdresses >= 1
      if (isHaveAdresses) {
        const city = addresses[0]
        setCityName(city.city)
      }
      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${'Moscow'}&appid=8ced8d3f02f94ff154bc4ddb60fa72a9&units=metric`, {
        mode: 'cors',
        method: 'GET'
      }).then(response => response.json()).then((json) => {
        setCityTemp(json.main.temp)
        setCityHumidity(json.main.humidity)
        setCityWindSpeed(json.wind.speed)
        setCitySunRise(json.sys.sunrise)
        setCitySunSet(json.sys.sunset)
        setCityLat(json.coord.lat)
        setCityLon(json.coord.lon)
        fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${cityLat}&lon=${cityLon}&appid=8ced8d3f02f94ff154bc4ddb60fa72a9`, {
          mode: 'cors',
          method: 'GET'
        }).then(response => response.json()).then((json) => {
          setCityAqi(json.list[0].main.aqi)
          fetch(`http://api.openweathermap.org/data/2.5/uvi?appid=8ced8d3f02f94ff154bc4ddb60fa72a9&amp;lat=${cityLat}&amp;lon=${cityLon}`, {
            mode: 'cors',
            method: 'GET'
          }).then(response => response.json()).then((json) => {
            setCityUvi(json.value)
          })
        })
      })
    }
  }, [])

  return (
    <>
      <DrawerLayoutAndroid
        ref={asideDrawer}
        drawerWidth={300}
        drawerPosition={asideDrawerPosition}
        renderNavigationView={asideNavigationView}
      >
        <ScrollView
          style={styles.mainActivityContainer}
        >
          <View
            style={styles.mainActivityContainerItem}
          >
            <Text>
              {
                cityName
              }
            </Text>
            <Text>
              {
                getCurrentDateTime()
              }
            </Text>
            <View
              style={styles.rowBetween}
            >
              <View
                styles={styles.rowCenter}
              >
                <Ionicons
                  name="sunny"
                  size={48}
                  color="black"
                />
                <Text>
                  {
                    `${cityTemp}°`
                  }
                </Text> 
              </View>
              <View>
                <Text>
                  Облачно
                </Text>
                <Text>
                  {
                    `${cityTemp}°`
                  }
                </Text>
                <Text>
                  {
                    `Ощущается как ${cityTemp}°`
                  }
                </Text>
              </View>
            </View>
            <View
              style={styles.rowBetween}
            >
              <View
                style={styles.columnCenter}
              >
                <Text>
                  15:00
                </Text>
                <Ionicons
                  name="sunny"
                  size={24}
                  color="black"
                />
                <Text
                  style={styles.boldLabel}
                >
                  {
                    `${cityTemp}°`
                  }
                </Text>
                <View
                  style={styles.rowBetween}
                >
                  <Fontisto
                    name="blood-drop"
                    size={10}
                    color="black"
                  />
                  <Text
                    style={styles.marginedElement}
                  >
                    {
                      `${cityHumidity}%`
                    }
                  </Text>
                </View>
              </View>
              <View
                style={styles.columnCenter}
              >
                <Text>
                  16:00
                </Text>
                <Ionicons
                  name="sunny"
                  size={24}
                  color="black"
                />
                <Text
                  style={styles.boldLabel}
                >
                  {
                    `${cityTemp}°`
                  }
                </Text>
                <View
                  style={styles.rowBetween}
                >
                  <Fontisto
                    name="blood-drop"
                    size={10}
                    color="black"
                  />
                  <Text
                    style={styles.marginedElement}
                  >
                    {
                      `${cityHumidity}%`
                    }
                  </Text>
                </View>
              </View>
              <View
                style={styles.columnCenter}
              >
                <Text>
                  17:00
                </Text>
                <Ionicons
                  name="sunny"
                  size={24}
                  color="black"
                />
                <Text
                  style={styles.boldLabel}
                >
                  {
                    `${cityTemp}°`
                  }
                </Text>
                <View
                  style={styles.rowBetween}
                >
                  <Fontisto
                    name="blood-drop"
                    size={10}
                    color="black"
                  />
                  <Text
                    style={styles.marginedElement}
                  >
                    {
                      `${cityHumidity}%`
                    }
                  </Text>
                </View>
              </View>
              <View
                style={styles.columnCenter}
              >
                <Text>
                  18:00
                </Text>
                <Ionicons
                  name="sunny"
                  size={24}
                  color="black"
                />
                <Text
                  style={styles.boldLabel}
                >
                  {
                    `${cityTemp}°`
                  }
                </Text>
                <View
                  style={styles.rowBetween}
                >
                  <Fontisto
                    name="blood-drop"
                    size={10}
                    color="black"
                  />
                  <Text
                    style={styles.marginedElement}
                  >
                    {
                      `${cityHumidity}%`
                    }
                  </Text>
                </View>
              </View>
              <View
                style={styles.columnCenter}
              >
                <Text>
                  19:00
                </Text>
                <Ionicons
                  name="sunny"
                  size={24}
                  color="black"
                />
                <Text
                  style={styles.boldLabel}
                >
                  {
                    `${cityTemp}°`
                  }
                </Text>
                <View
                  style={styles.rowBetween}
                >
                  <Fontisto
                    name="blood-drop"
                    size={10}
                    color="black"
                  />
                  <Text
                    style={styles.marginedElement}
                  >
                    {
                      `${cityHumidity}%`
                    }
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={styles.mainActivityContainerItemMoreBtnWrap}
            >
              <View
                style={styles.mainActivityContainerItemMoreBtn}
              >
                <Button
                  color="rgb(200, 200, 200)"
                  title="Еще"
                />
              </View>
            </View>
          </View>
          <View
            style={styles.mainActivityContainerItem}
          >
            <View
              style={styles.rowBetween}
            >
              <Text>
                Вчера
              </Text>
              <Text>
                {
                  `${cityTemp}°`
                }
              </Text>
            </View>
            <View
              style={styles.rowBetween}
            >
              <Text
                style={styles.boldLabel}
              >
                Сегодня
              </Text>
              <View
                style={styles.rowBetween}
              >
                <Fontisto
                  name="blood-drop"
                  size={24}
                  color="black"
                />
                <Text
                  style={styles.marginedElement}
                >
                  {
                    `${cityHumidity}%`
                  }
                </Text>
              </View>
              <View
                style={styles.rowBetween}
              >
                <Ionicons
                  name="sunny"
                  size={24}
                  color="black"
                />      
                <Ionicons
                  name="moon"
                  size={24}
                  color="black"
                  style={styles.marginedElement}
                />
              </View>
              <Text
                style={styles.boldLabel}
              >
                {
                  `${cityTemp}°`
                }
              </Text>
            </View>
            <View
              style={styles.rowBetween}
            >
              <Text
                style={styles.boldLabel}
              >
                вторник
              </Text>
              <View
                style={styles.rowBetween}
              >
                <Fontisto
                  name="blood-drop"
                  size={24}
                  color="black"
                />
                <Text
                  style={styles.marginedElement}
                >
                  {
                    `${cityHumidity}%`
                  }
                </Text>
              </View>
              <View
                style={styles.rowBetween}
              >
                <Ionicons
                  name="sunny"
                  size={24}
                  color="black"
                />      
                <Ionicons
                  name="moon"
                  size={24}
                  color="black"
                  style={styles.marginedElement}
                />
              </View>
              <Text
                style={styles.boldLabel}
              >
                {
                  `${cityTemp}°`
                }
              </Text>
            </View>
            <View
              style={styles.rowBetween}
            >
              <Text
                style={styles.boldLabel}
              >
                среда
              </Text>
              <View
                style={styles.rowBetween}
              >
                <Fontisto
                  name="blood-drop"
                  size={24}
                  color="black"
                />
                <Text
                  style={styles.marginedElement}
                >
                  {
                    `${cityHumidity}%`
                  }
                </Text>
              </View>
              <View
                style={styles.rowBetween}
              >
                <Ionicons
                  name="sunny"
                  size={24}
                  color="black"
                />      
                <Ionicons
                  name="moon"
                  size={24}
                  color="black"
                  style={styles.marginedElement}
                />
              </View>
              <Text
                style={styles.boldLabel}
              >
                {
                  `${cityTemp}°`
                }
              </Text>
            </View>
            <View
              style={styles.rowBetween}
            >
              <Text
                style={styles.boldLabel}
              >
                четверг
              </Text>
              <View
                style={styles.rowBetween}
              >
                <Fontisto
                  name="blood-drop"
                  size={24}
                  color="black"
                />
                <Text
                  style={styles.marginedElement}
                >
                  {
                    `${cityHumidity}%`
                  }
                </Text>
              </View>
              <View
                style={styles.rowBetween}
              >
                <Ionicons
                  name="sunny"
                  size={24}
                  color="black"
                />      
                <Ionicons
                  name="moon"
                  size={24}
                  color="black"
                  style={styles.marginedElement}
                />
              </View>
              <Text
                style={styles.boldLabel}
              >
                {
                  `${cityTemp}°`
                }
              </Text>
            </View>
            <View
              style={styles.rowBetween}
            >
              <Text
                style={styles.boldLabel}
              >
                пятница
              </Text>
              <View
                style={styles.rowBetween}
              >
                <Fontisto
                  name="blood-drop"
                  size={24}
                  color="black"
                />
                <Text
                  style={styles.marginedElement}
                >
                  {
                    `${cityHumidity}%`
                  }
                </Text>
              </View>
              <View
                style={styles.rowBetween}
              >
                <Ionicons
                  name="sunny"
                  size={24}
                  color="black"
                />      
                <Ionicons
                  name="moon"
                  size={24}
                  color="black"
                  style={styles.marginedElement}
                />
              </View>
              <Text
                style={styles.boldLabel}
              >
                {
                  `${cityTemp}°`
                }
              </Text>
            </View>
            <View
              style={styles.rowBetween}
            >
              <Text
                style={styles.boldLabel}
              >
                суббота
              </Text>
              <View
                style={styles.rowBetween}
              >
                <Fontisto
                  name="blood-drop"
                  size={24}
                  color="black"
                />
                <Text
                  style={styles.marginedElement}
                >
                  {
                    `${cityHumidity}%`
                  }
                </Text>
              </View>
              <View
                style={styles.rowBetween}
              >
                <Ionicons
                  name="sunny"
                  size={24}
                  color="black"
                />      
                <Ionicons
                  name="moon"
                  size={24}
                  color="black"
                  style={styles.marginedElement}
                />
              </View>
              <Text
                style={styles.boldLabel}
              >
                {
                  `${cityTemp}°`
                }
              </Text>
            </View>
            <View
              style={styles.rowBetween}
            >
              <Text
                style={styles.boldLabel}
              >
                воскресенье
              </Text>
              <View
                style={styles.rowBetween}
              >
                <Fontisto
                  name="blood-drop"
                  size={24}
                  color="black"
                />
                <Text
                  style={styles.marginedElement}
                >
                  {
                    `${cityHumidity}%`
                  }
                </Text>
              </View>
              <View
                style={styles.rowBetween}
              >
                <Ionicons
                  name="sunny"
                  size={24}
                  color="black"
                />      
                <Ionicons
                  name="moon"
                  size={24}
                  color="black"
                  style={styles.marginedElement}
                />
              </View>
              <Text
                style={styles.boldLabel}
              >
                {
                  `${cityTemp}°`
                }
              </Text>
            </View>
            <View
              style={styles.mainActivityContainerItemMoreBtnWrap}
            >
              <View
                style={styles.mainActivityContainerItemMoreBtn}
              >
                <Button
                  color="rgb(200, 200, 200)"
                  title="Еще"
                />
              </View>
            </View>
          </View>
          <View
            style={styles.mainActivityContainerItem}
          >
            <View
              style={styles.mapContainer}
            >
              <MapView
                style={styles.map}
              />
            </View>
            <View
              style={styles.mainActivityContainerItemMoreBtnWrap}
            >
              <View
                style={styles.mainActivityContainerItemMoreBtn}
              >
                <Button
                  color="rgb(200, 200, 200)"
                  title="Еще"
                />
              </View>
            </View>
          </View>
          <View
            style={styles.mainActivityContainerItem}
          >
            <View
              style={styles.rowCenter}
            >
              <Ionicons
                name="sunny"
                size={24}
                color="black"
              />    
              <View
                style={styles.columnCenter}
              >
                <View
                  style={[
                    styles.rowBetween,
                    styles.marginedElement,
                    styles.mainActivityContainerDetails,
                  ]}
                >
                  <Text>
                    УФ-индекс
                  </Text>
                  <Text
                    style={styles.boldLabel}
                  >
                    {
                      `${cityUvi}`
                    }
                  </Text>
                </View>
                <View
                  style={styles.hairlineWidth}
                ></View>
              </View>
            </View>
            <View
              style={styles.rowCenter}
            >
              <Ionicons
                name="sunny"
                size={24}
                color="black"
              />    
              <View
                style={styles.columnCenter}
              >
                <View
                  style={[
                    styles.rowBetween,
                    styles.marginedElement,
                    styles.mainActivityContainerDetails,
                  ]}
                >
                  <Text>
                    Восход
                  </Text>
                  <Text
                    style={styles.boldLabel}
                  >
                    {
                      getCitySunRise()
                    }
                  </Text>
                </View>
                <View
                  style={styles.hairlineWidth}
                ></View>
              </View>
            </View>
            <View
              style={styles.rowCenter}
            >
              <Ionicons
                name="sunny"
                size={24}
                color="black"
              />    
              <View
                style={styles.columnCenter}
              >
                <View
                  style={[
                    styles.rowBetween,
                    styles.marginedElement,
                    styles.mainActivityContainerDetails,
                  ]}
                >
                  <Text>
                    Закат
                  </Text>
                  <Text
                    style={styles.boldLabel}
                  >
                    {
                      getCitySunSet()
                    }
                  </Text>
                </View>
                <View
                  style={styles.hairlineWidth}
                ></View>
              </View>
            </View>
            <View
              style={styles.rowCenter}
            >
              <Ionicons
                name="sunny"
                size={24}
                color="black"
              />    
              <View
                style={styles.columnCenter}
              >
                <View
                  style={[
                    styles.rowBetween,
                    styles.marginedElement,
                    styles.mainActivityContainerDetails,
                  ]}
                >
                  <Text>
                    Ветер
                  </Text>
                  <Text
                    style={styles.boldLabel}
                  >
                    {
                      `${cityWindSpeed} км/ч`
                    }
                  </Text>
                </View>
                <View
                  style={styles.hairlineWidth}
                ></View>
              </View>
            </View>
            <View
              style={styles.rowCenter}
            >
              <Ionicons
                name="sunny"
                size={24}
                color="black"
              />    
              <View
                style={styles.columnCenter}
              >
                <View
                  style={[
                    styles.rowBetween,
                    styles.marginedElement,
                    styles.mainActivityContainerDetails,
                  ]}
                >
                  <Text>
                    AQI
                  </Text>
                  <Text
                    style={styles.boldLabel}
                  >
                    {
                      `${cityAqi}`
                    }
                  </Text>
                </View>
                <View
                  style={styles.hairlineWidth}
                ></View>
              </View>
            </View>
            <View
              style={styles.rowCenter}
            >
              <Ionicons
                name="sunny"
                size={24}
                color="black"
              />    
              <View
                style={styles.columnCenter}
              >
                <View
                  style={[
                    styles.rowBetween,
                    styles.marginedElement,
                    styles.mainActivityContainerDetails,
                  ]}
                >
                  <Text>
                    Влажность
                  </Text>
                  <Text
                    style={styles.boldLabel}
                  >
                    {
                      cityHumidity
                    }%
                  </Text>
                </View>
                <View
                  style={styles.hairlineWidth}
                ></View>
              </View>
            </View>
          </View>
          <View
            style={styles.mainActivityContainerItem}
          >
            <View
              style={styles.rowCenter}
            >
              <FontAwesome
                name="car"
                size={24}
                color="black"
              />    
              <View
                style={styles.columnCenter}
              >
                <View
                  style={[
                    styles.rowBetween,
                    styles.marginedElement,
                    styles.mainActivityContainerDetails,
                  ]}
                >
                  <Text>
                    {
                      'Сложность дорожных\nусловий'
                    }
                  </Text>
                  <Text
                    style={styles.boldLabel}
                  >
                    нет
                  </Text>
                </View>
                <View
                  style={styles.hairlineWidth}
                ></View>
              </View>
            </View>
            <View
              style={styles.rowCenter}
            >
              <Entypo
                name="flower"
                size={24}
                color="black"
              />    
              <View
                style={styles.columnCenter}
              >
                <View
                  style={[
                    styles.rowBetween,
                    styles.marginedElement,
                    styles.mainActivityContainerDetails,
                  ]}
                >
                  <Text>
                    Пыльца
                  </Text>
                  <Text
                    style={styles.boldLabel}
                  >
                    Нет
                  </Text>
                </View>
                <View
                  style={styles.hairlineWidth}
                ></View>
              </View>
            </View>
            <View
              style={styles.rowCenter}
            >
              <MaterialCommunityIcons 
                name="shoe-formal"
                size={24}
                color="black"
              />    
              <View
                style={styles.columnCenter}
              >
                <View
                  style={[
                    styles.rowBetween,
                    styles.marginedElement,
                    styles.mainActivityContainerDetails,
                  ]}
                >
                  <Text>
                    Пробежка
                  </Text>
                  <Text
                    style={styles.boldLabel}
                  >
                    Хорошо
                  </Text>
                </View>
                <View
                  style={styles.hairlineWidth}
                ></View>
              </View>
            </View>
          </View>
        </ScrollView>
      </DrawerLayoutAndroid>
    </>
  )
}

const styles = StyleSheet.create({
  mainActivityContainer: {

  },
  mainActivityContainerItem: {
    padding: 25,
    backgroundColor: 'rgb(255, 255, 255)',
    display: 'flex',
    flexDirection: 'column',
    margin: 15
  },
  mainActivityContainerItemMoreBtnWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15
  },
  mainActivityContainerItemMoreBtn: {
    width: 125
  },
  mainActivityContainerDetails: {
    width: 300
  },
  rowEnd: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  rowBetween: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  window: {
    padding: 25
  },
  marginedElement: {
    marginLeft: 25
  },
  rowCenter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  mapContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: Dimensions.get('window').width / 100 * 80,
    height: 200
  },
  map: {
    width: Dimensions.get('window').width / 100 * 75,
    height: '100%'
  },
  columnCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  boldLabel: {
    fontWeight: '700'
  }
})
