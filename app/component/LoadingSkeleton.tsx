import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Skeleton } from '@rneui/base'


export default function LoadingSkeleton() {
  return (
    <View style={{paddingHorizontal:20,flex:1,gap:20,paddingVertical:20}}>
        <Skeleton circle style={{width:'100%',marginBottom:10}} height={50}/>
      {
        Array.from({length:5}).map((i:any)=><View key={i}><Skeleton key={i}
        animation='pulse'
        style={{width:'100%',borderRadius:10}}
        width={120} height={70} /></View>)
      }
    </View>
  )
}

const styles = StyleSheet.create({})