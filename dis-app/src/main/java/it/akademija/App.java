package it.akademija;

import it.akademija.models.ERole;
import it.akademija.models.Role;
import it.akademija.models.User;
import it.akademija.repository.RoleRepository;
import it.akademija.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;

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

		if (userRepository.existsByUsername("admin")) {
			System.out.println("admin already exists");
		} else {
			Role adminRole = new Role(ERole.ROLE_ADMIN);
			if (roleRepository.findByName(ERole.ROLE_ADMIN).isEmpty()) {
				roleRepository.save(adminRole);
				if(roleRepository.findByName(ERole.ROLE_SPEC).isEmpty()) {
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

			Reader reader = Files.newBufferedReader(Paths.get("./CSV/darzeliai.csv"));
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

			Reader reader = Files.newBufferedReader(Paths.get("./CSV/grupes.csv"));
			System.out.println("++++++++++++++Reader");

			CSVParser csvParser = new CSVParser(reader,
					CSVFormat.DEFAULT.withDelimiter(';')
							.withHeader("Id", "Capasity", "Name", "Kindergarten_id", "Age_from", "Age_to")
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
	}
}
