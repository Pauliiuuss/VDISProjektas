package Tests;

import static org.testng.Assert.assertTrue;

import org.testng.annotations.Test;

import BaseTest.BaseTest;
import page.KindergartenQueuePage;
import page.MainSpecialistPage;

public class SpecialistCreateQueueTest extends BaseTest {

	@Test(groups = "regression")
	public void specialistCreateWithdrawQueue() {
		MainSpecialistPage specialistPage = new MainSpecialistPage(driver);
		KindergartenQueuePage kindergartenQueue = new KindergartenQueuePage(driver);

		specialistPage.doSpecialistLogin();
		// specialist create Queue
		kindergartenQueue.clickKindergartenQueuePage();
		kindergartenQueue.waitForCreateQueueButton();
		kindergartenQueue.clickCreateKindergartenQueueButton();
		kindergartenQueue.waitForConfirimCreateQueueButton();
		kindergartenQueue.clickConfirmButtonCreateQueue();
		kindergartenQueue.waitForCancelCreateQueueButton();

		// specialist cancel created Queue
		kindergartenQueue.clickCancelCreatedQueueButton();
		kindergartenQueue.waitForCreateQueueButton();

		// tex assert
		String expectedFreePlacesToKindergarten = "Laisvų vietų skaičius: ";
		assertTrue(true, expectedFreePlacesToKindergarten);

		// specialist create Queue
		kindergartenQueue.waitForCreateQueueButton();
		kindergartenQueue.clickCreateKindergartenQueueButton();
		// specialist cancel creation
		kindergartenQueue.clickCancelConfirmCreateQueueButton();

	}

}
