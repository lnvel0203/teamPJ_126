package springBoot_team_pj_126.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import springBoot_team_pj_126.dto.DeptDTO;
import springBoot_team_pj_126.dto.UserDTO;

// 부서관리용 DAO 생성(2023-05-04)
@Mapper
public interface DepartmentMapper {

	public List<DeptDTO> departmentList();
	
	public void addDeptment(DeptDTO dto);
}
