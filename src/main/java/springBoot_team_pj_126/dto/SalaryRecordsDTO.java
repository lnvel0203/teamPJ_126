package springBoot_team_pj_126.dto;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="salary_records_tbl")
@Data
public class SalaryRecordsDTO {
	@Id
	private int salaryRecordId;		// 급여 기록 고유 번호 (PK)
	private String empId;			// 직원 고유 번호(FK)
	private double netSalary;			// 실 지급액
	private Date payDate;			// 지급일
	private String paymentStatus;	// 지급 여부 
}

