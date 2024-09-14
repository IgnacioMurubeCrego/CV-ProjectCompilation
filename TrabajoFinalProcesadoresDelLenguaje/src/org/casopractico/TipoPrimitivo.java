package org.casopractico;

public class TipoPrimitivo extends TipoDato {
	
	public TipoPrimitivo(String t) {
		super.setTipo(t);
	}

	public String toString() {
		return super.getTipo();
	}

}
