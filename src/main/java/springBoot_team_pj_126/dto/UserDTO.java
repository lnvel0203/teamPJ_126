package springBoot_team_pj_126.dto;



import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Table(name="EMPLOYEES_TBL")
@Entity
@Data
public class UserDTO {
	//부석현
	@Id
	private int no;
	@Column(unique = true)      // id은 중복값이 있으면 안됨. (회원가입할때 아이디중복이 안되는것)
	private String id;
	private String name;
	private String pwd;
	private String photo;
	private String birth;
	private String email;
	private String address;
	private String hp;
	private String hireDate;
	private String state;
	
	private String annualCount; //연차
	
	private String welfarePoint;
	private String deptId;
	private String positionId;
	private String salaryId;
	private String thingNo;
	private String role;	//ROLE_USER, ROLE_ADMIN, ROLE_MANAGER
	
	// 부서
	private String deptName;
	private String stemp;
	
	// 직급
	private String positionName;
	
	// 지각
	private int tardy;
	private String firstApproverState; 
    private String secondApproverState;
    private String thirdApproverState; 
    private String fourthApproverState;


}