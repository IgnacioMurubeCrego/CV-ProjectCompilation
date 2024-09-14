package org.casopractico;

public class Lexico {

	private char caracter;
	private int lineas;
	private PalabrasReservadas palabras;
	private int posicion;
	private String programa;

	public Lexico(String programa) {
		this.posicion = 0;
		this.lineas = 1;
		this.palabras = new PalabrasReservadas("lexemas.txt");
		this.programa = programa + this.palabras.getLexema("end_program");
	}

	private void devuelveCaracter() {
		this.posicion--;
	}

	private char extraeCaracter() {
		return this.programa.charAt(this.posicion++);
	}

	public ComponenteLexico getComponenteLexico() {
		// el analizador lexico descarta los espacios (codigo 32), tabuladores (codigo
		// 9), saltos de linea (10 y 13) y comentarios.

		String etiqueta;
		int potencial = 0;
		char anterior = ' ';

		while (true) {

			this.caracter = extraeCaracter();

			if ((int) this.caracter == 13 && potencial == 2) {
				potencial = 0;
				continue;
			}

			else if (this.caracter == ' ' && potencial == 1) {
				this.caracter = '/';
				break;
			}

			else if (this.caracter == ' ' || (int) this.caracter == 9 || (int) this.caracter == 13)
				continue;

			else if ((int) this.caracter == 10)
				this.lineas++;

				// Busqueda de comentario tipo '//'
			else if (this.caracter == '/' && potencial == 0) {
				potencial = 1;
				anterior = this.caracter;
				continue;
			}

			else if (this.caracter == '/' && anterior == '/') {
				potencial = 2;
				continue;
			}
				// Busqueda de comentario tipo '/* */'
			else if (this.caracter == '*' && anterior == '/') {
				potencial = 3;
				continue;
			}

			else if (potencial == 2 || potencial == 3)
				continue;

			else {
				break;
			}
		}

		// secuencias de digitos de numeros enteros o reales

		if (Character.isDigit(this.caracter)) {
			String numero = "";
			boolean esFloat = false;
			boolean error = false;
			int punto = 0;

			do {
				numero = numero + this.caracter;
				this.caracter = extraeCaracter();

			} while (Character.isDigit(this.caracter) || this.caracter == '.');
			devuelveCaracter();

			for (int i = 0; i < numero.length() - 1; i++) {
				if (numero.charAt(i) == '.') {
					punto++;
				}
			}
			if (punto == 1) {
				esFloat = true;
			} else if (punto > 1) {
				esFloat = true;
				error = true;
			}
			if (esFloat) {
				if (error) {
					return new NumeroReal("ERROR", ", hay mas de un punto", lineas);
				} else {
					return new NumeroReal("floatNum", Float.parseFloat(numero) + "", lineas);
				}
			} else {
				return new NumeroEntero("integer", Integer.parseInt(numero) + "", lineas);
			}
		}

		// identifcadores y palabras reservadas

		if (Character.isLetter(this.caracter)) {
			String lexema = "";

			do {
				lexema = lexema + this.caracter;
				this.caracter = extraeCaracter();
				if (caracter == '_') {
					lexema = lexema + this.caracter;
					this.caracter = extraeCaracter();
				}

			} while (Character.isLetterOrDigit(this.caracter));

			devuelveCaracter();

			etiqueta = palabras.getEtiquetaLexica(lexema);
			if (etiqueta == null) {
				return new Identificador("id", lexema, lineas);
			} else {
				return new Identificador((String) etiqueta, lexema, lineas);
			}

		}

		// operadores aritmeticos, relacionales, logicos y caracteres delimitadores

		String lexema = "";
		String lexemaAlternativo;
		String etiquetaAlternativa;

		do {
			lexema = lexema + this.caracter;
			etiqueta = palabras.getEtiquetaLexica(lexema);

			if (etiqueta != null) {
				if (etiqueta.equals("end_program"))
					return new Identificador(etiqueta, lexema, lineas);
			}

			lexemaAlternativo = lexema;
			this.caracter = extraeCaracter();
			lexemaAlternativo = lexemaAlternativo + this.caracter;
			etiquetaAlternativa = palabras.getEtiquetaLexica(lexemaAlternativo);

			if (etiquetaAlternativa != null) {
				etiqueta = etiquetaAlternativa;
			}

		} while (etiquetaAlternativa != null);
		devuelveCaracter();
		return new Identificador(etiqueta, lexema, lineas);
	}

	public int getLineas() {
		return this.lineas;
	}

}
