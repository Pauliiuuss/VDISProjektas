package Tests;

import static org.testng.Assert.assertEquals;

import org.testng.annotations.Test;

import BaseTest.BaseTest;
import page.MainParentPage;

public class ParentAddPersonalDataTest extends BaseTest {
	@Test(groups = "regression")
	public void parentAddPersonalDataTest() throws InterruptedException {
		MainParentPage parentPage = new MainParentPage(driver);

		parentPage.doParentLogin();
		parentPage.clickMyDataButton();
		parentPage.waitForMyDataNameInput();
		parentPage.addParentName();
		parentPage.addParentLastName();
		parentPage.addParentPhone();
		parentPage.addParentEmail();
		parentPage.clickUpdateMyDataButton();
		parentPage.waitForUpdateMyDataButton();

		// assert the text
		assertEquals(parentPage.textUpdateData(), "Duomenys atnaujinti!");
	}
}
