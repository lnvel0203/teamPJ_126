package springBoot_team_pj_126.dao;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.data.jpa.repository.JpaRepository;

import springBoot_team_pj_126.auth.entities.User;



public interface UserRepository extends JpaRepository<User, String>{

    @Select("SELECT * FROM EMPLOYEES_TBL WHERE id = #{id} ")
    User findByid(@Param("id") String id);
}

