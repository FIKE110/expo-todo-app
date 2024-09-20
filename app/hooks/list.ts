import { SQLiteDatabase } from "expo-sqlite";
import { List } from "../model/list";
import { ToastAndroid } from "react-native";
import {ExpoSQLiteDatabase} from "drizzle-orm/expo-sqlite";
import {ListTable} from "../../db/schema";

export async function getAllLists(db:ExpoSQLiteDatabase){
    try{
        const lists:List[]=db.select().from(ListTable).all();
        return lists
    }
    catch(e){
        return []
    }
    
}

export async function getList(limit:number,db:ExpoSQLiteDatabase){
    try{
        const lists:{id:number,title:string}[]=db.select().from(ListTable).all()
        return lists
    }
    catch(e){
        console.log(e)
        return []
    }
}

export async function addNewList(listName:string,db:ExpoSQLiteDatabase,cb:Function){
    try{
        const list=await getAllLists(db)
        const exists=list.findIndex(value=>value.title.toLowerCase()===listName.toLowerCase()) != -1
        if(exists){
            ToastAndroid.show("List already exists",ToastAndroid.SHORT)
            return
        }
        db.insert(ListTable).values({title:listName}).run()
        ToastAndroid.show("List was created Successfully",ToastAndroid.SHORT)
        cb()
    }
    catch(e){
        console.log(e)
        return false
    }
}
