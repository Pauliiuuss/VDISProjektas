//package it.akademija.admin;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import it.akademija.payload.request.LoginRequest;
//import it.akademija.repository.UserRepository;
//import org.junit.jupiter.api.Assertions;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.MediaType;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.MvcResult;
//import org.springframework.test.web.servlet.setup.MockMvcBuilders;
//import org.springframework.web.context.WebApplicationContext;
//
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//public class getUsersTest {
//
//
//    private MockMvc mockMvc;
//
//    @Autowired
//    private WebApplicationContext context;
//
//    @Autowired
//    ObjectMapper objectMapper = new ObjectMapper();
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @BeforeEach
//    public void setUp() throws Exception {
//        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
//
//        LoginRequest loginRequest = new LoginRequest();
//        loginRequest.setUsername("admin");
//        loginRequest.setPassword("admin");
//
//        String jsonRequest = objectMapper.writeValueAsString(loginRequest);
//
//        MvcResult adminSignIn = mockMvc.perform(post("/api/auth/signin")
//                .content(jsonRequest).contentType(MediaType.APPLICATION_JSON_VALUE))
//                .andExpect(status().isOk()).andReturn();
//    }
//
//
//    @Test
//    public void getUsersTest() throws Exception {
//
//        MvcResult result = mockMvc.perform(get("/api/admin/getusers").contentType(MediaType.APPLICATION_JSON_VALUE))
//                .andExpect(status().isOk()).andReturn();
//
//        String resultContext = result.getResponse().getContentAsString();
//
////        MessageResponse response = objectMapper.readValue(resultContext, MessageResponse.class);
//
//        Assertions.assertEquals(Boolean.FALSE, resultContext.isEmpty());
//
//    }
//
//}
