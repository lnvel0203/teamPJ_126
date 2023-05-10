package springBoot_team_pj_126.dto;


import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


import lombok.Data;



@Entity
@Table(name="salary_records_tbl")
@Data
public class SalaryDTO {
   @Id
   private int salaryRecordId;
   private String empId;
   private int netSalary; //지급일
   private int payDate;
   private String paymentStatus;

    
    
}