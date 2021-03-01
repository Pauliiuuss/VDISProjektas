package it.akademija;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.ArrayList;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;

import it.akademija.models.AppStatus;
import it.akademija.models.FormStatus;
import it.akademija.models.Group;
import it.akademija.models.Kindergarten;
import it.akademija.models.Role;
import it.akademija.models.User;
import it.akademija.models.enums.EFormStatus;
import it.akademija.models.enums.ERole;
import it.akademija.repository.AppStatusRepo;
import it.akademija.repository.FormStatusRepository;
import it.akademija.repository.GroupRepository;
import it.akademija.repository.KindergartenRepository;
import it.akademija.repository.RoleRepository;
import it.akademija.repository.UserRepository;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@EnableSwagger2
@SpringBootApplication
public class App extends SpringBootServletInitializer implements CommandLineRunner {

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private KindergartenRepository kindergartenRepository;

	@Autowired
	private GroupRepository groupRepository;

	@Autowired
	private FormStatusRepository formStatusRepository;

	@Autowired
	private AppStatusRepo appStatusRepo;

	@Bean
	public Docket swaggerDocket() {
		return new Docket(DocumentationType.SWAGGER_2).apiInfo(apiInfo()).select()
				.apis(RequestHandlerSelectors.basePackage("it.akademija")).build();
	}

	private ApiInfo apiInfo() {
		return new ApiInfoBuilder().title("IT Akademija REST Documentation").version("0.0.1-SNAPSHOT").build();
	}

	public static void main(String[] args) {
		SpringApplication.run(App.class, args);
	}

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
		return builder.sources(App.class);
	}

	@Override
	public void run(String... args) throws Exception {

		if (appStatusRepo.count() == 0) {
			AppStatus appStatus = new AppStatus(false);
			appStatusRepo.save(appStatus);
		}
		if (userRepository.existsByUsername("admin")) {
			System.out.println("admin already exists");
		} else {
			Role adminRole = new Role(ERole.ROLE_ADMIN);
			if (roleRepository.findByName(ERole.ROLE_ADMIN).isEmpty()) {
				roleRepository.save(adminRole);
				if (roleRepository.findByName(ERole.ROLE_SPEC).isEmpty()) {
					Role specRole = new Role(ERole.ROLE_SPEC);
					roleRepository.save(specRole);
				}
				if (roleRepository.findByName(ERole.ROLE_PARENT).isEmpty()) {
					Role parentRole = new Role(ERole.ROLE_PARENT);
					roleRepository.save(parentRole);
				}
			}
			User userAdmin = new User("admin", "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918");
			Role getRole = roleRepository.findByName(ERole.ROLE_ADMIN)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			userAdmin.setRole(getRole);
			userRepository.save(userAdmin);

		}

		if (kindergartenRepository.findAll().size() < 1) {
			System.out.println("++++++++++++++Started");

//			Reader reader = Files.newBufferedReader(Paths.get("./CSV/darzeliai.csv"));
//			Reader reader = new FileReader("darzeliai.csv");

			InputStream in = getClass().getResourceAsStream("/darzeliai.csv");
			Reader reader = new BufferedReader(new InputStreamReader(in));
			System.out.println("++++++++++++++Reader");

			CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT.withDelimiter(';')
					.withHeader("Id", "Address", "Name").withIgnoreHeaderCase().withTrim());
			System.out.println("++++++++++++++Parse");

			for (CSVRecord csvRecord : csvParser) {
				if (csvRecord.getRecordNumber() > 1) {

					String id = csvRecord.get("Id");
					String address = csvRecord.get("Address");
					String name = csvRecord.get("Name");

					System.out.println("Record No - " + csvRecord.getRecordNumber());
					System.out.println("---------------");
					System.out.println("Name : " + name);
					System.out.println("ID : " + id);
					System.out.println("Phone : " + address);
					System.out.println("---------------\n\n");

					kindergartenRepository.save(new Kindergarten(address, name, new ArrayList<>()));
				}
			}
		}

		if (groupRepository.findAll().size() < 1) {
			System.out.println("++++++++++++++Started");

//			Reader reader = File(getClass().getResource("darzeliai.csv").getPath());
//			Reader reader = new FileReader("grupes.csv");

			InputStream in = getClass().getResourceAsStream("/grupes.csv");
			Reader reader = new BufferedReader(new InputStreamReader(in));

			System.out.println("++++++++++++++Reader");

			CSVParser csvParser = new CSVParser(reader,
					CSVFormat.DEFAULT.withDelimiter(';')
							.withHeader("Id", "Age_from", "Age_to", "Capasity", "Name", "Kindergarten_id")
							.withIgnoreHeaderCase().withTrim());
			System.out.println("++++++++++++++Parse");

			for (CSVRecord csvRecord : csvParser) {

				if (csvRecord.getRecordNumber() > 1) {
					String id = csvRecord.get("Id");
					String capasity = csvRecord.get("Capasity");
					String name = csvRecord.get("Name");
					String kindergartenId = csvRecord.get("Kindergarten_id");
					String ageFrom = csvRecord.get("Age_from");
					String ageTo = csvRecord.get("Age_to");

					System.out.println("Record No - " + csvRecord.getRecordNumber());
					System.out.println("---------------");
					System.out.println("ID : " + id);
					System.out.println("Capasity: " + capasity);
					System.out.println("Kindergarten ID : " + kindergartenId);
					System.out.println("AgeFrom : " + ageFrom);
					System.out.println("AgeTo : " + ageTo);
					System.out.println("Name : " + name);
					System.out.println("---------------\n\n");

					groupRepository.save(new Group(name, Long.parseLong(capasity), Long.parseLong(ageFrom),
							Long.parseLong(ageTo), kindergartenRepository.getOne(Long.parseLong(kindergartenId))));
				}
			}
		}

		if (formStatusRepository.findByName(EFormStatus.PATEIKTAS).isEmpty()) {
			FormStatus pateiktasStatus = new FormStatus(EFormStatus.PATEIKTAS);
			formStatusRepository.save(pateiktasStatus);
		}
		if (formStatusRepository.findByName(EFormStatus.PANAIKINTAS).isEmpty()) {
			FormStatus panaikintasStatus = new FormStatus(EFormStatus.PANAIKINTAS);
			formStatusRepository.save(panaikintasStatus);
		}
		if (formStatusRepository.findByName(EFormStatus.PRIIMTAS).isEmpty()) {
			FormStatus priimtasStatus = new FormStatus(EFormStatus.PRIIMTAS);
			formStatusRepository.save(priimtasStatus);
		}
		if (formStatusRepository.findByName(EFormStatus.EILEJE).isEmpty()) {
			FormStatus eilejeStatus = new FormStatus(EFormStatus.EILEJE);
			formStatusRepository.save(eilejeStatus);
		}

	}
}
