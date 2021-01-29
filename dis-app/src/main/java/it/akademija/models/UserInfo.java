package it.akademija.models;

import java.util.Set;

public class UserInfo {

	private Long id;
	private String username;
	private String password;
	private Set<Role> roles;

	public UserInfo() {
	}

	public UserInfo(Long id, String username, String password, Set<Role> roles) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.roles = roles;
	}

	public UserInfo(Long id, String username, String password) {
		this.id = id;
		this.username = username;
		this.password = password;
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

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRoles() {
		return roles.toString();
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

}
