package org.casopractico;

public abstract class TipoDato {
	private String tipo;

	public String getTipo() {
		return tipo;
	}

	protected void setTipo(String t) {
		this.tipo = t;
	}

	public abstract String toString();
}
