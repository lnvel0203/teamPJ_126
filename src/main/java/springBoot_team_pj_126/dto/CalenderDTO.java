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
	private int NO;				//번호
	private String startDate;	//시작날짜
	private String endDate;		//끝날짜
	private String title;		//제목
	private String descriptions;//내용
	private String color;		//색상
	private String id;			//사용자id

}
