package Tests;

import static org.testng.Assert.assertEquals;

import org.testng.annotations.Test;

import BaseTest.BaseTest;
import page.MainSpecialistPage;

public class SpecialistPageTest extends BaseTest {

	@Test(groups = "smoke")
	public void specialistLoginPageTest() throws InterruptedException {
		MainSpecialistPage specialistPage = new MainSpecialistPage(driver);

		specialistPage.doSpecialistLogin();
		// text assert
		assertEquals(specialistPage.textSuccessfulSpecialistLogin(),
				"TomasMikalauskas" + "\n" + "Švietimo specialistas");
	}

	@Test(groups = "smoke")
	public void specialistLogoutPageTest() throws InterruptedException {
		MainSpecialistPage specialistPage = new MainSpecialistPage(driver);

		specialistPage.doSpecialistLogin();
		specialistPage.doSpecialistLogout();
		// text assert
		assertEquals(specialistPage.textSuccessfulSpecialistLogout(), "Prisijungimo vardas");
	}
}
