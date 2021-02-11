package it.akademija.models;

public class ParentInfo {

	private String vardasAtstovas;
	private String pavardeAtstovas;
	private Long kodasAtstovas;
	private String adresasAtstovas;
	private String miestasAtstovas;
	private Long telAtstovas;
	private String elpastasAtstovas;

	public ParentInfo() {
	}

	public ParentInfo(String vardasAtstovas, String pavardeAtstovas, Long kodasAtstovas, String adresasAtstovas,
			String miestasAtstovas, Long telAtstovas, String elpastasAtstovas) {
		this.vardasAtstovas = vardasAtstovas;
		this.pavardeAtstovas = pavardeAtstovas;
		this.kodasAtstovas = kodasAtstovas;
		this.adresasAtstovas = adresasAtstovas;
		this.miestasAtstovas = miestasAtstovas;
		this.telAtstovas = telAtstovas;
		this.elpastasAtstovas = elpastasAtstovas;
	}

	public String getVardasAtstovas() {
		return vardasAtstovas;
	}

	public void setVardasAtstovas(String vardasAtstovas) {
		this.vardasAtstovas = vardasAtstovas;
	}

	public String getPavardeAtstovas() {
		return pavardeAtstovas;
	}

	public void setPavardeAtstovas(String pavardeAtstovas) {
		this.pavardeAtstovas = pavardeAtstovas;
	}

	public Long getKodasAtstovas() {
		return kodasAtstovas;
	}

	public void setKodasAtstovas(Long kodasAtstovas) {
		this.kodasAtstovas = kodasAtstovas;
	}

	public String getAdresasAtstovas() {
		return adresasAtstovas;
	}

	public void setAdresasAtstovas(String adresasAtstovas) {
		this.adresasAtstovas = adresasAtstovas;
	}

	public String getMiestasAtstovas() {
		return miestasAtstovas;
	}

	public void setMiestasAtstovas(String miestasAtstovas) {
		this.miestasAtstovas = miestasAtstovas;
	}

	public Long getTelAtstovas() {
		return telAtstovas;
	}

	public void setTelAtstovas(Long telAtstovas) {
		this.telAtstovas = telAtstovas;
	}

	public String getElpastasAtstovas() {
		return elpastasAtstovas;
	}

	public void setElpastasAtstovas(String elpastasAtstovas) {
		this.elpastasAtstovas = elpastasAtstovas;
	}

}
