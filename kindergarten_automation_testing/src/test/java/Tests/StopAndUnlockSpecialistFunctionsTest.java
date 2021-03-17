package Tests;

import static org.testng.Assert.assertEquals;

import java.io.IOException;

import org.testng.annotations.Test;

import BaseTest.BaseTest;
import page.KindergartenQueuePage;
import page.KindergartensPage;
import page.MainAdminPage;
import page.MainSpecialistPage;

public class StopAndUnlockSpecialistFunctionsTest extends BaseTest {
	@Test(groups = "regression")
	public void adminLockUnlockSpecialistFunctions() throws InterruptedException, IOException {
		MainAdminPage mainPage = new MainAdminPage(driver);
		MainSpecialistPage specialistPage = new MainSpecialistPage(driver);
		KindergartensPage kindergartensPage = new KindergartensPage(driver);
		KindergartenQueuePage kindergartenQueue = new KindergartenQueuePage(driver);

		// admin login and lock specialist functions
		mainPage.doAdminLogin();
		mainPage.waitForLockSpecialistButton();
		mainPage.clickLockButton();
		mainPage.waitForSuccessfulLockedSpecialistText();

		// assert the text
		assertEquals(mainPage.textSuccessfulLockedUnlockedSpecialist(),
				"Švietimo specialistų funkcionalumas užrakintas");

		mainPage.doAdminLogout();

		// specialist login and check functions
		specialistPage.doSpecialistLogin();

		// assert the text
		assertEquals(specialistPage.addKindergartenNotPossibleText(), "Naujų darželių ir grupių pridėjimas negalimas");

		specialistPage.clickKindergartenQueueLink();

		// assert the text
		assertEquals(specialistPage.createQueueLockedText(), "Eilių sudarymas ir atšaukimas negalimas");

		specialistPage.doSpecialistLogout();

		// admin login and unlock Specialist functions
		mainPage.doAdminLogin();
		mainPage.waitForUnlockSpecialistButton();
		mainPage.clickUnlockButton();
		mainPage.waitForSuccessfulUnlockedSpecialistText();

		// assert the text
		assertEquals(mainPage.textSuccessfulLockedUnlockedSpecialist(),
				"Švietimo specialistų funkcionalumas atstatytas");

		mainPage.doAdminLogout();

		// specialist login and check functions
		specialistPage.doSpecialistLogin();
		kindergartensPage.waitForAddKindergartenButtonText();

		// assert the text
		assertEquals(kindergartensPage.textOnButtonAddKindergarten(), "Pridėti darželį");

		kindergartenQueue.clickKindergartenQueuePage();
		kindergartenQueue.waitForCreateQueueButton();

		// assert the text
		assertEquals(kindergartenQueue.textOnKindergartenQueueButton(), "Sudaryti eiles");

		specialistPage.doSpecialistLogout();
	}
}
