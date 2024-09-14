module com.example.software {
    requires javafx.controls;
    requires javafx.fxml;

    requires com.dlsc.formsfx;
    requires java.sql;

    opens com.example.software to javafx.fxml;
    exports com.example.software;
}