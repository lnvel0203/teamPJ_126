package springBoot_team_pj_126.dto;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

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
	private String annualCount;
	private String welfarePoint;
	private String deptId;
	private String positionId;
	private String salaryId;
	private String thingNo;
	private String role;	//ROLE_USER, ROLE_ADMIN, ROLE_MANAGER
	
	
	// , 로 구분해서 roles를 가지고 온다.입력후 -> 파싱한다.
	//ENUM으로 받아도된다.
	//내가 커스터마이징해야할듯하다.
//	public List<String> getRoleList(){
//		
//		if(this.role.length() > 0) {
//			//asList 쓰는법 알아보기
//			return Arrays.asList(this.role.split(","));
//		}
//		
//		return new ArrayList<>();
//	}
	

}
