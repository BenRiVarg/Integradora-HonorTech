import React ,{useState, useEffect,useCallback}from 'react';
import {View, Text,StyleSheet} from 'react-native'
import { useFocusEffect } from "@react-navigation/native";

import {firebaseApp} from "../../utils/firebase"; 
import firebase from 'firebase/app'; 
import "firebase/firestore";

const db = firebase.firestore(firebaseApp); 

export default function Menu() {

  //const navegacion = useNavigation();
  //State para el Usuario
  const [usuario, setUsuario]=useState(null); 
  //State para el puntero
  const [puntero, setPuntero]=useState(null);

  const [comentario, setComentario]=useState([]); 

  useFocusEffect( 
    useCallback(()=>{ 
         /*accedemos a la colección de sucursales, consultamos los registros 
      con get y atrapamos la respuesta (se retorna una promesa con la lista sucursales) 
      contamos y asignamos el total de sucursales al useState totalSuc*/ 
     /*  db.collection("comments") 
      .get() 
      .then((res)=>{ 
          setTotalSuc(res.size); 
          
      });  */
  
      const arrPlatillos=[]; 
      db.collection("platillos").limit(10).get() 
          .then((res)=>{ 
            setPuntero(res.docs[res.docs.length -1]); 
            res.forEach((doc)=>{ 
              //extraemos cada documento y lo almacenamos en un objeto sucursal 
              const comentario =doc.data(); 
              //la clave del comentario no asigna a menos que lo indiquemos 
              comentario.id =doc.id; 
              //almacenamos cada sucursal en un arreglo. 
              arrPlatillos.push(comentario); 
          }); 
           //Al terminar de recuperar todos los documentos los almacenamos en el useState sucursales 
           setComentario(arrPlatillos); 
           console.log("BD en verdad conectada?____________");
           console.log(arrPlatillos);
           console.log("BD en verdad conectada?____________"); 
          });
      },[]) 
    );

    return (
      <View>
        <View stye={styles.ctnHeader}>
            <View style={styles.logo}>
            <Text> RESTAURANT APP</Text>
            </View>
        </View>

      
        
       </View>
    )
}

const styles = StyleSheet.create({
  ctnHeader:{
    width: "100%",
    backgroundColor: "#ff0000",
    
  },
  logo:{
    width: "40%"
  },
  /* 
 */  vista: {
    flex: 1,
    backgroundColor: "#ff0000",
  },
  btn: {
    position: "absolute",
    bottom: 10,
    right: 10,
    //Para IOS mostrará una sombra para el botón
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
  },


  ctnComentario:{
    width:"100%",
  },

  titComentario:{
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    color: "#000033"
  },

  ctnDescripcion:{
    width: "100%",
    alignItems: 'center',
    
  }
,
Descripcion:{
  width: "90%",
  textAlign: "center"
}
,
Fecha:{
  alignItems:'flex-end',
  marginTop: 10,
  marginBottom: 10,
}
 
});