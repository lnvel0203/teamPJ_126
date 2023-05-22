package springBoot_team_pj_126.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import springBoot_team_pj_126.dto.UserDTO;


@Mapper
public interface MemberMapper {

	//부석현
	@Select("SELECT * FROM EMPLOYEES_TBL WHERE id = #{id}")
	public UserDTO findByUsername(String id);
	
}


