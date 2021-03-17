package page;

import java.util.Random;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class SpecialistPasswordChange extends AbstractPage {
	
	public SpecialistPasswordChange(WebDriver driver) {
		super(driver);
	}
	
	WebDriverWait wait = new WebDriverWait(driver, 10);

	Random rand = new Random();

	private String newSpecialistUsername = "Specialist" + rand.nextInt(1000);
	private String specialistPassword = "Test" + rand.nextInt(1000000);

	/* inputs */
	@FindBy(name = "name")
	private WebElement inputNewSpecialist;

	@FindBy(css = "#root > div > div > div > form > div.form-group.mx-auto.mt-3 > div > input")
	public WebElement inputUsername;

	@FindBy(css = "#root > div > div > div > form > div:nth-child(2) > div > input")
	private WebElement inputPassword;

	@FindBy(xpath = "//input[@id='Dabartinis slaptažodis']")
	private WebElement oldPassword;

	@FindBy(id = "Naujas slaptažodis")
	private WebElement addNewPassword;

	@FindBy(id = "Pakartokite naują slaptažodį")
	private WebElement repeatNewPassword;

	/* buttons */

	@FindBy(xpath = "//button[@class='btn btn-secondary']")
	private WebElement loginButton;

	@FindBy(xpath = "//button[@class='btn btn-success mr-3']")
	private WebElement createSpecialistButton;

	@FindBy(css = "#root > div > nav > div:nth-child(3) > li > a")
	private WebElement logoutButton;

	@FindBy(css = "#root > nav > ul > li:nth-child(5) > a")
	private WebElement myDataButton;

	@FindBy(css = "#root > div > div > div:nth-child(2) > div > form > div:nth-child(2) > button")
	private WebElement changePassword;

	/* texts */
	@FindBy(xpath = "//div[@class='alert alert-success']")
	private WebElement successfulSpecialistLogin;

	/* methods */

// create new specialist
	public void createNewSpecialist() {
		inputNewSpecialist.sendKeys(newSpecialistUsername);
	}

	public void clickCreateNewSpecialistButton() {
		createSpecialistButton.click();
	}

	// specialist login

	public void addSpecialistUsername() {
		inputUsername.sendKeys(newSpecialistUsername);
	}

	public void addSpecialistPassword() {
		inputPassword.sendKeys(newSpecialistUsername);
	}

	public void clickLoginButton() {
		loginButton.click();
	}

	// Specialist changes the password
	public void clickMyDataButton() {
		myDataButton.click();
	}

	public void addOldPassword() {
		oldPassword.sendKeys(newSpecialistUsername);
	}

	public void addNewPassword() {
		addNewPassword.sendKeys(specialistPassword);
		repeatNewPassword.sendKeys(specialistPassword);
	}

	public void clickChangeButton() {
		changePassword.click();
	}

	public String textSuccessfulSpecialistLogin() {
		return successfulSpecialistLogin.getText();
	}


	/* waits */

	public void waitForInputOldPassword() {
		new WebDriverWait(driver, 8).until(ExpectedConditions.visibilityOf(this.oldPassword));
	}

	public void waitForMyDataButton() {
		wait.until(
				ExpectedConditions.presenceOfElementLocated(By.cssSelector("#root > nav > ul > li:nth-child(6) > a")));
	}

	public void waitForSuccessfulSpecialistChangePasswordText() {
		wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//div[@class='alert alert-success']")));
	}
	
	
	

}
