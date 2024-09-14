package com.example.software;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.DatePicker;
import javafx.scene.control.TextField;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class PedirCita extends AppNavegacion {

    @FXML
    private Button btnCrearCita;
    @FXML
    private TextField txtDate, txtDescripcion, txtDoctorCode, txtUserCode ;
    String dateAux;
    @FXML
    private DatePicker dateP;

    @FXML
    void createNewCita(ActionEvent event) {
        LocalDate myDate = dateP.getValue();
        String myFormattedDate = myDate.format(DateTimeFormatter.ofPattern("MM-dd-yyyy"));
        txtDate.setText(myFormattedDate);
        baseDatos.crearCita(txtDescripcion, txtDoctorCode, txtUserCode, txtDate);

        txtDescripcion.setText("");
        txtDoctorCode.setText("");
        txtUserCode.setText("");
    }

    void mostrarId(int id) {
        txtId.setText(String.valueOf(id));
        idUsuario = Integer.parseInt(txtId.getText());
        System.out.println("el valor recogido es : " + idUsuario);
    }

}