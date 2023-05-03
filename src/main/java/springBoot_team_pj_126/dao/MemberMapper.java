package springBoot_team_pj_126.dao;

import org.apache.ibatis.annotations.Select;
import org.springframework.data.jpa.repository.JpaRepository;

import springBoot_team_pj_126.dto.UserDTO;


public interface MemberMapper extends JpaRepository<UserDTO, Integer>{

	//부석현ㄴ
	@Select("SELECT * FROM EMPLOYEES_TBL WHERE id = #{id}")
	public UserDTO findByName(String id);
	
	
}


