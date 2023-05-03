package springBoot_team_pj_126.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import springBoot_team_pj_126.dto.DocumentDTO;
import springBoot_team_pj_126.dto.UserDTO;

@Mapper
public interface DocumentMapper {

	public List<DocumentDTO> documentList();
	
	public List<UserDTO> approverList();
	
}


