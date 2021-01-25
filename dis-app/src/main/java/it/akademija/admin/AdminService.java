package it.akademija.admin;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminService {

	@Autowired
	private AdminDAO adminDAO;

	@Transactional
	public AdminInfo getAdmin(Long id) {
		Admin admin = adminDAO.findById(id).orElse(null);
		if (admin == null) {
			return null;
		}
		return new AdminInfo(admin.getId(), admin.getUsername(), admin.getPassword());
	}

	@Transactional
	public void createAdmin(AdminInfo info) {
		adminDAO.save(new Admin(info.getUsername(), info.getPassword()));
	}

	public List<AdminInfo> getAdmins() {
		List<AdminInfo> result = adminDAO.findAll().stream()
				.map(admin -> new AdminInfo(admin.getId(), admin.getUsername(), admin.getPassword()))
				.collect(Collectors.toList());
		return result;
	}

}
