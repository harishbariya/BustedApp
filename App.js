import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from 'react-navigation';
import prog1 from './pages/prog1';
import login_pg from './pages/login_pg';

export default class App extends Component{
render()
{


  return (
   <Mypages/>
  );
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Mypages=new createDrawerNavigator({
  login_pg:{screen: login_pg}, 
  prog1:{screen: prog1},
  
})