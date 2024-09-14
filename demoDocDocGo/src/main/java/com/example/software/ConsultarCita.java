package com.example.software;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.stage.Stage;

import java.net.URL;
import java.util.ArrayList;
import java.util.ResourceBundle;



public class ConsultarCita extends AppNavegacion  {

    @FXML
    private Label txtDate1, txtDate2, txtDate3, txtDate4, txtDate5, txtDate6;
    public Label[] listLabelDate = new Label[6];

    @FXML
    private Label txtDes1, txtDes2, txtDes3, txtDes4, txtDes5, txtDes6;
    public Label[] listLabelDes = new Label[6];

    @FXML
    private Label txtDoc1, txtDoc2, txtDoc3, txtDoc4, txtDoc5, txtDoc6;
    public Label[] listLabelDoc = new Label[6];

    // Array aux para guardar los ids de las citas de cada user
    ArrayList<Integer> ids = new ArrayList<>();

    void mostrarId(int id) {

        txtId.setText(String.valueOf(id));
        idUsuario = Integer.parseInt(txtId.getText());
        System.out.println("el valor recogido es : " + idUsuario);

        // Para mostrar las citas que tiene el usuario
        addArray();
        ids = baseDatos.getIdCitas(idUsuario);

        // Recorremos el array donde se encuentran los ids de las citas y add a los label
        for (int i = 0; i < ids.size(); i++) {
            baseDatos.mostrarCita(ids.get(i), listLabelDes[i], listLabelDoc[i], listLabelDate[i]);
        }
    }

    private void addArray(){
        listLabelDes[0] = txtDes1;
        listLabelDes[1] = txtDes2;
        listLabelDes[2] = txtDes3;
        listLabelDes[3] = txtDes4;
        listLabelDes[4] = txtDes5;
        listLabelDes[5] = txtDes6;

        listLabelDate[0] = txtDate1;
        listLabelDate[1] = txtDate2;
        listLabelDate[2] = txtDate3;
        listLabelDate[3] = txtDate4;
        listLabelDate[4] = txtDate5;
        listLabelDate[5] = txtDate6;

        listLabelDoc[0] = txtDoc1;
        listLabelDoc[1] = txtDoc2;
        listLabelDoc[2] = txtDoc3;
        listLabelDoc[3] = txtDoc4;
        listLabelDoc[4] = txtDoc5;
        listLabelDoc[5] = txtDoc6;
    }



}