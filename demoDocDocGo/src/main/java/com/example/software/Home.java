package com.example.software;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.control.Button;
import javafx.scene.control.Label;

public class Home extends AppNavegacion {

    @FXML
    private Label txtUserName;

    @FXML
    private Button btnLogout;

    // Instancia de FXMLLoader para salir del programa
    FXMLLoader loaderOut = new FXMLLoader(getClass().getResource("LoginView.fxml"));

    void mostrarId(int id) {

        txtId.setText(String.valueOf(id));
        idUsuario = Integer.parseInt(txtId.getText());
        System.out.println("el valor recogido es : " + idUsuario);

        // Para mostrar el nombre del user
        baseDatos.mostrarNombre(idUsuario, txtUserName);
    }

    @FXML
    void showOut(ActionEvent event) {

        try {

            // En caso de no tener cuenta nos dirige a la vista registro
            main.cerrarPagina(event, btnLogout);
            main.mostrarPagina(event, loaderOut);

        } catch(Exception e) {
            e.printStackTrace();
        }
    }
}



