package Tests;

import static org.testng.Assert.assertEquals;

import java.io.IOException;

import org.testng.annotations.Test;

import BaseTest.BaseTest;
import page.MainAdminPage;
import page.SpecialistPasswordChange;

public class SpecialistPasswordChangeTest extends BaseTest {

	@Test(groups = "regression")
	public void specialistPasswordChangeTest() throws InterruptedException, IOException {
		SpecialistPasswordChange passwordChange = new SpecialistPasswordChange(driver);
		MainAdminPage mainPage = new MainAdminPage(driver);

		// admin login
		mainPage.doAdminLogin();
		mainPage.waitForCreateUserText();

		// admin created user
		passwordChange.createNewSpecialist();
		passwordChange.clickCreateNewSpecialistButton();

		// admin logout
		mainPage.doAdminLogout();

		// specialist login
		passwordChange.addSpecialistUsername();
		passwordChange.addSpecialistPassword();
		passwordChange.clickLoginButton();
		passwordChange.waitForMyDataButton();

		// specialist changed password
		passwordChange.clickMyDataButton();
		passwordChange.waitForInputOldPassword();
		passwordChange.addOldPassword();
		passwordChange.addNewPassword();
		passwordChange.clickChangeButton();
		passwordChange.waitForSuccessfulSpecialistChangePasswordText();

		// text assert
		assertEquals(passwordChange.textSuccessfulSpecialistLogin(), "Slaptažodis atnaujintas!");
	}

}
