package com.example.software;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.TextField;
import javafx.stage.Stage;

import java.util.ArrayList;

public class AppNavegacion {

    int idUsuario = 0;

    @FXML
    public TextField txtId;

    Bd baseDatos = Bd.getInstance();
    Main main = Main.getInstance();

    //------------------------------------------------------------------------
    // PARA LAS BIBLIOTECAS

    // Recoge el id del usuario que inicia sesión en todas las vistas
    @FXML
    private Button btnPedirCita, btnPerfil, btnVerCitas, btnHome;
    public Button[] listButtonMenu = new Button[4];

    FXMLLoader loaderNewCita = new FXMLLoader(getClass().getResource("PedirCita.fxml"));
    FXMLLoader loaderPerfil = new FXMLLoader(getClass().getResource("Perfil.fxml"));
    FXMLLoader loaderVerCitas = new FXMLLoader(getClass().getResource("ConsultarCita.fxml"));
    FXMLLoader loaderPrincipal = new FXMLLoader(getClass().getResource("HomeView.fxml"));
    public FXMLLoader[] listFxmlMenu = new FXMLLoader[4];

    private void addArrayMenu() {

        // Botones del menu
        listButtonMenu[0] = btnPedirCita; listButtonMenu[1] = btnPerfil; listButtonMenu[2] = btnVerCitas; listButtonMenu[3] = btnHome;
        // Vistas del menu
        listFxmlMenu[0] = loaderNewCita; listFxmlMenu[1] = loaderPerfil; listFxmlMenu[2] = loaderVerCitas; listFxmlMenu[3] = loaderPrincipal;
    }

    @FXML
    void showViewMenu(ActionEvent event) {

        // Cargamos los Arrays
        addArrayMenu();

        try {

            // Recorremos la lista de botones del array
            for (int i = 0; i < listButtonMenu.length; i++) {

                // Comprobamos caul es el botón que se ha presionado
                if (event.getSource() == listButtonMenu[i]) {

                    // Cerramos la vista actual para mostrar la siguiente
                    main.cerrarPagina(event, listButtonMenu[i]);
                    Parent root1 = listFxmlMenu[i].load();

                    // Dependiendo del botón que sea se cargará su controlador para acceder al método de pasar ID
                    if (listButtonMenu[i] == btnPedirCita) {
                        PedirCita pview = loaderNewCita.getController();
                        pview.mostrarId(idUsuario);
                    } else if (listButtonMenu[i] == btnPerfil) {
                        Perfil pview = loaderPerfil.getController();
                        pview.mostrarId(idUsuario);
                    } else if (listButtonMenu[i] == btnVerCitas) {
                        ConsultarCita pview = loaderVerCitas.getController();
                        pview.mostrarId(idUsuario);
                    } else if (listButtonMenu[i] == btnHome) {
                        Home pview = loaderPrincipal.getController();
                        pview.mostrarId(idUsuario);
                    }

                    Stage stage = new Stage();
                    stage.setScene(new Scene(root1));
                    stage.show();
                }
            }

        } catch(Exception e) {
            e.printStackTrace();
        }
    }
}