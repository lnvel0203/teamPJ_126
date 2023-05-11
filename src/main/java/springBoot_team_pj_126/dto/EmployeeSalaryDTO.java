package springBoot_team_pj_126.dto;

import lombok.Data;

@Data
public class EmployeeSalaryDTO {
	private UserDTO user;
	private SalaryInfoDTO salaryInfo;
    private SalaryRecordsDTO salaryRecord;
    private AdditionalPaymentDTO additionalPayment;
    private DeductionDTO deduction;
}
