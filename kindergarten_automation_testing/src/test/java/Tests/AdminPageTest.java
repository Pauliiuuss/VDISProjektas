package Tests;

import static org.testng.Assert.assertEquals;

import java.io.IOException;

import org.openqa.selenium.By;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.Test;

import BaseTest.BaseTest;
import page.MainAdminPage;

public class AdminPageTest extends BaseTest {

	@Test(groups = "smoke")
	public void mainPageTest() throws InterruptedException, IOException {
		MainAdminPage mainPage = new MainAdminPage(driver);
		WebDriverWait wait = new WebDriverWait(driver, 5);

		// admin login
		mainPage.doAdminLogin();
		wait.until(ExpectedConditions
				.presenceOfElementLocated(By.cssSelector("#root > nav > ul > li:nth-child(2) > a > span")));
		assertEquals(mainPage.textSuccessfulAdminLogin(), "Administratorius");

		// admin logout
		mainPage.doAdminLogout();
		assertEquals(mainPage.textSuccessfulAdminLogout(), "Prisijungimo vardas");

	}

}
