import React ,{useState, useEffect,useCallback}from 'react';
import {View, Text,StyleSheet,ActivityIndicator,TouchableHighlight,Dimensions,TextInput,Button,ScrollView} from 'react-native'
import { useFocusEffect } from "@react-navigation/native";
import {Image} from 'react-native-elements'; 

import {firebaseApp} from "../../utils/firebase"; 
import firebase from 'firebase/app'; 
import "firebase/firestore";
import { FireSQL } from "firesql"; 


//COMPONENTES//

import ListarPedidos from "../../components/Sucursales/ListarPedido";


const db = firebase.firestore(firebaseApp); 
const fireSQL = new FireSQL(db, { includeId: "id" });

export default function Carrito() {

  //const navegacion = useNavigation();
  //State para el Usuario
  const [usuario, setUsuario]=useState(null); 
  //State para el puntero
  const [puntero, setPuntero]=useState(null);

  const [ordenDia, setOD]=useState(null); 

  const [productos, setProductos]=useState(null); 
  const [loading,setIsLoading]=useState(false);
  var imagen="";

  const user = firebase.auth().currentUser; 

  useFocusEffect( 
    useCallback(()=>{ 
     
  
      const arrPlatillos=[]; 
      console.log("------------------Obteniendo Registros---------");
      console.log(user.uid);
      /* db.collection("pedidos").orderBy('usuario_entregado')
      .on('child_added', function(snapshot) { 
          var valor = snapshot.val();
          console.log(valor);
      }); */

      //.query(`SELECT * FROM pedidos WHERE usuario = '${user.uid}%' AND entregado=false`) 
      fireSQL 
      .query('SELECT * FROM pedidos WHERE usuario="'+user.uid+'" AND entregado = FALSE') 
      .then((response) => { 
        setProductos(response);
      }); 
  
      console.log(productos)
      console.log("------------------Obteniendo Registros---------");
      /* .where("usuario","==",user.uid).limit(10).get() 
          .then((res)=>{ 
            setPuntero(res.docs[res.docs.length -1]); 
            res.forEach((doc)=>{ 

          
              //extraemos cada documento y lo almacenamos en un objeto sucursal 
              const pedido =doc.data(); 
              //la clave del comentario no asigna a menos que lo indiquemos 
              pedido.id =doc.id; 
              //almacenamos cada sucursal en un arreglo. 
              console.log("BD en verdad conectada?____________");
              console.log(arrPlatillos);
              console.log("BD en verdad conectada?____________"); 
          }); 
           //Al terminar de recuperar todos los documentos los almacenamos en el useState sucursales 
           setPlatillos(arrPlatillos); 
           
          }); */
      },[]) 
    );

    
   
    const añadirCarrito=()=>{
        console.log("Disparandose");
        var pedido={
            usuario: user.uid,
            entregado: false,
            fecha: new Date()
        }

        db.collection("pedidos") 
        .add(pedido) 
        .then(() => { 
            
        setIsLoading(false); 
        // navegacion.navigate("Comentarios", { 
        //})  
        }) 
        .catch(() => { 
       // toastRef.current.show("Error al registrar Comentario"); 
        setIsLoading(false); 
        }); 
    }
    return (
    <ScrollView>
      <View style={styles.vista}>
        <View stye={styles.ctnHeader}>
            <View style={styles.logo}>
            <Text> RESTAURANT APP</Text>
            </View>
            <View>
                <View style={styles.generalCarrito}>
                    <Image 
                                resizeMode="cover" 
                                PlaceholderContent={<ActivityIndicator color="#0000ff"/>} 
                                source={require("../../../assets/img/carrito.png")} 
                                style={styles.imagen} 
                            /> 
                    <View style={styles.ctnCirculo}>
                        <TouchableHighlight
                            style = {styles.circulo}
                            underlayColor = '#ccc'
                            /* onPress = { () => alert('Yaay!') } */
                            >
                            <Text> 1 </Text>
                        </TouchableHighlight>

                   </View>
                    <View style={styles.ctnTotal}>
                        <Text style={styles.estiloTotal}>Total</Text>
                        <Text style={styles.estiloTotal}> $00</Text>
                    </View>
                </View>
               
                <View style={styles.ctnSolicitados}>
                    <View style={{alignItems: "center"}}>
                        <Text style={styles.subCategoria}>Por Solicitar</Text>
                    </View>
                   <View style={{width:"100%",flexDirection: "row",height: 120 ,alignItems: "center",justifyContent: "center"}}>

                            <View style={{flexDirection: "row" ,width:"95%"}}>

                                    <View style={{width:"60%", flexDirection: "row" }}>
                                        <Image 
                                                            resizeMode="cover" 
                                                            PlaceholderContent={<ActivityIndicator color="#0000ff"/>} 
                                                            source={ require("../../../assets/img/no-encontrada.png")} 
                                                            style={styles.imagen} 
                                                        /> 
                                            <View > 
                                                <Text style={styles.nombre}>Prueba</Text> 
                                            
                                                <Text style={styles.descripcion}>$000033 </Text> 
                                            </View> 
                                            <View style={{flexDirection:"column-reverse"}}>
                                                <Text style={{fontSize:14,color: "#047857",marginRight:15}}>$01.00</Text>
                                            </View>
                                    </View>

                                    <View style={{width:"40%"}}>
                                                    <Text>Cantidad:</Text>
                                                <TextInput 
                                                    style={styles.textInput}
                                                    keyboardType = 'numeric'
                                                    // onChangeText = {(text)=> this.onChanged(text)}
                                                    //value = {this.state.myNumber} 
                                                    placeholder="Ingresa Cantidad"
                                                    />
                                                    <Button
                                                            title="Añadir"
                                                            containerStyle={styles.btnContainer}
                                                            buttonStyle={styles.btn}
                                                            /*Al hacer clic activamos el método onSubmit del botón */
                                                            onPress={añadirCarrito}
                                                        />
                                    </View>

                            </View>
                      </View>
                    
                </View>
                <View style={styles.ctnSolicitados}>
                    <View style={{alignItems: "center"}}>
                        <Text style={styles.subCategoria}>Solicitados</Text>
                    </View>
                    <ListarPedidos/>
                </View>
            </View>
        </View>

      
        
       </View>
       </ScrollView>
    )
}

