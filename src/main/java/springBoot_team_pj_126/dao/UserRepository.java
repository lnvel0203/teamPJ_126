package springBoot_team_pj_126.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import springBoot_team_pj_126.auth.entities.User;



public interface UserRepository extends JpaRepository<User, String>{

	
}
