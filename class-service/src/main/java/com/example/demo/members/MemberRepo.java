package com.example.demo.members;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.example.demo.classes.ClassModel;
import java.util.Optional;
import java.util.List;
import java.util.UUID;
@Repository
public interface MemberRepo extends JpaRepository<MemberModel, Long>{

    Optional<MemberModel> findBySid(String sid);
    List<MemberModel> findAllByCourse(ClassModel course);
    
    @Query("SELECT c FROM ClassModel c JOIN MemberModel m ON c.cid = m.course.cid WHERE m.sid = :studentId")
    List<ClassModel> findClassesByStudentId(String studentId);

    @Query("SELECT m FROM MemberModel m WHERE m.sid = :studentId AND m.course.cid = :classId")
    Optional<MemberModel> findStudentInClass(String studentId, UUID classId);
    
}
