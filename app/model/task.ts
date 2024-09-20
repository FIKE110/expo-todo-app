export type TaskType={
    title:string,
    notes?:string,
    list_id?:string,
    category?:string,
    remindDate?:Date,
    checked:boolean,
    prority?:"Very high" | "high" | "medium" | "low"
}