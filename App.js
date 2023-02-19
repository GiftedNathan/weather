import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, SafeAreaView, ImageBackground, } from 'react-native';

const bgImage = { uri: "./assets/images/blue-sky.jpg" };

const API_KEY = "e1373c69ca6dc77ac7692ffc2240d3f7";
// const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

export default function App() {

  const [location, setLocation] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState('');

  const API_URL = `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=${API_KEY}`;

  const getWeatherFromApi = () => {

    setisLoading(true);

    fetch(API_URL)
      .then(response => {
        if (!response.ok) {
          setError(response.statusText);
          setisLoading(false);
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        // Handle the successful response here
        // console.log(data);
        setData(data);
        setLocation('');
        setisLoading(false);
      })
      .catch(error => {
        // Handle the error here
        if (error.message === 'Failed to fetch') {
          console.log('Please check your internet connection');
          setError('Please check your internet connection');
          setisLoading(false);
        } else {
          console.log(error.message);
          setError(error.message);
          setisLoading(false);
        }
      });

    setError('');

  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('./assets/images/blue-sky.jpg')} style={styles.containerImagae}>
        {/* {console.log(data)} */}
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            value={location}
            placeholder="Enter Location"
            onChange={(event) => setLocation(event.nativeEvent.text)}
            // onSubmitEditing={(value) => setLocation(value.nativeEvent.text)}
            onSubmitEditing={getWeatherFromApi}
            maxLength={20}
            minLength={2}
          />
        </View>

        <Text style={styles.heading}>{data.name == undefined ? 'Welcome!' : "Today's Weather"}</Text>
        {error && <Text style={styles.footerTitle}> {"Oops: " + error}</Text>}
        {isLoading && <Text style={styles.footerTitle}> {"Loading..."}</Text>}

        {!error &&
          <View style={styles.weatherInfo}>


            {data.name !== undefined &&
              <View style={styles.tempContainer}>
                <Text style={styles.country}>{data.name}{data.sys ? ', ' + data.sys.country : null}</Text>
                <Text style={styles.temp}>{data.main ? data.main.temp.toFixed() + '°C' : null}</Text>
              </View>
            }

            {data.name !== undefined &&
              <View style={styles.descContainer}>
                <Text style={styles.desc}>{data.weather ? 'It is ' + data.weather[0].description + ' here in ' + data.name + ' at the moment with a minimum temprature of ' + data.main.temp_min.toFixed() + '°C and a maximun temptrature of ' + data.main.temp_max.toFixed() + '°C for today.' : null}</Text>
              </View>
            }

            {data.name !== undefined &&
              <View style={styles.footer}>

                <View style={styles.footerItem}>
                  <Text style={styles.footerText}>{data.main ? data.visibility / 1000 + 'm' : null}</Text>
                  <Text style={styles.footerTitle}>Visibility</Text>
                </View>

                <View style={styles.footerItem}>
                  <Text style={styles.footerText}>{data.main ? data.main.humidity + '%' : null}</Text>
                  <Text style={styles.footerTitle}>Humidity</Text>
                </View>

                <View style={styles.footerItem}>
                  <Text style={styles.footerText}>{data.wind ? data.wind.speed.toFixed() + 'MPH' : null}</Text>
                  <Text style={styles.footerTitle}>Wind Speed</Text>
                </View>
              </View>
            }
          </View>
        }
      </ImageBackground>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100vh',

  },
  containerImagae: {
    flex: 1,
    resizeMode: 'cover',
    // justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    paddingTop: 80,
    padding: 20,
    opacity: 1,
    backgroundColor: 'black',
    position: 'relative',
  },
  form: {
    alignItems: 'center',
    marginBottom: 60,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    color: 'white',
    backgroundColor: 'black',
    opacity: 0.6,
    fontSize: 16,
    fontWeight: 400,
  },

  weatherInfo: {
    flex: 1,
    position: 'relative'
  },
  heading: {
    fontSize: 36,
    fontWeight: 700,
    marginBottom: 20,
    color: 'white',
  },
  country: {
    fontSize: 42,
    textAlign: 'center',
    marginBottom: 20,
    color: 'white',
  },
  temp: {
    fontSize: 88,
    textAlign: 'center',
    fontWeight: 500,
    color: 'white',
  },

  descContainer: {
    justifyContent: 'flex-start',
    marginTop: 30,
  },
  desc: {
    fontSize: 18,
    color: 'white',
  },

  footer: {
    position: 'absolute',
    bottom: 40,
    left: '50%',
    translate: '-50%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: 'black',
    opacity: 0.6,
    borderRadius: 10,
  },
  footerItem: {
    display: 'flex',
    justifyContent: 'space evenly',
    alignItems: 'center',
    margin: 5,
  },
  footerText: {
    fontSize: 16,
    color: 'white',
  },
  footerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },

});