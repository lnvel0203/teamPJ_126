package springBoot_team_pj_126.dto;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="calendar_tbl")
@Data
public class CalenderDTO {
	
	@Id
	private int NO;
	private String startDate;
	private String endDate;
	private String title;
	private String descriptions;
	private String color;
	private String id;
	
	
	 

}
