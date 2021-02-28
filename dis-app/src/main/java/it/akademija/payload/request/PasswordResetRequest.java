package it.akademija.payload.request;

public class PasswordResetRequest {

    private String username;

    public PasswordResetRequest(String username) {
        this.username = username;
    }

    public PasswordResetRequest() {

    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
