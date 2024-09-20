import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const key1="defaultCategory"
export const key2="customCategory"

export async function init(){
    const defaultCategories=["Work","Personal","Groceries","Travel"]
    const customCategories=["Cook","Village","All","JetPack"]
    await AsyncStorage.setItem(key1,JSON.stringify(defaultCategories))
    await AsyncStorage.setItem(key2,JSON.stringify(customCategories))
}


export async function saveCategory(category:string){
    try{
        await AsyncStorage.setItem(key2,category)
    }
    catch(e){
        console.log(e)
    }
}

export async function addToCustomCategory(category:string,cb?:Function
){
    try{
        const value=await getCategoryByKey(key2)
        const newData=[...value,category]
        console.log(newData,"new data added")
        await saveCategory(JSON.stringify(newData))
        const newValue=await getCategoryByKey(key2)
        if(cb) cb(newValue)
    } 
    catch(e){
        console.log(e)
    }
} 

export async function getCategoryByKey(key:string){
    try{
        const value=await AsyncStorage.getItem(key)
        console.log(value)
        return JSON.parse(value)
    }
    catch(e){
        console.log(e)
    }
}

export async function updateCategory(newCategory:string,category:string,cb?:Function){
   const value= await getCategoryByKey(key2)
    value.filter(val=>val=category)
    console.log(value)
    value.push(newCategory)
    await saveCategory(JSON.stringify(value))
   if(cb) cb()
}

export async function deleteCategory(category:string,cb?:Function){
    const value=await getCategoryByKey(key2)
    const newValue=value.filter(val=>category!=val)
    console.log(newValue,"help")
    await saveCategory(JSON.stringify(newValue))
    if(cb) cb(newValue)
}