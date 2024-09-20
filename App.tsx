import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import SearchScreen from './app/screen/SearchScreen';
import SettingsScreen from './app/screen/SettingsScreen';
import CategoriesScreen from './app/screen/CategoriesScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Homenavigator from './app/NavigatorComponent/HomeNavigator';
import { init } from './app/service/category';
import {openDatabaseAsync, openDatabaseSync, SQLiteDatabase, SQLiteProvider, useSQLiteContext} from 'expo-sqlite';
import {drizzle} from "drizzle-orm/expo-sqlite";
import {createContext} from "react";
import {migrate, useMigrations} from "drizzle-orm/expo-sqlite/migrator";
import migrations from "./drizzle/migrations";
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import DrizzleProvider from './app/context/DrizzleContext';
init()
const Tab=createBottomTabNavigator()
const fadeColor="rgba(0,0,0,0.4)"
const stn_size=20
const big_size=22
const screens=[
  //{
//  name:"Home",
//  component:Homenavigator,
//  icon:({focused}:{focused:boolean})=><AntDesign name="home" 
//  size={focused ? big_size : stn_size} color={focused ? "black" : fadeColor} />
// },
// {
//   name:"List",
//   component:CategoriesScreen,
//   icon:({focused})=><Feather name="list" size={focused ? stn_size : stn_size}
//   color={focused ? "black" : fadeColor}
//   />
// },
{
  name:"Search",
  component:SearchScreen,
  icon:({focused})=><AntDesign name="search1" size={focused ? big_size : stn_size}
  color={focused ? "black" : fadeColor}
  />
},
{
  name:"Settings",
  component:SettingsScreen,
  icon:({focused})=><Feather name="settings" size={focused ? big_size : stn_size} 
  color={focused ? "black" : fadeColor}
  />
}
]

export const GlobalAppContext=createContext(null)


export default function App() {
  // useDrizzleStudio(expo)
  
  //  const {success,error}=useMigrations(db,migrations)


  //   if(error){
  //       return (
  //           <Text>Migration failed</Text>
  //       )
  //   }
  
  return (
   //   <DrizzleProvider>
        <NavigationContainer>
          <View  style={styles.container}>
          <Tab.Navigator

          screenOptions={{
            headerShown:false,
            tabBarStyle:{
              paddingTop:7,
              height:68,
              elevation:1
            },
          }}
          >
           {screens.map((item,id)=><Tab.Screen 
           options={
            {
              tabBarIcon:item.icon,
              tabBarItemStyle:{
                padding:0,
              },
              tabBarLabel:({focused})=>(
                <Text style={{
                  color:focused ? "black" : "rgba(0,0,0,0.4)",
                  paddingBottom:10,
                  fontSize:focused ? 14 : 13,
                  fontWeight:'semibold'
                }}>{item.name}</Text>
              ),
            }
           }
          component={item.component}
        name={item.name}
        key={id}
          />
      
           )}
            </Tab.Navigator>
            </View>
        </NavigationContainer>
 //     </DrizzleProvider>
        /*<View style={styles.container}>
          <SearchScreen />
      <StatusBar style="auto" />
  </View> */
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:20,
    padding:2,
    backgroundColor: '#fff',
  },
});
