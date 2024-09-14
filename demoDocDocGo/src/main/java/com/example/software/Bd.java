package com.example.software;

import  javafx.scene.control.Label;
import javafx.scene.control.TextField;

import java.sql.*;
import java.util.ArrayList;

public class Bd {

    private static Connection conexion = null;
    private static Statement sentenciaSQL = null;
    private static PreparedStatement preparedSQL = null;
    private Usuario loggedUser = null;


    private static Bd instance;

    public Bd() {
        super();
    }

    //----------------------------------------------------------------------------------------------------------

    // Conectar a la base de datos

    final void conectar() throws SQLException {

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conexion = DriverManager.getConnection("jdbc:mysql://localhost/docdocgo", "root", "root");
        } catch (ClassNotFoundException cn) {
            cn.printStackTrace();
        }
    }

    // Método para obtener la instancia única de la clase Bd (patron de diseño Singleton)
    //El patrón Singleton se utiliza para asegurar que una clase tenga solo una instancia y
    // proporciona un punto de acceso global a esa instancia.
    public static Bd getInstance() {
        if (instance == null) {
            instance = new Bd();
        }
        return instance;
    }


    final void desconectar() throws SQLException{
        try {

            if(sentenciaSQL != null) {sentenciaSQL.close();};
            if(preparedSQL != null) {preparedSQL.close();};

            conexion.close();
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }

    // Añadir un usuario nuevo al registrarse
    public void guardarUsuario(Usuario usuario) {
        // ANTES TENEMOS QUE VERIFICAR SI EL USUARIO EXISTE
        try {
            conectar();

            // Sentencia para añadir usuarios a la tabla
            preparedSQL = conexion.prepareStatement(
                    "INSERT INTO usuarios "
                            + "(userName, userLastname, userBirth, userGender, userMail, userPassword) "
                            + "VALUES (?, ?, ?, ?, ?, ?)");

            preparedSQL.setString(1, usuario.nombre);
            preparedSQL.setString(2, usuario.apellidos);
            preparedSQL.setString(3, usuario.birth);
            preparedSQL.setString(4, usuario.gender);
            preparedSQL.setString(5, usuario.email);
            preparedSQL.setString(6, usuario.password);
            preparedSQL.executeUpdate();

            // Se incrementa el valor de los personajes almacenados en el arrayList
            System.out.println("Usuario añadido");

            desconectar();

        } catch (SQLException ex) {
            System.out.println("ERROR al guardar el usuario");
            System.out.println(ex.getMessage());
        }
    }


    public Usuario iniciarSesion(String email, String password) {

        Usuario user = null;
        ResultSet result = null;
        String sqlRequest;

        try {
            conectar();

            sentenciaSQL = conexion.createStatement();
            sqlRequest = "SELECT * FROM usuarios WHERE userMail = '" +
                    email + "' AND userPassword = '" + password + "'";
            result = sentenciaSQL.executeQuery(sqlRequest);

            if (result.next()) { // Move cursor to the first row if it exists
                user = new Usuario(
                        result.getString("userName"),
                        result.getString("userLastName"),
                        result.getString("userBirth"),
                        result.getString("userGender"),
                        result.getString("userMail"),
                        result.getString("userPassword"));
                loggedUser = user;
            } else {
                System.out.println("No user found with the provided credentials.");
            }

            desconectar();
        }
        catch (Exception e) {
            System.out.println("ERROR at login");
            e.printStackTrace();
        }

        if (result != null) {
                return user;
            } else
                return null;
    }

    public int getIdUser(String email, String password) {

        int id = 0;

        ResultSet result;
        String sql;

        try {

            conectar();
            sentenciaSQL = conexion.createStatement();

            // Sentencia para añadir usuarios a la tabla
            sql = "SELECT idusuarios FROM usuarios where userMail = '" + email + "' and userPassword = '" + password + "'";
            result = sentenciaSQL.executeQuery(sql);

            // Siempre se ejecuta cada vez que encuentre un dato buscado en la secuencia
            if(result.next()) {
                id = result.getInt("idusuarios");
                System.out.println("El id del usuario en el sql es : " + id);
            }

            desconectar();

        } catch (SQLException ex) {
            System.out.println("ERROR al obtener el id del usuario");
        }

        return id;
    }

    public void mostrarNombre (int idUser, Label userName){

        ResultSet result;
        String sql;

        try {

            conectar();
            sentenciaSQL = conexion.createStatement();

            // Sentencia para añadir usuarios a la tabla
            sql = "SELECT userName FROM usuarios where idusuarios = '" + idUser + "'";
            result = sentenciaSQL.executeQuery(sql);

            // Siempre se ejecuta cada vez que encuentre un dato buscado en la secuencia
            if(result.next()) {
                userName.setText(result.getString("userName"));
            }

            desconectar();

        } catch (SQLException ex) {
            System.out.println("ERROR al obtener el id del usuario");
        }
    }

    public void mostrarUsuario(int idUser, Label userName, Label userSurname, Label userBirth, Label userGender, Label userMail) {

        ResultSet result;
        String sql;

        try {

            conectar();
            sentenciaSQL = conexion.createStatement();

            // Sentencia para añadir usuarios a la tabla
            sql = "SELECT * FROM usuarios where idUsuario = '" + idUser + "'";
            result = sentenciaSQL.executeQuery(sql);

            // Siempre se ejecuta cada vez que encuentre un dato buscado en la secuencia
            if(result.next()) {

                // Insertamos en cada TextField los datos que sacamos de la BD
                userName.setText(result.getString("userName"));
                userSurname.setText("ID : " + result.getString("idUsuario"));
                userBirth.setText("Birth : " + result.getString("userBirth"));
                userGender.setText("Gender : " + result.getString("userGender"));
                userMail.setText("Mail : " + result.getString("userMail"));
            }

            desconectar();

        } catch (SQLException ex) {
            System.out.println("ERROR al mostrar user");
        }
    }

    public void crearCita(TextField txtNameC, TextField txtIdDocC, TextField txtIdUserC, TextField txtDateC) {

        int result;
        String sql;

        String nombreAux = txtNameC.getText();
        String idDocAux = txtIdDocC.getText();
        String idUserAux = txtIdUserC.getText();
        String dateAux = txtDateC.getText();


        try {

            conectar();
            sentenciaSQL = conexion.createStatement();

            // Sentencia para añadir usuarios a la tabla
            sql = "INSERT INTO citas (citaDescripcion, idDoc, idPaciente, citaFecha) VALUES ('" + nombreAux + "', '" + idDocAux + "', '" + idUserAux + "', '" + dateAux + "')";
            result = sentenciaSQL.executeUpdate(sql);

            // Se incrementa el valor de los personajes almacenados en el arrayList
            System.out.println("Contenido añadido");

            desconectar();

        } catch (SQLException ex) {
            System.out.println("ERROR al guardar un contenido");
            //txtError.setText("ERROR at add a content");
        }
    }

    public ArrayList<Integer> getIdCitas(int idUser) {

        ResultSet result;
        String sql;

        ArrayList<Integer> listIds = new ArrayList<>();
        int idCont = 0;

        try {

            conectar();
            sentenciaSQL = conexion.createStatement();

            // Filtramos por id del usuario
            sql = "SELECT idCitas FROM citas WHERE idPaciente = '" + idUser + "'";
            result = sentenciaSQL.executeQuery(sql);

            // Cada vez que encuentre algo lo añade a un array
            while(result.next()) {

                idCont = result.getInt("idCitas");
                listIds.add(idCont);
            }

            desconectar();

        } catch (SQLException ex) {
            System.out.println("ERROR al guardar los ids pelicula de los contenidos");
        }

        return listIds;
    }

    public void mostrarCita(int idCita, Label txtNameC, Label txtIdDocC, Label txtDateC) {

        ResultSet result;
        String sql;

        try {

            conectar();
            sentenciaSQL = conexion.createStatement();

            // Sentencia para añadir usuarios a la tabla
            sql = "SELECT * FROM citas where idCitas = '" + idCita + "'";
            result = sentenciaSQL.executeQuery(sql);

            // Siempre se ejecuta cada vez que encuentre un dato buscado en la secuencia
            if(result.next()) {

                // Insertamos en cada TextField los datos que sacamos de la BD
                txtNameC.setText(result.getString("citaDescripcion"));
                txtIdDocC.setText("DOC : " + result.getString("idDoc"));
                txtDateC.setText("DATE : " + result.getString("citaFecha"));
            }

            desconectar();

        } catch (SQLException ex) {
            System.out.println("ERROR al mostrar citas");
        }
    }

    public Usuario getLoggedUser() {
        return loggedUser;
    }

}