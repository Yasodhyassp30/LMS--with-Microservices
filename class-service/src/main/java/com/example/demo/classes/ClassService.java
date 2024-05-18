package com.example.demo.classes;

import java.util.List;
import java.util.Random;
import java.util.UUID;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.demo.errorHandler.EntityExistenceException;
import com.example.demo.members.MemberModel;
import com.example.demo.members.MemberRepo;
import java.util.Optional;


@Service
public class ClassService {
    @Autowired
    private ClassRepo classRepo;

    @Autowired
    private MemberRepo memberRepo;

    @Autowired
    private RestTemplate restTemplate;


    public Map<String,String> createClass(ClassModel classModel) {
        Random rand = new Random();
        String joinCode = Integer.toString(rand.nextInt(9000)+1000);
        classModel.setJoinCode(joinCode);
        classRepo.save(classModel);
        return classModel.ClassModelToMap(classModel);
    }

    public Map<String,String> getClassById(UUID cid) {
        ClassModel classModel = classRepo.findByCid(cid);
        if(classModel == null){
            throw new EntityExistenceException("Class does not exist");
        }
        return classModel.ClassModelToMap(classModel);
    }

    public List<ClassModel> getAllClassesByTeacher(String teacher) {
        return classRepo.findAllByTeacher(teacher);
    }

    public void deleteClass(UUID cid) {
        classRepo.deleteById(cid);
    }

    public void joinClass(UUID cid, String sid, String joinCode) {
        ClassModel classModel = classRepo.findByCid(cid);
        Optional<MemberModel> memberModel = memberRepo.findBySid(sid);

        if(memberModel.isPresent()){
            throw new EntityExistenceException("Student already in class");
        }
        if(classModel == null){
            throw new EntityExistenceException("Class does not exist");
        }
        if(!classModel.getJoinCode().equals(joinCode)){
            throw new EntityExistenceException("Invalid join code");
        }
        ResponseEntity<Map> response = restTemplate.exchange("http://auth-service/auth/user/sid/"+sid, HttpMethod.GET, null, Map.class);
        String Username = response.getBody().get("username").toString();
        memberRepo.save(new MemberModel(
            null,
            sid,
            classModel,
            Username,
            response.getBody().get("email").toString()
        ));
    }

    public void leaveClass(UUID cid, String sid) {
        ClassModel classModel = classRepo.findByCid(cid);
        Optional<MemberModel> memberModel = memberRepo.findBySid(sid);
        if(!memberModel.isPresent()){
            throw new EntityExistenceException("Student not in class");
        }
        if(classModel == null){
            throw new EntityExistenceException("Class does not exist");
        }
        memberRepo.delete(memberModel.get());
    }

    public List<MemberModel> getMembers(UUID cid) {
        ClassModel classModel = classRepo.findByCid(cid);
        if(classModel == null){
            throw new EntityExistenceException("Class does not exist");
        }
        return memberRepo.findAllByCourse(classModel);
    }

    public Map<String,String> getJoinCode(UUID cid) {
        ClassModel classModel = classRepo.findByCid(cid);
        if(classModel == null){
            throw new EntityExistenceException("Class does not exist");
        }
        return Map.of("joinCode", classModel.getJoinCode());
    }

    public void removeMember(UUID cid, String sid) {
        ClassModel classModel = classRepo.findByCid(cid);
        Optional<MemberModel> memberModel = memberRepo.findStudentInClass(sid, cid);
        if(!memberModel.isPresent()){
            throw new EntityExistenceException("Student not in class");
        }
        if(classModel == null){
            throw new EntityExistenceException("Class does not exist");
        }
        memberRepo.delete(memberModel.get());
    }

    public List<ClassModel> getClassesByStudentId(String studentId) {
        return memberRepo.findClassesByStudentId(studentId);
    }

    public void addStudentToClass(UUID cid, String email) {
        ClassModel classModel = classRepo.findByCid(cid);
        ResponseEntity<Map> response = restTemplate.exchange("http://auth-service/auth/user/"+email, HttpMethod.GET, null, Map.class);
        if(response == null){
            throw new EntityExistenceException("User does not exist");
        }
        String sid = response.getBody().get("uid").toString();
        String Username = response.getBody().get("username").toString();

         MemberModel memebers = memberRepo.findStudentInClass(sid, cid).orElse(null);
         if(memebers != null){
            throw new EntityExistenceException("Student already in class");
         }

        memberRepo.save(new MemberModel(
            null,
            sid,
            classModel,
            Username,
            email
        ));
        if(classModel == null){
            throw new EntityExistenceException("Class does not exist");
        }
    }
    
}

