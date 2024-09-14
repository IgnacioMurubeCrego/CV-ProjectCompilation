package com.example.software;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.control.Button;

public class MainViewController {

    @FXML
    private Button btnShowL, btnShowR;

    Main main = Main.getInstance();

    // Dirección de las diferentes vistas que se podrán usar
    FXMLLoader loaderLogin = new FXMLLoader(getClass().getResource("LoginView.fxml"));
    FXMLLoader loaderRegistro = new FXMLLoader(getClass().getResource("RegistroView.fxml"));

    @FXML
    void showViewLogin(ActionEvent event) {
        try {
            // creamos objeto del Main para poder llamar al metodo start2
            main.cerrarPagina(event, btnShowL);
            main.mostrarPagina(event, loaderLogin);

        } catch(Exception e) {
            e.printStackTrace();
        }
    }

    @FXML
    void showViewRegistro(ActionEvent event) {
        try {
            // creamos objeto del Main para poder llamar al metodo start2
            main.cerrarPagina(event, btnShowR);
            main.mostrarPagina(event, loaderRegistro);

        } catch(Exception e) {
            e.printStackTrace();
        }
    }

}