package com.example.demo.members;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.example.demo.classes.ClassModel;
import java.util.Optional;
import java.util.List;

@Repository
public interface MemberRepo extends JpaRepository<MemberModel, Long>{

    Optional<MemberModel> findBySid(String sid);
    List<MemberModel> findAllByCourse(ClassModel course);
    
    @Query("SELECT c FROM ClassModel c JOIN MemberModel m ON c.cid = m.course.cid WHERE m.sid = :studentId")
    List<ClassModel> findClassesByStudentId(String studentId);

    
} 
