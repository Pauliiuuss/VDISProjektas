package Tests;

import static org.testng.Assert.assertEquals;

import org.testng.annotations.Test;

import BaseTest.BaseTest;
import page.MainSpecialistPage;
import page.SpecialistPasswordChange;

public class SpecialistAddPersonalDataTest extends BaseTest {

	@Test(groups = "regression")
	public void specialistAddPersonalDataTest() {
		MainSpecialistPage specialistPage = new MainSpecialistPage(driver);
		SpecialistPasswordChange passwordChange = new SpecialistPasswordChange(driver);

		specialistPage.doSpecialistLogin();

		// specialist go to MyData
		passwordChange.clickMyDataButton();
		specialistPage.waitForMyDataNameInput();
		specialistPage.addSpecialistName();
		specialistPage.addSpecialistLastName();
		specialistPage.addSpecialistPhone();
		specialistPage.addSpecialistEmail();
		specialistPage.clickUpdateMyDataButton();
		specialistPage.waitForUpdatedDataText();

		// text assert
		assertEquals(specialistPage.textUpdateData(), "Duomenys atnaujinti!");
	}
}
