package page;

import java.util.List;
import java.util.Random;

import org.openqa.selenium.By;
import org.openqa.selenium.By.ByTagName;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class MainParentPage extends AbstractPage {

	public MainParentPage(WebDriver driver) {
		super(driver);
	}

	WebDriverWait wait = new WebDriverWait(driver, 10);

	Random rand = new Random();

	private String username = "MariusAdomaitis";
	private String password = "MariusAdomaitis";
	private String name = "Marius";
	private String lastname = "Adomaitis";
	private String mobilephone = "12345678";
	private String email = "marius@adomaitis" + rand.nextInt(1000) + ".lt";
	private String parentUsername = "Atstovas" + rand.nextInt(1000);
	private String parentName = "Vardenis";
	private String parentLastname = "Pavardenis";
	private String parentID = "12345678" + (rand.nextInt(900) + 100);
	private String parentAddress = "Ukmerges g. 19";
	private String parentCity = "Vilnius";
	private String birthdate = "09122016";

	/* inputs */
	@FindBy(css = "#root > div > div > div > form > div.form-group.mx-auto.mt-3 > div > input")
	public WebElement inputUsername;

	@FindBy(css = "#root > div > div > div > form > div:nth-child(2) > div > input")
	private WebElement inputPassword;

	@FindBy(id = "name")
	private WebElement inputParentName;

	// add personal data "Mano duomenys"
	@FindBy(id = "Vardas")
	private WebElement inputPersonalName;

	@FindBy(id = "Pavardė")
	private WebElement inputPersonalLastname;

	@FindBy(id = "Tel")
	private WebElement inputMobilphone;

	@FindBy(id = "El.paštas")
	private WebElement inputEmail;

	/* buttons */
	@FindBy(css = "#root > div > div > div > form > div.form-group.text-center.mt-5 > button")
	private WebElement loginButton;

	@FindBy(css = "#root > nav > ul > li:nth-child(6) > a")
	private WebElement logoutButton;

	// upload PDF button
	@FindBy(css = "#root > div > div > div:nth-child(3) > div > table > tbody > tr > td:nth-child(7) > div.btn-group > button.btn.btn-secondary")
	private WebElement uploadPdfButton;

	// admin selects the parent button
	@FindBy(id = "ROLE_PARENT")
	private WebElement selectParent;

	@FindBy(css = "#root > div > div > div.col-12.col-sm-12.col-md-4.col-lg-4 > form > button.btn.btn-success.mr-3")
	private WebElement clickCreate;

	// "Mano duomenys"
	@FindBy(css = "#root > nav > ul > li:nth-child(4) > a")
	private WebElement myDataButton;

	@FindBy(css = "#root > div > div > div:nth-child(1) > div > form > div:nth-child(2) > div > button.btn.btn-success.mx-auto")
	private WebElement updateMyDataButton;

	// "Mano prasymai"
	@FindBy(xpath = "//button[@class='btn btn-info ']")
	private WebElement checkApplicationForm;

	@FindBy(xpath = "//button[@class='btn btn-danger my-5 m-1']")
	private WebElement deleteApplicationFormButton;

	@FindBy(xpath = "//button[@class='swal-button swal-button--confirm sweet-confirm']")
	private WebElement delteApplicatonFormConfirmationButton;

	/* text */
	@FindBy(css = "#root > nav > ul > li:nth-child(5) > a > span")
	private WebElement successfulParentLogin;

	@FindBy(css = "#root > div > div > div > form > div.form-group.mx-auto.mt-3 > label")
	private WebElement successfulParentLogout;

	// "mano duomenys"
	@FindBy(xpath = "//div[@class='alert alert-success']")
	private WebElement updatePersonalData;

	// parent creates child's registration form
	@FindBy(css = "#root > div > div:nth-child(1) > div > a")
	private WebElement clickFormUpload;

	@FindBy(xpath = "//button[@class='btn btn-success']")
	private WebElement uploadFile;

	@FindBy(id = "vardasAtstovas1")
	private WebElement addParentName;

	@FindBy(id = "pavardeAtstovas1")
	private WebElement addParentLastname;

	@FindBy(id = "kodasAtstovas1")
	private WebElement inputParentID;

	@FindBy(id = "adresasAtstovas1")
	private WebElement inputParentAddress;

	@FindBy(id = "miestasAtstovas1")
	private WebElement inputParentCity;

	@FindBy(id = "telAtstovas1")
	private WebElement inputParentNumber;

	@FindBy(xpath = "//*[@id=\"elpastasAtstovas1\"]")
	private WebElement inputParentEmail;

	@FindBy(id = "vaikoVardas")
	private WebElement inputChildName;

	@FindBy(id = "vaikoPavarde")
	private WebElement inputChildLastname;

	@FindBy(id = "vaikoKodas")
	private WebElement inputChildID;

	@FindBy(id = "gimimoData")
	private WebElement inputBirthdate;

	@FindBy(id = "vaikoAdresas")
	private WebElement inputChildAddress;

	@FindBy(id = "vaikoMiestas")
	private WebElement inputChildCity;

	@FindBy(id = "inCity")
	private WebElement inputPriority;

	@FindBy(xpath = "//button[@class='btn btn-success my-5']")
	private WebElement submitButton;

	@FindBy(xpath = "//div[text()='Failas įkeltas sėkmingai!']")
	private WebElement textSuccessfulPdfUpload;

	// Mano prasymai
	@FindBy(xpath = "//div[@class='alert alert-secondary text-center d-grid gap-2 col-6 mx-auto']")
	private WebElement textApplicationFormDelted;

	/* methods */
	public void doParentLogin() {
		inputUsername.sendKeys(username);
		inputPassword.sendKeys(password);
		loginButton.click();
		wait.until(ExpectedConditions
				.presenceOfElementLocated(By.cssSelector("#root > nav > ul > li:nth-child(5) > a > span")));
	}

	public void doParentLoginUploadTest() {
		inputUsername.sendKeys(parentUsername);
		inputPassword.sendKeys(parentUsername);
		loginButton.click();
	}

	public void doParentLogout() {
		this.logoutButton.click();
	}

	public String textSuccessfulParentLogin() {
		return successfulParentLogin.getText();
	}

	public String textSuccessfulParentLogout() {
		return successfulParentLogout.getText();
	}

	// Mano duomenys
	public void clickMyDataButton() {
		myDataButton.click();
	}

	// add Parent personal data
	public void addParentName() {
		inputPersonalName.clear();
		inputPersonalName.sendKeys(name);
	}

	public void addParentLastName() {
		inputPersonalLastname.clear();
		inputPersonalLastname.sendKeys(lastname);
	}

	public void addParentPhone() {
		inputMobilphone.clear();
		inputMobilphone.sendKeys(mobilephone);
	}

	public void addParentEmail() {
		inputEmail.clear();
		inputEmail.sendKeys(email);
	}

	public void clickUpdateMyDataButton() {
		updateMyDataButton.click();
	}

	public String textUpdateData() {
		return updatePersonalData.getText();
	}

	// admin creates parent
	public void addParentUsername() {
		inputParentName.sendKeys(parentUsername);
	}

	public void selectParent() {
		selectParent.click();
	}

	public void clickCreateButton() {
		clickCreate.click();
	}

	// parent creates child's registration form
	public void clickFormUploadButton() {
		clickFormUpload.click();
	}

	public void addParentNameInput() {
		addParentName.clear();
		addParentName.sendKeys(parentName);
	}

	public void addParentLastnameInput() {
		addParentLastname.clear();
		addParentLastname.sendKeys(parentLastname);
	}

	public void addParentID() {
		inputParentID.clear();
		inputParentID.sendKeys(parentID);
	}

	public void addParentAddress() {
		inputParentAddress.clear();
		inputParentAddress.sendKeys(parentAddress);
	}

	public void addParentCity() {
		inputParentCity.clear();
		inputParentCity.sendKeys(parentCity);
	}

	public void addParentNumber() {
		inputParentNumber.clear();
		inputParentNumber.sendKeys(mobilephone);
	}

	public void addParentEmailInput() {
		inputParentEmail.clear();
		inputParentEmail.sendKeys(email);
	}

	public void addChildName() {
		inputChildName.clear();
		inputChildName.sendKeys(name);
	}

	public void addChildLastname() {
		inputChildLastname.clear();
		inputChildLastname.sendKeys(lastname);
	}

	public void addChildId() {
		inputChildID.clear();
		inputChildID.sendKeys(parentID);
	}

	public void addBirthdateInput() {
		inputBirthdate.sendKeys(birthdate);
	}

	public void addChildAddress() {
		inputChildAddress.sendKeys(parentAddress);
	}

	public void addChildCity() {
		inputChildCity.sendKeys(parentCity);
	}

	public void selectKindergarten() {
		List<WebElement> kindergartensElems = driver
				.findElements(ByTagName.xpath("//*[@id=\"kindergarten1\"]//option"));

		int maxKindergartens = kindergartensElems.size();
		Random random = new Random();
		// int randomKindergarten = random.nextInt(maxKindergartens);
		int randomKindergarten = random.ints(1, maxKindergartens + 1).findFirst().getAsInt();
		kindergartensElems.get(randomKindergarten).click();

	}

	public void selectPriorities() {
		inputPriority.click();
	}

	public void clickSubmitButton() {
		submitButton.click();
	}

	public void clickPdfUploadButton() {
		uploadFile.click();
	}

	public String gettextSuccessfulPdfUploadText() {
		return textSuccessfulPdfUpload.getText();
	}

	// Mano prasymai

	public void clickApplicationFormInformationButton() {
		checkApplicationForm.click();
	}

	public void deleteApplicationFormButton() {
		deleteApplicationFormButton.click();
	}

	public void delteApplicationFormConfirmationButton() {
		delteApplicatonFormConfirmationButton.click();
	}

	public String getTextNoApplicationsForms() {
		return textApplicationFormDelted.getText();
	}

	/* waits */
	public void waitForMyDataNameInput() {
		new WebDriverWait(driver, 5).until(ExpectedConditions.visibilityOf(this.inputPersonalName));
	}

	public void waitForUpdateMyDataButton() {
		new WebDriverWait(driver, 5).until(ExpectedConditions.visibilityOf(this.updateMyDataButton));
	}

	public void waitForApplicationFormUploadButton() {
		wait.until(
				ExpectedConditions.presenceOfElementLocated(By.xpath("//h2[@class=' text-center text-success my-5']")));
	}

	public void waitForChooseKindergartenFromList() {
		wait.until(ExpectedConditions
				.presenceOfElementLocated(By.cssSelector("#root > form > div:nth-child(5) > div > h3")));
	}

	public void waitForSpecialConditionsList() {
		wait.until(ExpectedConditions
				.presenceOfElementLocated(By.cssSelector("#root > form > div:nth-child(6) > div > h3")));
	}

	public void waitForApplicationSubmitButton() {
		wait.until(ExpectedConditions.visibilityOf(this.submitButton));
	}

	public void waitForCheckApplicationFormButton() {
		wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//button[@class='btn btn-info ']")));
	}

	public void waitForDeleteApplicationFormButton() {
		wait.until(ExpectedConditions.visibilityOf(this.deleteApplicationFormButton));
	}

	public void waitForDeleteApplicationFormText() {
		wait.until(ExpectedConditions.visibilityOf(this.textApplicationFormDelted));
	}

	public void waitForSuccessulPdfUploadText() {
		wait.until(ExpectedConditions.visibilityOf(this.textSuccessfulPdfUpload));
	}

}
