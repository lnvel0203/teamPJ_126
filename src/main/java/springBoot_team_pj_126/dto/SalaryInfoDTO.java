package springBoot_team_pj_126.dto;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="salary_info_tbl")
@Data
public class SalaryInfoDTO {
	@Id
	private int infoId;		// 급여 정보 고유 번호 (PK)
	private String empId;		// 직원 고유 번호(FK)
	private double baseSalary;	// 기본급
	private int regularWeeklyHours;	// 주당 근로 시간
}
