package org.casopractico;

import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;

public class TestPrograma {

	private static String contenidoFichero(String fichero, Charset codificacion) {
		String s = null;
		if (existeFichero(fichero)) {
			try {
				byte[] contenido = Files.readAllBytes(Paths.get(fichero));
				s = new String(contenido, codificacion);
			} catch (IOException e) {
				System.out.println(e.getMessage());
			}
		}
		return s;
	}

	private static boolean existeFichero(String fichero) {
		File ficheroEntrada = new File(fichero);
		return ficheroEntrada.exists();
	}

	public static void main(String[] args) {

		if (!existeFichero("lexemas.txt"))
			System.out.println("Error, no existe el fichero lexemas.txt");

		String fichero = "programa6.txt";
		if (existeFichero(fichero)) {
			String programa = contenidoFichero(fichero, StandardCharsets.UTF_8);
			Lexico lexico = new Lexico(programa);
			AnalizadorSintactico compilador = new AnalizadorSintactico(lexico);
			compilador.programa();
			System.out.println("\nTabla de simbolos");
			compilador.getTablaSimbolos();
		} else {
			System.out.println("Error, no existe el fichero " + fichero);
		}
	}

}
