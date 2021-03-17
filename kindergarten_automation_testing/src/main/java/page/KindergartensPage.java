package page;

import java.util.Random;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class KindergartensPage extends AbstractPage {

	public KindergartensPage(WebDriver driver) {
		super(driver);
	}

	WebDriverWait wait = new WebDriverWait(driver, 10);

	Random rand = new Random();

	private String name = "Vilniaus Saulute " + rand.nextInt(1000);
	private String adrress = "Gedimino pr. " + rand.nextInt(1000);

	/* buttons */
	@FindBy(xpath = "//button[@class='btn btn-md btn-success']")
	public WebElement newKindergatenButton;

	@FindBy(xpath = "//button[@class='btn btn-md btn-success']")
	public WebElement confirmKindergartenButton;

	/* inputs */
	@FindBy(id = "name")
	public WebElement inputKindergartenName;

	@FindBy(id = "address")
	public WebElement inputKindergartenAddress;

	/* text */
	@FindBy(css = "#root > div > div > div.col-12.col-sm-12.col-md-7.col-lg-7.mt-5 > div.row > div > table > tfoot > tr > td:nth-child(2) > div > div")
	public WebElement textKindergartenAddedsuccessful;

	@FindBy(xpath = "//button[@class='btn btn-md btn-success']")
	public WebElement textOnAddKindergartenButton;

	/* methods */
	public void clickNewKindergartenButton() {
		newKindergatenButton.click();
	}

	public void addKindergartenName() {
		inputKindergartenName.sendKeys(name);
	}

	public void addKindergartenAddress() {
		inputKindergartenAddress.sendKeys(adrress);
	}

	public void clickAddNewKindergartenButton() {
		confirmKindergartenButton.click();
	}

	public String textKindergartenAdded() {
		return textKindergartenAddedsuccessful.getText();

	}

	// check if are button add kindergarten

	public String textOnButtonAddKindergarten() {
		return textOnAddKindergartenButton.getText();
	}

	/* waits */

	public void waitForAddKindergartenButtonText() {
		new WebDriverWait(driver, 8).until(ExpectedConditions.visibilityOf(this.textOnAddKindergartenButton));
	}

	public void waitForConfirmNewKindergartenButton() {
		wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//div[@class='alert alert-success']")));
	}

}
