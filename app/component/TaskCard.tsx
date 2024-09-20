import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import Checkbox from "expo-checkbox";
import { useState } from "react";
import { Modal } from "react-native";


export default function TaskCard(){
    const [isChecked,setChecked] = useState(false)

    return(
        <View style={style.card}>
            <Checkbox 
            color='#6C63FF'
            value={isChecked} onValueChange={setChecked}/>
            <Text
            numberOfLines={1}
            style={[style.text,isChecked ? style.textChecked : null]}>
            all is well </Text>
            <View style={{flexDirection:'row',gap:15}}>
                <AntDesign name="edit" size={15} color="black" />
                <AntDesign name="delete" size={15} color="red" />
            </View>
            <Modal visible={false}>
                
            </Modal>
        </View>
    );
}

const style=StyleSheet.create({
    card:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
        width:'100%',
        borderRadius:8,
        paddingHorizontal:26,
        borderBottomWidth:1,
        borderColor:'#6C63FF'
    },
    text:{
        flex:1,
        padding:20,
        fontSize:18,
        overflow:'hidden',
    },
    textChecked:{
        opacity:0.3,
        textDecorationLine:'line-through'
    }
})