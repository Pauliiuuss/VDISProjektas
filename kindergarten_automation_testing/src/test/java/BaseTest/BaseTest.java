package BaseTest;


import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.BeforeTest;

public abstract class BaseTest {
	
	protected static WebDriver driver;
	
	@BeforeTest(alwaysRun = true)
	public static void setUp() {
		System.setProperty("webdriver.chrome.driver", "driver/chromedriver.exe");
	}
	
	
	@BeforeMethod (alwaysRun = true)
	public void openHomePage(){
		driver = new ChromeDriver();
		driver.manage().window().maximize();
		driver.get("http://akademijait.vtmc.lt:8181/dis-app/");
	}
	


	@AfterMethod (alwaysRun = true)
	public static void tearDown() {
		driver.manage().deleteAllCookies();
		driver.close();
	}
}
