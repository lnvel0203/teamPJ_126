package springBoot_team_pj_126.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import springBoot_team_pj_126.dto.SalaryDTO;
import springBoot_team_pj_126.dto.SalaryInfoDTO;

@Mapper
public interface SalaryMapper {

	
	public List<SalaryDTO> salaryList();

	// ========================================================
	// [급여 지급에 필요한 메서드]
	
	// 급여 지급 상세 내역
	public SalaryInfoDTO salaryCreateDetail(String id);

	// 주말 제외 총 근무 시간
	public int weeklyWorkingHours(String id);

	// 주말 총 근무 시간
	public int weekendWorkingHours(String id);
	
	public void insertSalary(SalaryDTO salaryDTO);
	
	public void updateSalary(SalaryDTO salaryDTO);
	
	public void deleteSalary(int salaryId);
	
}


