package it.akademija.models;

import javax.persistence.*;

public class KindergartenPriorityInfo {

    private long id;

    private String kindergartenOne;
    private String kindergartenTwo;
    private String kindergartenThree;
    private String kindergartenFour;
    private String kindergartenFive;

    private ChildForm childForm;

    public KindergartenPriorityInfo() {
    }

    public KindergartenPriorityInfo(String kindergartenOne, String kindergartenTwo, String kindergartenThree,
                                    String kindergartenFour, String kindergartenFive) {
        this.kindergartenOne = kindergartenOne;
        this.kindergartenTwo = kindergartenTwo;
        this.kindergartenThree = kindergartenThree;
        this.kindergartenFour = kindergartenFour;
        this.kindergartenFive = kindergartenFive;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getKindergartenOne() {
        return kindergartenOne;
    }

    public void setKindergartenOne(String kindergartenOne) {
        this.kindergartenOne = kindergartenOne;
    }

    public String getKindergartenTwo() {
        return kindergartenTwo;
    }

    public void setKindergartenTwo(String kindergartenTwo) {
        this.kindergartenTwo = kindergartenTwo;
    }

    public String getKindergartenThree() {
        return kindergartenThree;
    }

    public void setKindergartenThree(String kindergartenThree) {
        this.kindergartenThree = kindergartenThree;
    }

    public String getKindergartenFour() {
        return kindergartenFour;
    }

    public void setKindergartenFour(String kindergartenFour) {
        this.kindergartenFour = kindergartenFour;
    }

    public String getKindergartenFive() {
        return kindergartenFive;
    }

    public void setKindergartenFive(String kindergartenFive) {
        this.kindergartenFive = kindergartenFive;
    }

    public ChildForm getChildForm() {
        return childForm;
    }

    public void setChildForm(ChildForm childForm) {
        this.childForm = childForm;
    }
}
