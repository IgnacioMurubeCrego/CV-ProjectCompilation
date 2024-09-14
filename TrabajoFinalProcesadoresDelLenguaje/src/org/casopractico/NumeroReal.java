package org.casopractico;

public class NumeroReal extends ComponenteLexico {
	private String valor;

	public NumeroReal(String etiqueta, String valor, int linea) {
		super(etiqueta);
		this.valor = valor;
		super.setLinea(linea);
	}

	public String getValor() {
		return this.valor;
	}

	public String toString() {
		return "<" + super.getEtiqueta() + ", " + this.valor + ">";
	}
}
