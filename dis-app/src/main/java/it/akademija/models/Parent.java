package it.akademija.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;

@Entity
public class Parent {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@NotBlank
	private String vardasAtstovas;
	@NotBlank
	private String pavardeAtstovas;
	@NotBlank
	private Long kodasAtstovas;
	@NotBlank
	private String adresasAtstovas;
	@NotBlank
	private String miestasAtstovas;
	@NotBlank
	private Long telAtstovas;
	@NotBlank
	private String elpastasAtstovas;

	public Parent() {
	}

	public Parent(ParentInfo info) {
		this.vardasAtstovas = info.getElpastasAtstovas();
		this.pavardeAtstovas = info.getPavardeAtstovas();
		this.kodasAtstovas = info.getKodasAtstovas();
		this.adresasAtstovas = info.getAdresasAtstovas();
		this.miestasAtstovas = info.getMiestasAtstovas();
		this.telAtstovas = info.getTelAtstovas();
		this.elpastasAtstovas = info.getElpastasAtstovas();
	}

	public Parent(long id, @NotBlank String vardasAtstovas, @NotBlank String pavardeAtstovas,
			@NotBlank Long kodasAtstovas, @NotBlank String adresasAtstovas, @NotBlank String miestasAtstovas,
			@NotBlank Long telAtstovas, @NotBlank String elpastasAtstovas) {
		super();
		this.id = id;
		this.vardasAtstovas = vardasAtstovas;
		this.pavardeAtstovas = pavardeAtstovas;
		this.kodasAtstovas = kodasAtstovas;
		this.adresasAtstovas = adresasAtstovas;
		this.miestasAtstovas = miestasAtstovas;
		this.telAtstovas = telAtstovas;
		this.elpastasAtstovas = elpastasAtstovas;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Parent(String vardasAtstovas, String pavardeAtstovas, Long kodasAtstovas, String adresasAtstovas,
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
