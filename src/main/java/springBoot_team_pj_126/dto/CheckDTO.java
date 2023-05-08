package springBoot_team_pj_126.dto;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Data;

@Entity
@Table(name="attendence_tbl")
@Data
public class CheckDTO {
	@Id
	private int attendenceID;
	private Timestamp startWork;		// 출근
	private Timestamp metting;			// 회의
	private Timestamp goOut;			// 외출
	private Timestamp fieldWork;		// 외근
	private Timestamp endWork;			// 퇴근
	private Timestamp education;		// 교육
	private Timestamp businessTrip;		// 출장
	private Timestamp rest;				// 휴식
	private Timestamp returnWork;		// 복귀
	private Timestamp attendanceDate;	// 날짜
	private String id;
}
