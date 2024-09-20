import { View, Text ,StyleSheet, Pressable} from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { SearchBarAndroid } from '@rneui/base/dist/SearchBar/SearchBar-android';


const big_font=23
const sm_font=18

const SearchScreen = ({navigation}) => {
  return (
    <View style={styles.main}>
      <Header navigation={navigation}/>
      <SearchBarAndroid style={{backgroundColor:'#F2F1F4',
      fontSize:18,
      
      }}
      containerStyle={{
        backgroundColor:"#F2F1F4",
        padding:10,
        marginVertical:20,
        borderRadius:14
      }}

      placeholder='Search'
      placeholderTextColor="rgba(0,0,0,0.4)"
      />
      <View style={{gap:30,paddingVertical:10}}>
        <ReviewedRecently />
        <Tasks />
      </View>
    </View>
  )
}


function Header({navigation}){
    return(
    <View style={styles.header}>
      <Pressable style={{position:'absolute',right:0}}
      onPress={()=>navigation.goBack() }
      >
         <AntDesign name="close" size={24} color="black"/>
      </Pressable>
      <Text style={{fontSize:21,fontWeight:'bold'}}>Search</Text>
    </View>
    )
  }

function ReviewedRecently(){
    return(
        <View>
            <Text style={{fontSize:big_font,fontWeight:'bold'}}>Recently Viewed</Text>
            <SearchItem />
            <SearchItem />
            <SearchItem />
        </View>
    )
}

function Tasks(){
    return(
        <View>
            <Text style={{fontSize:big_font,fontWeight:'bold'}}>Tasks</Text>
            <SearchItem />
            <SearchItem />
            <SearchItem />
        </View>
    )
}

function SearchItem(){
    return(
        <View style={{flexDirection:"row",justifyContent:'space-between',
            paddingVertical:20
        }}>
            <Text style={{
                fontSize:sm_font,
                fontWeight:"semibold"
            }}>Submit Expenses</Text>
            <Text
            style={{
                fontSize:18,
                opacity:30
            }}
            >Today</Text>
        </View>
    )
}

const styles=StyleSheet.create({
    main:{
        flex:1,
        paddingTop:50,
        padding:20,
          backgroundColor:'white',
    },
    header:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginBottom:13
      }
})

export default SearchScreen