import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const API_KEY = "e1373c69ca6dc77ac7692ffc2240d3f7";
const API_URL = `http://api.openweathermap.org/data/2.5/weather?q=&units=metric&APPID=`;

export default function App() {

  const [location, setLocation] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const getWeatherFromApi = () => {
    setLoading(true)
    return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=${API_KEY}`)
      .then(response => response.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    getWeatherFromApi();
  }, [location])


  return (
    <View style={styles.container}>
      {/* {console.log(data)} */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Enter Location"
          onSubmitEditing={(value) => setLocation(value.nativeEvent.text)}
          maxLength={20}
          minLength={2}
        />
      </View>
      {!data.length > 0 ?

        (<Text> Welcome </Text>)

        : (
          <View >
            {console.log(data)}
            <Text style={styles.heading}>Today Weather</Text>
            <Text style={styles.country}>{data.name},</Text>
            <Text style={styles.temp}>{data.main.temp}33°C</Text>
          </View>
        )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 80,
    padding: 30,
    backgroundColor: 'skyblue',

  },
  form: {
    alignItems: 'center',
    marginBottom: 60,
  },
  input: {
    borderColor: "gray",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    color: 'gray',
  },
  heading: {
    fontSize: 32,
    fontWeight: 100,
    marginBottom: 20,
    color: 'white',
  },
  country: {
    fontSize: 22,
    marginBottom: 20,
    color: 'white',
  },
  temp: {
    fontSize: 88,
    color: 'white',
  },
});
