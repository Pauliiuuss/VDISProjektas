package it.akademija.models;

import javax.persistence.*;

@Entity
@Table(name = "status_types")
public class FormStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Enumerated(EnumType.STRING)
    private EFormStatus name;

    public FormStatus() {
    }

    public FormStatus(EFormStatus name) {
        this.name = name;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public EFormStatus getName() {
        return name;
    }

    public void setName(EFormStatus name) {
        this.name = name;
    }

    @Override
    public String toString() {
        if (name == EFormStatus.PATEIKTAS) {
            return "Pateiktas";
        } else if (name == EFormStatus.PANAIKINTAS) {
            return "Panaikintas";
        } else if (name == EFormStatus.EILEJE) {
            return "Eileje";
        } else return "Priimtas";
    }

}
