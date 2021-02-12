package it.akademija.models;

public class UserInfo {

	private Long id;
	private String username;
	private String password;
	private Role role;

	public UserInfo() {
	}

	public UserInfo(long id, String username, String password, Role role) {
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
