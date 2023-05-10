package springBoot_team_pj_126.dto;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="deduction_tbl")
@Data
public class DeductionDTO {
	@Id
	private int deductionId;		// 공제 고유 번호 (PK)
	private int salaryRecordId;		// 급여 기록 고유 번호 (FK)
	private String empId;			// 직원 고유 번호(FK)
	private double pensionInsurance;	// 국민연금 보험료
	private double healthInsurance;	// 건강 보험료
	private double employmentInsurance;// 고용 보험료
	private double compensationInsurance;	// 산재 보험료
	private double incomeTax;			// 소득세
	private double totalDeductions;	// 총 공제액
}
