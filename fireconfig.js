import React, { Component } from 'react'
import database from "@react-native-firebase/database";
export default class fireconfig  {
    constructor(){

    }
    send=()=>{
        messages.forEach(element => {
            const message ={
                text:element.text,
                timestamp:database.ServerValue.TIMESTAMP,
                user:element.user,

            }

            this.db.push(message)
        });
    }

    get db(){
        return database().ref("messages")
    }
}
