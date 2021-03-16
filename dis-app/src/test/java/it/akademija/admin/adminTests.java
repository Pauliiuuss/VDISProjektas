package it.akademija.admin;

import com.fasterxml.jackson.databind.ObjectMapper;
import it.akademija.models.Group;
import it.akademija.models.Kindergarten;
import it.akademija.models.Role;
import it.akademija.models.User;
import it.akademija.models.enums.ERole;
import it.akademija.payload.request.LoginRequest;
import it.akademija.payload.request.PasswordResetRequest;
import it.akademija.payload.request.RegisterRequest;
import it.akademija.payload.response.JwtResponse;
import it.akademija.payload.response.MessageResponse;
import it.akademija.repository.RoleRepository;
import it.akademija.repository.UserRepository;
import it.akademija.services.AdminService;
import it.akademija.services.AuthService;
import it.akademija.services.ParentService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
public class adminTests {

    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext context;

    @Autowired
    ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AdminService adminService;

    @Autowired
    private ParentService parentService;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private AuthService authService;

    @BeforeEach
    public void setUp() throws Exception {
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();

        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setUsername("admin");
        loginRequest.setPassword("admin");

        String jsonRequest = objectMapper.writeValueAsString(loginRequest);

        MvcResult adminSignIn = mockMvc.perform(post("/api/auth/signin")
                .content(jsonRequest).contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk()).andReturn();
    }

    @Test
    public void createUser() throws Exception {

        RegisterRequest rr = new RegisterRequest();

        rr.setUsername("TestSpec1");
        rr.setPassword("TestSpec1");
        rr.setRole("ROLE_SPEC");

        adminService.registerUser(rr);

        Assertions.assertEquals(Boolean.TRUE, userRepository.existsByUsername("TestSpec1"));
    }

    @Test
    public void disableSpecTest() throws Exception {

        MvcResult result = mockMvc.perform(get("/api/admin/disablespec")
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk()).andReturn();

        Assertions.assertEquals(Boolean.TRUE, parentService.getStatus().isSpecelistsDisabled());
    }

    @Test
    public void enableSpecTest() throws Exception {

        MvcResult result = mockMvc.perform(get("/api/admin/enablespec")
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk()).andReturn();

        Assertions.assertEquals(Boolean.FALSE, parentService.getStatus().isSpecelistsDisabled());
    }

    @Test
    public void deleteUserTest() throws Exception {

        User user = new User("TestFirstName", "TestPassword");
        user.setRole(roleRepository.findByName(ERole.ROLE_SPEC).get());
        userRepository.save(user);

        MvcResult result = mockMvc.perform(delete("/api/admin/deleteuser/{id}", user.getId())
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk()).andReturn();

        Assertions.assertEquals(Boolean.FALSE, userRepository.existsByUsername("TestFirstName"));
    }

}
