package it.akademija.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@Api(value = "admin")
@RequestMapping(value = "/api/admin")
public class AdminController {

	@Autowired
	private AdminService adminService;

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get's admin", notes = "Gets admin")
	public AdminInfo getAdmin(@PathVariable final long id) {
		return adminService.getAdmin(id);
	}

	@RequestMapping(method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get's admin", notes = "Gets admin")
	public List<AdminInfo> getAdmins() {
		return adminService.getAdmins();
	}

	@RequestMapping(method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ApiOperation(value = "Create's admin", notes = "Create admin")
	public void createAdmin(@RequestBody AdminInfo info) {
		adminService.createAdmin(info);
	}
}