const styles = StyleSheet.create({
  ctnHeader:{
    width: "100%",
    /* backgroundColor: "#ff0000", */
    
    
  },
  logo:{
   
    width: "40%",
    alignItems:'flex-end',
    backgroundColor:"#0066ff",
    
  },

  generalCarrito:{
    //flex: 1,
    width:"100%",
    flexDirection: "row",
    marginTop: 10
  },

  ctnCirculo:{
    flexDirection: "column-reverse",
  },
  circulo: {
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
    width: Dimensions.get('window').width * 0.1,
    height: Dimensions.get('window').width * 0.1,
    backgroundColor:'#93C5FD',
    justifyContent: 'center',
    alignItems: 'center'
  },
  
  ctnTotal:{
      flex:1,
      flexDirection: "column",
      justifyContent: "center",
        alignItems: "center",
  },
  
  estiloTotal:{

      fontSize: 30,
      color: "#3B82F6"
  },

  imagen: { 
    width:100, 
    height:100 ,
    marginRight: 2,
    marginLeft: 10
    }, 

    ctnSolicitados:{
        marginTop:15,
        width:"100%",
        flexDirection:"column",
        
    },

    subCategoria:{
        width: "90%",
        backgroundColor: "#5B21B6",
        color: "white",
        padding: 5
    },
    lista: { 
        flexDirection:"row", 
        margin:10 ,
        alignItems: 'center', 
    }, 
    viewImagen: { 
        marginRight:15 
    }, 
    imagen: { 
        width:80, 
        height:80 
    }, 
    nombre: { 
        fontWeight:"bold" ,
        color: "#312E81"
    },
    direccion: { 
        paddingTop:2, 
        color:"grey" 
    }, 
    descripcion: { 
        fontSize: 12,
        flex: 1,
        color: 'black',
        /* textAlign: 'center', */
        flexWrap: 'wrap'
        
    } ,

    datosPlatillo:{
        flex:2.5,
       
        
    },

    ctnPlatillo:{
        flex: 1,
        flexDirection: "row",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
        padding: 10,
        marginTop: 10,
        marginBottom: 10
        
    },
    ctnPrecio:{
        flex: 1,
        width: "20%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column-reverse",
        marginTop: 5,
        marginBottom: 5
        
    },

    precio:{
        fontSize: 18,
        color: "#065F46"
    },

    btnContainer: {
        marginTop: 20,
        width: "100%",
      },
      btn: {
        backgroundColor: "#0A6ED3",
      },
    textInput: {paddingTop:5,paddingBottom: 5}
});