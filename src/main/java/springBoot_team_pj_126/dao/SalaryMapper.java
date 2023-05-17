package springBoot_team_pj_126.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import springBoot_team_pj_126.dto.AdditionalPaymentDTO;
import springBoot_team_pj_126.dto.ChartDTO;
import springBoot_team_pj_126.dto.DeductionDTO;
import springBoot_team_pj_126.dto.EmployeeSalaryDTO;
import springBoot_team_pj_126.dto.SalaryInfoDTO;
import springBoot_team_pj_126.dto.SalaryRecordsDTO;

@Mapper
public interface SalaryMapper {

	// 급여 관리 리스트
	public ArrayList<Map<String, Object>> salaryList();

	// 급여 수정을 위한 상세 내역
	public SalaryRecordsDTO salaryeditDetail(String id);

	// 급여 상세 가져오기
	public EmployeeSalaryDTO invoiceDetail(int id);
	// ========================================================
	// [급여 지급에 필요한 메서드]

	// 급여 지급 상세 내역
	public SalaryInfoDTO salaryCreateDetail(String id);

	// 주말 제외 총 근무 시간
	public int weeklyWorkingHours(Map<String, Object> map);

	// 주말 총 근무 시간
	public int weekendWorkingHours(Map<String, Object> map);

	// 
	public int salaryRecordsInsert(SalaryRecordsDTO recordsDTO);

	public int selectSalaryRecordId();

	public int additionalPaymentInsert(AdditionalPaymentDTO addDTO);

	public int deductionInsert(DeductionDTO deducationDTO);

	// 지급 상태 업데이트
	public int updateSalaryStatus(int salaryRecordId);

	// ========================================================
	// 기본급 관리 리스트
	//key와 value형식을 리스트로 반환하려고
	public ArrayList<Map<String, Object>> baseSalaryList();

	// 기본급 업데이트
	public void updateBaseSalary(Map<String, Object> data);

	public void setBaseSalary(String id);


	// ========================================================
	// 차트

	// 부서별 급여 퍼센트
	public List<ChartDTO> getChartData();

	// 부서별 급여 평균, 최저, 최고
	public List<ChartDTO> getChartData2();

}


