package Tests;

import static org.testng.Assert.assertEquals;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.Test;

import BaseTest.BaseTest;
import page.MainAdminPage;
import page.MainParentPage;

public class ChildRegistrationTest extends BaseTest {

	@Test(groups = "regression")
	public void pdfUploadTest() throws InterruptedException, IOException {

		MainAdminPage adminPage = new MainAdminPage(driver);
		MainParentPage parentPage = new MainParentPage(driver);

		WebDriverWait wait = new WebDriverWait(driver, 10);

		// admin login
		adminPage.doAdminLogin();
		wait.until(ExpectedConditions.presenceOfElementLocated(By.id("name")));

		// admin creates parent
		parentPage.addParentUsername();
		parentPage.selectParent();
		parentPage.clickCreateButton();
		wait.until(ExpectedConditions.presenceOfElementLocated(By.id("name")));

		// admin logout
		adminPage.doAdminLogout();

		// parent login
		parentPage.doParentLoginUploadTest();
		wait.until(ExpectedConditions.presenceOfElementLocated(
				By.xpath("//h3[@class='text-secondary col-12 col-sm-12 col-md-6 col-lg-6 mb-3']")));

		// parent creates child's registration form
		parentPage.clickFormUploadButton();
		Thread.sleep(4000);
		parentPage.addParentNameInput();
		parentPage.addParentLastnameInput();
		parentPage.addParentID();
		parentPage.addParentAddress();
		parentPage.addParentCity();
		parentPage.addParentNumber();
		parentPage.addParentEmailInput();
		parentPage.addChildName();
		parentPage.addChildLastname();
		parentPage.addChildId();
		parentPage.addBirthdateInput();
		parentPage.addChildAddress();
		parentPage.addChildCity();
		parentPage.selectKindergarten();
		parentPage.selectPriorities();
		parentPage.clickSubmitButton();
		wait.until(ExpectedConditions.presenceOfElementLocated(By.id("files")));

		// pdf upload
		JavascriptExecutor js = (JavascriptExecutor) driver;
		js.executeScript("document.querySelector('#files').style ='';");

		// takes PDF file for resources folder
		Path resourceDirectory = Paths.get("src", "test", "resources");
		String absolutePath = resourceDirectory.toFile().getAbsolutePath();
		driver.findElement(By.id("files")).sendKeys(absolutePath + "\\Test_PDF.pdf");

		parentPage.clickPdfUploadButton();
		parentPage.waitForSuccessulPdfUploadText();

		// assert the text
		String actualUpdateDataText = parentPage.gettextSuccessfulPdfUploadText();
		assertEquals(true, actualUpdateDataText.contains("Failas įkeltas sėkmingai"));
	}

}
