package it.akademija.services;

import it.akademija.models.KindergartenPriority;
import it.akademija.payload.request.KindergartenPriorityRequest;
import it.akademija.repository.KindergartenPriorityRepository;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@RunWith(SpringRunner.class)
@SpringBootTest
class KindergartenPriorityServiceTest {

    @Autowired
    private KindergartenPriorityService kindergartenPriorityService;

    @MockBean
    private KindergartenPriorityRepository kindergartenPriorityRepository;

    @Test
    void testGetKindergartenPriorities(){
        when(kindergartenPriorityRepository.findAll())
                .thenReturn(Stream
                        .of(new KindergartenPriority(1L, "priorityOne", "priorityTwo", "priorityThree", "priorityFour", "priorityFive"),
                                new KindergartenPriority(2L, "priority2One", "priority2Two", "priority2Three", "priority2Four", "priority2Five"))
                        .collect((Collectors.toList())));
        assertEquals(2, kindergartenPriorityService.getAllKindergartenPriorities().size());
    }


    @Test
    void testGetKindergartenPriority(){
        Long id = 1L;
        KindergartenPriority kinder = new KindergartenPriority(1L, "priorityOne", "priorityTwo", "priorityThree", "priorityFour", "priorityFive");
        when(kindergartenPriorityRepository.getOne(id))
                .thenReturn(kinder);

        assertEquals(1L, kindergartenPriorityService.getKindergartenPrioritiesById(id).getId());
        assertEquals("priorityOne", kindergartenPriorityService.getKindergartenPrioritiesById(id).getKindergartenOne());
        assertEquals("priorityTwo", kindergartenPriorityService.getKindergartenPrioritiesById(id).getKindergartenTwo());
        assertEquals("priorityThree", kindergartenPriorityService.getKindergartenPrioritiesById(id).getKindergartenThree());
        assertEquals("priorityFour", kindergartenPriorityService.getKindergartenPrioritiesById(id).getKindergartenFour());
        assertEquals("priorityFive", kindergartenPriorityService.getKindergartenPrioritiesById(id).getKindergartenFive());
    }

    @Test
    void testAddKindergartenPriority(){
        assertEquals(200, kindergartenPriorityService.addKindergartenPriority(new KindergartenPriorityRequest(2L, "priorityOne", "priorityTwo", "priorityThree", "priorityFour", "priorityFive")).getStatusCodeValue());
    }

    @Test
    void testDeleteKindergartenPriority(){
        KindergartenPriority kinder = new KindergartenPriority(1L, "priorityOne", "priorityTwo", "priorityThree", "priorityFour", "priorityFive");
        kindergartenPriorityService.deleteKindergartenPriorityById(kinder.getId());
        verify(kindergartenPriorityRepository, times(1)).deleteById(kinder.getId());
    }
}
