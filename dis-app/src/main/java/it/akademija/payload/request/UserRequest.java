package it.akademija.payload.request;

import it.akademija.models.Role;

public class UserRequest {

	private Long id;
	private String username;
	private String password;
	private Role role;

	public UserRequest() {
	}

	public UserRequest(long id, String username, String password, Role role) {
		this.id = id;
		this.username = username;
		this.password = password;
		this.role = role;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRole() {
		return role.toString();
	}

	public void setRole(Role role) {
		this.role = role;
	}
}
