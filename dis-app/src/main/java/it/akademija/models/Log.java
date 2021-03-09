package it.akademija.models;

public class Log {

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

}
