package springBoot_team_pj_126.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import springBoot_team_pj_126.dao.SalaryMapper;
import springBoot_team_pj_126.dto.AdditionalPaymentDTO;
import springBoot_team_pj_126.dto.DeductionDTO;
import springBoot_team_pj_126.dto.SalaryInfoDTO;
import springBoot_team_pj_126.dto.SalaryRecordsDTO;


@Component
@Service
public class SalaryServiceImpl implements SalaryService{

	@Autowired
	private SalaryMapper mapper;

	// 급여 관리 리스트
	@Override
	public ArrayList<Map<String, Object>> salaryList() {
		System.out.println("SalaryServiceImpl - salaryList()");
		
		ArrayList<Map<String, Object>> map = mapper.salaryList();
		
		return map;
	}

	// 급여 수정을 위한 상세 내역
	@Override
	public SalaryRecordsDTO salaryeditDetail(String id) {
		System.out.println("SalaryServiceImpl - salaryeditDetail()");
		SalaryRecordsDTO dto = mapper.salaryeditDetail(id);
		
		return dto;
	}
	
	// ========================================================
	// [급여 지급에 필요한 메서드]

	// 급여 지급 상세 내역
	@Override
	public SalaryInfoDTO salaryCreateDetail(String id) {
		System.out.println("SalaryServiceImpl - salaryCreateDetail()");
		
		SalaryInfoDTO dto = mapper.salaryCreateDetail(id);
		
		return dto;
	}

	// 주말 제외 총 근무 시간
	@Override
	public Map<String, Object> salaryCreateInfo(String id) {
		System.out.println("SalaryServiceImpl - weeklyWorkingHours()");
		
		Map<String, Object> data = new HashMap<>();
		
		int weeklyWorkingHours = mapper.weeklyWorkingHours(id);
		int weekendWorkingHours = mapper.weekendWorkingHours(id);
		
		data.put("weeklyWorkingHours", weeklyWorkingHours);
		data.put("weekendWorkingHours", weekendWorkingHours);
		
		return data;
	}
	
	// 급여 지급
	@Override
	public int invoiceCreate(Map<String, Object> data) {
		System.out.println("SalaryServiceImpl - invoiceCreate()");
		
		String addId = (String) data.get("addId");
		double netSalary = (double) data.get("netSalary");
		
		int overtimePay = (int) data.get("overtimePay");
		int weekendWorkPay = (int) data.get("weekendWorkPay");
		int calculateRestDayPay = (int) data.get("calculateRestDayPay");
		int bonusForm = (int) data.get("bonusForm");
		int totalAdditionalPay = (int) data.get("totalAdditionalPay");
		
		double pensionInsurance = (double) data.get("pensionInsurance");
		double employeeInsurance = (double) data.get("employeeInsurance");
		double healthInsurance = (double) data.get("healthInsurance");
		double compensationInsurance = (double) data.get("compensationInsurance");
		double totalInsurancePay = (double) data.get("totalInsurancePay");
		
		SalaryRecordsDTO recordsDTO = new SalaryRecordsDTO();
		recordsDTO.setEmpId(addId);
		recordsDTO.setNetSalary(netSalary);
		
		AdditionalPaymentDTO addDTO = new AdditionalPaymentDTO();
		addDTO.setEmpId(addId);
		addDTO.setOvertimePay(overtimePay);
		addDTO.setHolidayPay(weekendWorkPay);
		addDTO.setRestDayPay(calculateRestDayPay);
		addDTO.setBonus(bonusForm);
		addDTO.setTotalAdditional(totalAdditionalPay);
		
		DeductionDTO deducationDTO = new DeductionDTO();
		deducationDTO.setEmpId(addId);
		deducationDTO.setPensionInsurance(pensionInsurance);
		deducationDTO.setEmploymentInsurance(employeeInsurance);
		deducationDTO.setHealthInsurance(healthInsurance);
		deducationDTO.setCompensationInsurance(compensationInsurance);
		deducationDTO.setTotalDeductions(totalInsurancePay);
		

		int salaryRecordsInsertCnt = mapper.salaryRecordsInsert(recordsDTO);
		int salaryRecordId = mapper.selectSalaryRecordId();
		addDTO.setSalaryRecordId(salaryRecordId);
		deducationDTO.setSalaryRecordId(salaryRecordId);
		
		int additionalPaymentInsertCnt = mapper.additionalPaymentInsert(addDTO);
		int deductionInsertCnt = mapper.deductionInsert(deducationDTO);
		
		
		int insertCnt = salaryRecordsInsertCnt + additionalPaymentInsertCnt + deductionInsertCnt;
		if (insertCnt == 3) {
			
			return 1;
		}
		
		return 0;
	}

	// ========================================================
	
}
