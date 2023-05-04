package springBoot_team_pj_126.dao;

import java.util.List;


import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;


import springBoot_team_pj_126.dto.SalaryDTO;

@Mapper
public interface SalaryMapper {

	
	public List<SalaryDTO> salaryList();
	
}


