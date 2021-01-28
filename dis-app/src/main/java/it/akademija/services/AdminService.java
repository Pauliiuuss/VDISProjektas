package it.akademija.services;

import it.akademija.models.ERole;
import it.akademija.models.Role;
import it.akademija.models.User;
import it.akademija.models.UserInfo;
import it.akademija.payload.request.RegisterRequest;
import it.akademija.payload.response.MessageResponse;
import it.akademija.repository.RoleRepository;
import it.akademija.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder encoder;
    @Autowired
    private RoleRepository roleRepository;


    @Transactional
    public ResponseEntity<?> registerUser(RegisterRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Vartotojo vardas užimtas!"));
        }

        // Create new user's account
        User user = new User(signUpRequest.getUsername(), encoder.encode(signUpRequest.getPassword()));

        String role = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (role == null || role.equals("")) {
            throw new RuntimeException("Error: Role is not found.");
        } else {
            if (role.equals("SPEC")) {
                Role specRole = roleRepository.findByName(ERole.ROLE_SPEC)
                        .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                roles.add(specRole);
            } else {
                Role parentRole = roleRepository.findByName(ERole.ROLE_PARENT)
                        .orElseThrow(() -> new RuntimeException("Error: Role is not found!!!"));
                roles.add(parentRole);
            }
        }

        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("Naudotojas užregistruotas!"));
    }

    @Transactional(readOnly = true)
    public Collection<UserInfo> getUsers(){
       return userRepository.findAll()
                .stream()
                .map( isdb -> new UserInfo(
                        isdb.getId(),
                        isdb.getUsername(),
                        isdb.getPassword()))
                .collect(Collectors.toList());
    }
}
