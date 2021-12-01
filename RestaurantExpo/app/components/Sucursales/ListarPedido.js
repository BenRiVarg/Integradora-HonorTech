import React from 'react'; 
import { StyleSheet, Text, View,FlatList, ActivityIndicator,TouchableOpacity} from 'react-native'; 
import {useNavigation} from "@react-navigation/native";
import {Image} from 'react-native-elements'; 
import {size} from 'lodash'; 




export default function ListarPedido(propiedades){ 
    
    
    const {platillos}=propiedades; 
    //const sucursales = []; 
    return( 
        <View> 
         {/*    {size(platillos)>0?( 
               <FlatList 
               data={platillos} 
               renderItem={(platillo)=> <Platillo  platillo={platillo}/>} 
               keyExtractor={(item,index)=> index.toString()} 
           /> 
            ):( 
                <View style={styles.sucursales}> 
                     
                    <ActivityIndicator size="large" color="#0000ff"/> 
                    <Text>Cargando Platillos</Text> 
                </View> 
            )}  */}
            <Platillo  />
         
        </View> 
    ); 
}

const styles=StyleSheet.create({ 
    sucursales:{ 
        marginTop:10, 
        marginBottom:10, 
        alignItems: 'center', 
    } ,
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
        shadowColor: "#000066",
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
    }
});

function Platillo(propiedades){ 
    /* const navegacion= useNavigation();
    //const imagen="";

    //Recibe la lista de sucursales 
    const {platillo} =propiedades; 

    console.log("Ejemplo Sucursales----------------")
    console.log(platillo);
    console.log("Ejemplo Sucursales----------------")
    
    //en cada iteración obtiene los datos de la sucursal 
    const {imagen,nombre,precio, descripcion,id} =platillo.item;  */
    //Método que se ejecutará al dar clic a los items de la lista 
    const consultarRestaurante = () => { 
        navegacion.navigate("carrito");
    }; 

    return ( 
        //Agregamos el clic a cada item al dar clic el item se opaca 
        <TouchableOpacity > 
        {/*Esturctura de cada item */} 
        {/* <View style={styles.lista}> 
           <View>
                <Image 
                    resizeMode="cover" 
                    PlaceholderContent={<ActivityIndicator color="#0000ff"/>} 
                    source={imagen ? {uri: imagen }: require("../../../assets/img/no-encontrada.png")} 
                    style={styles.imagen} 
                /> 
            </View> 
        
            <View> 
                <Text style={styles.nombre}>{nombre}</Text> 
                <Text style={styles.direccion}>{precio}</Text> 
                <Text style={styles.descripcion}>{descripcion.substring(0,60)}...</Text> 
            </View> 
        </View>  */}

        {/* <View style={styles.lista}> 
            <View style={styles.ctnPlatillo}>
                    <View >
                        <Image 
                            resizeMode="cover" 
                            PlaceholderContent={<ActivityIndicator color="#0000ff"/>} 
                            source={imagen ? {uri: imagen }: require("../../../assets/img/no-encontrada.png")} 
                            style={styles.imagen} 
                        /> 
                    </View> 
                
                    <View style={styles.datosPlatillo}> 
                        <Text style={styles.nombre}>{nombre}</Text> 
                       
                        <Text style={styles.descripcion}>{descripcion}</Text> 
                    </View> 
                    <View style={styles.ctnPrecio}>
                    <Text style={styles.precio}> $ {precio}</Text> 
                    </View>
            </View>
         
        </View>  */}

        <View style={styles.lista}> 
        <View style={{textSize: 40,flex:0.2 ,justifyContent: "center",alignItems: "center"}}>

        <Text style={{fontSize: 40,fontWeight: "bold" ,color: "#39008e"}}>1</Text>
        </View>
        
            <View style={styles.ctnPlatillo}>
                    <View >
                        <Image 
                            resizeMode="cover" 
                            PlaceholderContent={<ActivityIndicator color="#0000ff"/>} 
                            source={ require("../../../assets/img/no-encontrada.png")} 
                            style={styles.imagen} 
                        /> 
                    </View> 
                
                    <View style={styles.datosPlatillo}> 
                        <Text style={styles.nombre}>Prueba</Text> 
                        <Text style={styles.precio}>$00.00</Text> 
                        <Text style={styles.descripcion}>Descripcion Descripcion Descripcion Descripcion Descripcion </Text> 
                    </View> 
                   
            </View>
         
        </View> 
        </TouchableOpacity> 
    ); 
} 