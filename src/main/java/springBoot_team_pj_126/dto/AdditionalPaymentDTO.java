package springBoot_team_pj_126.dto;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="additional_payment_tbl")
@Data
public class AdditionalPaymentDTO {
	@Id
	private int addPayId;		// 추가 급여 고유 번호 (PK)
	private int salaryRecordId;	// 급여 기록 고유 번호 (FK)
	private String empId;		// 직원 고유 번호(FK)
	private double overtimePay;	// 연장 근로 수당
	private double holidayPay;		// 주말 근로 수당
	private double restDayPay;		// 주휴수당
	private double bonus;			// 상여금
	private double totalAdditional;// 총 추가금
}
