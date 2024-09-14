package com.example.software;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.TextField;
import javafx.stage.Stage;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;

public class RegistroViewController {

    @FXML
    private Button btnMostrarViewLogin2, btnMostrarViewPrincipal;

    @FXML
    private TextField titNombre, titUsername, titDate, titGender, titMail, titPassword;

    int idUser = 0;

    // Clase para hacer uso de la base de datos
    Bd baseDatos = Bd.getInstance();
    Main main = Main.getInstance();

    //Dirección de las diferentes vistas que se podrán usar
    FXMLLoader loaderLogin = new FXMLLoader(getClass().getResource("LoginView.fxml"));
    FXMLLoader loaderPrincipal = new FXMLLoader(getClass().getResource("HomeView.fxml"));


    @FXML
    void showViewLogin2(ActionEvent event) {

        try {
            // creamos objeto del Main para poder llamar al metodo start2
            main.cerrarPagina(event, btnMostrarViewLogin2);
            main.mostrarPagina(event, loaderLogin);

        } catch(Exception e) {
            e.printStackTrace();
        }
    }

    @FXML
    void showViewPrincipal(ActionEvent event) {

        String[] fields = {
                titNombre.getText(),
                titUsername.getText(),
                titDate.getText(),
                titGender.getText(),
                titMail.getText(),
                titPassword.getText()
        };

        // Using streams to check if all fields are not empty
        boolean allNotEmpty = Arrays.stream(fields)
                .noneMatch(field -> field == null || field.isEmpty());

        try {

            if (allNotEmpty) {

                baseDatos.guardarUsuario(new Usuario(fields[0], fields[1], fields[2], fields[3], fields[4], fields[5]));
                idUser = baseDatos.getIdUser(titMail.getText(), titPassword.getText());
                main.cerrarPagina(event, btnMostrarViewPrincipal);
                mostrarPrincipalViewUser(event, loaderPrincipal, idUser);

            }

        } catch(Exception e) {
            e.printStackTrace();
        }
    }

    @FXML
    void mostrarPrincipalViewUser(ActionEvent event, FXMLLoader fxmlLoader, int idUser) {

        try {

            Parent root1 = (Parent) fxmlLoader.load();
            // Para pasar datos entre ventanas
            Home pview = fxmlLoader.getController();
            //idUser = pview.mostrarId(idUser);
            pview.mostrarId(idUser);

            System.out.println("Usuario en vista login : " + idUser);

            Stage stage = new Stage();
            stage.setScene(new Scene(root1));
            stage.show();

        } catch(Exception e) {
            e.printStackTrace();
        }
    }
}