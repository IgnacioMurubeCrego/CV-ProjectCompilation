package org.casopractico;

public abstract class ComponenteLexico {
	private String etiqueta;
	private int linea;
	private String valor;

	public ComponenteLexico(String etiqueta) {
		this.etiqueta = etiqueta;
		this.valor = "";
	}

	public ComponenteLexico(String etiqueta, String valor) {
		this.etiqueta = etiqueta;
		this.valor = valor;
	}

	public abstract String getValor();

	public String getEtiqueta() {
		return this.etiqueta;
	}

	public int getLinea() {
		return linea;
	}

	public void setLinea(int linea) {
		this.linea = linea;
	}


}
