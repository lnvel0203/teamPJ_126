package springBoot_team_pj_126.dto;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Builder;
import lombok.Data;

@Entity
@Table(name="DEPARTMENT_TBL")
@Builder
@Data
public class DeptDTO {
	@Id
	private int deptid;
	private String deptname;
	private Date deptdate;
	private String deptreadername;
	
}
