package springBoot_team_pj_126.auth.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity // 누락주의
@Table(name="EMPLOYEES_TBL")
public class User {

    
    @Id
    // id은 중복값이 있으면 안됨. (회원가입할때 아이디중복이 안되는것)
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
	private String annualCount;
	private String welfarePoint;
	private String deptId;
	private String positionId;
	private String salaryId;
	private String thingNo;
	private String role;	//ROLE_USER, ROLE_ADMIN, ROLE_MANAGER
    private String token;

}