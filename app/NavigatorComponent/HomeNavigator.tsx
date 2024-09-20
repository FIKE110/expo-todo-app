import { createStackNavigator } from "@react-navigation/stack"
import HomeScreen from "../screen/HomeScreen"
import EditTaskScreen from "../screen/EditTaskScreen"
import NewTaskScreen from "../screen/NewTaskScreen"

const Stack=createStackNavigator()
const homeScreens=[
    {name:'home',component:HomeScreen},
    {name:"create-task",component:NewTaskScreen},
    {name:"edit-task",component:EditTaskScreen}
]


const Homenavigator = () => {
  return (
    <Stack.Navigator initialRouteName="home"
    screenOptions={{headerShown:false}}
  
    >
        {
            homeScreens.map((item,id)=><Stack.Screen name={item.name} key={id}
            component={item.component}
            />)
        }
    </Stack.Navigator>    
  )
}

export default Homenavigator