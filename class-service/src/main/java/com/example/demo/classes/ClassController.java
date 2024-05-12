package com.example.demo.classes;

import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;


@RestController
@RequestMapping("/class")
public class ClassController {

    @Autowired
    private ClassService classService;

    @PostMapping("/")
    public ResponseEntity<Map<String,String>> createClass(@Validated @RequestBody ClassModel classModel) {
        return ResponseEntity.ok(classService.createClass(classModel));
    }

    @GetMapping("/{cid}")
    public ResponseEntity<Map<String,String>> getClassesbyCID(@PathVariable UUID cid) {
        return ResponseEntity.ok(classService.getClassById(cid));
    }

    @GetMapping("/teacher/{teacher}")
    public ResponseEntity<?> getClassesbyTeacher(@PathVariable String teacher) {
        return ResponseEntity.ok(classService.getAllClassesByTeacher(teacher));
    }

    @DeleteMapping("/{cid}")
    public ResponseEntity<?> deleteClass(@PathVariable UUID cid) {
        classService.deleteClass(cid);
        Map<String,String> response = Map.of("message", "Class deleted successfully");
        return ResponseEntity.ok(response);
    }    

    @PostMapping("/student/join/{cid}")
    public ResponseEntity<?> joinClass(@PathVariable UUID cid, @RequestBody Map<String,String> body) {
        classService.joinClass(cid, body.get("sid"), body.get("joinCode"));
        Map<String,String> response = Map.of("message", "Joined class successfully");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/student/leave/{cid}")
    public ResponseEntity<?> leaveClass(@PathVariable UUID cid, @RequestBody Map<String,String> body) {
        classService.leaveClass(cid, body.get("sid"));
        Map<String,String> response = Map.of("message", "Left class successfully");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/student/{cid}")
    public ResponseEntity<?> getStudentsInClass(@PathVariable UUID cid) {
        return ResponseEntity.ok(classService.getMembers(cid));
    }

    @GetMapping("/joincode/{cid}")
    public ResponseEntity<Map<String,String>> getJoinCode(@PathVariable UUID cid) {
        return ResponseEntity.ok(classService.getJoinCode(cid));
    }

    @DeleteMapping("/teacher/remove/{cid}/{sid}")
    public ResponseEntity<Map<String,String>> removeStudent(@PathVariable UUID cid, @PathVariable String sid) {
        classService.removeMember(cid, sid);
        Map<String,String> response = Map.of("message", "Student removed successfully");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/student/classes/{sid}")
    public ResponseEntity<?> getClassesByStudentId(@PathVariable String sid) {
        return ResponseEntity.ok(classService.getClassesByStudentId(sid));
    }
    
    @PostMapping("/teacher/student/{cid}")
    public ResponseEntity<?> addStudentToClass(@PathVariable UUID cid, @RequestBody Map<String,String> body) {
        System.out.println(body.get("email"));
        classService.addStudentToClass(cid, body.get("email"));
        Map<String,String> response = Map.of("message", "Student added successfully");
        return ResponseEntity.ok(response);
    }

   
    
}
