package springBoot_team_pj_126.service;

import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import springBoot_team_pj_126.dao.SalaryMapper;
import springBoot_team_pj_126.dto.AdditionalPaymentDTO;
import springBoot_team_pj_126.dto.ChartDTO;
import springBoot_team_pj_126.dto.DeductionDTO;
import springBoot_team_pj_126.dto.EmployeeSalaryDTO;
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
   
   // 급여 상세 가져오기
   @Override
   public EmployeeSalaryDTO invoiceDetail(int id) {
      System.out.println("SalaryServiceImpl - invoiceDetail()");
      
      EmployeeSalaryDTO dto = mapper.invoiceDetail(id);
      
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
   public Map<String, Object> salaryCreateInfo(Map<String, Object> map) {
      System.out.println("SalaryServiceImpl - weeklyWorkingHours()");
      
      String date = (String) map.get("dateString");
      
      String[] parts = date.split("/");
      int year = Integer.parseInt(parts[0]);
      int month = Integer.parseInt(parts[1]);
      
      map.put("year", year);
      map.put("month", month);
      
      int weeklyWorkingHours = mapper.weeklyWorkingHours(map);
      int weekendWorkingHours = mapper.weekendWorkingHours(map);
      
      Map<String, Object> data = new HashMap<>();
      
      data.put("weeklyWorkingHours", weeklyWorkingHours);
      data.put("weekendWorkingHours", weekendWorkingHours);
      
      return data;
   }
   
   // 급여 지급
   @Override
   public int invoiceCreate(Map<String, Object> data) {
      System.out.println("SalaryServiceImpl - invoiceCreate()");
      
      // TODO - date 날짜 insert추가 하기
      String date = (String) data.get("date");
      
      String addId = (String) data.get("addId");
      
      int netSalary = (int) data.get("netSalary");
      
      int overtimePay = (int) data.get("overtimePay");
      int weekendWorkPay = (int) data.get("weekendWorkPay");
      int calculateRestDayPay = (int) data.get("calculateRestDayPay");
      int bonusForm = (int) data.get("bonusForm");
      int totalAdditionalPay = (int) data.get("totalAdditionalPay");
      
      int pensionInsurance = (int) data.get("pensionInsurance");
      int employeeInsurance = (int) data.get("employeeInsurance");
      int healthInsurance = (int) data.get("healthInsurance");
      int compensationInsurance = (int) data.get("compensationInsurance");
      int incomeTax = (int) data.get("incomeTax");
      int totalInsurancePay = (int) data.get("totalInsurancePay");

      
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
      deducationDTO.setIncomeTax(incomeTax);
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

   // 지급 상태 업데이트
   @Override
   public int updateSalaryStatus(int salaryRecordId) {
      System.out.println("SalaryServiceImpl - updateSalaryStatus()");
      
      int updateCnt = mapper.updateSalaryStatus(salaryRecordId);
      return updateCnt;
   }

   // ========================================================
   // 기본급 관리 리스트
   @Override
   public ArrayList<Map<String, Object>> baseSalaryList() {
      System.out.println("SalaryServiceImpl - baseSalaryList()");
      
      ArrayList<Map<String, Object>> map = mapper.baseSalaryList();
      
      return map;
   }
   
   // 기본급 업데이트
   @Override
   public void updateBaseSalary(Map<String, Object> map) {
      System.out.println("SalaryServiceImpl - updateBaseSalary()");
      
      Map<String, Object> data = (Map<String, Object>) map.get("sendData");
       System.out.println(data.get("infoId"));
       System.out.println(data.get("formValue"));
         
       mapper.updateBaseSalary(data);
   }
// ========================================================
   // 차트
   
   // 부서별 급여 퍼센트
   @Override
   public List<ChartDTO> getChartData() {
      System.out.println("SalaryServiceImpl - getChartData()");
     
      List<ChartDTO> list =  mapper.getChartData();
      
      return list;
   }

   // 부서별 급여 평균, 최저, 최고
   @Override
   public List<ChartDTO> getChartData2() {
      System.out.println("SalaryServiceImpl - getChartData2()");

      List<ChartDTO> list =  mapper.getChartData2();
      
      return list;
   }
}