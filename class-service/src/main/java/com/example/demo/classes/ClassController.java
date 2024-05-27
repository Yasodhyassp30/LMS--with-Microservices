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
@RequestMapping("/classes")
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

    @GetMapping("/teachers/{teacher}")
    public ResponseEntity<?> getClassesbyTeacher(@PathVariable String teacher) {
        return ResponseEntity.ok(classService.getAllClassesByTeacher(teacher));
    }

    @DeleteMapping("/{cid}")
    public ResponseEntity<?> deleteClass(@PathVariable UUID cid) {
        classService.deleteClass(cid);
        Map<String,String> response = Map.of("message", "Class deleted successfully");
        return ResponseEntity.ok(response);
    }    

    @PostMapping("/students/join/{cid}")
    public ResponseEntity<?> joinClass(@PathVariable UUID cid, @RequestBody Map<String,String> body) {
        classService.joinClass(cid, body.get("sid"), body.get("joinCode"));
        Map<String,String> response = Map.of("message", "Joined class successfully");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/students/leave/{cid}")
    public ResponseEntity<?> leaveClass(@PathVariable UUID cid, @RequestBody Map<String,String> body) {
        classService.leaveClass(cid, body.get("sid"));
        Map<String,String> response = Map.of("message", "Left class successfully");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/students/{cid}")
    public ResponseEntity<?> getStudentsInClass(@PathVariable UUID cid) {
        return ResponseEntity.ok(classService.getMembers(cid));
    }

    @GetMapping("/joincode/{cid}")
    public ResponseEntity<Map<String,String>> getJoinCode(@PathVariable UUID cid) {
        return ResponseEntity.ok(classService.getJoinCode(cid));
    }

    @DeleteMapping("/teachers/remove/{cid}/{sid}")
    public ResponseEntity<Map<String,String>> removeStudent(@PathVariable String cid, @PathVariable String sid) {
        UUID classId = UUID.fromString(cid);
        classService.removeMember(classId, sid);
        Map<String,String> response = Map.of("message", "Student removed successfully");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/students/classes/{sid}")
    public ResponseEntity<?> getClassesByStudentId(@PathVariable String sid) {
        return ResponseEntity.ok(classService.getClassesByStudentId(sid));
    }
    
    @PostMapping("/teachers/students/{cid}")
    public ResponseEntity<?> addStudentToClass(@PathVariable UUID cid, @RequestBody Map<String,String> body) {
        classService.addStudentToClass(cid, body.get("email"));
        Map<String,String> response = Map.of("message", "Student added successfully");
        return ResponseEntity.ok(response);
    }

   
    
}
