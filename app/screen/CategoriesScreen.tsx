import { View, Text ,StyleSheet, Pressable, ScrollView, Keyboard, TouchableHighlight} from 'react-native'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { globalStyle } from '../styles/global';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { addToCustomCategory, deleteCategory, getCategoryByKey, key1, key2, saveCategory, updateCategory } from '../service/category';
import TaskInput from '../component/TaskInput';
import ModalPop from '../component/ModalPop';
import { addNewList, getAllLists } from '../hooks/list';
import { useSQLiteContext } from 'expo-sqlite';
import { List } from '../model/list';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDrizzle } from '../context/DrizzleContext';

//<MaterialIcons name="work" size={24} color="black" />
//<Entypo name="heart" size={24} color="black" />
//<Feather name="shopping-bag" size={24} color="black" />
//<Entypo name="shopping-bag" size={24} color="black" />
//<MaterialIcons name="airplanemode-on" size={24} color="black" />
//<MaterialIcons name="local-activity" size={24} color="black" />

const CategoryContext=createContext(null)
const CategoriesScreen = () => {
  const [route,setRoute]=useState<'category' | 'list' | null>()
  const [defaultCategories,setDefaultCategories]=useState([])
  const [customCategories,setCustomCategories]=useState([])
  const [lists,setLists]=useState<List[]>([])
  const [reload,setReload]=useState(false)
  const {db}=useDrizzle()
  const getLists=async()=>getAllLists(db).then(
    value=>{
        console.log(value)
        setLists(value)}
  )

  useEffect(()=>{
   const getCustomCategory=async ()=>getCategoryByKey(key2).then(
      value=>setCustomCategories(value)
    )
    const getDefaultCategory=async()=>getCategoryByKey(key1).then(
      value=>setDefaultCategories(value)
    )

    if(route=='category'){
      getCustomCategory()
      getDefaultCategory()
    }
    else if(route=='list'){
      getLists()
    }

  },[route])

  return (
    <View style={globalStyle.main}>
      {!route ? 
     ( 
     <>
     <View style={{
        width:'100%',
        top:'22%',
        padding:50
      }}>
      <Text
      style={{
        fontSize:27,
        margin:'auto'
      }}
      >Choose an Option</Text>
      </View>
      <View style={{flex:1,
      flexDirection:'row',
      gap:25,
        justifyContent:'center',alignItems:'center'}}>
        <Pressable style={styles.option}
      onPress={()=>setRoute('list')}
        >
          <MaterialIcons name='list' size={60}/>
          <Text style={{fontSize:22}}>List</Text>
        </Pressable>
        <Pressable style={styles.option
        }
        onPress={()=>setRoute('category')}
        >

         <MaterialIcons name='category' size={60}/>
          <Text style={{fontSize:22}}>Category</Text>
        </Pressable>
      </View>
      </>
      )
      :
      <CategoryContext.Provider value={{reload,setReload,setCustomCategories,getLists}}>
      <Header setRoute={setRoute} title={route=='category' ? 'Categories' : 'Lists'}/>
      <ScrollView>
       {
        route=='category' && defaultCategories && defaultCategories.map((item,id)=><CategoryItem 
         type={item} key={id} name={item}/>)
        }
        {
          route=='category' && customCategories && customCategories.map((item,id)=><CategoryItem 
          edit
          type={item} key={id}
          name={item} />
        )
        }
        {
          route=='list' && lists.map((item,id)=><ListItem
          key={id}
          name={item.title}
          />)
        }
      </ScrollView>
      </CategoryContext.Provider>
      }

    </View>
  )
}

function Header({setRoute,title}:{setRoute:Function,title:'Categories' | 'Lists'}){
  const [isModalVisible,setModalVisble]=useState(false)
    return(
      <View style={styles.header}>
        <View style={{alignItems:'flex-end',flexDirection:'row',
          justifyContent:'space-between'}}>
            <Pressable>
            <AntDesign name='arrowleft' 
            onPress={()=>setRoute(null)}
            size={24} color="black" />
            </Pressable>
        <Pressable onPress={()=>setModalVisble(true)}>
        <AntDesign name="plus" size={24} color="black" />
        </Pressable>
        </View>
        <View style={{marginVertical:20}}>
          <Text style={{fontSize:29,fontWeight:'bold'}}>{title}</Text>
        </View>
        <ModalPop isModalVisible={isModalVisible} setModalVisible={setModalVisble}>
          <EditCategory
          route={title}
          setModalVisible={setModalVisble} title={title==='Categories' ? "New Catgory" : "New List"}/>
        </ModalPop>
      </View>
    )
  }

