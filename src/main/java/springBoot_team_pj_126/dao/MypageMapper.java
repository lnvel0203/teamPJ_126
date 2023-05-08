package springBoot_team_pj_126.dao;

import java.util.List;


import org.apache.ibatis.annotations.Mapper;



import springBoot_team_pj_126.dto.UserDTO;

@Mapper
public interface MypageMapper {

	//김재인
	public List<UserDTO> mypageList();
	
}


