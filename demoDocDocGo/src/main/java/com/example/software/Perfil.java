package com.example.software;

import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.input.InputMethodEvent;

public class Perfil extends AppNavegacion {

    @FXML
    private Label txtName, txtSurname, txtBirth, txtMail, txtGender;

    void mostrarId(int id) {

        txtId.setText(String.valueOf(id));
        idUsuario = Integer.parseInt(txtId.getText());
        System.out.println("el valor recogido es : " + idUsuario);
        txtName.setText("Name : " + baseDatos.getLoggedUser().nombre);
        txtSurname.setText("Last Name : " + baseDatos.getLoggedUser().apellidos);
        txtBirth.setText("Birth Date : " + baseDatos.getLoggedUser().birth);
        txtMail.setText("Mail : " + baseDatos.getLoggedUser().email);
        txtGender.setText("Gender : " + baseDatos.getLoggedUser().gender);

    }
}
