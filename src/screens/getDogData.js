import React, {Component, useContext, useState} from 'react';
import {
  View,
  Button,
  Thumbnail,
  Text,
  Icon,
  Left,
  Right,
  Label,
  Item,
  Input,
  Picker,
  Toast,
} from 'native-base';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
// import ImagePicker from 'react-native-image-crop-picker';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  NativeModules,
  SafeAreaView,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Autocomplete from 'react-native-autocomplete-input';
import {TouchableHighlight, ScrollView} from 'react-native-gesture-handler';
var ImagePicker = NativeModules.ImageCropPicker;
import {SharedData} from '../../SharedData';
import { connect } from 'react-redux';
class PetData extends Component {
state={
  image:'',
  images:'',
  specie:'Dog',
  petname:'',
  gender:'Male',
  dob:'',
  breed:'',
  petProfile:'',

}

  
  
   pickSingleWithCamera = (cropping, mediaType = 'photo') => {
    ImagePicker.openCamera({
      cropping: cropping,
      width: 500,
      height: 500,
      includeExif: true,
      mediaType,
    })
      .then(image => {
        console.log('received image', image);

        let file = {
          uri: image.path,
          width: image.width,
          height: image.height,
          mime: image.mime,
        };
       
this.setState({
  image:file,
  images:null
})

      })
      .catch(e => alert(e));
  };

  pickSingleBase64 = cropit => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: cropit,
      includeBase64: true,
      includeExif: true,
    })
      .then(image => {
        console.log('received base64 image');
        let file = {
          uri: `data:${image.mime};base64,` + image.data,
          width: image.width,
          height: image.height,
        };
        this.setState({
          image:file,
          images:null
        })
      })
      .catch(e => alert(e));
  };

  cleanupImages = () => {
    ImagePicker.clean()
      .then(() => {
        console.log('removed tmp images from tmp directory');
      })
      .catch(e => {
        alert(e);
      });
  };

 pickSingle = (cropit, circular = false, mediaType) => {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: cropit,
      cropperCircleOverlay: circular,
      sortOrder: 'none',
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 1,
      compressVideoPreset: 'MediumQuality',
      includeExif: true,
    })
      .then(image => {
        // var newPostKey = database().ref().child('images').push().key;
        const reference = storage()
          .ref('/petImages/' + image.modificationDate)
          .putFile(image.path);
        reference.on(
          'state_changed',
          function(snapshot) {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
          },
          function(error) {
            // Handle unsuccessful uploads
          },
          async () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            const url = await storage()
              .ref('/petImages/' + image.modificationDate)
              .getDownloadURL();
            // setpetProfile(url);
            this.setState({
              petProfile:url
            })
            console.log('success');
          },
        );
        let file = {
          uri: image.path,
          width: image.width,
          height: image.height,
          mime: image.mime,
        };
        this.setState({
          image:file,
          images:null
        })
      })
      .catch(e => {
        console.log(e);
        Alert.alert(e.message ? e.message : e);
      });
  };

 renderImage = image => {
    return (
      <Image
        style={{width: 120, height: 120, resizeMode: 'contain'}}
        source={image}
      />
    );
  };
  renderAsset = image => {
    if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
      return this.renderVideo(image);
    }

    return this.renderImage(image);
  };
 createPet = () => {
   const {petProfile,gender,breed,dob,petname,specie}=this.state
    if (petProfile && gender && breed && dob && petname && specie != null) {
     console.log(this.props.user.uid  )
     const uid =this.props.user.uid
      var newPostKey = database()
        .ref()
        .child('posts')
        .push().key;

      database()
        .ref('/pets/' + newPostKey)
        .set(
          {
            petProfile: petProfile,
            gender: gender,
            breed: breed,
            dob: dob,
            specie: specie,
            petname: petname,
            ownerid: uid,
            id:newPostKey
          },
          function(error) {
            if (error) {
              // The write failed...
              console.log(error);
              Toast.show({
                text: 'something went wrong!',
                type: 'danger',
                duration: 2000,
                position: 'top',
              });
            } else {
              // Data saved successfully!
              var updateuser = firestore()
                .collection('users')
                .doc(uid);
              updateuser.update({
                pets: firestore.FieldValue.arrayUnion(newPostKey),
              });
              Toast.show({
                text: 'data updated successfully ',
                type: 'success',
                duration: 2000,
                position: 'bottom',
              });
            }
          },
        );
    } else {
      console.log(petProfile, gender, dob, specie, breed, petname);
      Toast.show({
        text: 'please fillup all fields!',
        type: 'warning',

        duration: 2000,
      });
    }
  };
render(){
  const {petProfile,gender,breed,dob,petname,specie}=this.state
  return (
    <View>
      <ScrollView>
        <View>
          <View style={{alignSelf: 'center', marginTop: 30, marginBottom: 30}}>
            <TouchableOpacity onPress={() => this.pickSingle(true)}>
              <View style={style.ThumbnailContainer}>
                {this.state.image ? (
                  this.renderAsset(this.state.image)
                ) : (
                  <Image
                    style={{height: 100, width: 100}}
                    source={require('../assets/dog.png')}
                  />
                )}
                <View style={style.editicon}>
                  <Icon type="MaterialIcons" name="edit" />
                </View>
                <Image />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{padding: 5}}>
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{width: undefined}}
                placeholder="Select your SIM"
                placeholderStyle={{color: '#bfc6ea'}}
                placeholderIconColor="#007aff"
                selectedValue={specie}
                onValueChange={value =>this.setState({specie:value})}>
                <Picker.Item label="Dog" value="Dog" />
                <Picker.Item label="Cat" value="Cat" />
              </Picker>
            </Item>
            <Item floatingLabel style={{padding: 5, margin: 5}}>
              <Label>Petname</Label>
              <Input
                value={petname}
                onChangeText={value => this.setState({petname:value})}
              />
            </Item>
            <Item floatingLabel style={{padding: 5}}>
              <Label>Date of Birth</Label>
              <Input value={dob} onChangeText={value => this.setState({dob:value})} />
            </Item>
            <Item picker style={{padding: 5}}>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{width: undefined}}
                placeholder="Sex"
                placeholderStyle={{color: '#bfc6ea'}}
                placeholderIconColor="#007aff"
                selectedValue={gender}
                onValueChange={value => this.setState({gender:value})}>
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="Female" />
              </Picker>
            </Item>
            <Item picker style={{padding: 5}}>
              <Picker
                mode="dialog"
                iosIcon={<Icon name="arrow-down" />}
                style={{width: undefined}}
                placeholder="breed"
                placeholderStyle={{color: '#bfc6ea'}}
                placeholderIconColor="#007aff"
                selectedValue={breed}
                onValueChange={value => this.setState({breed:value})}>
                {SharedData.dogs.map((item, i) => {
                  return <Picker.Item label={item} key={i} value={item} />;
                })}
              </Picker>
            </Item>
          </View>
          <Button onPress={() => this.createPet()}>
            <Text>Add</Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}
}

const mapStateToProps = store => {
  return {
    user: store.authReducer.user,
    userPetDetails:store.petreducer.userPetDetails
  };
};
export const GetpetData= connect(mapStateToProps)(PetData)

const size = 120;
const style = StyleSheet.create({
  ThumbnailContainer: {
    borderColor: 'grey',
    borderWidth: 4,
    width: size,
    borderRadius: size / 2,
    height: size,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editicon: {
    position: 'absolute',
    right: 3,
    bottom: 5,
    backgroundColor: 'white',
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
  autocomplete: {},
});
