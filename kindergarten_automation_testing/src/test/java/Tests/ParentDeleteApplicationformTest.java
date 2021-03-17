package Tests;

import static org.testng.Assert.assertEquals;

import java.io.IOException;


import org.testng.annotations.Test;
import BaseTest.BaseTest;
import page.MainParentPage;

public class ParentDeleteApplicationformTest extends BaseTest {
	
  @Test(groups = "regression")
  public void parentDeleteAplicationform() throws IOException, InterruptedException {
		MainParentPage parentPage = new MainParentPage(driver);

	parentPage.doParentLogin();
	
	//parent creates child's registration form
	parentPage.clickFormUploadButton();
	parentPage.waitForApplicationFormUploadButton();
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
	parentPage.waitForChooseKindergartenFromList();
	parentPage.selectKindergarten();
	parentPage.waitForSpecialConditionsList();
	parentPage.selectPriorities();
	parentPage.waitForApplicationSubmitButton();
	parentPage.clickSubmitButton();
	parentPage.waitForCheckApplicationFormButton();
	parentPage.clickApplicationFormInformationButton();
	parentPage.waitForDeleteApplicationFormButton();
	parentPage.deleteApplicationFormButton();
	parentPage.delteApplicationFormConfirmationButton();
	parentPage.waitForDeleteApplicationFormText();
	// text assert
	assertEquals(parentPage.getTextNoApplicationsForms(), "Pateiktų prašymų nėra registruota.");
  }
}
