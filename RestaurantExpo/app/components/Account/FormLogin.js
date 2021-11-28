import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { validarEmail } from "../../utils/validaciones";
import { isEmpty } from "lodash";
//importamos la dependencia a firebase
import firebase from 'firebase/app';
import {useNavigation} from "@react-navigation/native"

export default function FormLogin(toast) {
  //declaramos el objeto que manipulará el toast
  const navigation =useNavigation();
  const { toastRef } = toast;
  const [mostrar, setMostrar] = useState(false);
  /*El estado datos almacenará los datos del formulario
  por default se inicializa con los campos creados
  en la función valoresDefault */
  const [datos, setDatos] = useState(valoresDefault);

  /*Método que se ejecutará al dar clic en el botón
  nos permitirá por el momento verificar en consola
  los datos recuperados del formulario*/
  const onSubmit = () => {
 
    //Verificamos que no se envíen datos vacíos
    if (
      isEmpty(datos.email) ||
      isEmpty(datos.password) 
    ) {
      //Enviamos el mensaje al cuerpo del toast para hacerlo visible
      toastRef.current.show("No puedes dejar campos vacios");
      
    }
    else if (!validarEmail(datos.email)) {
      //Enviamos el mensaje al cuerpo del toast para hacerlo visible
      toastRef.current.show("Estructura del email incorrecta");
     
    } 
    else {
      

        firebase.auth().signInWithEmailAndPassword(datos.email, datos.password)
        .then((respuesta) => {
          //Redirección a Logged
          navigation.navigate("cuentas");
        })
        .catch(() => {
          toastRef.current.show("Lo sentimos: EL correo o contraseña no están registrados")
        });
    
    }
  };

  const onChange = (e, type) => {
  
    setDatos({ ...datos, [type]: e.nativeEvent.text });
  };
  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Correo Electrónico"
        containerStyle={styles.inputForm}
        /*Es el que manda la información del input*/
        onChange={(e) => onChange(e, "email")}
        rightIcon={
          <Icon
            type="material-community-icon"
            name="alternate-email"
            iconStyle={styles.icono}
          />
        }
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.inputForm}
        password={true}
        /*Si mostrar es false se oculta el texto
        de lo contrario se muestra*/
        secureTextEntry={mostrar ? false : true}
        /*Es el que manda la información del input*/
        onChange={(e) => onChange(e, "password")}
        rightIcon={
          <Icon
            type="material-community-icon"
            /*Si mostrar es false se muestra el icono
            de ocultar contraseña de lo contrario se muestra
            el icono de ver contraseña*/
            name={mostrar ? "visibility" : "visibility-off"}
            iconStyle={styles.icono}
            onPress={() => setMostrar(!mostrar)}
          />
        }
      />
      <Button
        title="Iniciar Sesion"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        /*Al hacer clic activamos el método onSubmit del botón */
        onPress={onSubmit}
      />
    </View>
  );
}

function valoresDefault() {
  return {
    email: "",
    password: "",
  };
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  inputForm: {
    width: "100%",
    marginTop: 20,
  },
  btnContainer: {
    marginTop: 20,
    width: "100%",
  },
  btn: {
    backgroundColor: "#0A6ED3",
  },
  icono: {
    color: "#c1c1c1",
  },
});
