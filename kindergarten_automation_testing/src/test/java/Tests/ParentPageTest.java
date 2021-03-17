package Tests;

import static org.testng.Assert.assertEquals;

import org.testng.annotations.Test;

import BaseTest.BaseTest;
import page.MainParentPage;

public class ParentPageTest extends BaseTest {

	@Test(groups = "smoke")
	public void parentLoginPageTest() throws InterruptedException {
		MainParentPage parentPage = new MainParentPage(driver);

		parentPage.doParentLogin();
		// text assert
		assertEquals(parentPage.textSuccessfulParentLogin(), "Vaiko atstovas");
	}

	@Test(groups = "smoke")
	public void parentLogoutTest() throws InterruptedException {
		MainParentPage parentPage = new MainParentPage(driver);

		parentPage.doParentLogin();
		parentPage.doParentLogout();

		// text assert
		assertEquals(parentPage.textSuccessfulParentLogout(), "Prisijungimo vardas");
	}

}
