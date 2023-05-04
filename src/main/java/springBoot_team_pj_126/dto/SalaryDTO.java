package springBoot_team_pj_126.dto;


import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


import lombok.Data;


@Entity
@Table(name="salary_tbl")
@Data
public class SalaryDTO {
	@Id
    private int salaryId;
	private int basicSalary;
	private String payDay; //지급일
	private String paymentstatus;
	private int taxtionId;
	private int nontaxtionId;
	private int taxId;
	private int no;
	
//    private String name; // 사원이름
//    private int overtimePay;  //야근수당
//	private int deduction; //공제액 급여에서 공제된 금액
//	private int totaleduction; // 공제총액 공제 항목의 총액  (공제액(sum))
//	private int netPay; // 지급액  
//	private int totalNetpay;// 지급차액
//	private int totalPay; // 실수령액 (지급액-지급차액)
//	private String paymentStatus; 
    
    
}
