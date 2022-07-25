import React,{Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,Alert,
  Text,
  TouchableOpacity,
  StatusBar,
  Animated,
  Easing,
  Button
} from 'react-native';
import RNMlKit from 'react-native-firebase-mlkit';
import GetLocation from 'react-native-get-location';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { RNCamera, FaceDetector } from 'react-native-camera';
//import * as firebase from 'react-native-firebase';

import LottieView from 'lottie-react-native';
import * as firebase from 'firebase';
import Voice from 'react-native-voice';
var firebaseConfig = {
  apiKey: "AIzaSyAI9sBI-38epr0pRN6sFKuWfU5E-KYgw0Q",
  authDomain: "openalpr-511fe.firebaseapp.com",
  databaseURL: "https://openalpr-511fe.firebaseio.com",
  projectId: "openalpr-511fe",
  storageBucket: "openalpr-511fe.appspot.com",
  messagingSenderId: "108398453244",
  appId: "1:108398453244:web:70691a60445a14a5c15279",
  measurementId: "G-VZ0XK5RZTQ"
};
// Initialize Firebase
  
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
var i='';
export default class prog1 extends Component 
{
  
  componentDidMount()
  {
    Voice.start('en-US');
    Animated.timing(this.state.progress, {
      toValue: 10,
      easing: Easing.linear,

    }).start();
    
    Voice.onSpeechResults=(res)=>
   {
     //alert(JSON.stringify(res.value[0]));
     var i = JSON.stringify(res.value[0]);
     i=i.split('"').join('');
     
     var st=i.includes("catch")|| i.includes("sketch");
     alert(i);
    
     if(!st || i===null || i==="")
    {
      alert('again');
      Voice.start();
     
    }
    else
    {
      //alert('mil gaya');
      //Voice.destroy();
      
      this.setState({tmp:1});
      this.takePicture();
         
    }

   }
   
  }
  get= async()=>{
   
  }
   speak=async()=>
  {
    
    Voice.start('en-US');
    Animated.timing(this.state.progress, {
      toValue: 10,
      duration:50000,
      easing: Easing.linear,

    }).start();
    
    Voice.onSpeechResults=(res)=>
   {
     //alert(JSON.stringify(res.value[0]));
     i = JSON.stringify(res.value[0]);
     i=i.split('"').join('');
     
     var st=i.includes("catch")|| i.includes("sketch");
     //alert(i);
    
     if(!st || i===null || i==="")
    {
      Voice.start();
      
    }
    else
    {
      //alert('mil gaya');
      //Voice.destroy();
      
      this.setState({tmp:1});
      this.takePicture();
         
    }

   }
  }
  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
      recognized: '',
      started: '',
      results: [],
      tmp:0,
    };

  }
  render()
  {
// if(this.state.tmp===0)
// {
return (
  <View style={styles.container}>
  <RNCamera
    ref={ref => {
      this.camera = ref;
    }}
    style={styles.preview}
    type={RNCamera.Constants.Type.back}
    flashMode={RNCamera.Constants.FlashMode.off}
    androidCameraPermissionOptions={{
      title: 'Permission to use camera',
      message: 'We need your permission to use your camera',
      buttonPositive: 'Ok',
      buttonNegative: 'Cancel',
    }}
    androidRecordAudioPermissionOptions={{
      title: 'Permission to use audio recording',
      message: 'We need your permission to use your audio',
      buttonPositive: 'Ok',
      buttonNegative: 'Cancel',
    }}
    onGoogleVisionBarcodesDetected={({ barcodes }) => {
      console.log(barcodes);
    }}
  />
  <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
    <TouchableOpacity onPress={this.speak} style={styles.capture}>
      <Text style={{ fontSize: 14 }}> SNAP </Text>
    </TouchableOpacity>
  
  </View>
  
  <View style={{flex:1,backgroundColor:"black"}} >
  
      <LottieView source={require('../animation/630-voice.json')}  progress={this.state.progress} autoPlay loop></LottieView>
      
  </View>
</View>
);
//   }else{ return (
//     <View style={styles.container}>
//     <RNCamera
//       ref={ref => {
//         this.camera = ref;
//       }}
//       style={styles.preview}
//       type={RNCamera.Constants.Type.back}
//       flashMode={RNCamera.Constants.FlashMode.off}
//       androidCameraPermissionOptions={{
//         title: 'Permission to use camera',
//         message: 'We need your permission to use your camera',
//         buttonPositive: 'Ok',
//         buttonNegative: 'Cancel',
//       }}
//       androidRecordAudioPermissionOptions={{
//         title: 'Permission to use audio recording',
//         message: 'We need your permission to use your audio',
//         buttonPositive: 'Ok',
//         buttonNegative: 'Cancel',
//       }}
//       onGoogleVisionBarcodesDetected={({ barcodes }) => {
//         console.log(barcodes);
//       }}
//     />
//     <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
//       <TouchableOpacity onPress={this.speak} style={styles.capture} >
//       <Text>SNAP
//       </Text>
//       </TouchableOpacity>
    
//     </View>
    
//   </View>
//   );
// }


}

 takePicture = async() => {
  if (this.camera) {
   
    const options = { quality: 0.5, base64: true };
    const data = await this.camera.takePictureAsync(options);
    console.log(data.uri);
    var secret_key = "sk_9b1246b04cb83931bb3950d6";
    var url = "https://api.openalpr.com/v2/recognize_bytes?recognize_vehicle=1&country=in&secret_key="+secret_key;
    var xhr = new XMLHttpRequest;
      xhr.open("POST", url);
      xhr.setRequestHeader( "Content-Type", "multipart/form-data");

      // Send POST data and display response
      xhr.send(data.base64);  // Replace with base64 string of an actual image
      xhr.onreadystatechange = async function() {
          if (xhr.readyState == 4) {
              // document.getElementById("response").innerHTML = xhr.responseText;
              
            //  console.log(xhr.responseText);
              // let rec=xhr.responseText;

              var obj = JSON.parse(xhr.responseText);

             // alert(obj.results[0].plate);
              
              console.log(obj);
              //console.log(obj.results[0].candidates[0].plate);
              alert(obj.results[0].candidates[0].plate);
              let lati=null;
              let long=null;
              
            await GetLocation.getCurrentPosition({
                enableHighAccuracy: true,
                timeout: 15000,
            })
            .then(location => {
                console.log(location);
               lati= location.latitude;
               long = location.longitude;
            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            })
              console.log(obj);

    
              var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
      
      //Setting the value of the date time
     var fulldate = date + '/' + month + '/' + year ;
     var time = hours + ':' + min + ':' + sec;
    console.log(lati);
    console.log(long);
    let location=null;
    
    await fetch(`https://developers.zomato.com/api/v2.1/geocode?lat=`+lati+`&`+`lon=`+long, {method: 'GET',
     headers: {
               'Accept': 'application/json',
               "user-key": "2f9c4c3df18b580b1b257a48f23d4155"
           }})
       .then((response) => response.json())
       .then((responseJson) => {

           Alert.alert(responseJson["location"].title+" , "+responseJson['location'].city_name+" , "+responseJson['location'].country_name);
           console.log(responseJson);
           console.log("subzone "+responseJson["popularity"].subzone);
           location=responseJson["location"].title+" ,"+responseJson['location'].city_name+" ,"+responseJson['location'].country_name;

       })
       .catch((error) => {
           console.error(error);
       });     
    
     firebase.database().ref('numberplate/'+obj.results[0].candidates[0].plate ).set({
                  latitude:lati,
                  longitude:long,
                  location:location,
                time:time,
                  date:fulldate,
                 
                });
            
             
          }else{
           //Alert.alert("Error");
          }
      }
  }
     
  }
detectText = async () => {
  try {
    const options = {
      quality: 0.8,
      base64: true,
      skipProcessing: true,
    };
    const { uri } = await this.camera.takePictureAsync(options);
    
  } catch (e) {
    console.warn(e);
  }
 };

}



const styles = StyleSheet.create({
container: {
flex: 1,
flexDirection: 'column',
backgroundColor: 'black',
},
preview: {
flex: 1,
backgroundColor: 'white',
justifyContent: 'flex-end',
alignItems: 'center',
},
capture: {
flex: 0,
backgroundColor: '#fff',
borderRadius: 5,
padding: 15,
paddingHorizontal: 20,
alignSelf: 'center',
margin: 20,
},

});