package com.example.software;

import javafx.application.Application;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.stage.Stage;

import java.io.IOException;

public class Main extends Application {
    private static final Main instance = new Main();
    public static Main getInstance() {
        return instance;
    }
    @Override
    public void start(Stage primaryStage) {
        Parent root;
        try {
            root = FXMLLoader.load(getClass().getResource("MainView.fxml"));
            primaryStage.setScene(new Scene(root));
            primaryStage.show();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    @FXML
    void mostrarPagina(ActionEvent event, FXMLLoader fxmlLoader) {
        try {
            Parent root1 = (Parent) fxmlLoader.load();
            Stage stage = new Stage();
            stage.setScene(new Scene(root1));
            stage.show();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    @FXML
    public void cerrarPagina(ActionEvent event, Button btnEmpezar) {

        try {
            // selecciona la vista a la que pertenece btn1
            Stage stage = (Stage) btnEmpezar.getScene().getWindow();
            // haciendo .hide cierra la ventana con la opción de reabrir la vista
            stage.hide();

        } catch(Exception e) {
            e.printStackTrace();
        }
    }

}