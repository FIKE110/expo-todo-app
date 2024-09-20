import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite";
import {ExpoSQLiteDatabase} from "drizzle-orm/expo-sqlite";
import {taskTable} from "../../db/schema";

type TaskType={
    list_id: number;
    title:string,
    notes:string
}


export async function getAllTasks(db:ExpoSQLiteDatabase){
    try{
        return db.select().from(taskTable).all()
    }
    catch (e){
        return []
    }
}

export async function useAddToTasks({title,notes},db:ExpoSQLiteDatabase){
    try{
        console.log('Hello')
        db.insert(taskTable).values({title: title}).run()
    return true
    }
    catch(e){
        return false
    }
}

export async function updateChecked(id:number,checked:boolean,db:SQLiteDatabase){
    try{
    await db.runAsync("UPDATE tasks SET checked=? WHERE id=?",checked? 1:0,id)
    return true
    }
    catch(e){
        return false
    }
}

export async function updateTask(id:number,notes:string,title:string,db:SQLiteDatabase){
    try{
        await db.runAsync("UPDATE tasks SET title=?,notes=? WHERE id=?",
            title,notes,id
        )
        return true;
    }
    catch(e){
        return false;
    }
}

export async function deleteTask(id:number,db:SQLiteDatabase){
    await db.runAsync("DELETE FROM tasks WHERE id=?",id)
}