function CategoryItem({type,name,edit=false,list}:{type?:string,name:string,
  list?:boolean,
  edit?:boolean}){
    const [editCategoryVisible,setEditCategoryVisible]=useState(false)
    return(
        <Pressable 
        onLongPress={()=>setEditCategoryVisible(true)}
        style={{flexDirection:'row',
        justifyContent:'space-between',alignItems:'center',
        paddingVertical:6,
        }}>
            <View style={{flexDirection:'row',alignItems:'center',gap:22}}>
                <View style={{padding:10,backgroundColor:'#F3F3F3'
                ,borderRadius:8
                }}>
                {!list ? CategoryIconByType(type) : 
                 <MaterialIcons name='list' size={20} color="black" />
                }
                </View>
                <Text style={{fontSize:18}}>{name}</Text>
            </View>
            {edit && <><Pressable onPress={()=>setEditCategoryVisible(true)}>
              <MaterialIcons name="mode-edit" size={20} color="black" />
              </Pressable>
               <ModalPop isModalVisible={editCategoryVisible} setModalVisible={setEditCategoryVisible}>
            <EditCategory 
            route={null}
            title="Edit Category"
            category={name}
            edit
            setModalVisible={setEditCategoryVisible}/>
           </ModalPop>
           </>
           }
        </Pressable>
    )
}

function EditCategory({setModalVisible,title,edit,category,route}
  :{setModalVisible:Function
  title:string,
  edit?:boolean,
  category?:string
  route?:'Categories' | 'Lists' | null
}){
  const [formData,setFormData]=useState({categoryName:""})
  const {db}=useDrizzle()
  const {reload,setReload,setCustomCategories,getLists} = useContext(CategoryContext)
  const styles = StyleSheet.create({
    main:{
        padding:23
    },
    heading:{
        fontSize:25
    },
    form:{
       justifyContent:'center',
       gap:15,
       paddingTop:30
    },
    button:{
        backgroundColor:'#007BFF',
        paddingHorizontal:30,
        paddingVertical:10,
        borderRadius:7,
    
    },
    buttonText:{
        fontSize:17,
        color:'white',
        fontWeight:'bold'
    },
    buttonHolder:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        padding:10,
        paddingVertical:30
    }
})
  
  
  return (
    <Pressable style={[styles.main,{
      flex:1,
      marginTop:20
    }]}
    onPress={()=>setModalVisible(false)}
    >
            <View style={{justifyContent:'center',alignItems:'center'}}>
                <Text style={styles.heading}>{title}</Text>
            </View>
            <View style={styles.form}>
                <TaskInput name='categoryName'
                desc={route=='Lists'? "Add new List" : "Add new Category"} 
                setFormData={setFormData}
                />
            </View>
            <View style={styles.buttonHolder}>
                <Pressable style={[styles.button,{
                  backgroundColor:'#f0f0f0',
                  padding:17,
                }]} onPress={edit ? ()=>{
                  deleteCategory(category,setCustomCategories)
                  setModalVisible(false)
                } : ()=>{
                  setModalVisible(false)
                }}>
                    <Text style={[styles.buttonText,{color:'black'}]}>{edit? 'Delete' :'Cancel'}</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={
                  ()=>{
                      edit ? route==='Categories' ?
                              updateCategory(formData?.categoryName,category,setCustomCategories): null
                          : route==='Categories'?addToCustomCategory(formData?.categoryName,setCustomCategories):
                              addNewList(formData?.categoryName,db
                                  ,getLists
                              )

                  setModalVisible(false)
                }}>
                    <Text style={styles.buttonText}>{edit ? 'Apply' : "Add"}</Text>
                </Pressable>
            </View>
    </Pressable>
  )
}

const styles=StyleSheet.create({
    header:{
        justifyContent:'space-between',
        paddingBottom:18
      },
      option:{
        padding:30,paddingVertical:40,
        borderRadius:22,
          backgroundColor:'#f1f1f1',
            alignItems:'center',
            justifyContent:'center',
            flex:1,
      }
})

function ListItem({name}:{name:string}){
  return(
    <View style={{
      flexDirection:'row',
      justifyContent:'space-between',
      gap:20,paddingVertical:10,alignItems:'center'}}>
        <View style={{flexDirection:'row',alignItems:'center',gap:20}}>
        <TouchableOpacity style={{backgroundColor:'#F1F1F8',padding:3,borderRadius:10}}>
      <Ionicons name="menu-outline" size={30} color="black" />
        </TouchableOpacity>
        <View>
          <Text style={{fontSize:18}}>{name}</Text>
        </View>
        </View>
        <Pressable>
              <MaterialIcons name="mode-edit" size={20} color="black" />
        </Pressable>
    </View>
  )
}

function CategoryIconByType(status:string){
//<Entypo name="heart" size={24} color="black" />
//<Feather name="shopping-bag" size={24} color="black" />
//<Entypo name="shopping-bag" size={24} color="black" />
//<MaterialIcons name="airplanemode-on" size={24} color="black" />
//<MaterialIcons name="local-activity" size={24} color="black" />
  switch (status) {
    case 'Work':
      return (
        <MaterialIcons name="work" size={24} color="black" />
      );
    case 'Groceries':
      return (
        <Entypo name="shopping-bag" size={24} color="black" />
      );
    case 'Travel':
      return (
        <MaterialIcons name="airplanemode-on" size={24} color="black" />
      );
      case "Personal":
        return (
          <AntDesign name="heart" size={24} color="black" />
        );
    default:
      return (
        <MaterialIcons name="local-activity" size={24} color="black" />
      );
  }
}


export default CategoriesScreen