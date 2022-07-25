import React from 'react';
import { ApplicationProvider,  Radio, RadioGroup, Button,Layout,Input, Text } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';

import {
  StyleSheet, ScrollView,
  View,
} from 'react-native';




class HomeScreen extends React.Component
{

  
 

  render()
  {
    return(
      <Layout style={{flex: 1, justifyContent: 'center',alignItems: 'center'}}>
   <Input
      size='small'
      label='Your Name'
      style={styles.input}
      placeholder='Your Name'
      status='basic'
    />
    <Input
     size='small'
      style={styles.input}
      label='Email'
      placeholder='john.doe@example.com'
      status='basic'
    />
    
    <Input
      label='Phone'
     size='small'
      style={styles.input}
      placeholder='Phone Number'
      keyboardType="number-pad"
      status='basic'
    />
    <Input
      label='Password'
     size='small'
      style={styles.input}
      placeholder='Password'
      status='basic'
    />
      
    <Layout style={{alignSelf:"stretch",margin:8}}>
    <Button style={styles.button} status='success'>Login</Button>
    <Button style={styles.button} appearance='outline'  status='info'>Login With FaceBook</Button>
    <Button style={styles.button} appearance='outline' status='danger'>Login With Google</Button>
    </Layout>
  </Layout>

    );
  }
}


class App extends React.Component
{
  render()
  {
    return(
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
       <ScrollView style={styles.scrollView}>
      <HomeScreen />
      </ScrollView>
    </ApplicationProvider>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  input: {
    margin:5,
    padding:0,
    marginEnd:20,
    marginStart:20,
    borderBottomColor:"#718093",
  },
  controlContainer: {
    borderRadius: 4,
    margin: 8,
    backgroundColor: '#3366FF',

  },
  button: {
    margin: 8,
    padding:100,
    fontSize:20

  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin:8,
    alignItems:"flex-start",
    alignSelf:"flex-start",
    alignContent:"flex-start",
    marginRight:8
  },
  radio: {
    marginVertical: 8,
    alignContent:"flex-start"
  },
  scrollView: {
  },
});