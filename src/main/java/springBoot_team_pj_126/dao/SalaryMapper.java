package springBoot_team_pj_126.dao;

import java.util.ArrayList;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import springBoot_team_pj_126.dto.AdditionalPaymentDTO;
import springBoot_team_pj_126.dto.DeductionDTO;
import springBoot_team_pj_126.dto.SalaryInfoDTO;
import springBoot_team_pj_126.dto.SalaryRecordsDTO;

@Mapper
public interface SalaryMapper {

	// 급여 관리 리스트
	public ArrayList<Map<String, Object>> salaryList();

	// 급여 수정을 위한 상세 내역
	public SalaryRecordsDTO salaryeditDetail(String id);
	// ========================================================
	// [급여 지급에 필요한 메서드]
	
	// 급여 지급 상세 내역
	public SalaryInfoDTO salaryCreateDetail(String id);

	// 주말 제외 총 근무 시간
	public int weeklyWorkingHours(String id);

	// 주말 총 근무 시간
	public int weekendWorkingHours(String id);
	
	// 
	public int salaryRecordsInsert(SalaryRecordsDTO recordsDTO);

	public int selectSalaryRecordId();
	
	public int additionalPaymentInsert(AdditionalPaymentDTO addDTO);

	public int deductionInsert(DeductionDTO deducationDTO);

	
	// ========================================================






	
}


