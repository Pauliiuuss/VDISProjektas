package it.akademija.models;

import it.akademija.services.AdminService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

public class Log {

	private static final Logger LOGGER = LoggerFactory.getLogger(AdminService.class);

	private String date;
	private String time;
	private String user;
	private String action;

	public Log(String date, String time, String user, String action) {
		super();
		this.date = date;
		this.time = time;
		this.user = user;
		this.action = action;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public String getAction() {
		return action;
	}

	public void setAction(String action) {
		this.action = action;
	}

	public static void logMessage(String user, String message) {
		LOGGER.info(user + " -- " + message);
	}

	public static void logMessage(String message) {
		System.out.println("++++++++++++++++++++++++++++++++++++++++++++-" + getUsername() + "-+");
		if (getUsername().equals("admin"))
			LOGGER.info("Administratorius -- " + message);
		if (!getUsername().equals("Test") && !getUsername().equals("admin"))
			LOGGER.info(getUsername() + " -- " + message);
	}

	public static String getUsername() {
		if (SecurityContextHolder.getContext() != null
				&& SecurityContextHolder.getContext().getAuthentication() != null) {
			Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			String username = "Įvymo klaida";
			if (principal instanceof UserDetails) {
				username = ((UserDetails) principal).getUsername();
			} else {
				username = principal.toString();
			}
			return username;
		} else {
			return "Test";
		}
	}

}
