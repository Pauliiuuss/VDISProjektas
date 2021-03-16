package it.akademija.repository;

import it.akademija.models.User;
import it.akademija.models.UserData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserDataRepository extends JpaRepository<UserData, Long> {
	void deleteByUser(User user);

	Optional<UserData> findByUser(User user);
}
