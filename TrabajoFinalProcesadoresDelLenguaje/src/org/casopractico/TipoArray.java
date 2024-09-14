package org.casopractico;

public class TipoArray extends TipoDato {
	private int tamanio;

	public TipoArray(int tamanio, String t) {
		this.tamanio = tamanio;
		super.setTipo(t);
	}

	public String toString() {
		return "array (" + super.getTipo() + ", " + this.tamanio + ")";
	}

}
